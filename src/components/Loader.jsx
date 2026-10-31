import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Loader({ onComplete = undefined }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check session storage
    const hasLoaded = sessionStorage.getItem('worth_intro_loaded');
    if (hasLoaded) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            sessionStorage.setItem('worth_intro_loaded', 'true');
            setIsVisible(false);
            onComplete?.();
          }, 350);
          return 100;
        }
        // Accelerate smoothly
        const diff = 100 - prev;
        const step = Math.max(2, Math.floor(diff * 0.12));
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const letters = ['W', 'O', 'R', 'T', 'H'];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 bg-[#FDF7F4] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
          role="status"
          aria-label="Loading WORTH Association"
        >
          {/* Subtle warm decorative glow in background */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#F2994A]/10 via-[#EC5F8B]/10 to-[#D6336C]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
            {/* Animated WORTH wordmark */}
            <div className="relative mb-6">
              {/* Brush stroke swipe gradient background */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.85 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="absolute inset-x-[-12px] bottom-1 h-3 bg-signature-gradient rounded-full -rotate-1 origin-left pointer-events-none opacity-80"
              />

              <div className="flex items-center justify-center gap-1">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-jost text-5xl md:text-6xl font-black tracking-wider text-[#1F1A1C]"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Sub-label: Women of Recreation, Tourism & Hospitality */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xs uppercase tracking-[0.25em] font-medium text-[#6B5E62] mb-2"
            >
              Women of Recreation, Tourism & Hospitality
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-sm font-fraunces italic text-[#D6336C] mb-8"
            >
              Educate · Elevate · Engage
            </motion.p>

            {/* Progress bar and counter */}
            <div className="w-48 max-w-full">
              <div className="h-1 bg-[#FBE9E4] rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-signature-gradient"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono tabular-nums text-[#6B5E62]">
                <span>BRITISH COLUMBIA</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
