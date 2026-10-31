import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, BookOpen, Calendar, Briefcase, Award } from 'lucide-react';
import { PROGRAMS } from '../data/programs.js';
import { EVENTS } from '../data/events.js';
import { JOBS } from '../data/jobs.js';
import { RESOURCES } from '../data/resources.js';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const cleanQuery = query.toLowerCase().trim();

  const filteredPrograms = cleanQuery
    ? PROGRAMS.filter(
        (p) =>
          p.title.toLowerCase().includes(cleanQuery) ||
          p.tagline.toLowerCase().includes(cleanQuery) ||
          p.description.toLowerCase().includes(cleanQuery)
      )
    : [];

  const filteredEvents = cleanQuery
    ? EVENTS.filter(
        (e) =>
          e.title.toLowerCase().includes(cleanQuery) ||
          e.venue.toLowerCase().includes(cleanQuery) ||
          e.tagline.toLowerCase().includes(cleanQuery)
      )
    : [];

  const filteredJobs = cleanQuery
    ? JOBS.filter(
        (j) =>
          j.title.toLowerCase().includes(cleanQuery) ||
          j.company.toLowerCase().includes(cleanQuery) ||
          j.location.toLowerCase().includes(cleanQuery) ||
          j.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  const filteredResources = cleanQuery
    ? RESOURCES.filter(
        (r) =>
          r.title.toLowerCase().includes(cleanQuery) ||
          r.category.toLowerCase().includes(cleanQuery) ||
          r.description.toLowerCase().includes(cleanQuery)
      )
    : [];

  const totalResults =
    filteredPrograms.length +
    filteredEvents.length +
    filteredJobs.length +
    filteredResources.length;

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#1F1A1C]/70 backdrop-blur-md flex flex-col items-center justify-start pt-16 sm:pt-24 px-4 pb-8 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#FDF7F4] rounded-2xl shadow-2xl border border-rose-200/50 overflow-hidden flex flex-col my-auto"
          >
            {/* Search Input Bar */}
            <div className="relative border-b border-rose-100 flex items-center px-4 py-4 sm:px-6">
              <Search className="w-5 h-5 text-[#EC5F8B] shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search programs, events, jobs, toolkits..."
                className="w-full bg-transparent text-lg sm:text-xl font-jost text-[#1F1A1C] placeholder:text-[#6B5E62]/60 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs text-[#6B5E62] hover:text-[#1F1A1C] mr-2 p-1"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#6B5E62] hover:text-[#1F1A1C] hover:bg-[#FBE9E4] transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
              {!cleanQuery ? (
                <div className="py-8 text-center">
                  <p className="text-sm text-[#6B5E62] mb-3">Try searching for:</p>
                  <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
                    {['Mentorship', 'Yes Shef', 'General Manager', 'Scholarship', 'P&L', 'Whistler'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 text-xs font-medium bg-[#FBE9E4] hover:bg-rose-100 text-[#1F1A1C] rounded-lg transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : totalResults === 0 ? (
                <div className="py-12 text-center text-[#6B5E62]">
                  <p className="text-base font-jost font-medium text-[#1F1A1C] mb-1">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs">
                    Try another keyword like &ldquo;Academy&rdquo;, &ldquo;Fairmont&rdquo;, or &ldquo;Toolkit&rdquo;.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Programs */}
                  {filteredPrograms.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C1F5A] mb-2">
                        <Award className="w-3.5 h-3.5" /> Programs & Cohorts
                      </div>
                      <div className="space-y-1.5">
                        {filteredPrograms.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleSelect('/programs')}
                            className="p-3 rounded-xl hover:bg-[#FBE9E4]/60 cursor-pointer transition-colors flex items-center justify-between group"
                          >
                            <div>
                              <div className="text-sm font-semibold text-[#1F1A1C] group-hover:text-[#D6336C]">
                                {item.title}
                              </div>
                              <div className="text-xs text-[#6B5E62] line-clamp-1">
                                {item.tagline}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#6B5E62] group-hover:text-[#D6336C] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Events */}
                  {filteredEvents.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C1F5A] mb-2">
                        <Calendar className="w-3.5 h-3.5" /> Events & Gatherings
                      </div>
                      <div className="space-y-1.5">
                        {filteredEvents.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleSelect('/events')}
                            className="p-3 rounded-xl hover:bg-[#FBE9E4]/60 cursor-pointer transition-colors flex items-center justify-between group"
                          >
                            <div>
                              <div className="text-sm font-semibold text-[#1F1A1C] group-hover:text-[#D6336C]">
                                {item.title}
                              </div>
                              <div className="text-xs text-[#6B5E62]">
                                {item.date} · {item.venue}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#6B5E62] group-hover:text-[#D6336C] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Jobs */}
                  {filteredJobs.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C1F5A] mb-2">
                        <Briefcase className="w-3.5 h-3.5" /> Career Opportunities
                      </div>
                      <div className="space-y-1.5">
                        {filteredJobs.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleSelect('/careers')}
                            className="p-3 rounded-xl hover:bg-[#FBE9E4]/60 cursor-pointer transition-colors flex items-center justify-between group"
                          >
                            <div>
                              <div className="text-sm font-semibold text-[#1F1A1C] group-hover:text-[#D6336C]">
                                {item.title}
                              </div>
                              <div className="text-xs text-[#6B5E62]">
                                {item.company} · {item.location}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#6B5E62] group-hover:text-[#D6336C] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resources */}
                  {filteredResources.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C1F5A] mb-2">
                        <BookOpen className="w-3.5 h-3.5" /> Resource Hub & Research
                      </div>
                      <div className="space-y-1.5">
                        {filteredResources.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleSelect('/resources')}
                            className="p-3 rounded-xl hover:bg-[#FBE9E4]/60 cursor-pointer transition-colors flex items-center justify-between group"
                          >
                            <div>
                              <div className="text-sm font-semibold text-[#1F1A1C] group-hover:text-[#D6336C]">
                                {item.title}
                              </div>
                              <div className="text-xs text-[#6B5E62]">
                                {item.type} · {item.readTime}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#6B5E62] group-hover:text-[#D6336C] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick footer hint */}
            <div className="px-6 py-3 bg-[#FBE9E4]/50 border-t border-rose-100/60 text-xs text-[#6B5E62] flex justify-between items-center">
              <span>Press <kbd className="px-1.5 py-0.5 text-[10px] bg-white rounded border border-rose-200">ESC</kbd> to exit</span>
              <span className="text-[#9C1F5A] font-medium">WORTH Association Hub</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
