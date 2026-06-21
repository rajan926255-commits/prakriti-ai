import Link from 'next/link';
import { Leaf } from 'lucide-react';

const LinkedinIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const InstagramIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const GithubIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto bg-background/50 backdrop-blur-md border-t border-card-border relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-max">
              <Leaf className="w-6 h-6 text-emerald-500 group-hover:emerald-glow transition-all" />
              <span className="font-bold text-xl tracking-tight text-foreground group-hover:text-emerald-400 transition-colors">PRAKRITI AI</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Empowering India to track, understand, and reduce carbon footprints. Together, we build a greener 2050.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/rajan-gupta-74688538a/" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-emerald-500/20 hover:text-emerald-400 hover:-translate-y-1 transition-all border border-card-border">
                <LinkedinIcon className="w-4 h-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://x.com/ClimateReality" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-emerald-500/20 hover:text-emerald-400 hover:-translate-y-1 transition-all border border-card-border">
                <TwitterIcon className="w-4 h-4" />
                <span className="sr-only">X (Twitter)</span>
              </a>
              <a href="https://www.instagram.com/unep/" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-emerald-500/20 hover:text-emerald-400 hover:-translate-y-1 transition-all border border-card-border">
                <InstagramIcon className="w-4 h-4" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://github.com/rajan926255-commits" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-emerald-500/20 hover:text-emerald-400 hover:-translate-y-1 transition-all border border-card-border">
                <GithubIcon className="w-4 h-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-foreground font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/calculator" className="text-muted-foreground hover:text-emerald-400 hover:translate-x-1 transition-all inline-block text-sm">
                  Carbon Calculator
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-muted-foreground hover:text-emerald-400 hover:translate-x-1 transition-all inline-block text-sm">
                  Carbon Mirror
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-muted-foreground hover:text-emerald-400 hover:translate-x-1 transition-all inline-block text-sm">
                  Living City
                </Link>
              </li>
              <li>
                <Link href="/coach" className="text-muted-foreground hover:text-emerald-400 hover:translate-x-1 transition-all inline-block text-sm">
                  AI Coach
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-emerald-400 hover:translate-x-1 transition-all inline-block text-sm">
                  Eco Challenges
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-foreground font-bold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-emerald-400 hover:translate-x-1 transition-all inline-block text-sm">
                  Climate Academy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-emerald-400 hover:translate-x-1 transition-all inline-block text-sm">
                  Carbon Facts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-emerald-400 hover:translate-x-1 transition-all inline-block text-sm">
                  Sustainability Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-emerald-400 hover:translate-x-1 transition-all inline-block text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-card-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">
            &copy; {currentYear} PRAKRITI AI
          </div>
          <div className="text-muted-foreground text-sm flex items-center gap-1">
            Built with <span className="text-red-500 animate-pulse">❤️</span> by Rajan Gupta
            AI • Sustainability • Climate Innovation
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
