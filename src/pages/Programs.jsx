import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CheckCircle,
  Calendar,
  Clock,
  Award,
  Sparkles,
  Users,
  BookOpen,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { PROGRAMS } from '../data/programs.js';
import { PRICING, formatCAD } from '../data/pricing.js';

export default function Programs({ onOpenApplication }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elem = document.querySelector(location.hash);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="pt-28 pb-20 bg-[#FDF7F4]">
      {/* Header Banner */}
      <section className="py-12 sm:py-16 bg-[#FBE9E4] border-b border-rose-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Leadership Architecture"
            title="Educational pathways built for operational"
            italicWord="excellence"
            titleSuffix="."
            subtitle="Explore our cohort programs, executive sponsorship pairings, educational scholarships, and tactical masterclasses designed specifically for women in hospitality, tourism, and recreation."
            className="mb-0"
          />
        </div>
      </section>

      {/* Program 1: WORTH Academy */}
      <section id="academy" className="py-20 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBE9E4] text-xs font-bold uppercase tracking-wider text-[#9C1F5A]">
                <Award className="w-3.5 h-3.5" />
                <span>Flagship 6-Week Cohort</span>
              </div>

              <h2 className="font-jost text-3xl sm:text-5xl font-bold text-[#1F1A1C] leading-tight">
                WORTH Academy
              </h2>

              <p className="font-fraunces italic text-lg sm:text-xl text-[#D6336C]">
                Build leadership confidence in 6 weeks.
              </p>

              <p className="text-sm sm:text-base text-[#6B5E62] leading-relaxed">
                {PROGRAMS[0].fullDescription}
              </p>

              {/* Fee & Details Ribbon */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FBE9E4]/60 border border-rose-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#6B5E62] block">
                    Cohort Tuition Fee
                  </span>
                  <span className="font-jost text-2xl font-black text-[#1F1A1C]">
                    {PRICING.programs.academy.priceFormatted} CAD
                  </span>
                  <span className="text-[11px] text-[#6B5E62] block mt-0.5">
                    Bursaries and employer payment invoices available.
                  </span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#6B5E62] block">
                    Next Cohort Schedule
                  </span>
                  <span className="text-sm font-bold text-[#1F1A1C] block">
                    {PROGRAMS[0].nextCohort}
                  </span>
                  <span className="text-[11px] text-[#6B5E62] block mt-0.5">
                    {PROGRAMS[0].format}
                  </span>
                </div>
              </div>

              {/* Key Outcomes */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#9C1F5A]">
                  What You Will Master:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#1F1A1C]">
                  {PROGRAMS[0].keyOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#D6336C] shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <button
                  onClick={() =>
                    onOpenApplication({ type: 'academy', contextData: PROGRAMS[0] })
                  }
                  className="px-8 py-3.5 rounded-full bg-signature-gradient text-white text-sm font-semibold shadow-md hover:opacity-95 transition-opacity inline-flex items-center gap-2"
                >
                  <span>Apply for Next Cohort</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Side: Image & Weekly Syllabus Modules */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-rose-200/50 h-72">
                <SmartImage
                  src={PROGRAMS[0].image.url}
                  alt={PROGRAMS[0].image.alt}
                  className="w-full h-full"
                />
              </div>

              {/* Syllabus Accordion Box */}
              <div className="bg-white rounded-2xl p-6 border border-rose-200/60 shadow-sm space-y-3">
                <h4 className="font-jost text-base font-bold text-[#1F1A1C] flex items-center justify-between">
                  <span>6-Week Curriculum Syllabus</span>
                  <span className="text-xs font-mono text-[#D6336C]">2026/27</span>
                </h4>
                <div className="space-y-2.5">
                  {PROGRAMS[0].modules.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#FDF7F4] border border-rose-100 flex items-start gap-3"
                    >
                      <span className="font-mono text-xs font-bold text-[#9C1F5A] px-2 py-0.5 bg-[#FBE9E4] rounded">
                        {m.week}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#1F1A1C]">{m.title}</div>
                        <div className="text-[11px] text-[#6B5E62] leading-snug">{m.focus}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program 2: Mentorship Program */}
      <section id="mentorship" className="py-20 bg-[#FBE9E4] border-b border-rose-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Image & Stats */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-rose-200/50 h-80">
                <SmartImage
                  src={PROGRAMS[1].image.url}
                  alt={PROGRAMS[1].image.alt}
                  className="w-full h-full"
                />
              </div>

              <div className="bg-white rounded-2xl p-6 border border-rose-200/60 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#FBE9E4] text-[#D6336C]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-jost text-2xl font-black text-[#1F1A1C]">
                      150+ Pairs
                    </span>
                    <span className="text-xs text-[#6B5E62] block">
                      Matched across BC hotels, wineries, tourism boards & restaurants
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#6B5E62] leading-relaxed border-t border-rose-100 pt-3">
                  Matches are intentionally vetted on precise career ambitions, operational disciplines, and shared values—not arbitrary algorithms.
                </p>
              </div>
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold uppercase tracking-wider text-[#9C1F5A] border border-rose-200">
                <Users className="w-3.5 h-3.5" />
                <span>6-Month Intentional 1:1 Matching</span>
              </div>

              <h2 className="font-jost text-3xl sm:text-5xl font-bold text-[#1F1A1C] leading-tight">
                Mentorship Program
              </h2>

              <p className="font-fraunces italic text-lg sm:text-xl text-[#D6336C]">
                {PROGRAMS[1].tagline}
              </p>

              <p className="text-sm sm:text-base text-[#6B5E62] leading-relaxed">
                {PROGRAMS[1].fullDescription}
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-rose-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#6B5E62] block">
                    Mentee Enrollment Fee
                  </span>
                  <span className="font-jost text-2xl font-black text-[#1F1A1C]">
                    {PRICING.programs.mentorship.priceFormatted} CAD
                  </span>
                  <span className="text-[11px] text-[#6B5E62] block mt-0.5">
                    {PRICING.programs.mentorship.subsidiesNote}
                  </span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#6B5E62] block">
                    Next Cycle
                  </span>
                  <span className="text-sm font-bold text-[#1F1A1C] block">
                    Spring 2027 Cycle (Applications Open)
                  </span>
                  <span className="text-[11px] text-[#6B5E62] block mt-0.5">
                    6 Months (1 hour minimum monthly session)
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() =>
                    onOpenApplication({ type: 'mentorship', contextData: PROGRAMS[1] })
                  }
                  className="px-8 py-3.5 rounded-full bg-signature-gradient text-white text-sm font-semibold shadow-md hover:opacity-95 transition-opacity inline-flex items-center justify-center gap-2"
                >
                  <span>Apply as Mentee</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    onOpenApplication({ type: 'mentorship', contextData: { ...PROGRAMS[1], isMentor: true } })
                  }
                  className="px-8 py-3.5 rounded-full bg-white text-[#1F1A1C] hover:bg-[#FDF7F4] border border-rose-200 text-sm font-semibold shadow-sm transition-colors inline-flex items-center justify-center gap-2"
                >
                  <span>Volunteer as an Executive Mentor</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program 3: Scholarships & Funding */}
      <section id="scholarships" className="py-20 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Direct Funding"
            title="Educational scholarships &"
            italicWord="grants"
            titleSuffix="."
            subtitle="Financial barriers should never stand in the way of a woman’s growth. We award $1,000, $2,500, and $5,000 non-repayable grants annually."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {PRICING.programs.scholarships.map((sch) => (
              <div
                key={sch.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-rose-200/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#9C1F5A] px-2.5 py-0.5 bg-[#FBE9E4] rounded-full inline-block mb-3">
                    Award Tier
                  </span>

                  <h3 className="font-jost text-xl font-bold text-[#1F1A1C] mb-1">
                    {sch.name}
                  </h3>

                  <div className="font-jost text-4xl font-black text-[#D6336C] my-4">
                    {sch.amountFormatted}
                  </div>

                  <p className="text-xs sm:text-sm text-[#6B5E62] leading-relaxed mb-6">
                    {sch.eligibility}
                  </p>
                </div>

                <div className="pt-4 border-t border-rose-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#6B5E62] block">
                      Deadline
                    </span>
                    <span className="text-xs font-bold text-[#1F1A1C]">{sch.deadline}</span>
                  </div>

                  <button
                    onClick={() =>
                      onOpenApplication({ type: 'scholarship', contextData: sch })
                    }
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-signature-gradient text-white shadow-sm hover:opacity-95"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-[#FBE9E4]/60 border border-rose-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#EC5F8B] shrink-0" />
              <p className="text-xs sm:text-sm text-[#1F1A1C]">
                <strong>Donor & Corporate Sponsorship:</strong> Interested in establishing an endowed annual scholarship in your organization’s name?
              </p>
            </div>
            <button
              onClick={() =>
                onOpenApplication({ type: 'sponsor', contextData: { title: 'Endowed Scholarship' } })
              }
              className="px-5 py-2.5 rounded-xl bg-white border border-rose-200 text-xs font-bold text-[#1F1A1C] hover:bg-rose-50 transition-colors shrink-0"
            >
              Endow a Scholarship
            </button>
          </div>
        </div>
      </section>

      {/* Program 4: WORTHshops */}
      <section id="worthshops" className="py-20 bg-[#FBE9E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Practical Masterclasses"
            title="Tactical, 90-minute operational"
            italicWord="workshops"
            titleSuffix="."
            subtitle="Hands-on skills you can implement on your shift tomorrow morning. Spreadsheet templates, P&L formulas, and actionable leadership scripts."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROGRAMS[3].modules.map((m, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-rose-200/60 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#D6336C] px-2 py-0.5 bg-[#FBE9E4] rounded">
                      {m.week}
                    </span>
                    <span className="text-xs font-bold text-[#1F1A1C]">$45 CAD</span>
                  </div>

                  <h3 className="font-jost text-lg font-bold text-[#1F1A1C] mb-2 leading-snug">
                    {m.title}
                  </h3>

                  <p className="text-xs text-[#6B5E62] leading-relaxed mb-6">
                    {m.focus}
                  </p>
                </div>

                <button
                  onClick={() =>
                    onOpenApplication({ type: 'event', contextData: { title: m.title, priceFormatted: '$45' } })
                  }
                  className="w-full py-2.5 rounded-xl bg-white border border-rose-200 text-xs font-bold text-[#1F1A1C] hover:bg-signature-gradient hover:text-white hover:border-transparent transition-all shadow-sm"
                >
                  Register for Masterclass
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
