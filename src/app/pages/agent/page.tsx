"use client";

import React, {
    useState,
    useEffect,
    useRef,
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
    Heart,
    MessageSquare,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui-library";
import Editor from "@monaco-editor/react";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import * as UILibrary from "@/components/ui-library";
import { cn } from "@/lib/utils";
import { ChatMessage, UIVersion, AgentResponse } from "@/lib/agent/types";
import { motion, AnimatePresence } from "framer-motion";
import * as Lucide from "lucide-react";
import { INITIAL_CODE } from "@/lib/agent/initcode"
import { useRouter } from "next/navigation";

// remove import 
const stripImports = (code: string) => {
    return code
        .replace(/```(?:tsx|jsx|js|ts)?\n?([\s\S]*?)```/g, '$1')
        .split("\n")
        .filter((line) => !line.trim().startsWith("import "))
        .join("\n")
        .trim();
};

export default function Agent() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "assistant",
            content:
                "Hi there! I'm your creative partner. Think of me as a fellow designer who also happens to be a coding wizard. What are we dreaming up today? Describe your vision, and let's craft something beautiful together.",
            timestamp: Date.now(),
        },
    ]);
    const [input, setInput] = useState("");
    const [code, setCode] = useState(INITIAL_CODE);
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
    const [mounted, setMounted] = useState(false);
    const editorRef = useRef<any>(null);

    const router = useRouter()

    // mob check
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
        };

        // init mob check
        checkMobile();
        if (window.innerWidth < 768) setSidebarOpen(false);

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);
    const [history, setHistory] = useState<UIVersion[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // foe preview
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
                    history: history.slice(-5),
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
            }
        } catch (error) {
            console.error("Error generating UI:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "I'm so sorry, I ran into a bit of a creative block. Could you try describing that again? I want to make sure I get it just right for you.",
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
                content: `Going back to that version we liked from ${new Date(version.timestamp).toLocaleTimeString()}. Let's keep exploring from there!`,
                timestamp: Date.now(),
            },
        ]);
    };

    return (
        <div className="flex h-dvh bg-slate-50 overflow-hidden font-sans text-slate-900 relative">
            {/* chat sect */}
            <AnimatePresence>
                {isMobile && sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30"
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={false}
                animate={{
                    width: sidebarOpen ? (isMobile ? "85%" : 420) : 0,
                    x: isMobile && !sidebarOpen ? -100 : 0,
                    opacity: sidebarOpen ? 1 : 0
                }}
                className={cn(
                    "flex flex-col border-r border-slate-200/60 bg-white/70 backdrop-blur-3xl shadow-2xl transition-all duration-300 ease-in-out overflow-hidden",
                    isMobile ? "fixed inset-y-0 left-0 z-40 h-full" : "relative z-20",
                    !sidebarOpen && "pointer-events-none"
                )}
            >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/50">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="font-black text-xl tracking-tight block leading-tight">Collaboration</span>
                            <span className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">Live with Lumina.AI</span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-xl hover:bg-slate-100"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <AnimatePresence initial={false}>
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className={cn(
                                    "flex flex-col max-w-[85%]",
                                    msg.role === "user"
                                        ? "ml-auto items-end"
                                        : "mr-auto items-start",
                                )}
                            >
                                <div
                                    className={cn(
                                        "px-5 py-4 rounded-2xl text-sm leading-relaxed shadow-xl human-shadow transition-all group relative",
                                        msg.role === "user"
                                            ? "bg-indigo-600 text-white rounded-tr-none hover:bg-indigo-700 font-medium"
                                            : "bg-white text-slate-700 rounded-tl-none border border-slate-100/50 hover:border-indigo-100 font-medium",
                                    )}
                                >
                                    {msg.content}
                                    {msg.role === "assistant" && (
                                        <Heart className="absolute -right-2 -bottom-2 w-4 h-4 text-rose-500 fill-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </div>
                                <span className="text-[10px] text-slate-400 mt-2 px-2 font-bold uppercase tracking-tighter">
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
                        <div className="flex items-center gap-3 text-indigo-500 text-xs px-2 font-bold uppercase tracking-widest italic animate-pulse">
                            <Zap className="w-4 h-4 fill-indigo-500" />
                            Partner is crafting...
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div className="p-6 border-t border-slate-100 bg-white/50">
                    <div className="relative group">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" &&
                                !e.shiftKey &&
                                (e.preventDefault(), handleSend())
                            }
                            placeholder="Tell me your heart's desire..."
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-6 py-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 min-h-[120px] resize-none transition-all pr-14 placeholder:text-slate-400"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isGenerating}
                            className="absolute bottom-4 right-4 p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-200 active:scale-90 hover:-translate-y-1"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* main content */}
            <div className="flex-1 flex flex-col relative min-w-0 bg-slate-100/30">
                {!sidebarOpen && (
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="absolute left-6 top-5 z-30 p-3 bg-white border border-slate-200 rounded-2xl shadow-2xl hover:bg-slate-50 transition-all hover:-translate-y-1 active:scale-95 text-indigo-600 md:ml-0 -ml-4"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                )}

                {/* tools sect */}
                <header className="h-20 border-b border-slate-200/60 bg-white/70 backdrop-blur-2xl flex items-center justify-between px-4 md:px-10 shrink-0 relative z-10">
                    <div className="flex items-center gap-6">
                        <div
                            className={`flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/60 ${sidebarOpen && !isMobile ? "ml-0" : "ml-12 md:ml-14"}`}
                        >
                            <button
                                onClick={() => setActiveTab("preview")}
                                className={cn(
                                    "flex items-center justify-center w-10 h-10 rounded-xl transition-all relative group",
                                    activeTab === "preview"
                                        ? "bg-white text-indigo-600 shadow-xl human-shadow"
                                        : "text-slate-400 hover:text-slate-600 hover:bg-white/50",
                                )}
                            >
                                <Play className="w-4 h-4 fill-current" />
                                <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-2xl font-black uppercase tracking-widest border border-white/10 transition-all scale-95 group-hover:scale-100">
                                    PREVIEW
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab("code")}
                                className={cn(
                                    "flex items-center justify-center w-10 h-10 rounded-xl transition-all relative group",
                                    activeTab === "code"
                                        ? "bg-white text-indigo-600 shadow-xl human-shadow"
                                        : "text-slate-400 hover:text-slate-600 hover:bg-white/50",
                                )}
                            >
                                <Code2 className="w-4 h-4" />
                                <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-2xl font-black uppercase tracking-widest border border-white/10 transition-all scale-95 group-hover:scale-100">
                                    SOURCE
                                </div>
                            </button>
                        </div>

                        <div className="h-6 w-px bg-slate-200 hidden md:block" />

                        <div className="flex items-center gap-2 hidden md:flex">
                            {history.length > 0 && (
                                <History className="w-4 h-4 text-slate-300 mr-2" />
                            )}
                            <div className="flex -space-x-2">
                                {history.map((v, i) => (
                                    <button
                                        key={v.id}
                                        onClick={() => rollback(v)}
                                        className="w-9 h-9 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center hover:bg-indigo-50 hover:border-indigo-600 transition-all group relative shadow-lg hover:shadow-indigo-100 active:scale-90"
                                    >
                                        <span className="text-[10px] font-black text-slate-400 group-hover:text-indigo-600">
                                            {i + 1}
                                        </span>
                                        <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-2xl font-black uppercase tracking-widest border border-white/10 transition-all scale-95 group-hover:scale-100">
                                            V{i + 1}: {new Date(v.timestamp).toLocaleTimeString()}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center md:gap-4 gap-2">
                        <Button
                            variant="outline"
                            size="md"
                            className="rounded-2xl border-slate-200 p-0 w-10 h-10 group relative"
                            onClick={() => editorRef.current?.getAction("editor.action.formatDocument")?.run()}
                        >
                            <Zap className="w-4 h-4" />
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-2xl font-black uppercase tracking-widest border border-white/10 transition-all scale-95 group-hover:scale-100">
                                FORMAT
                            </div>
                        </Button>
                        <Button
                            variant="outline"
                            size="md"
                            className="rounded-2xl border-slate-200 p-0 w-10 h-10 group relative"
                            onClick={() => setCode(INITIAL_CODE)}
                        >
                            <RotateCcw className="w-4 h-4" />
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-2xl font-black uppercase tracking-widest border border-white/10 transition-all scale-95 group-hover:scale-100">
                                RESET
                            </div>
                        </Button>
                        <Button variant="primary" size="md" className="rounded-2xl shadow-xl shadow-indigo-100 p-0 w-10 h-10 group relative">
                            <CheckCircle2 className="w-4 h-4" />
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-2xl font-black uppercase tracking-widest border border-white/10 transition-all scale-95 group-hover:scale-100">
                                SHARE
                            </div>
                        </Button>
                    </div>
                </header>

                {/* tabs implemantation */}
                <div className="flex-1 overflow-hidden relative p-4 md:p-8">
                    {activeTab === "preview" ? (
                        <div className="w-full h-full overflow-auto flex flex-col items-center animate-soft-in">
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
                                        cn,
                                    }}
                                    noInline
                                >
                                    <div className="w-full max-w-[1400px] bg-white rounded-[3rem] shadow-3xl human-shadow border border-white/40 overflow-hidden transition-all duration-700 hover:shadow-indigo-200/50">
                                        <LivePreview className="w-full h-full overflow-auto" />
                                    </div>
                                    <LiveError className="mt-8 p-8 bg-rose-50 text-rose-700 rounded-3xl text-sm font-mono border-2 border-rose-100 w-full max-w-[1400px] shadow-2xl animate-shake" />
                                </LiveProvider>
                            ) : (
                                <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-20">Awaiting your vision...</div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 animate-soft-in">
                            <Editor
                                height="100%"
                                path="model.tsx"
                                defaultLanguage="typescript"
                                theme="vs-dark"
                                value={code}
                                onChange={(val) => setCode(val || "")}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 15,
                                    padding: { top: 30, bottom: 30 },
                                    scrollBeyondLastLine: false,
                                    wordWrap: "on",
                                    formatOnPaste: true,
                                    formatOnType: true,
                                    automaticLayout: true,
                                    tabSize: 2,
                                    insertSpaces: true,
                                    fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                                    fontLigatures: true,
                                    lineNumbers: "on",
                                    cursorSmoothCaretAnimation: "on",
                                    smoothScrolling: true,
                                }}
                                onMount={(editor, monaco) => {
                                    editorRef.current = editor;
                                    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                                        target: monaco.languages.typescript.ScriptTarget.Latest,
                                        allowNonTsExtensions: true,
                                        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                                        module: monaco.languages.typescript.ModuleKind.CommonJS,
                                        noEmit: true,
                                        esModuleInterop: true,
                                        jsx: monaco.languages.typescript.JsxEmit.React,
                                        reactNamespace: "React",
                                        allowJs: true,
                                    });
                                    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                                        noSemanticValidation: true,
                                        noSyntaxValidation: true,
                                        noSuggestionDiagnostics: true,
                                    });

                                    // manual formatting code
                                    setTimeout(() => {
                                        editor.getAction("editor.action.formatDocument")?.run();
                                        editor.focus();
                                    }, 500);

                                    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF, () => {
                                        editor.getAction("editor.action.formatDocument")?.run();
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

