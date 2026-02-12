"use client"
import React from 'react';
import * as UILibrary from '@/components/ui-library';
import { Sparkles } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const NavBar = () => {
    const router = useRouter()
    return (
        <UILibrary.Navbar
            logo={
                <div onClick={() => router.push("/")} className="font-bold text-2xl tracking-tight text-indigo-600 flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="tracking-tighter">
                        Lumina<span className="text-slate-900 font-extrabold text-3xl">.AI</span>
                    </span>
                </div>
            }
            actions={
                <div className="flex items-center gap-6">
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
            }
        />
    )
}

export default NavBar