'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Zap, Apple, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { calculateTotalCarbon, FuelType, DietType } from '@/lib/carbonCalculations';

const STEPS = [
  { id: 'transport', title: 'Transport', icon: Car },
  { id: 'energy', title: 'Home Energy', icon: Zap },
  { id: 'diet', title: 'Diet', icon: Apple },
  { id: 'shopping', title: 'Shopping', icon: ShoppingBag },
];

const Wizard = React.memo(function Wizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Form State
  const [transport, setTransport] = useState({ kmPerWeek: 50, fuelType: 'petrol' as FuelType, flightsPerYear: 0, publicTransportKmPerWeek: 20 });
  const [energy, setEnergy] = useState({ electricityUnitsPerMonth: 200, lpgCylindersPerMonth: 1, acHoursPerDay: 2 });
  const [diet, setDiet] = useState({ dietType: 'vegetarian' as DietType });
  const [shopping, setShopping] = useState({ itemsPerMonth: 3, isFastFashion: false });

  // Calculate live emissions
  const results = useMemo(() => calculateTotalCarbon(transport, energy, diet, shopping), [transport, energy, diet, shopping]);
  
  // Real-time animated number effect
  const [displayTotal, setDisplayTotal] = useState(results.total);
  useEffect(() => {
    const timer = setTimeout(() => setDisplayTotal(results.total), 150);
    return () => clearTimeout(timer);
  }, [results.total]);

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      // Save to localStorage and redirect to results
      localStorage.setItem('prakriti_results', JSON.stringify(results));
      router.push('/results');
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const currentStep = STEPS[step];
  const maxTotal = 15000; // for the circular progress
  const progressPercent = Math.min((displayTotal / maxTotal) * 100, 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left side: Wizard Form */}
      <div className="lg:col-span-2 glass-card p-6 md:p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className={`flex flex-col items-center transition-opacity ${i <= step ? 'opacity-100' : 'opacity-40'}`}>
                <s.icon className={`w-5 h-5 mb-1 ${i <= step ? 'text-emerald-400' : 'text-foreground'}`} />
                <span className="text-xs hidden sm:block">{s.title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div 
              className="bg-emerald-500 h-2 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[300px]"
          >
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">How do you get around?</h2>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Car distance per week (km)</label>
                  <input type="range" min="0" max="500" value={transport.kmPerWeek} onChange={(e) => setTransport({...transport, kmPerWeek: parseInt(e.target.value)})} className="w-full accent-emerald-500" />
                  <div className="text-right text-emerald-400 font-bold">{transport.kmPerWeek} km</div>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Fuel Type</label>
                  <div className="flex gap-2 flex-wrap">
                    {['petrol', 'diesel', 'cng', 'ev'].map(type => (
                      <button key={type} onClick={() => setTransport({...transport, fuelType: type as FuelType})} aria-pressed={transport.fuelType === type} className={`px-4 py-2 rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${transport.fuelType === type ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' : 'border-card-border text-muted-foreground hover:border-muted-foreground'}`}>
                        {type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Flights per year</label>
                    <input type="number" min="0" value={transport.flightsPerYear} onChange={(e) => setTransport({...transport, flightsPerYear: parseInt(e.target.value) || 0})} className="w-full bg-muted border border-card-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-emerald-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Public Transport (km/week)</label>
                    <input type="number" min="0" value={transport.publicTransportKmPerWeek} onChange={(e) => setTransport({...transport, publicTransportKmPerWeek: parseInt(e.target.value) || 0})} className="w-full bg-muted border border-card-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-emerald-500 transition-colors" />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Home Energy Usage</h2>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Electricity (Units/kWh per month) <span className="text-xs text-amber-500 ml-2">India avg ~200</span></label>
                  <input type="number" min="0" value={energy.electricityUnitsPerMonth} onChange={(e) => setEnergy({...energy, electricityUnitsPerMonth: parseInt(e.target.value) || 0})} className="w-full bg-muted border border-card-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">LPG Cylinders per month</label>
                  <input type="number" min="0" step="0.5" value={energy.lpgCylindersPerMonth} onChange={(e) => setEnergy({...energy, lpgCylindersPerMonth: parseFloat(e.target.value) || 0})} className="w-full bg-muted border border-card-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">AC Usage (Hours per day)</label>
                  <input type="range" min="0" max="24" value={energy.acHoursPerDay} onChange={(e) => setEnergy({...energy, acHoursPerDay: parseInt(e.target.value)})} className="w-full accent-emerald-500" />
                  <div className="text-right text-emerald-400 font-bold">{energy.acHoursPerDay} hours</div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Dietary Habits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { type: 'vegan', label: 'Vegan', desc: 'No animal products' },
                    { type: 'vegetarian', label: 'Vegetarian', desc: 'Dairy, no meat' },
                    { type: 'non-veg-moderate', label: 'Non-Veg (Moderate)', desc: 'Meat 1-3 times/week' },
                    { type: 'non-veg-heavy', label: 'Non-Veg (Heavy)', desc: 'Meat almost daily' }
                  ].map(d => (
                    <button 
                      key={d.type}
                      onClick={() => setDiet({ dietType: d.type as DietType })}
                      aria-pressed={diet.dietType === d.type}
                      className={`text-left p-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${diet.dietType === d.type ? 'border-emerald-500 bg-emerald-500/10' : 'border-card-border hover:border-muted-foreground bg-muted'}`}
                    >
                      <div className={`font-bold ${diet.dietType === d.type ? 'text-emerald-400' : 'text-foreground'}`}>{d.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{d.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Shopping & Lifestyle</h2>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">New clothing/items bought per month</label>
                  <input type="range" min="0" max="20" value={shopping.itemsPerMonth} onChange={(e) => setShopping({...shopping, itemsPerMonth: parseInt(e.target.value)})} className="w-full accent-emerald-500" />
                  <div className="text-right text-emerald-400 font-bold">{shopping.itemsPerMonth} items</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted border border-card-border rounded-xl">
                  <div>
                    <div className="font-bold text-foreground">Fast Fashion</div>
                    <div className="text-xs text-muted-foreground">Do you mostly buy from fast fashion brands?</div>
                  </div>
                  <button 
                    onClick={() => setShopping({...shopping, isFastFashion: !shopping.isFastFashion})}
                    role="switch"
                    aria-checked={shopping.isFastFashion}
                    aria-label="Toggle Fast Fashion"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${shopping.isFastFashion ? 'bg-amber-500' : 'bg-card-border'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-foreground transition-transform ${shopping.isFastFashion ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-card-border">
          <button 
            onClick={handlePrev}
            disabled={step === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${step === 0 ? 'opacity-50 cursor-not-allowed text-muted-foreground' : 'hover:bg-muted text-foreground'}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-background rounded-full font-bold transition-all emerald-glow"
          >
            {step === STEPS.length - 1 ? 'See Results' : 'Next'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right side: Live Meter */}
      <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-bold text-foreground mb-8">Estimated Footprint</h3>
        <div className="relative w-48 h-48 mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-card-border" strokeWidth="8" />
            <motion.circle 
              cx="50" cy="50" r="45" fill="none" stroke="#10B981" strokeWidth="8" strokeLinecap="round"
              strokeDasharray="283"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 - (283 * progressPercent) / 100 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground tabular-nums">{Math.round(displayTotal)}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">kg CO2e/yr</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          India Average: <span className="text-amber-500 font-bold">1,900 kg</span>
        </div>
      </div>
    </div>
  );
});

export default Wizard;
