import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass-card !rounded-none !border-x-0 !border-t-0 !border-b-card-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Leaf className="w-6 h-6 text-emerald-500 group-hover:emerald-glow transition-all" />
            <span className="font-bold text-xl tracking-tight text-foreground group-hover:text-emerald-400 transition-colors">PRAKRITI AI</span>
          </Link>
          <div className="flex items-center space-x-6 md:space-x-8">
            <div className="hidden md:flex space-x-8">
              <Link href="/calculator" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm font-medium">Calculator</Link>
              <Link href="/challenges" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm font-medium">Challenges</Link>
              <Link href="/community" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm font-medium">Community</Link>
              <Link href="/coach" className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm font-medium">AI Coach</Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
