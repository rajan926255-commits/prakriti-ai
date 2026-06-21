'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ChevronDown, Car, Home, Leaf, ShoppingCart, Zap, Flame, Lightbulb, Train, TreePine, TrendingDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getGrade } from '@/lib/carbonCalculations';

interface CarbonResults {
  total: number;
  breakdown: Record<string, number>;
}

interface CoachTip {
  title: string;
  description: string;
  saving: number;
  icon: string;
}

interface CoachData {
  tips: CoachTip[];
  actionPlan: Record<string, string[]>;
}

const iconMap: Record<string, React.ElementType> = {
  Car, Home, Leaf, ShoppingCart, Zap, Flame, Lightbulb, Train
};

export default function CoachPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<CoachData | null>(null);
  const [results, setResults] = useState<CarbonResults | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoach = async () => {
      setLoading(true);
      setError('');
      try {
        const localData = localStorage.getItem('prakriti_result') || localStorage.getItem('prakriti_results');
        if (!localData) {
          setError('No footprint data found.');
          setLoading(false);
          return;
        }
        const parsed = JSON.parse(localData);
        setResults(parsed);

        const res = await fetch('/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            score: parsed.total,
            breakdown: parsed.breakdown,
          })
        });

        if (!res.ok) throw new Error('Failed to fetch plan from AI Coach');
        const json = await res.json();
        setData(json);
      } catch (e: unknown) {
        // Fallback is handled by API itself, but catch network errors
        if (e instanceof Error) {
          setError(e.message || 'Something went wrong');
        } else {
          setError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCoach();
  }, []);

  if (error === 'No footprint data found.') {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-4 z-10 text-center">
        <Bot className="w-16 h-16 text-emerald-500 mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-4">I need to know your footprint first!</h2>
        <p className="text-muted-foreground mb-8">Complete the calculator so I can generate your personalized plan.</p>
        <Link href="/calculator" className="px-8 py-3 bg-emerald-500 text-background font-bold rounded-full hover:bg-emerald-400 transition-colors">
          Calculate My Footprint
        </Link>
      </div>
    );
  }

  if (error && !results) {
    return <div className="flex-grow flex items-center justify-center p-4 z-10"><div className="glass-card p-6 border-red-500/50 text-red-400">{error}</div></div>;
  }

  const grade = results ? getGrade(results.total) : '';
  const totalKg = results ? Math.round(results.total) : 0;
  
  const totalSavings = data ? data.tips.reduce((acc: number, tip: CoachTip) => acc + tip.saving, 0) : 0;
  const treesPlanted = Math.round(totalSavings / 21);
  const reducedTotal = Math.max(0, totalKg - totalSavings);

  return (
    <div className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full z-10">
      
      {/* Top Header */}
      {results && (
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-4 bg-muted border border-card-border px-6 py-3 rounded-full mb-6 shadow-lg">
            <span className="font-bold text-foreground text-xl">Your footprint: {totalKg.toLocaleString('en-IN')} kg</span>
            <div className="w-1 h-6 bg-card-border rounded"></div>
            <span className="font-bold text-xl flex items-center gap-2">
              Grade <span className={`text-2xl ${grade === 'A' ? 'text-emerald-500' : grade === 'B' ? 'text-teal-500' : grade === 'C' ? 'text-amber-500' : grade === 'D' ? 'text-orange-500' : 'text-red-500'}`}>{grade}</span>
            </span>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">Generating AI Tips...</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="glass-card p-6 h-48 flex flex-col justify-between animate-pulse">
                    <div className="w-10 h-10 bg-muted rounded-full mb-4"></div>
                    <div className="w-3/4 h-6 bg-muted rounded mb-2"></div>
                    <div className="w-full h-16 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : data && (
          <motion.div key="content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            
            {/* MAIN SECTION - AI Tips */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Bot className="w-6 h-6 text-emerald-400" />
                Your AI Action Plan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.tips.map((tip: CoachTip, i: number) => {
                  const IconComponent = iconMap[tip.icon] || Leaf;
                  return (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="glass-card p-6 flex flex-col relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground mb-6 flex-grow">{tip.description}</p>
                      <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full w-max">
                        <TrendingDown className="w-4 h-4" /> Save {tip.saving} kg CO₂e
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* 30-DAY ACTION PLAN */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">30-Day Action Plan</h2>
                <div className="space-y-3">
                  {Object.entries(data.actionPlan).map(([weekKey, actions]: [string, string[]]) => {
                    const weekTitle = weekKey.replace('week', 'Week ');
                    const isOpen = activeAccordion === weekKey;
                    return (
                      <div key={weekKey} className="glass-card overflow-hidden">
                        <button 
                          onClick={() => setActiveAccordion(isOpen ? null : weekKey)} 
                          className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${isOpen ? 'bg-muted/50' : 'hover:bg-muted'}`}
                        >
                          <span className="font-bold text-foreground">{weekTitle}</span>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                              <div className="px-6 pb-5 pt-2 text-foreground border-t border-card-border/50">
                                <ul className="space-y-3 mt-3">
                                  {actions.map((action: string, j: number) => (
                                    <li key={j} className="flex gap-3 text-sm text-muted-foreground">
                                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                      <span>{action}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* POTENTIAL SAVINGS RING */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Potential Impact</h2>
                <div className="glass-card p-8 flex flex-col items-center justify-center h-[calc(100%-3rem)]">
                  <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                    {/* Current Ring */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-32 h-32 rounded-full border-8 border-orange-500/50 flex items-center justify-center relative mb-3">
                        <span className="font-bold text-foreground text-lg">{totalKg}</span>
                        <span className="text-xs text-muted-foreground absolute bottom-6">kg</span>
                      </div>
                      <span className="font-bold text-sm text-foreground">Current</span>
                    </div>

                    <ArrowRight className="w-8 h-8 text-muted-foreground hidden sm:block" />

                    {/* Reduced Ring */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full border-8 border-emerald-500 flex items-center justify-center relative mb-3">
                        <span className="font-bold text-foreground">{reducedTotal}</span>
                        <span className="text-[10px] text-muted-foreground absolute bottom-4">kg</span>
                      </div>
                      <span className="font-bold text-sm text-foreground">Goal</span>
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-4 rounded-xl flex items-center gap-4 text-center w-full justify-center">
                    <TreePine className="w-8 h-8 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold text-emerald-400 text-lg">Save {totalSavings} kg CO₂e</div>
                      <div className="text-sm text-emerald-500/80">= Plant {treesPlanted} Trees</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
