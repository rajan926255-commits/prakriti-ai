'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Plane, TreePine, Zap } from 'lucide-react';
import Link from 'next/link';
import LivingCity from '@/components/LivingCity';
import { getGrade } from '@/lib/carbonCalculations';

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString('en-IN'));
  
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('prakriti_result') || localStorage.getItem('prakriti_results');
    if (!data) {
      router.push('/calculator');
    } else {
      setResults(JSON.parse(data));
    }
  }, [router]);

  if (!results) return (
    <div className="flex-grow flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const grade = getGrade(results.total);
  const gradeColors: Record<string, string> = {
    'A': 'text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)] border-emerald-500',
    'B': 'text-teal-500 shadow-[0_0_30px_rgba(20,184,166,0.5)] border-teal-500',
    'C': 'text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.5)] border-amber-500',
    'D': 'text-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.5)] border-orange-500',
    'F': 'text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)] border-red-500',
  };

  const bgColors: Record<string, string> = {
    'A': 'bg-emerald-500',
    'B': 'bg-teal-500',
    'C': 'bg-amber-500',
    'D': 'bg-orange-500',
    'F': 'bg-red-500',
  };

  const treesCut = Math.round(results.total / 21);
  const flights = Math.round(results.total / 90);
  const monthsElectricity = Math.round(results.total / (200 * 0.82 * 12));

  return (
    <div className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Your Carbon Mirror</h1>
        <p className="text-muted-foreground">Here is the true impact of your lifestyle choices.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Grade Card */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className={`w-64 h-80 rounded-3xl border-2 flex flex-col items-center justify-center bg-background ${gradeColors[grade]}`}
          >
            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Your Grade</span>
            <span className="text-9xl font-black">{grade}</span>
            <span className="mt-4 text-xl font-bold text-foreground">
              <AnimatedNumber value={results.total} /> kg CO₂e
            </span>
          </motion.div>
        </div>

        {/* Relatable Comparisons */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <TreePine className="w-10 h-10 text-emerald-400 mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1"><AnimatedNumber value={treesCut} /></div>
            <div className="text-sm text-muted-foreground">Trees cut per year</div>
          </div>
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <Plane className="w-10 h-10 text-teal-400 mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1"><AnimatedNumber value={flights} /></div>
            <div className="text-sm text-muted-foreground">Delhi-Mumbai flights</div>
          </div>
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <Zap className="w-10 h-10 text-amber-500 mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1"><AnimatedNumber value={monthsElectricity} /></div>
            <div className="text-sm text-muted-foreground">Months of electricity</div>
          </div>

          {/* Horizontal Comparison Bar */}
          <div className="md:col-span-3 glass-card p-6 mt-2 relative">
            <h3 className="text-sm font-bold text-foreground mb-4">How You Compare</h3>
            <div className="space-y-4 relative">
              {/* Paris Target Dashed Line */}
              <div className="absolute top-0 bottom-0 left-[20%] w-0.5 border-l-2 border-dashed border-emerald-500 z-10 hidden sm:block">
                <div className="absolute -top-6 -translate-x-1/2 text-[10px] font-bold text-emerald-500 whitespace-nowrap">Paris Target (2000 kg)</div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1"><span>You</span><span>{Math.round(results.total)} kg</span></div>
                <div className="w-full bg-muted rounded-full h-2 relative">
                  <motion.div initial={{width:0}} animate={{width: `${Math.min((results.total/10000)*100, 100)}%`}} className={`h-2 rounded-full relative z-0 ${bgColors[grade]}`} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span>India Average</span><span>1,900 kg</span></div>
                <div className="w-full bg-muted rounded-full h-2 relative">
                  <div className="bg-amber-500 h-2 rounded-full w-[19%] relative z-0" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span>Global Average</span><span>4,700 kg</span></div>
                <div className="w-full bg-muted rounded-full h-2 relative">
                  <div className="bg-red-500 h-2 rounded-full w-[47%] relative z-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <LivingCity grade={grade} />
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 pb-12">
        <Link 
          href="/coach"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-background font-bold rounded-full text-lg transition-all emerald-glow hover:scale-105"
        >
          Get AI Reduction Tips
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link 
          href="/community"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-muted hover:bg-card-border text-foreground font-bold rounded-full text-lg transition-all hover:scale-105"
        >
          Join Community Challenge
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
