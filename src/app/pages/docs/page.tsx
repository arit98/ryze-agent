"use client";

import React, { useEffect, useState } from 'react';
import * as UILibrary from "@/components/ui-library";
import {
    Book,
    Code,
    Layout,
    Palette,
    Terminal,
    Type,
    Zap,
    Menu,
    X,
    ChevronRight,
    Search
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UILIBRARY } from '@/lib/agent/docs';
import { UTILCODE } from '@/lib/agent/util';

export default function DocsPage() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState('introduction');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const sections = [
        { id: 'introduction', label: 'Introduction', icon: Book },
        { id: 'getting-started', label: 'Getting Started', icon: Zap },
        { id: 'components', label: 'Components', icon: Layout },
        { id: 'theming', label: 'Theming', icon: Palette },
        { id: 'typography', label: 'Typography', icon: Type },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'introduction':
                return (
                    <div className="space-y-8 animate-soft-in">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Documentation</h1>
                            <p className="text-xl text-slate-500 leading-relaxed">
                                Welcome to the Lumina Design System documentation. This guide will help you build beautiful, consistent, and performant user interfaces using our component library.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <UILibrary.Card className="p-6 hover:border-indigo-200 transition-colors cursor-pointer group" onClick={() => setActiveSection('getting-started')}>
                                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Quick Start</h3>
                                <p className="text-slate-500">Learn how to install and configure the library in your project.</p>
                            </UILibrary.Card>

                            <UILibrary.Card className="p-6 hover:border-rose-200 transition-colors cursor-pointer group" onClick={() => setActiveSection('components')}>
                                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 mb-4 group-hover:scale-110 transition-transform">
                                    <Layout className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Components</h3>
                                <p className="text-slate-500">Explore our collection of pre-built, accessible components.</p>
                            </UILibrary.Card>
                        </div>
                    </div>
                );
            case 'getting-started':
                return (
                    <div className="space-y-8 animate-soft-in">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Getting Started</h1>
                            <p className="text-xl text-slate-500 leading-relaxed">
                                Get up and running with Lumina in less than 5 minutes.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">Manual Installation</h2>
                            <p className="text-slate-500">
                                Currently, Lumina UI is available via manual installation. Copy the code below into a file named <code className="text-sm font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">src/components/ui-library.tsx</code>.
                            </p>

                            <UILibrary.Card className="bg-slate-900 border-slate-800 text-slate-300 overflow-hidden">
                                <div className="flex items-center justify-between px-4 py-3 bg-slate-950/50 border-b border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <Code className="w-4 h-4 text-slate-500" />
                                        <span className="text-xs font-mono text-slate-500">src/components/ui-library.tsx</span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                                    </div>
                                </div>
                                <div className="relative">
                                    <pre className="p-6 font-mono text-xs overflow-x-auto max-h-[500px] text-slate-300">
                                        {UILIBRARY}
                                    </pre>
                                </div>
                            </UILibrary.Card>

                            <p className="text-slate-500">
                                For util library you need to copy the corresponding code <code className="text-sm font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">#/lib/util.ts</code>.
                            </p>
                            <UILibrary.Card className="bg-slate-900 border-slate-800 text-slate-300 overflow-hidden">
                                <div className="flex items-center justify-between px-4 py-3 bg-slate-950/50 border-b border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <Code className="w-4 h-4 text-slate-500" />
                                        <span className="text-xs font-mono text-slate-500">#/lib/util.ts</span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                                    </div>
                                </div>
                                <div className="relative">
                                    <pre className="p-6 font-mono text-xs overflow-x-auto max-h-[500px] text-slate-300">
                                        {UTILCODE}
                                    </pre>
                                </div>
                            </UILibrary.Card>
                        </div>
                    </div>
                );
            case 'components':
                return (
                    <div className="space-y-12 animate-soft-in">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Components</h1>
                            <p className="text-xl text-slate-500 leading-relaxed">
                                Beautifully crafted components ready for your next project.
                            </p>
                        </div>

                        {/* Buttons */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px bg-slate-200 flex-1" />
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Buttons</h2>
                                <div className="h-px bg-slate-200 flex-1" />
                            </div>

                            <UILibrary.Card className="p-8 space-y-8">
                                <div className="flex flex-wrap gap-4 items-center justify-center p-8 bg-slate-50/50 rounded-2xl border border-slate-100">
                                    <UILibrary.Button variant="primary">Primary</UILibrary.Button>
                                    <UILibrary.Button variant="secondary">Secondary</UILibrary.Button>
                                    <UILibrary.Button variant="outline">Outline</UILibrary.Button>
                                    <UILibrary.Button variant="ghost">Ghost</UILibrary.Button>
                                    <UILibrary.Button variant="danger">Danger</UILibrary.Button>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-900">Sizes</h3>
                                    <div className="flex flex-wrap gap-4 items-center justify-center">
                                        <UILibrary.Button size="sm">Small</UILibrary.Button>
                                        <UILibrary.Button size="md">Medium</UILibrary.Button>
                                        <UILibrary.Button size="lg">Large</UILibrary.Button>
                                    </div>
                                </div>
                            </UILibrary.Card>
                        </section>

                        {/* Cards */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px bg-slate-200 flex-1" />
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Cards</h2>
                                <div className="h-px bg-slate-200 flex-1" />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <UILibrary.Card>
                                    <UILibrary.CardHeader title="Simple Card" subtitle="A basic card component with header" />
                                    <UILibrary.CardContent>
                                        <p className="text-slate-600 leading-relaxed">
                                            Cards are used to group related information and actions. They are flexible and can contain any content.
                                        </p>
                                    </UILibrary.CardContent>
                                    <UILibrary.CardFooter>
                                        <UILibrary.Button size="sm" variant="outline">Learn More</UILibrary.Button>
                                    </UILibrary.CardFooter>
                                </UILibrary.Card>
                            </div>
                        </section>

                        {/* Inputs */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px bg-slate-200 flex-1" />
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Inputs</h2>
                                <div className="h-px bg-slate-200 flex-1" />
                            </div>

                            <UILibrary.Card className="p-8 max-w-md mx-auto">
                                <div className="space-y-6">
                                    <UILibrary.Input label="Email Address" placeholder="hello@example.com" />
                                    <UILibrary.Input label="Password" type="password" placeholder="••••••••" />
                                    <UILibrary.Input label="Error State" error="This field is required" placeholder="Invalid input" />
                                </div>
                            </UILibrary.Card>
                        </section>
                    </div>
                );
            case 'theming':
                return (
                    <div className="space-y-8 animate-soft-in">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Theming</h1>
                            <p className="text-xl text-slate-500 leading-relaxed">
                                Customize the look and feel of your application.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <div className="h-20 rounded-2xl bg-indigo-500 shadow-lg shadow-indigo-200" />
                                <p className="text-sm font-bold text-slate-900">Primary</p>
                                <p className="text-xs text-slate-500">Indigo 500</p>
                            </div>
                            <div className="space-y-2">
                                <div className="h-20 rounded-2xl bg-rose-500 shadow-lg shadow-rose-200" />
                                <p className="text-sm font-bold text-slate-900">Danger</p>
                                <p className="text-xs text-slate-500">Rose 500</p>
                            </div>
                            <div className="space-y-2">
                                <div className="h-20 rounded-2xl bg-slate-900 shadow-lg shadow-slate-200" />
                                <p className="text-sm font-bold text-slate-900">Dark</p>
                                <p className="text-xs text-slate-500">Slate 900</p>
                            </div>
                            <div className="space-y-2">
                                <div className="h-20 rounded-2xl bg-slate-50 border border-slate-200" />
                                <p className="text-sm font-bold text-slate-900">Light</p>
                                <p className="text-xs text-slate-500">Slate 50</p>
                            </div>
                        </div>
                    </div>
                );
            case 'typography':
                return (
                    <div className="space-y-8 animate-soft-in">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Typography</h1>
                            <p className="text-xl text-slate-500 leading-relaxed">
                                Our typography system ensures readability and hierarchy.
                            </p>
                        </div>

                        <UILibrary.Card className="p-8 space-y-8">
                            <div className="space-y-4 border-b border-slate-100 pb-8">
                                <h1 className="text-4xl font-black text-slate-900">Heading 1</h1>
                                <h2 className="text-3xl font-bold text-slate-900">Heading 2</h2>
                                <h3 className="text-2xl font-bold text-slate-900">Heading 3</h3>
                                <h4 className="text-xl font-bold text-slate-900">Heading 4</h4>
                            </div>
                            <div className="space-y-4">
                                <p className="text-base text-slate-600 leading-relaxed">
                                    Body text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Small text: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </UILibrary.Card>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 flex">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 left-0 h-screen w-72 bg-white/80 backdrop-blur-2xl border-r border-slate-200/60 z-50 transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="h-20 flex items-center px-8 border-b border-slate-100/50">
                        <div onClick={() => router.push('/')} className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                                <Book className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-lg text-slate-900 tracking-tight">Lumina<span className="text-slate-400 font-medium">Docs</span></span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-1">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => {
                                    setActiveSection(section.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`
                                    w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all group
                                    ${activeSection === section.id
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <section.icon className={`w-5 h-5 ${activeSection === section.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-500'}`} />
                                    {section.label}
                                </div>
                                {activeSection === section.id && (
                                    <ChevronRight className="w-4 h-4 text-indigo-400" />
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-6 border-t border-slate-100/50">
                        <UILibrary.Button
                            variant="primary"
                            className="w-full justify-center"
                            onClick={() => router.push('/')}
                        >
                            Back to App
                        </UILibrary.Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                {/* Mobile Header */}
                <div className="lg:hidden h-20 flex items-center justify-between px-6 border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-30">
                    <span className="font-bold text-slate-900">Documentation</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 lg:py-24">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}