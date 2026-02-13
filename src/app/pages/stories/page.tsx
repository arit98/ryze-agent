"use client";

import React from 'react';
import * as UILibrary from "@/components/ui-library";
import {
    Sparkles,
    Rocket,
    Target,
    Heart,
    ArrowLeft,
    Users,
    Lightbulb,
    Globe,
    Zap,
    Cpu
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OurStoryPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
            {/* navbar */}
            <nav className="h-20 border-b border-slate-100/50 bg-white/70 backdrop-blur-xl sticky top-0 z-50 px-8 flex items-center justify-between">
                <div onClick={() => router.push('/')} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-indigo-600 text-xl font-bold">
                        Lumina<span className="text-slate-900 font-extrabold text-2xl">.AI</span>
                    </span>
                </div>
                <UILibrary.Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/')}
                    className="rounded-xl flex items-center gap-2 cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </UILibrary.Button>
            </nav>

            <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-24">
                {/* hero sect */}
                <header className="text-center mb-20 md:mb-32 animate-soft-in">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-8">
                        <Heart className="w-3 h-3 fill-indigo-600" />
                        <span>Our Origin Story</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[0.95]">
                        Crafting the <span className="gradient-text">Future</span> of Creation.
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
                        Lumina was born from a simple belief: that technology should feel like an extension of human empathy, not a replacement for it.
                    </p>
                </header>

                <div className="space-y-20 md:space-y-32">
                    {/* sect 1 */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center animate-soft-in">
                        <div className="space-y-8">
                            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 shadow-xl shadow-rose-100">
                                <Lightbulb className="w-8 h-8" />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">The Digital Spark</h2>
                            <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                It all began with a frustration shared by designers and developers alike: the wall between imagination and implementation.
                                What started as a late-night brainstorm in a small apartment soon evolved into a mission to redefine how we interact with machines.
                            </p>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-linear-to-tr from-indigo-500 to-rose-500 rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
                            <UILibrary.Card className="aspect-square flex items-center justify-center bg-white/80 border-none relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#f5f3ff,transparent)]" />
                                <Rocket className="w-32 h-32 text-indigo-600 animate-float" />
                            </UILibrary.Card>
                        </div>
                    </section>

                    {/* sect 2 */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center animate-soft-in">
                        <div className="order-2 lg:order-1 relative group">
                            <div className="absolute -inset-4 bg-linear-to-bl from-purple-500 to-cyan-500 rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
                            <UILibrary.Card className="aspect-square flex items-center justify-center bg-white/80 border-none relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#fdf2f8,transparent)]" />
                                <Users className="w-32 h-32 text-rose-500 animate-float" style={{ animationDelay: '1s' }} />
                            </UILibrary.Card>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-100">
                                <Target className="w-8 h-8" />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Built with Empathy</h2>
                            <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                As Lumina grew, our family expanded to include minds from every corner of the globe.
                                Each perspective helped us understand that code isn't just logic—it's the foundation of human connection in a digital age.
                            </p>
                        </div>
                    </section>

                    {/* sect 3 */}
                    <section className="text-center py-20 animate-soft-in">
                        <div className="max-w-4xl mx-auto space-y-12">
                            <div className="flex justify-center">
                                <Sparkles className="w-12 h-12 text-indigo-600 opacity-20" />
                            </div>
                            <blockquote className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                "To empower every individual through <span className="text-indigo-600">seamless design</span> and purposeful <span className="gradient-text">intelligence</span>."
                            </blockquote>
                            <div className="flex items-center justify-center gap-4 pt-4">
                                <div className="w-12 h-[2px] bg-slate-200" />
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Our Core Mission</p>
                                <div className="w-12 h-[2px] bg-slate-200" />
                            </div>
                        </div>
                    </section>

                    {/* sect 5 */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center animate-soft-in">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-linear-to-tr from-amber-500 to-orange-500 rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
                            <UILibrary.Card className="aspect-square flex items-center justify-center bg-white/80 border-none relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#fffbeb,transparent)]" />
                                <Cpu className="w-32 h-32 text-amber-500 animate-pulse" />
                            </UILibrary.Card>
                        </div>
                        <div className="space-y-8">
                            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shadow-xl shadow-amber-100">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">LuminoJS: The Quantum Leap</h2>
                            <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                We aren't just building apps; we're rebuilding the foundation. <a target="_blank" rel="noopener noreferrer" href='https://github.com/arit98/project-lumino' className="text-indigo-600 font-bold cursor-pointer hover:underline">LuminoJS</a> is our vision for a web without limits.
                            </p>
                            <p className="text-lg text-slate-500 leading-relaxed font-medium">
                                Envisioned as the definitive competitor to React, LuminoJS strips away the virtual DOM to deliver bare-metal performance with an API so intuitive it feels like magic. It is the engine designed to power the impossible.
                            </p>
                        </div>
                    </section>

                    {/* sect 6 */}
                    <section className="animate-soft-in">
                        <UILibrary.Card className="bg-indigo-950 p-8 md:p-24 text-white border-none shadow-3xl rounded-[3rem] md:rounded-[4rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -mr-48 -mt-48" />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] -ml-48 -mb-48" />

                            <div className="relative z-10 max-w-3xl space-y-8">
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-indigo-300">
                                    <Globe className="w-8 h-8" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tight">The journey has just begun.</h2>
                                <p className="text-xl md:text-2xl text-indigo-100/70 font-medium leading-relaxed">
                                    We are building a future where every dreamer has the tools to be a creator.
                                    A world where technology serves as a bridge, not a barrier. Join us as we write the next chapters.
                                </p>
                                <div className="pt-8">
                                    <UILibrary.Button
                                        variant="primary"
                                        className="bg-white text-indigo-950 hover:bg-indigo-50 px-10 py-6 rounded-2xl text-lg font-bold shadow-none cursor-pointer w-full md:w-auto justify-center"
                                        onClick={() => router.push('/pages/agent')}
                                    >
                                        Start Creating with Us
                                    </UILibrary.Button>
                                </div>
                            </div>
                        </UILibrary.Card>
                    </section>
                </div>

                <footer className="mt-40 text-center border-t border-slate-200 pt-20">
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                        © {new Date().getFullYear()} Lumina Intelligence Inc.
                    </p>
                </footer>
            </div >
        </main >
    );
}
