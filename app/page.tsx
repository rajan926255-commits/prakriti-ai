'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plane, Car, Leaf, ArrowRight } from 'lucide-react';
import CitySlider from '@/components/CitySlider';

export default function Home() {
  const [co2Counter, setCo2Counter] = useState(2500000000); // approx 2.5B tons per year starting point

  useEffect(() => {
    // Increment counter rapidly to simulate real-time India emissions
    const interval = setInterval(() => {
      setCo2Counter(prev => prev + Math.floor(Math.random() * 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Background Particles (simple CSS implementation) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-3/4 right-1/4 w-[30rem] h-[30rem] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
        >
          Your Carbon, <span className="text-emerald-400">Your World</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-xl md:text-2xl text-muted-foreground mb-4">
            India emits <span className="text-foreground font-semibold">1.9 tons</span> per person/year vs USA&apos;s 14 tons.
          </div>
          <div className="glass-card px-6 py-4 mb-10 inline-block">
            <span className="text-sm text-muted-foreground uppercase tracking-widest block mb-1">India&apos;s Real-Time Emissions (kg)</span>
            <span className="text-4xl md:text-5xl font-mono font-bold text-amber-500 tabular-nums">
              {co2Counter.toLocaleString('en-IN')}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            href="/calculator" 
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-background font-bold rounded-full text-lg transition-all emerald-glow hover:scale-105"
          >
            Calculate My Footprint
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* Stat Cards */}
      <section className="py-10 px-4 max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-card p-6 flex flex-col items-center text-center hover:bg-muted transition-colors"
          >
            <Plane className="w-12 h-12 text-emerald-400 mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">1 Delhi-Mumbai Flight</h3>
            <p className="text-muted-foreground text-sm">= 4 months of electricity for an average Indian home.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="glass-card p-6 flex flex-col items-center text-center hover:bg-muted transition-colors"
          >
            <Car className="w-12 h-12 text-amber-500 mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">One meat meal per week</h3>
            <p className="text-muted-foreground text-sm">= Driving 3,000 km in a standard petrol car over a year.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="glass-card p-6 flex flex-col items-center text-center hover:bg-muted transition-colors"
          >
            <Leaf className="w-12 h-12 text-emerald-400 mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Small Actions, Huge Impact</h3>
            <p className="text-muted-foreground text-sm">Switching to LED bulbs saves 40kg of CO2 per year.</p>
          </motion.div>
        </div>
      </section>

      {/* City Slider Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full text-center z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Our Choices Shape Tomorrow</h2>
        <CitySlider />
      </section>
    </div>
  );
}
