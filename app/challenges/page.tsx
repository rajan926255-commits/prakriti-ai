'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Medal, Share2, Droplets, Plug, Recycle, Leaf, Check } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const INITIAL_CHALLENGES = [
  { id: 1, title: 'Meatless Monday', desc: 'Skip meat for all meals today.', points: 50, icon: Leaf, completed: false },
  { id: 2, title: 'Unplug Devices', desc: 'Unplug 3 devices when not in use.', points: 20, icon: Plug, completed: false },
  { id: 3, title: 'Cold Wash', desc: 'Wash your clothes in cold water.', points: 30, icon: Droplets, completed: false },
  { id: 4, title: 'Zero Waste Day', desc: 'Avoid single-use plastics all day.', points: 40, icon: Recycle, completed: false },
];

const POINTS_DATA = [
  { name: 'Week 1', points: 350 },
  { name: 'Week 2', points: 420 },
  { name: 'Week 3', points: 280 },
  { name: 'Week 4', points: 510 },
];

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
  const [streak] = useState(4);
  const [totalPoints, setTotalPoints] = useState(1560);

  const toggleChallenge = (id: number) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === id) {
        if (!c.completed) setTotalPoints(p => p + c.points);
        else setTotalPoints(p => p - c.points);
        return { ...c, completed: !c.completed };
      }
      return c;
    }));
  };

  const handleShare = () => {
    const text = `I'm on a ${streak}-day Eco Streak on PRAKRITI AI! 🌍 Join me in taking daily actions to reduce carbon footprints. #PrakritiAI #ClimateAction`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Daily Challenges</h1>
          <p className="text-muted-foreground">Turn micro-actions into macro-impact.</p>
        </div>

        <div className="flex gap-4">
          <div className="glass-card px-6 py-3 flex items-center gap-3">
            <Flame className={`w-6 h-6 ${streak > 0 ? 'text-orange-500 animate-pulse' : 'text-muted-foreground'}`} />
            <div>
              <div className="text-xs text-muted-foreground uppercase font-bold">Streak</div>
              <div className="font-bold text-foreground">{streak} Days</div>
            </div>
          </div>
          <div className="glass-card px-6 py-3 flex items-center gap-3">
            <Medal className="w-6 h-6 text-amber-500" />
            <div>
              <div className="text-xs text-muted-foreground uppercase font-bold">Points</div>
              <div className="font-bold text-foreground">{totalPoints}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-4">
          {challenges.map((c, i) => (
            <motion.div 
              key={c.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-5 flex items-center gap-4 transition-all cursor-pointer ${c.completed ? 'border-emerald-500/50 bg-emerald-500/5' : 'hover:bg-muted'}`}
              onClick={() => toggleChallenge(c.id)}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${c.completed ? 'bg-emerald-500 text-background' : 'bg-muted text-emerald-400'}`}>
                {c.completed ? <Check className="w-6 h-6" /> : <c.icon className="w-6 h-6" />}
              </div>
              <div className="flex-grow">
                <h3 className={`font-bold transition-colors ${c.completed ? 'text-emerald-400' : 'text-foreground'}`}>{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
              <div className="text-amber-500 font-bold">+{c.points}</div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">Monthly Progress</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={POINTS_DATA}>
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#050D08', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="points" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-6 text-center">
            <Medal className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h3 className="font-bold text-foreground mb-2">Share Your Impact</h3>
            <p className="text-sm text-muted-foreground mb-6">Inspire your network by sharing your eco-streak.</p>
            <button 
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-muted hover:bg-card-border text-foreground rounded-xl font-bold transition-colors"
            >
              <Share2 className="w-5 h-5" /> Share on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
