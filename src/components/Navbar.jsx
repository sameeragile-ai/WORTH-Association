import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X, ChevronDown, Heart, ArrowRight } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection.js';
import { useScrollProgress } from '../hooks/useScrollProgress.js';
import AnnouncementBar from './AnnouncementBar.jsx';
import MegaMenu from './MegaMenu.jsx';
import SearchOverlay from './SearchOverlay.jsx';

export default function Navbar({ onOpenDonate }) {
  const location = useLocation();
  const { scrollDirection, isScrolled } = useScrollDirection();
  const scrollProgress = useScrollProgress();

  const [activeMega, setActiveMega] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMega(null);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Programs', path: '/programs', hasMega: true, megaType: 'programs' },
    { label: 'Get Involved', path: '/get-involved', hasMega: true, megaType: 'get-involved' },
    { label: 'Careers', path: '/careers', hasMega: false },
    { label: 'Resources', path: '/resources', hasMega: false },
    { label: 'Events', path: '/events', hasMega: false },
    { label: 'About', path: '/about', hasMega: false },
    { label: 'Contact', path: '/contact', hasMega: false },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
          scrollDirection === 'down' && isScrolled && !isMobileMenuOpen
            ? '-translate-y-full'
            : 'translate-y-0'
        }`}
      >
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Main Navbar Bar */}
        <nav
          className={`w-full transition-all duration-300 relative ${
            isTransparent
              ? 'bg-transparent text-white py-5 sm:py-6'
              : 'bg-[#FDF7F4]/90 backdrop-blur-xl text-[#1F1A1C] shadow-sm border-b border-rose-200/40 py-3.5 sm:py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
            {/* Zone 1: Brand Wordmark */}
            <Link
              to="/"
              className="group flex flex-col shrink-0 focus:outline-none"
              aria-label="WORTH Association Home"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-jost text-2xl sm:text-3xl font-black tracking-tight transition-transform duration-300 group-hover:scale-105 ${
                    isTransparent ? 'text-white' : 'text-gradient'
                  }`}
                >
                  WORTH
                </span>
                <span className="w-2 h-2 rounded-full bg-signature-gradient shrink-0" />
              </div>
              <span
                className={`text-[9px] uppercase tracking-[0.2em] font-medium hidden sm:block transition-colors ${
                  isTransparent ? 'text-white/80' : 'text-[#6B5E62]'
                }`}
              >
                Women of Recreation, Tourism & Hospitality
              </span>
            </Link>

            {/* Zone 2: Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => {
                      if (link.hasMega) setActiveMega(link.megaType);
                    }}
                    onMouseLeave={() => {
                      if (link.hasMega) setActiveMega(null);
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors inline-flex items-center gap-1 rounded-lg ${
                        isTransparent
                          ? isActive
                            ? 'text-white font-semibold'
                            : 'text-white/85 hover:text-white'
                          : isActive
                          ? 'text-[#D6336C] font-semibold'
                          : 'text-[#1F1A1C] hover:text-[#D6336C]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.hasMega && (
                        <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
                      )}

                      {/* Active Route Gradient Underline */}
                      {isActive && (
                        <motion.div
                          layoutId="navUnderline"
                          className="absolute bottom-0 left-3 right-3 h-[2px] bg-signature-gradient rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Desktop Mega Dropdown */}
                    {link.hasMega && (
                      <MegaMenu
                        type={link.megaType}
                        isOpen={activeMega === link.megaType}
                        onClose={() => setActiveMega(null)}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Zone 3: Actions (Search + Donate + Mobile Hamburger) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#EC5F8B] ${
                  isTransparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-[#1F1A1C] hover:text-[#D6336C] hover:bg-[#FBE9E4]'
                }`}
                aria-label="Search WORTH website"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Donate Button */}
              <button
                onClick={onOpenDonate}
                className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg active:scale-95 bg-signature-gradient inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
              >
                <Heart className="w-3.5 h-3.5 fill-white/30 text-white" />
                <span>Donate</span>
                {/* Shimmer sweep effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#EC5F8B] ${
                  isTransparent && !isMobileMenuOpen
                    ? 'text-white hover:bg-white/10'
                    : 'text-[#1F1A1C] hover:bg-[#FBE9E4]'
                }`}
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#1F1A1C]" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Thin gradient scroll progress line at bottom of navbar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-signature-gradient transition-all duration-100 origin-left"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </nav>
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Full-Screen Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-30 pt-28 pb-8 px-6 bg-[#FDF7F4] flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            {/* Background subtle gradient swirl */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#EC5F8B]/15 via-[#F2994A]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9C1F5A]">
                Navigation
              </p>

              <div className="space-y-1">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.path;
                  const isAccordionOpen = mobileAccordion === link.path;

                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.3 }}
                      className="border-b border-rose-100/60 pb-1"
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block py-3 text-2xl font-jost font-semibold transition-colors ${
                            isActive ? 'text-gradient' : 'text-[#1F1A1C] active:text-[#D6336C]'
                          }`}
                        >
                          {link.label}
                        </Link>
                        {link.hasMega && (
                          <button
                            onClick={() =>
                              setMobileAccordion(isAccordionOpen ? null : link.path)
                            }
                            className="p-3 text-[#6B5E62] hover:text-[#1F1A1C]"
                            aria-label={`Toggle ${link.label} sub-links`}
                          >
                            <ChevronDown
                              className={`w-5 h-5 transition-transform ${
                                isAccordionOpen ? 'rotate-180 text-[#D6336C]' : ''
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Accordion Sub-links */}
                      {link.hasMega && isAccordionOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 pb-3 space-y-2 text-sm text-[#6B5E62]"
                        >
                          {link.megaType === 'programs' ? (
                            <>
                              <Link
                                to="/programs#academy"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-1 hover:text-[#D6336C]"
                              >
                                · WORTH Academy (6-Week Cohort)
                              </Link>
                              <Link
                                to="/programs#mentorship"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-1 hover:text-[#D6336C]"
                              >
                                · Mentorship Program (1:1 Matching)
                              </Link>
                              <Link
                                to="/programs#scholarships"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-1 hover:text-[#D6336C]"
                              >
                                · Scholarships & Grants ($1k–$5k)
                              </Link>
                              <Link
                                to="/programs#worthshops"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-1 hover:text-[#D6336C]"
                              >
                                · WORTHshops Masterclasses
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link
                                to="/get-involved#partnerships"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-1 hover:text-[#D6336C]"
                              >
                                · Corporate Partnerships
                              </Link>
                              <Link
                                to="/get-involved#donate"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-1 hover:text-[#D6336C]"
                              >
                                · Donate to Scholarships
                              </Link>
                              <Link
                                to="/get-involved#volunteer"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-1 hover:text-[#D6336C]"
                              >
                                · Volunteer & Committees
                              </Link>
                              <Link
                                to="/get-involved#ad-space"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-1 hover:text-[#D6336C]"
                              >
                                · Partner Ad Space
                              </Link>
                            </>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Footer & CTA */}
            <div className="pt-6 mt-6 border-t border-rose-200/60 space-y-4 relative z-10">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenDonate();
                }}
                className="w-full py-3.5 px-6 rounded-xl text-center font-semibold text-white bg-signature-gradient shadow-md flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>Support WORTH · Donate</span>
              </button>

              <div className="text-center text-xs text-[#6B5E62]">
                <p className="font-fraunces italic text-sm text-[#1F1A1C] mb-1">
                  Educate · Elevate · Engage
                </p>
                <p>British Columbia, Canada · Society S0069800</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
