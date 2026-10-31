import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress.js';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > 320);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  // Circular progress math (radius 18, circumference ~113.1)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top of page"
      className="fixed bottom-6 right-6 z-30 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-rose-200/60 text-[#1F1A1C] hover:text-[#D6336C] hover:scale-110 active:scale-95 transition-all duration-200 group flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
    >
      <svg className="w-10 h-10 -rotate-90 transform" viewBox="0 0 44 44">
        {/* Track circle */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-[#FBE9E4]"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Progress gradient circle */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-150"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F2994A" />
            <stop offset="50%" stopColor="#EC5F8B" />
            <stop offset="100%" stopColor="#D6336C" />
          </linearGradient>
        </defs>
      </svg>
      <ArrowUp className="w-4 h-4 absolute text-[#1F1A1C] group-hover:text-[#D6336C] group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}
