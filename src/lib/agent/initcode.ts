export const INITIAL_CODE = `import React from 'react';
import * as UILibrary from '@/components/ui-library';
import { Sparkles, Heart, Smile, Users, ChevronRight, Globe, Cpu, ArrowRight } from 'lucide-react';

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 overflow-y-auto">
      {/* Navigation */}
      <UILibrary.Navbar 
        logo={
          <div className="font-bold text-2xl tracking-tight text-indigo-600 flex items-center gap-3">
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
            <button className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">
              Our Story
            </button>
            <UILibrary.Button variant="primary" className="rounded-2xl px-8 shadow-xl shadow-indigo-100">
              Start Creating
            </UILibrary.Button>
          </div>
        }
      />

      <main className="max-w-7xl mx-auto px-8 pt-24 pb-40">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-10 mb-40 animate-soft-in">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100 uppercase tracking-widest animate-pulse">
            <Heart className="w-3.5 h-3.5 fill-rose-600" />
            <span>Now open to everyone ✨</span>
          </div>
          
          <h1 className="text-8xl font-black tracking-tight text-slate-900 max-w-5xl leading-[0.95]">
            Design with <span className="text-indigo-600">empathy</span>, build with <span className="gradient-text">intelligence</span>.
          </h1>
          
          <p className="text-2xl text-slate-500 max-w-3xl leading-relaxed font-medium">
            Lumina is your creative partner. We bridge the gap between human imagination and high-performance code, helping you craft experiences that people truly love.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 pt-6">
            <UILibrary.Button variant="primary" size="lg" className="px-12 py-8 text-xl rounded-3xl shadow-2xl shadow-indigo-200 flex items-center gap-3 group">
              Start Your Journey <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </UILibrary.Button>
            <UILibrary.Button variant="outline" size="lg" className="px-12 py-8 text-xl rounded-3xl bg-white/50 backdrop-blur-sm flex items-center gap-2 shadow-xl human-shadow">
              Watch the Story
            </UILibrary.Button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40">
          <FeatureCard 
            icon={<Smile className="w-8 h-8" />}
            title="Human-Centric Logic"
            description="Our agent understands your goals, not just your commands. It follows SOLID principles with a human touch."
            color="bg-rose-50 text-rose-600 shadow-rose-100"
          />
          <FeatureCard 
            icon={<Users className="w-8 h-8" />}
            title="Built for People"
            description="Every component is pre-audited for accessibility and empathy, ensuring your UI welcomes everyone."
            color="bg-indigo-50 text-indigo-600 shadow-indigo-100"
          />
          <FeatureCard 
            icon={<Globe className="w-8 h-8" />}
            title="Connect Globally"
            description="Deploy your vision instantly to the world. We handle the complexity so you can focus on connection."
            color="bg-purple-50 text-purple-600 shadow-purple-100"
          />
        </div>

        {/* Action Showcase */}
        <UILibrary.Card className="border-none shadow-3xl rounded-[3rem] overflow-hidden bg-white min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            <div className="p-20 space-y-10 bg-linear-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white flex flex-col justify-center">
              <h2 className="text-5xl font-black leading-[1.1] tracking-tight">Ready to bring <br/> your idea to life?</h2>
              <p className="text-indigo-100/80 text-xl leading-relaxed font-medium">
                Join the community of creators who are swapping lines of code for meaningful design. Describe your vision, and let's craft it together.
              </p>
              <div className="space-y-6 max-w-md pt-4">
                <UILibrary.Input 
                  label="Join the community" 
                  placeholder="Your email address" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-16 rounded-3xl px-6"
                />
                <UILibrary.Button variant="primary" className="w-full h-16 text-xl bg-indigo-500 hover:bg-indigo-400 border-none shadow-2xl shadow-indigo-900/40 rounded-3xl font-bold">
                  Believe in the future
                </UILibrary.Button>
              </div>
            </div>
            <div className="p-20 flex flex-col justify-center bg-slate-50/30 backdrop-blur-sm min-w-0">
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Crafting Happiness</h3>
                  </div>
                  <p className="text-slate-500 text-lg font-medium leading-relaxed">
                    Our agent doesn't just generate code; it crafts emotional experiences.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 rounded-3xl bg-white shadow-xl human-shadow space-y-2">
                    <div className="text-4xl font-black text-indigo-600">98%</div>
                    <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Customer Love</div>
                  </div>
                  <div className="p-8 rounded-3xl bg-white shadow-xl human-shadow space-y-2">
                    <div className="text-4xl font-black text-rose-500">12k</div>
                    <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Hearts Captured</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UILibrary.Card>

        <footer className="mt-40 text-center border-t border-slate-200 pt-20">
          <p className="text-slate-400 text-sm font-medium">Crafted with ❤️ by Lumina Intelligence Inc.</p>
        </footer>
      </main>
    </div>
  );
};

// Helper Sub-component
const FeatureCard = ({ icon, title, description, color }) => (
  <UILibrary.Card className="border-none shadow-2xl bg-white/80 hover:-translate-y-3 transition-all duration-500 rounded-[2.5rem] group hover:bg-white hover:shadow-indigo-100">
    <UILibrary.CardContent className="p-12 space-y-8">
      <div className={"w-20 h-20 " + color + " rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500"}>
        {icon}
      </div>
      <div className="space-y-4">
        <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-xl font-medium">{description}</p>
      </div>
    </UILibrary.CardContent>
  </UILibrary.Card>
);

render(<WelcomePage />);
`;
