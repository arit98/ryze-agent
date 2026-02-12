import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const askedQuestions = new Map<string, any>();

let lastCallTime = 0;
const MIN_INTERVAL_MS = 2000;

// schema
const RequestSchema = z.object({
    prompt: z.string(),
    currentCode: z.string().optional().default(""),
    history: z.array(z.any()).optional().default([]),
});

const ResponseSchema = z.object({
    plan: z.object({
        title: z.string().describe("Short descriptive title of the update"),
        reasoning: z.string().describe("Detailed explanation of why these changes were made"),
    }),
    code: z.string().describe("The full updated React component code. MUST end with render(<Component />); and not use markdown fences."),
    explanation: z.string().describe("A brief, user-friendly summary of the changes for the chat display"),
});

// created ui prompt
const COMPONENT_LIBRARY_PROMPT = `
You are an expert UI Architect specializing in clean, maintainable code following SOLID principles.
You use a fixed component library to build modern web interfaces.

COMPONENTS: Button, Card, CardHeader, CardContent, CardFooter, Input, Table, Navbar, Sidebar, SidebarItem, Modal, Chart.
NAMESPACE: UILibrary

CORE ARCHITECTURE RULES (SOLID):
1. Single Responsibility: Break complex UIs into smaller, focused sub-components. Each component must have one reason to change.
2. Open/Closed: Components should be open for extension (via props/composition) but closed for modification.
3. Liskov Substitution: UI segments must be interchangeable and behave predictably.
4. Interface Segregation: Sub-components should only receive the specific props they need.
5. Dependency Inversion: High-level UI logic should depend on the UILibrary abstractions, not low-level implementation details.

IMPLEMENTATION RULES:
- NO CODE REUSE: Do NOT attempt to patch, merge, or reuse fragments from the provided 'Current Code'. Generate a COMPLETE, FRESH implementation from scratch to ensure a clean architecture.
- IMPORTS: ALWAYS start with:
  import React from 'react';
  import * as UILibrary from '@/components/ui-library';
  import { IconName } from 'lucide-react'; // If icons are needed
- STYLING: Use Tailwind CSS for structural layout and spacing ONLY. Do NOT define custom CSS.
- COMPONENTS: Use the UILibrary namespace (e.g., <UILibrary.Card>). Do NOT create new primitive components.
- FORMATTING: The 'code' field must contain the full source. NEVER use markdown code fences.
- EXECUTION: End the file with exactly one call: render(<MainComponent />);
`;

export async function POST(req: NextRequest) {
    try {
        // rate limitation
        const now = Date.now();
        if (now - lastCallTime < MIN_INTERVAL_MS) {
            return NextResponse.json({
                error: "Rate Limited",
                explanation: "You're making requests too quickly. Please wait a few seconds."
            }, { status: 200 });
        }
        lastCallTime = now;

        // getting req
        const body = await req.json();
        const parseResult = RequestSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json({ error: "Invalid Request", details: parseResult.error.format() }, { status: 400 });
        }

        const { prompt, currentCode, history } = parseResult.data;

        if (askedQuestions.has(prompt)) {
            return NextResponse.json(askedQuestions.get(prompt));
        }

        const safeHistory = history.slice(-4);

        // define model
        const { object } = await generateObject({
            model: google("gemini-2.5-flash"), 
            schema: ResponseSchema,
            temperature: 0,
            prompt: `
            ${COMPONENT_LIBRARY_PROMPT}

            USER REQUEST:
            "${prompt}"

            REFERENCE CONTEXT (Do not reuse this code, use it only to understand the current state and requirements):
            Current Code: 
            ${currentCode || "// Empty screen"}

            History Context:
            ${JSON.stringify(safeHistory)}

            TASK:
            Generate a COMPLETE, FRESH React component from scratch that fulfills the user request. 
            Apply SOLID principles strictly to the new architecture.
            Return a valid JSON object matching the schema.
            `.trim(),
        });

        const responsePayload = {
            plan: {
                title: object.plan.title,
                description: object.plan.reasoning,
                layout: "single",
                reasoning: object.plan.reasoning,
                components: []
            },
            code: object.code,
            explanation: object.explanation
        };

        askedQuestions.set(prompt, responsePayload);

        return NextResponse.json(responsePayload);

    } catch (error: any) {
        console.error("API Error:", error);

        if (error?.status === 429 || error?.message?.toLowerCase().includes("quota")) {
            return NextResponse.json({
                error: "Quota Exceeded",
                explanation: "You've hit the Gemini free-tier limit. Please wait a moment or upgrade your plan."
            }, { status: 200 });
        }

        // handle model if getting error
        if (error?.message?.toLowerCase().includes("not found") || error?.message?.toLowerCase().includes("supported")) {
            return NextResponse.json({
                error: "Model Error",
                explanation: "The selected Gemini model is not available. Please check your API key and model permissions."
            }, { status: 200 });
        }

        return NextResponse.json({
            error: "Generation failed",
            explanation: error?.message || "Unknown error occurred."
        }, { status: 500 });
    }
}
