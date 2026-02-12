"use client"
import React, { useState } from 'react';
import * as UILibrary from '@/components/ui-library';
import { Sparkles, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);

    return (
        <UILibrary.Navbar
            logo={
                <div onClick={() => router.push("/")} className="font-bold md:text-2xl text-md tracking-tight text-indigo-600 flex items-center gap-3 cursor-pointer">
                    <div className="md:w-10 md:h-10 w-8 h-8 bg-indigo-600 md:rounded-xl rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <Sparkles className="md:w-6 md:h-6 w-4 h-4" />
                    </div>
                    <span className="tracking-tighter">
                        Lumina<span className="text-slate-900 font-extrabold md:text-3xl text-lg">.AI</span>
                    </span>
                </div>
            }
            actions={
                <>
                    {/* desktop navbar */}
                    <div className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => router.push("/pages/stories")}
                            className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest cursor-pointer">
                            Our Story
                        </button>
                        <UILibrary.Button
                            variant="primary"
                            className="rounded-2xl px-8 shadow-xl shadow-indigo-100 hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => router.push("/pages/agent")}
                        >
                            Start Creating
                        </UILibrary.Button>
                    </div>

                    {/* mob menu */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-colors cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {isOpen && (
                        <div className="absolute top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-white/95 backdrop-blur-3xl border-t border-slate-100 p-8 md:hidden flex flex-col gap-6 animate-soft-in z-50">
                            <button
                                onClick={() => {
                                    router.push("/pages/stories");
                                    setIsOpen(false);
                                }}
                                className="text-lg font-bold text-slate-600 hover:text-indigo-600 py-3 border-b border-slate-100 transition-colors uppercase tracking-widest text-left"
                            >
                                Our Story
                            </button>
                            <UILibrary.Button
                                variant="primary"
                                className="w-full justify-center py-4 text-md shadow-xl shadow-indigo-200 mt-2"
                                onClick={() => {
                                    router.push("/pages/agent");
                                    setIsOpen(false);
                                }}
                            >
                                Start Creating
                            </UILibrary.Button>
                        </div>
                    )}
                </>
            }
        />
    )
}

export default NavBar