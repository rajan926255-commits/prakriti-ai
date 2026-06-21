'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Share2, Crown } from 'lucide-react';

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Aarav M.', college: 'IIT Delhi', score: 1200, grade: 'A' },
  { rank: 2, name: 'You', college: 'IIT Delhi', score: 1800, grade: 'B' },
  { rank: 3, name: 'Priya K.', college: 'IIT Delhi', score: 2100, grade: 'B' },
  { rank: 4, name: 'Rohan S.', college: 'IIT Delhi', score: 3200, grade: 'C' },
  { rank: 5, name: 'Neha V.', college: 'IIT Delhi', score: 4500, grade: 'D' },
];

export default function CommunityPage() {
  const [group, setGroup] = useState('IIT Delhi');
  const [inputVal, setInputVal] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setGroup(inputVal);
      setInputVal('');
    }
  };

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'B': return 'bg-teal-500/20 text-teal-400 border-teal-500/50';
      case 'C': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'D': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      default: return 'bg-red-500/20 text-red-400 border-red-500/50';
    }
  };

  return (
    <div className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Carbon Battle</h1>
        <p className="text-muted-foreground">Compete with your friends, college, or city.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Col: Join & Impact */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2"><Users className="text-emerald-400 w-5 h-5" /> Join a Room</h2>
            <form onSubmit={handleJoin} className="flex gap-2">
              <input 
                type="text" 
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                placeholder="College or City..." 
                className="w-full bg-muted border border-card-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button type="submit" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-background font-bold rounded-lg transition-colors">
                Join
              </button>
            </form>
          </div>

          <div className="glass-card p-6 text-center border-emerald-500/30 border-2">
            <h2 className="text-lg font-bold text-foreground mb-6">Collective Impact: {group}</h2>
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400 mb-1">12.5</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Tons Saved</div>
              </div>
              <div className="text-muted-foreground">=</div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400 mb-1">590</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Trees</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic">&quot;Our group saved 12.5 tons this month!&quot;</p>
          </div>

          <button className="w-full glass-card p-4 flex items-center justify-center gap-2 hover:bg-muted transition-colors text-foreground font-bold">
            <Share2 className="w-5 h-5" /> Invite Friends
          </button>
        </div>

        {/* Right Col: Leaderboard */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2"><Trophy className="text-amber-500 w-6 h-6" /> Leaderboard - {group}</h2>
          </div>

          {/* Podium for top 3 */}
          <div className="flex justify-center items-end h-40 mb-8 gap-4 px-4">
            {[MOCK_LEADERBOARD[1], MOCK_LEADERBOARD[0], MOCK_LEADERBOARD[2]].map((user, i) => {
              const height = i === 1 ? 'h-32' : i === 0 ? 'h-24' : 'h-20';
              const rank = i === 1 ? 1 : i === 0 ? 2 : 3;
              const color = rank === 1 ? 'bg-amber-500' : rank === 2 ? 'bg-gray-300' : 'bg-orange-400';
              return (
                <motion.div key={user.name} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.2 }} className="flex flex-col items-center w-1/3 max-w-[100px]">
                  {rank === 1 && <Crown className="w-6 h-6 text-amber-500 mb-2" />}
                  <div className="w-12 h-12 rounded-full bg-card-border flex items-center justify-center font-bold text-foreground mb-2">{user.name.substring(0, 2).toUpperCase()}</div>
                  <div className={`${height} w-full ${color} rounded-t-lg flex items-start justify-center pt-2 font-bold text-background shadow-lg`}>
                    #{rank}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-card-border text-muted-foreground text-sm uppercase tracking-widest">
                  <th className="pb-3 font-medium">Rank</th>
                  <th className="pb-3 font-medium">Player</th>
                  <th className="pb-3 font-medium">Score (kg)</th>
                  <th className="pb-3 font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_LEADERBOARD.map((user, i) => (
                  <motion.tr 
                    key={user.name} 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (i * 0.1) }}
                    className={`border-b border-card-border last:border-0 ${user.name === 'You' ? 'bg-muted' : ''}`}
                  >
                    <td className="py-4 font-bold text-muted-foreground">#{user.rank}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-card-border flex items-center justify-center text-xs font-bold text-foreground shrink-0">
                          {user.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className={`font-bold ${user.name === 'You' ? 'text-emerald-400' : 'text-foreground'}`}>{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.college}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-mono font-medium text-foreground">{user.score}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded border text-xs font-bold ${getGradeColor(user.grade)}`}>
                        {user.grade}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
