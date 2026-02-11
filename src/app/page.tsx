'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Code2,
  Play,
  History,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Layout,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Button, Card, CardHeader, CardContent } from '@/components/ui-library';
import Editor from '@monaco-editor/react';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import * as UILibrary from '@/components/ui-library';
import { cn } from '@/lib/utils';
import { ChatMessage, UIVersion, AgentResponse } from '@/lib/agent/types';
import { motion, AnimatePresence } from 'framer-motion';

// Sample data for the initial state
const INITIAL_CODE = `
const Dashboard = () => {
  const chartData = [
    { label: 'Jan', value: 400 },
    { label: 'Feb', value: 300 },
    { label: 'Mar', value: 600 },
    { label: 'Apr', value: 800 },
    { label: 'May', value: 500 },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <UILibrary.Navbar 
        logo={<div className="font-bold text-xl text-indigo-600">Ryze<span className="text-slate-900">AI</span></div>}
        actions={<UILibrary.Button variant="primary">Get Started</UILibrary.Button>}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UILibrary.Card>
          <UILibrary.CardHeader title="Total Users" subtitle="Active in past 30 days" />
          <UILibrary.CardContent>
            <div className="text-3xl font-bold">1,234</div>
            <div className="text-xs text-green-600 mt-1">↑ 12% from last month</div>
          </UILibrary.CardContent>
        </UILibrary.Card>
        
        <UILibrary.Card>
          <UILibrary.CardHeader title="Revenue" subtitle="Monthly Recurring" />
          <UILibrary.CardContent>
            <div className="text-3xl font-bold">$12,450</div>
            <div className="text-xs text-green-600 mt-1">↑ 8% from last month</div>
          </UILibrary.CardContent>
        </UILibrary.Card>
        
        <UILibrary.Card>
          <UILibrary.CardHeader title="Active Sessions" subtitle="Currently online" />
          <UILibrary.CardContent>
            <div className="text-3xl font-bold">89</div>
            <div className="text-xs text-slate-500 mt-1">Stable</div>
          </UILibrary.CardContent>
        </UILibrary.Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UILibrary.Chart data={chartData} title="Growth Overview" />
        <UILibrary.Card>
          <UILibrary.CardHeader title="Quick Actions" />
          <UILibrary.CardContent className="space-y-4">
            <UILibrary.Input label="Search Records" placeholder="Enter keyword..." />
            <div className="flex gap-2">
              <UILibrary.Button variant="outline" className="flex-1">Export PDF</UILibrary.Button>
              <UILibrary.Button variant="primary" className="flex-1">New Entry</UILibrary.Button>
            </div>
          </UILibrary.CardContent>
        </UILibrary.Card>
      </div>
    </div>
  );
};

render(<Dashboard />);
`;

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hello! I'm your deterministic UI agent. Describe the UI you want to build, and I'll generate it using our fixed component library.", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [code, setCode] = useState(INITIAL_CODE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [history, setHistory] = useState<UIVersion[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: input,
          currentCode: code,
          history: history.slice(-5) // Send some context
        }),
      });

      const data: AgentResponse = await response.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.explanation,
        timestamp: Date.now(),
        versionId: Date.now().toString()
      }]);

      const newVersion: UIVersion = {
        id: Date.now().toString(),
        code: data.code,
        plan: data.plan,
        explanation: data.explanation,
        timestamp: Date.now()
      };

      setHistory(prev => [...prev, newVersion]);
      setCode(data.code);
      setActiveTab('preview');
    } catch (error) {
      console.error('Error generating UI:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I encountered an error while generating the UI. Please try again.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const rollback = (version: UIVersion) => {
    setCode(version.code);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `Rolled back to version from ${new Date(version.timestamp).toLocaleTimeString()}`,
      timestamp: Date.now()
    }]);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Left Sidebar: Chat */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 400 : 0, opacity: sidebarOpen ? 1 : 0 }}
        className="flex flex-col border-r border-slate-200 bg-white relative z-20"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2 font-semibold">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>Agent Chat</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
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
                  msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div className={cn(
                  "px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.role === 'user'
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200"
                )}>
                  {msg.content}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          {isGenerating && (
            <div className="flex items-center gap-2 text-slate-400 text-xs px-2 italic">
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              Agent is thinking...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Describe what you want to change..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-h-[100px] resize-none transition-all pr-12"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isGenerating}
              className="absolute bottom-3 right-3 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md active:scale-90"
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
            className="absolute left-4 top-4 z-30 p-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Toolbar */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setActiveTab('preview')}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-md transition-all",
                  activeTab === 'preview' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Play className="w-3.5 h-3.5" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-md transition-all",
                  activeTab === 'code' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
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
                    className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center hover:bg-indigo-50 transition-colors group relative"
                  >
                    <span className="text-[10px] text-slate-600 group-hover:text-indigo-600">{i + 1}</span>
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                      V{i + 1}: {new Date(v.timestamp).toLocaleTimeString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setCode(INITIAL_CODE)}>
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </Button>
            <Button variant="primary" size="sm" className="bg-green-600 hover:bg-green-700 border-green-700 gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Publish
            </Button>
          </div>
        </header>

        {/* Editor / Preview Area */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'preview' ? (
            <div className="w-full h-full bg-slate-100/50 overflow-auto p-4 flex flex-col items-center">
              <LiveProvider code={code} scope={{ ...UILibrary, React, cn }} noInline>
                <div className="w-full max-w-[1400px] bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden min-h-[800px]">
                  <LivePreview className="w-full h-full" />
                </div>
                <LiveError className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-mono border border-red-100 w-full max-w-[1400px]" />
              </LiveProvider>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col">
              <Editor
                height="100%"
                defaultLanguage="typescript"
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  padding: { top: 20 },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on'
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
