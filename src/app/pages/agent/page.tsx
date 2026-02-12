"use client";

import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
    useReducer,
    useContext,
    useActionState,
    useDebugValue,
    useDeferredValue,
    useTransition,
    useEffectEvent,
    useImperativeHandle,
    useInsertionEffect,
    useLayoutEffect,
    useId,
    useOptimistic,
    useSyncExternalStore,
} from "react";
import {
    Send,
    Code2,
    Play,
    History,
    RotateCcw,
    CheckCircle2,
    Sparkles,
    ChevronRight,
    ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui-library";
import Editor from "@monaco-editor/react";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import * as UILibrary from "@/components/ui-library";
import { cn } from "@/lib/utils";
import { ChatMessage, UIVersion, AgentResponse } from "@/lib/agent/types";
import { motion, AnimatePresence } from "framer-motion";
import * as Lucide from "lucide-react";
import { INITIAL_CODE } from "@/lib/agent/ui"

// Helper function to remove import statements for react-live
const stripImports = (code: string) => {
    return code
        .replace(/```(?:tsx|jsx|js|ts)?\n?([\s\S]*?)```/g, '$1') // Remove code fences
        .split("\n")
        .filter((line) => !line.trim().startsWith("import "))
        .join("\n")
        .trim();
};

export default function App() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "assistant",
            content:
                "Hello! I'm your UI Architect. Describe your requirements, and I'll engineer a clean-code implementation using strictly enforced SOLID principles and our premium component library.",
            timestamp: Date.now(),
        },
    ]);
    const [input, setInput] = useState("");
    const [code, setCode] = useState(INITIAL_CODE);
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    const [history, setHistory] = useState<UIVersion[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Strip imports for react-live preview
    const previewCode = stripImports(code);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isGenerating) return;

        const userMessage: ChatMessage = {
            role: "user",
            content: input,
            timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsGenerating(true);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: input,
                    currentCode: code,
                    history: history.slice(-5), // Send some context
                }),
            });

            const data: AgentResponse = await response.json();

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.explanation,
                    timestamp: Date.now(),
                    versionId: Date.now().toString(),
                },
            ]);

            if (data.code) {
                const newVersion: UIVersion = {
                    id: Date.now().toString(),
                    code: data.code,
                    plan: data.plan,
                    explanation: data.explanation,
                    timestamp: Date.now(),
                };

                setHistory((prev) => [...prev, newVersion]);
                setCode(data.code);
                setActiveTab("preview");
            } else if ((data as any).error === "Quota Exceeded") {
                // Quota error is handled by the explanation message already being set above
                // We just ensure we don't try to update the preview
            }
        } catch (error) {
            console.error("Error generating UI:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "I encountered an error while generating the UI. Please try again.",
                    timestamp: Date.now(),
                },
            ]);
        } finally {
            setIsGenerating(false);
        }
    };

    const rollback = (version: UIVersion) => {
        setCode(version.code);
        setMessages((prev) => [
            ...prev,
            {
                role: "assistant",
                content: `Rolled back to version from ${new Date(version.timestamp).toLocaleTimeString()}`,
                timestamp: Date.now(),
            },
        ]);
    };

    return (
        <div className="flex h-screen bg-linear-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 overflow-hidden font-sans text-slate-900">
            {/* Left Sidebar: Chat */}
            <motion.div
                initial={false}
                animate={{ width: sidebarOpen ? 400 : 0, opacity: sidebarOpen ? 1 : 0 }}
                className="flex flex-col border-r border-slate-200/60 bg-white/80 backdrop-blur-xl relative z-20 shadow-xl"
            >
                <div className="p-4 border-b border-slate-100/80 flex items-center justify-between bg-linear-to-r from-indigo-50/50 to-purple-50/30">
                    <div className="flex items-center gap-2 font-bold">
                        <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
                        <span className="gradient-text">Agent Chat</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence initial={false}>
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex flex-col max-w-[90%]",
                                    msg.role === "user"
                                        ? "ml-auto items-end"
                                        : "mr-auto items-start",
                                )}
                            >
                                <div
                                    className={cn(
                                        "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md transition-all hover:shadow-lg",
                                        msg.role === "user"
                                            ? "bg-linear-to-r from-indigo-600 to-indigo-700 text-white rounded-br-none"
                                            : "bg-white/90 backdrop-blur-sm text-slate-800 rounded-bl-none border border-slate-200/60",
                                    )}
                                >
                                    {msg.content}
                                </div>
                                <span className="text-[10px] text-slate-400 mt-1 px-1">
                                    {mounted
                                        ? new Date(msg.timestamp).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                        : ""}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isGenerating && (
                        <div className="flex items-center gap-2 text-slate-400 text-xs px-2 italic">
                            <div className="flex gap-1">
                                <span
                                    className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0ms" }}
                                />
                                <span
                                    className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "150ms" }}
                                />
                                <span
                                    className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "300ms" }}
                                />
                            </div>
                            Agent is thinking...
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div className="p-4 border-t border-slate-100/80 bg-linear-to-r from-white/90 to-indigo-50/20 backdrop-blur-sm">
                    <div className="relative group">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" &&
                                !e.shiftKey &&
                                (e.preventDefault(), handleSend())
                            }
                            placeholder="Describe what you want to change..."
                            className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 min-h-[100px] resize-none transition-all pr-12 hover:border-slate-300 shadow-sm"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isGenerating}
                            className="absolute bottom-3 right-3 p-2.5 bg-linear-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/30 active:scale-90 hover:-translate-y-0.5"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Main Content: Tabs for Preview/Code */}
            <div className="flex-1 flex flex-col relative min-w-0">
                {!sidebarOpen && (
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="absolute left-4 top-3 z-30 p-2.5 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl shadow-lg hover:bg-white hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
                    >
                        <ChevronRight className="w-4 h-4 text-indigo-600" />
                    </button>
                )}

                {/* Toolbar */}
                <header className="h-16 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 relative z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div
                            className={`flex bg-linear-to-r from-slate-100 to-indigo-50/50 p-1 rounded-xl border border-slate-200/60 shadow-sm ${sidebarOpen ? "ml-0" : "ml-11"}`}
                        >
                            <button
                                onClick={() => setActiveTab("preview")}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all",
                                    activeTab === "preview"
                                        ? "bg-white text-indigo-600 shadow-md"
                                        : "text-slate-500 hover:text-slate-700 hover:bg-white/50",
                                )}
                            >
                                <Play className="w-3.5 h-3.5" />
                                Preview
                            </button>
                            <button
                                onClick={() => setActiveTab("code")}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all",
                                    activeTab === "code"
                                        ? "bg-white text-indigo-600 shadow-md"
                                        : "text-slate-500 hover:text-slate-700 hover:bg-white/50",
                                )}
                            >
                                <Code2 className="w-3.5 h-3.5" />
                                Code
                            </button>
                        </div>

                        <div className="h-6 w-px bg-slate-200" />

                        <div className="flex items-center gap-1">
                            <History className="w-3.5 h-3.5 text-slate-400 mr-2" />
                            <div className="flex -space-x-1">
                                {history.map((v, i) => (
                                    <button
                                        key={v.id}
                                        onClick={() => rollback(v)}
                                        className="w-7 h-7 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center hover:bg-indigo-50 hover:border-indigo-400 transition-all group relative shadow-sm hover:shadow-md active:scale-90"
                                    >
                                        <span className="text-[10px] font-bold text-slate-600 group-hover:text-indigo-600">
                                            {i + 1}
                                        </span>
                                        <div className="absolute top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl font-semibold">
                                            V{i + 1}: {new Date(v.timestamp).toLocaleTimeString()}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => setCode(INITIAL_CODE)}
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Reset
                        </Button>
                        <Button variant="primary" size="sm" className="gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Publish
                        </Button>
                    </div>
                </header>

                {/* Editor / Preview Area */}
                <div className="flex-1 overflow-hidden relative">
                    {activeTab === "preview" ? (
                        <div className="w-full h-full bg-linear-to-br from-slate-100/50 via-indigo-50/20 to-purple-50/10 overflow-auto p-6 flex flex-col items-center">
                            {previewCode ? (
                                <LiveProvider
                                    code={previewCode}
                                    scope={{
                                        ...UILibrary,
                                        UILibrary,
                                        ...Lucide,
                                        Lucide,
                                        useState,
                                        useEffect,
                                        useRef,
                                        useMemo,
                                        useCallback,
                                        useReducer,
                                        useContext,
                                        useActionState,
                                        useDebugValue,
                                        useDeferredValue,
                                        useTransition,
                                        useEffectEvent,
                                        useImperativeHandle,
                                        useInsertionEffect,
                                        useLayoutEffect,
                                        useId,
                                        useOptimistic,
                                        useSyncExternalStore,
                                        cn,
                                    }}
                                    noInline
                                >
                                    <div className="w-full max-w-[1400px] bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden min-h-[800px] hover:shadow-3xl transition-shadow duration-300">
                                        <LivePreview className="w-full h-full" />
                                    </div>
                                    <LiveError className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-mono border-2 border-red-200 w-full max-w-[1400px] shadow-lg" />
                                </LiveProvider>
                            ) : (
                                <div className="text-slate-500 text-sm">No code to preview</div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col">
                            <Editor
                                height="100%"
                                path="model.tsx"
                                defaultLanguage="typescript"
                                theme="vs-dark"
                                value={code}
                                onChange={(val) => setCode(val || "")}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    padding: { top: 20 },
                                    scrollBeyondLastLine: false,
                                    wordWrap: "on",
                                    formatOnPaste: true,
                                    formatOnType: true,
                                    automaticLayout: true,
                                    tabSize: 2,
                                    insertSpaces: true,
                                    fontFamily:
                                        "'Fira Code', 'Cascadia Code', Consolas, monospace",
                                    fontLigatures: true,
                                }}
                                onMount={(editor, monaco) => {
                                    // Configure TypeScript compiler options for TSX
                                    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
                                        {
                                            target: monaco.languages.typescript.ScriptTarget.Latest,
                                            allowNonTsExtensions: true,
                                            moduleResolution:
                                                monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                                            module: monaco.languages.typescript.ModuleKind.CommonJS,
                                            noEmit: true,
                                            esModuleInterop: true,
                                            jsx: monaco.languages.typescript.JsxEmit.React,
                                            reactNamespace: "React",
                                            allowJs: true,
                                        },
                                    );

                                    // Disable ALL diagnostics to remove error underlines
                                    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
                                        {
                                            noSemanticValidation: true,
                                            noSyntaxValidation: true,
                                            noSuggestionDiagnostics: true,
                                        },
                                    );

                                    // Disable all markers (error/warning underlines)
                                    const model = editor.getModel();
                                    if (model) {
                                        monaco.editor.setModelMarkers(model, "typescript", []);
                                    }

                                    // Auto-format the code on mount
                                    setTimeout(() => {
                                        editor.getAction("editor.action.formatDocument")?.run();
                                        editor.focus();
                                    }, 200);

                                    // Create a debounced auto-formatter
                                    let formatTimeout: any;
                                    editor.onDidChangeModelContent(() => {
                                        clearTimeout(formatTimeout);
                                        formatTimeout = setTimeout(() => {
                                            // Only format if not currently typing/dirtying
                                            editor.getAction("editor.action.formatDocument")?.run();
                                        }, 2000); // 2 second delay after typing stops to auto-format
                                    });
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
