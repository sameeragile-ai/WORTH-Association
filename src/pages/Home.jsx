import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Users,
  Award,
  BookOpen,
  ArrowUpRight,
  Calendar,
  CheckCircle,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Heart,
  Send,
  Star,
  ShieldCheck,
} from 'lucide-react';

import SmartImage from '../components/SmartImage.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import EventCard from '../components/EventCard.jsx';
import JobCard from '../components/JobCard.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import { useCountUp } from '../hooks/useCountUp.js';
import IMAGES from '../data/images.js';
import { PROGRAMS } from '../data/programs.js';
import { EVENTS } from '../data/events.js';
import { JOBS } from '../data/jobs.js';
import { RESOURCES } from '../data/resources.js';
import { TESTIMONIALS } from '../data/testimonials.js';
import { PARTNERS } from '../data/partners.js';

export default function Home({ onOpenDonate, onOpenApplication }) {
  const navigate = useNavigate();

  // Rotating subline in hero: Educate → Elevate → Engage
  const rotatingWords = ['Educate', 'Elevate', 'Engage'];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % rotatingWords.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Stats in view tracking for animated counter
  const [statsInView, setStatsInView] = useState(false);
  const membersCount = useCountUp(1250, 1800, statsInView);
  const matchesCount = useCountUp(164, 1800, statsInView);
  const scholarshipsCount = useCountUp(85, 1800, statsInView);

  // Journey step active state
  const [activeStep, setActiveStep] = useState(0);

  const journeySteps = [
    {
      step: '01',
      verb: 'Subscribe',
      headline: 'Join the Community',
      desc: 'Receive our bi-weekly provincial dispatch of leadership insights, member spotlights, and career opportunities.',
    },
    {
      step: '02',
      verb: 'Attend',
      headline: 'Experience Our Gatherings',
      desc: 'Connect in room at Yes Shef Vancouver, the Annual Leadership Summit, or localized regional breakfasts across BC.',
    },
    {
      step: '03',
      verb: 'Learn',
      headline: 'Expand Your Toolkit',
      desc: 'Master practical P&L literacy, negotiation, and operational strategy through WORTHshops and the Resource Hub.',
    },
    {
      step: '04',
      verb: 'Lead',
      headline: 'Accelerate in WORTH Academy',
      desc: 'Graduate from our 6-week executive leadership accelerator with an enduring council of fellow female managers.',
    },
    {
      step: '05',
      verb: 'Mentor',
      headline: 'Sponsor the Next Generation',
      desc: 'Step into formal mentorship, volunteer on advisory committees, and open doors for emerging practitioners.',
    },
  ];

  // Testimonial slider state
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const currentTestimonial = TESTIMONIALS[testimonialIdx];

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  return (
    <div className="relative overflow-hidden">
      {/* =========================================================================
          1. HERO SECTION (100svh, Ken Burns, Signature Gradient Overlay, Stat Cards)
          ========================================================================= */}
      <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden text-white pt-28 pb-16">
        {/* Background Image with Slow Ken Burns Zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.08] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <SmartImage
              src={IMAGES.heroCelebration.url}
              alt={IMAGES.heroCelebration.alt}
              className="w-full h-full"
              priority={true}
            />
          </motion.div>

          {/* Signature Gradient Scrim (~80% opacity) */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-[#1F1A1C]/90 via-[#9C1F5A]/80 to-[#F2994A]/70 mix-blend-multiply"
            style={{ backdropFilter: 'blur(1px)' }}
          />

          {/* Fine subtle grain overlay */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
          <div className="max-w-3xl">
            {/* Small uppercase label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-[13px] font-medium tracking-wide uppercase text-amber-200 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F2994A]" />
              <span>Canada’s community for women in hospitality, tourism & recreation</span>
            </motion.div>

            {/* Headline revealed word-by-word with Fraunces italic accent */}
            <h1 className="font-jost text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
              Women of Recreation, Tourism &{' '}
              <span className="font-fraunces italic font-normal text-gradient bg-clip-text text-transparent">
                Hospitality
              </span>
            </h1>

            {/* Rotating Subline: Educate · Elevate · Engage */}
            <div className="flex items-center gap-3 text-lg sm:text-2xl font-light text-white/90 mb-8 min-h-[36px]">
              <span className="text-white/60">Dedicated to:</span>
              <div className="relative h-8 overflow-hidden w-40">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIdx}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="absolute inset-0 font-fraunces italic font-semibold text-[#F2994A]"
                  >
                    {rotatingWords[currentWordIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Dual-Pathway CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-12">
              <Link
                to="/programs"
                className="px-7 py-3.5 rounded-full text-sm font-semibold bg-white text-[#1F1A1C] hover:bg-[#FDF7F4] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-center inline-flex items-center justify-center gap-2 group"
              >
                <span>I’m building my career</span>
                <ArrowRight className="w-4 h-4 text-[#D6336C] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/get-involved"
                className="px-7 py-3.5 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 hover:border-white/60 hover:scale-105 active:scale-95 transition-all text-center inline-flex items-center justify-center gap-2"
              >
                <span>I’m an employer or partner</span>
                <ArrowRight className="w-4 h-4 text-white/70" />
              </Link>
            </div>
          </div>

          {/* Floating Glassmorphism Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 pt-4 max-w-4xl">
            <motion.div
              whileHover={{ y: -4 }}
              className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-4 shadow-lg"
            >
              <div className="p-3 rounded-xl bg-white/15 text-amber-200 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="font-jost text-2xl sm:text-3xl font-black block text-white tabular-nums">
                  1,200+
                </span>
                <span className="text-xs text-white/80">Active Community Members</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-4 shadow-lg"
            >
              <div className="p-3 rounded-xl bg-white/15 text-rose-200 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="font-jost text-2xl sm:text-3xl font-black block text-white tabular-nums">
                  150+
                </span>
                <span className="text-xs text-white/80">1:1 Mentorship Pairings</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-4 shadow-lg"
            >
              <div className="p-3 rounded-xl bg-white/15 text-pink-200 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-jost text-2xl sm:text-3xl font-black block text-white tabular-nums">
                  $85K+
                </span>
                <span className="text-xs text-white/80">In Scholarships Awarded</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator & Organic Bottom Wave Divider */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-center pt-6">
          <a
            href="#partners"
            className="text-xs uppercase tracking-widest text-white/60 hover:text-white flex flex-col items-center gap-1.5 transition-colors mb-2"
          >
            <span>Explore Society</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>

        {/* Organic wave divider into cream section */}
        <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-14 overflow-hidden pointer-events-none z-10">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full fill-[#FDF7F4]"
          >
            <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* =========================================================================
          2. PARTNER MARQUEE (Text-based elegant partner names, infinite scroll)
          ========================================================================= */}
      <section id="partners" className="py-8 bg-[#FDF7F4] border-b border-rose-100/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-3 text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#9C1F5A]">
            Trusted by Leaders & Operators Across British Columbia
          </span>
        </div>

        <div className="relative w-full overflow-hidden flex items-center">
          <div className="flex space-x-12 animate-[marquee_35s_linear_infinite] whitespace-nowrap py-2 hover:[animation-play-state:paused]">
            {[...PARTNERS, ...PARTNERS].map((partner, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2.5 text-sm font-jost font-semibold text-[#1F1A1C]/75 hover:text-[#D6336C] transition-colors cursor-default"
              >
                <span>{partner.name}</span>
                <span className="text-xs text-[#EC5F8B] font-normal">/</span>
                <span className="text-[11px] text-[#6B5E62]">{partner.region}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WELCOME / MISSION (Asymmetric layout, 2 overlapping images, counters)
          ========================================================================= */}
      <section
        className="py-20 sm:py-28 bg-[#FDF7F4] relative"
        onMouseEnter={() => setStatsInView(true)}
        onTouchStart={() => setStatsInView(true)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Asymmetric Overlapping Images (7 cols) */}
            <div className="lg:col-span-7 relative">
              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white w-full sm:w-11/12 h-80 sm:h-[420px]">
                <SmartImage
                  src={IMAGES.academyWorkshop.url}
                  alt={IMAGES.academyWorkshop.alt}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white text-xs font-semibold">
                  WORTH Academy Cohort Workshop
                </div>
              </div>

              {/* Overlapping Offset Secondary Image */}
              <div className="hidden sm:block absolute -bottom-10 -right-4 w-60 sm:w-72 h-60 sm:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10">
                <SmartImage
                  src={IMAGES.femaleChef.url}
                  alt={IMAGES.femaleChef.alt}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">
                  Culinary Leadership
                </div>
              </div>

              {/* Decorative gradient badge pill */}
              <div className="absolute -top-4 -left-3 px-4 py-2 rounded-2xl bg-signature-gradient text-white text-xs font-bold shadow-lg z-20">
                Registered Non-Profit Society
              </div>
            </div>

            {/* Right Column: Mission Copy & Numbers (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <SectionHeading
                kicker="Our Purpose"
                title="Building the table where women"
                italicWord="thrive"
                titleSuffix="and lead."
                subtitle="Hospitality, tourism, and recreation represent British Columbia's most vibrant economic engines. Yet while women form over 60% of the frontline workforce, fewer than 20% occupy executive suites, general manager offices, or boardrooms."
              />

              <p className="text-sm sm:text-base text-[#6B5E62] leading-relaxed">
                WORTH Association exists to dismantle that disparity. We provide the mentorship connections, financial education, accredited scholarships, and executive networks that turn operational supervisors into industry owners, directors, and visionaries.
              </p>

              {/* Animated Numbers Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-rose-200/60">
                <div>
                  <span className="font-jost text-3xl font-black text-[#1F1A1C] tabular-nums block">
                    {membersCount}+
                  </span>
                  <span className="text-xs text-[#6B5E62] leading-tight block mt-0.5">
                    BC Members
                  </span>
                </div>
                <div>
                  <span className="font-jost text-3xl font-black text-[#D6336C] tabular-nums block">
                    {matchesCount}
                  </span>
                  <span className="text-xs text-[#6B5E62] leading-tight block mt-0.5">
                    Mentee Matches
                  </span>
                </div>
                <div>
                  <span className="font-jost text-3xl font-black text-[#1F1A1C] tabular-nums block">
                    ${scholarshipsCount}K
                  </span>
                  <span className="text-xs text-[#6B5E62] leading-tight block mt-0.5">
                    Awarded in Grants
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#D6336C] hover:text-[#9C1F5A] transition-colors"
                >
                  <span>Read our story & impact report</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. THE JOURNEY: Subscribe → Attend → Learn → Lead → Mentor
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FBE9E4] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            kicker="Your Pathway"
            title="The five-stage journey from newcomer to"
            italicWord="mentor"
            titleSuffix="."
            subtitle="Wherever you stand today in your career, WORTH offers a deliberate step forward. From your first newsletter to sponsoring the next cohort, you belong here."
          />

          {/* Desktop Horizontal Timeline / Mobile Vertical Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative mt-10">
            {journeySteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white shadow-xl ring-2 ring-[#EC5F8B] -translate-y-1'
                      : 'bg-white/60 hover:bg-white/90 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#EC5F8B]">
                        {step.step}
                      </span>
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-[#FBE9E4] text-[#D6336C]'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {step.verb}
                      </span>
                    </div>

                    <h3 className="font-jost text-lg font-bold text-[#1F1A1C] mb-2 leading-snug">
                      {step.headline}
                    </h3>
                    <p className="text-xs text-[#6B5E62] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-rose-100/80 flex items-center justify-between text-xs font-semibold text-[#D6336C]">
                    <span>Stage {idx + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. DUAL PATHWAY: For Women in Industry vs For Industry Partners
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FDF7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Dual Pathways"
            title="Two pathways serving our shared"
            italicWord="ecosystem"
            titleSuffix="."
            subtitle="Whether you are an ambitious manager seeking to break through the concrete ceiling or an employer building an inclusive leadership pipeline, WORTH is your collaborative home."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Card A: For Women in the Industry */}
            <div className="group rounded-3xl bg-[#FBE9E4]/60 border border-rose-200/60 p-8 sm:p-10 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="h-60 rounded-2xl overflow-hidden mb-6 relative">
                  <SmartImage
                    src={IMAGES.pathwayWomen.url}
                    alt={IMAGES.pathwayWomen.alt}
                    className="w-full h-full"
                    imgClassName="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 text-xs uppercase tracking-wider font-bold text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                    Beneficiary Pathway
                  </span>
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-[#9C1F5A] block mb-2">
                  For Hospitality Professionals
                </span>
                <h3 className="font-jost text-2xl sm:text-3xl font-bold text-[#1F1A1C] mb-4">
                  Elevate Your Career Trajectory
                </h3>
                <p className="text-sm text-[#6B5E62] leading-relaxed mb-6">
                  Gain the sponsorship, financial literacy, and community confidence required to step into general management, director roles, or entrepreneurial ownership.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-[#1F1A1C] mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D6336C] shrink-0" />
                    <span>Personalized 1:1 matching with respected female executives</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D6336C] shrink-0" />
                    <span>Cohort accelerator in WORTH Academy covering P&L and governance</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D6336C] shrink-0" />
                    <span>Direct access to $1,000–$5,000 education scholarships</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/programs"
                className="w-full py-3.5 px-6 rounded-xl bg-signature-gradient text-white text-center font-semibold text-sm shadow-md hover:opacity-95 transition-opacity inline-flex items-center justify-center gap-2"
              >
                <span>Explore Programs & Funding</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card B: For Employers & Industry Partners */}
            <div className="group rounded-3xl bg-white border border-rose-200/60 p-8 sm:p-10 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="h-60 rounded-2xl overflow-hidden mb-6 relative">
                  <SmartImage
                    src={IMAGES.pathwayEmployers.url}
                    alt={IMAGES.pathwayEmployers.alt}
                    className="w-full h-full"
                    imgClassName="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 text-xs uppercase tracking-wider font-bold text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                    Sponsor & Partner Pathway
                  </span>
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-[#9C1F5A] block mb-2">
                  For Industry Leaders & Employers
                </span>
                <h3 className="font-jost text-2xl sm:text-3xl font-bold text-[#1F1A1C] mb-4">
                  Invest in Sustainable Retention
                </h3>
                <p className="text-sm text-[#6B5E62] leading-relaxed mb-6">
                  Partner with British Columbia’s premier non-profit to access proven talent, sponsor diverse leadership cohorts, and demonstrate authentic corporate leadership.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-[#1F1A1C] mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D6336C] shrink-0" />
                    <span>Underwrite WORTH Academy scholarships for your rising managers</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D6336C] shrink-0" />
                    <span>Post high-visibility vacancies on our curated Career Hub</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#D6336C] shrink-0" />
                    <span>Brand presence at Yes Shef Vancouver and Annual Summit</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/get-involved"
                className="w-full py-3.5 px-6 rounded-xl bg-[#1F1A1C] hover:bg-[#2D2427] text-white text-center font-semibold text-sm shadow-md transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Become an Industry Partner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. PROGRAMS BENTO GRID (Mentorship, Academy, Scholarships, WORTHshops)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FBE9E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Signature Offerings"
            title="Programs designed for real operational"
            italicWord="impact"
            titleSuffix="."
            subtitle="No abstract corporate theory. Every WORTH program is conceived and delivered by seasoned industry directors who understand the unique cadence of hospitality."
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-10">
            {/* Bento Card 1: WORTH Academy (7 cols) */}
            <div className="md:col-span-7 bg-[#FDF7F4] rounded-3xl p-8 border border-rose-200/50 flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#9C1F5A] px-3 py-1 bg-[#FBE9E4] rounded-full">
                    Flagship Accelerator
                  </span>
                  <span className="font-mono text-sm font-bold text-[#1F1A1C]">
                    CAD $495 / Cohort
                  </span>
                </div>

                <h3 className="font-jost text-2xl sm:text-3xl font-bold text-[#1F1A1C] mb-2">
                  WORTH Academy
                </h3>
                <p className="font-fraunces italic text-base text-[#D6336C] mb-4">
                  Build leadership confidence in 6 weeks.
                </p>
                <p className="text-xs sm:text-sm text-[#6B5E62] leading-relaxed mb-6">
                  An intensive cohort for supervisors, managers, and rising directors. Covers P&L analysis, executive presence, board communication, and inclusive culture design.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs text-[#1F1A1C] mb-6">
                  <div className="p-3 bg-white rounded-xl border border-rose-100">
                    <span className="font-bold block text-[#9C1F5A]">6 Weekly Modules</span>
                    <span className="text-[#6B5E62]">90-Min live virtual sessions</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-rose-100">
                    <span className="font-bold block text-[#9C1F5A]">Peer Council</span>
                    <span className="text-[#6B5E62]">Enduring executive network</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-rose-100">
                <span className="text-xs text-[#6B5E62]">Next Cohort begins October 2026</span>
                <Link
                  to="/programs#academy"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D6336C] hover:text-[#9C1F5A]"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 2: Mentorship Program (5 cols) */}
            <div className="md:col-span-5 bg-signature-gradient text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-amber-200 px-3 py-1 bg-black/20 rounded-full inline-block mb-4">
                  1:1 Matching
                </span>
                <h3 className="font-jost text-2xl sm:text-3xl font-bold mb-2">
                  Mentorship Program
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-6">
                  6-month structured matching pairing ambitious women with experienced general managers, culinary owners, and regional tourism directors.
                </p>

                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-xs space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>Mentee Enrollment</span>
                    <span>$150 CAD</span>
                  </div>
                  <p className="text-white/80">Always 100% free for volunteer mentors. Bursaries available.</p>
                </div>
              </div>

              <Link
                to="/programs#mentorship"
                className="py-3 px-5 rounded-xl bg-white text-[#1F1A1C] text-center font-semibold text-xs hover:bg-[#FDF7F4] shadow-md transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Join Mentorship Cycle</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D6336C]" />
              </Link>
            </div>

            {/* Bento Card 3: Scholarships & Funding (6 cols) */}
            <div className="md:col-span-6 bg-[#FDF7F4] rounded-3xl p-8 border border-rose-200/50 flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#9C1F5A] px-3 py-1 bg-[#FBE9E4] rounded-full inline-block mb-4">
                  Financial Bursaries
                </span>
                <h3 className="font-jost text-2xl font-bold text-[#1F1A1C] mb-2">
                  Scholarships & Grants
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5E62] leading-relaxed mb-4">
                  Direct educational awards of $1,000, $2,500, and $5,000 supporting WSET sommelier exams, Red Seal culinary programs, and executive degrees.
                </p>
                <div className="flex items-baseline gap-2 font-jost text-2xl font-black text-[#D6336C] mb-4">
                  <span>$1,000 · $2,500 · $5,000 CAD</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-rose-100">
                <span className="text-xs text-[#6B5E62]">Winter Deadline: Dec 15, 2026</span>
                <Link
                  to="/programs#scholarships"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D6336C]"
                >
                  <span>View Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 4: WORTHshops (6 cols) */}
            <div className="md:col-span-6 bg-[#FDF7F4] rounded-3xl p-8 border border-rose-200/50 flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#9C1F5A] px-3 py-1 bg-[#FBE9E4] rounded-full inline-block mb-4">
                  Masterclass Series
                </span>
                <h3 className="font-jost text-2xl font-bold text-[#1F1A1C] mb-2">
                  WORTHshops
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5E62] leading-relaxed mb-4">
                  Bi-monthly 90-minute operational skill workshops. Learn pour-cost spreadsheet modeling, sustainable team scheduling, and salary benchmarking.
                </p>
                <div className="font-mono text-sm font-bold text-[#1F1A1C] mb-4">
                  $45 CAD / Workshop Pass
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-rose-100">
                <span className="text-xs text-[#6B5E62]">Next: Dec 3, 2026 (Virtual)</span>
                <Link
                  to="/programs#worthshops"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D6336C]"
                >
                  <span>Register</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FEATURED EVENTS (Yes Shef Vancouver Spotlight & Calendar preview)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FDF7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              kicker="Gatherings"
              title="Experience community in"
              italicWord="person"
              titleSuffix="."
              subtitle="Where connections flourish into lifelong sponsorships. Join us at our upcoming galas, conferences, and intimate morning roundtables."
              className="mb-0"
            />
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D6336C] hover:text-[#9C1F5A] shrink-0"
            >
              <span>View full calendar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.slice(0, 3).map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={(ev) =>
                  onOpenApplication({ type: 'event', contextData: ev })
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. LATEST JOBS PREVIEW (3 jobs) with View Job Board CTA
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FBE9E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              kicker="Career Hub"
              title="Opportunities with inclusive"
              italicWord="employers"
              titleSuffix="."
              subtitle="Discover leadership and department head opportunities across British Columbia hotel, tourism, and recreation destinations."
              className="mb-0"
            />
            <Link
              to="/careers"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D6336C] hover:text-[#9C1F5A] shrink-0"
            >
              <span>Explore full job board ({JOBS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {JOBS.slice(0, 3).map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSelect={(selectedJob) =>
                  onOpenApplication({ type: 'job', contextData: selectedJob })
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. TESTIMONIAL SLIDER (Canadian voices)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FDF7F4] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#9C1F5A]">
              Member Voices
            </span>
            <h2 className="font-jost text-3xl sm:text-4xl font-medium tracking-tight mt-2 text-[#1F1A1C]">
              Real stories from British Columbia’s{' '}
              <span className="font-fraunces italic font-normal text-gradient">
                leaders
              </span>
            </h2>
          </div>

          <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-rose-200/50">
            <div className="flex items-center gap-1 text-[#F2994A] mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F2994A]" />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="font-fraunces text-lg sm:text-2xl text-[#1F1A1C] leading-relaxed italic">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </p>

                <div className="pt-4 border-t border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-jost text-base font-bold text-[#1F1A1C]">
                      {currentTestimonial.author}
                    </h4>
                    <p className="text-xs text-[#6B5E62]">
                      {currentTestimonial.role} · {currentTestimonial.organization}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#9C1F5A] px-3 py-1 bg-[#FBE9E4] rounded-full self-start sm:self-auto">
                    {currentTestimonial.category}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider controls */}
            <div className="flex items-center justify-end gap-2 mt-8">
              <button
                onClick={() =>
                  setTestimonialIdx((prev) =>
                    prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
                  )
                }
                className="p-2.5 rounded-full border border-rose-200 hover:bg-[#FBE9E4] text-[#1F1A1C] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-[#6B5E62] px-2">
                {testimonialIdx + 1} / {TESTIMONIALS.length}
              </span>
              <button
                onClick={() =>
                  setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length)
                }
                className="p-2.5 rounded-full border border-rose-200 hover:bg-[#FBE9E4] text-[#1F1A1C] transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. RESOURCE HUB TEASER (3 latest resources)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FBE9E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              kicker="Knowledge Repository"
              title="Research, toolkits &"
              italicWord="masterclasses"
              titleSuffix="."
              subtitle="Empowering your daily leadership with open-access toolkits, provincial benchmark studies, and spreadsheet models."
              className="mb-0"
            />
            <Link
              to="/resources"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D6336C] hover:text-[#9C1F5A] shrink-0"
            >
              <span>Explore all resources ({RESOURCES.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCES.slice(0, 3).map((res) => (
              <ResourceCard
                key={res.id}
                resource={res}
                onSelect={() => navigate('/resources')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. NEWSLETTER SIGNUP BAND (Signature gradient with success state)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-signature-gradient text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-200 block mb-3">
            Stay Connected
          </span>
          <h2 className="font-jost text-3xl sm:text-5xl font-medium tracking-tight mb-4">
            Join 1,200+ women shaping the{' '}
            <span className="font-fraunces italic font-normal text-white underline decoration-amber-300">
              future
            </span>{' '}
            of hospitality.
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto mb-8">
            Get our twice-monthly dispatch with scholarship deadlines, hiring spotlights, and invitations to private industry mixers.
          </p>

          {newsletterSuccess ? (
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-200 shrink-0" />
              <span className="text-sm font-semibold">
                You’re subscribed! Welcome to WORTH Association.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletter}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3.5 rounded-xl bg-white text-[#1F1A1C] placeholder:text-[#6B5E62] text-sm focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-[#1F1A1C] hover:bg-[#2D2427] text-white text-sm font-semibold shadow-md transition-colors shrink-0 flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-xs text-white/70 mt-3">
            We respect your inbox. Unsubscribe anytime with one click.
          </p>
        </div>
      </section>
    </div>
  );
}
