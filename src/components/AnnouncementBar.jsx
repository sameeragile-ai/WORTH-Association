import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  const [isDismissed, setIsDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="bg-signature-gradient text-white text-xs sm:text-[13px] font-medium overflow-hidden relative z-40"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 sm:py-2.5 flex items-center justify-between gap-4">
            <div className="flex-1 text-center truncate">
              <Link
                to="/events"
                className="inline-flex items-center gap-1.5 hover:underline transition-opacity active:opacity-80"
              >
                <span className="font-semibold text-amber-200 uppercase tracking-wider text-[11px] hidden md:inline">
                  Featured Event:
                </span>
                <span className="truncate">
                  Yes Shef Vancouver tickets on sale — Nov 18, 2026 at Fairmont Pacific Rim
                </span>
                <span className="font-semibold inline-flex items-center gap-0.5 ml-1 underline decoration-white/60">
                  Get tickets <ArrowRight className="w-3.5 h-3.5 inline-block" />
                </span>
              </Link>
            </div>

            <button
              onClick={() => setIsDismissed(true)}
              className="text-white/80 hover:text-white p-1 rounded-full transition-colors shrink-0"
              aria-label="Dismiss announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
