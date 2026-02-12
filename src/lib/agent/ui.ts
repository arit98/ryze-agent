export const INITIAL_CODE = `
import React from 'react';
import * as UILibrary from '@/components/ui-library';
import { Sparkles, Zap, Shield, Rocket, ChevronRight, Globe, Cpu } from 'lucide-react';

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      {/* Navigation */}
      <UILibrary.Navbar 
        logo={
          <div className="font-bold text-2xl tracking-tight text-indigo-600 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <span>Ryze<span className="text-slate-900 font-extrabold">Agent</span></span>
          </div>
        }
        actions={
          <div className="flex items-center gap-4">
            <button className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Documentation</button>
            <UILibrary.Button variant="primary" className="rounded-full px-6 shadow-md shadow-indigo-200">
              Start Creating
            </UILibrary.Button>
          </div>
        }
      />

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-8 mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold border border-indigo-100 animate-fade-in">
            <Zap className="w-4 h-4" />
            <span>v1.0 Release is Live</span>
          </div>
          
          <h1 className="text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-[1.1]">
            Build Production interfaces with <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x">Agentic Intelligence</span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
            RyzeAgent combines the power of LLMs with a rigid, high-performance component library to help you ship feature-complete UIs in seconds.
          </p>

          <div className="flex items-center gap-6 pt-4">
            <UILibrary.Button variant="primary" className="px-10 py-7 text-lg rounded-2xl shadow-xl shadow-indigo-100 flex items-center gap-2 hover:scale-[1.02] transition-transform">
              Launch Agent <ChevronRight className="w-5 h-5" />
            </UILibrary.Button>
            <UILibrary.Button variant="outline" className="px-10 py-7 text-lg rounded-2xl bg-white flex items-center gap-2 hover:bg-slate-50 transition-colors">
              Explore Library
            </UILibrary.Button>
          </div>
        </div>

        {/* Feature Highlights (SRP: Focused sub-section) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <FeatureCard 
            icon={<Cpu className="w-6 h-6" />}
            title="Deterministic Logic"
            description="Our agent follows strict SOLID principles to ensure code generated is maintainable and bug-free."
            color="bg-blue-50 text-blue-600"
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6" />}
            title="Enterprise Ready"
            description="Every component is pre-audited for security, accessibility, and high-performance rendering."
            color="bg-indigo-50 text-indigo-600"
          />
          <FeatureCard 
            icon={<Globe className="w-6 h-6" />}
            title="Global Scale"
            description="Deploy your generated UIs to any cloud provider with optimized assets and zero-config caching."
            color="bg-purple-50 text-purple-600"
          />
        </div>

        {/* Action Showcase (SRP: Interaction segment) */}
        <UILibrary.Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-16 space-y-8 bg-linear-to-br from-indigo-900 to-slate-900 text-white flex flex-col justify-center">
              <h2 className="text-4xl font-bold leading-tight">Ready to ship <br/> your next idea?</h2>
              <p className="text-indigo-100 text-lg leading-relaxed">
                Join the thousands of developers who have swapped manual coding for agentic design. Describe it, and we'll build it.
              </p>
              <div className="space-y-4 max-w-md">
                <UILibrary.Input 
                  label="Join the waitlist" 
                  placeholder="name@company.com" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14"
                />
                <UILibrary.Button variant="primary" className="w-full h-14 text-lg bg-indigo-500 hover:bg-indigo-400 border-none shadow-lg">
                  Submit Waitlist
                </UILibrary.Button>
              </div>
            </div>
            <div className="p-16 flex items-center justify-center bg-slate-50/50">
              <div className="w-full space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900">Platform Growth</h3>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+24% WoW</span>
                </div>
                <UILibrary.Chart 
                  title="Daily Active Generators"
                  data={[
                    { label: 'Mon', value: 450 },
                    { label: 'Tue', value: 520 },
                    { label: 'Wed', value: 610 },
                    { label: 'Thu', value: 590 },
                    { label: 'Fri', value: 840 },
                    { label: 'Sat', value: 720 },
                    { label: 'Sun', value: 950 },
                  ]}
                />
              </div>
            </div>
          </div>
        </UILibrary.Card>

        <footer className="mt-40 text-center border-t border-slate-200 pt-16">
          <p className="text-slate-400 text-sm">© 2026 RyzeAgent Intelligence Inc. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

// Helper Sub-component (SRP Example)
const FeatureCard = ({ icon, title, description, color }) => (
  <UILibrary.Card className="border-none shadow-xl bg-white hover:-translate-y-2 transition-all duration-300 rounded-2xl group">
    <UILibrary.CardContent className="p-10 space-y-6">
      <div className={"w-14 h-14 " + color + " rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300"}>
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-lg">{description}</p>
      </div>
    </UILibrary.CardContent>
  </UILibrary.Card>
);

render(<WelcomePage />);
`;