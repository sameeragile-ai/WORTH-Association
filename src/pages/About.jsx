import { useState } from 'react';
import {
  Users,
  Award,
  Sparkles,
  Heart,
  ArrowRight,
  Download,
  CheckCircle,
  FileText,
  Linkedin,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { useCountUp } from '../hooks/useCountUp.js';
import { TEAM_MEMBERS, BOARD_ADVISORS } from '../data/team.js';
import IMAGES from '../data/images.js';

export default function About({ onOpenDonate }) {
  const [statsInView, setStatsInView] = useState(true);
  const [reportDownloaded, setReportDownloaded] = useState(false);

  const membersCount = useCountUp(1250, 1800, statsInView);
  const matchesCount = useCountUp(164, 1800, statsInView);
  const fundingCount = useCountUp(85, 1800, statsInView);

  const handleDownloadReport = () => {
    setReportDownloaded(true);
    setTimeout(() => setReportDownloaded(false), 2500);
  };

  return (
    <div className="pt-28 pb-20 bg-[#FDF7F4]">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-[#FBE9E4] border-b border-rose-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Our Society"
            title="Dismantling the concrete ceiling across"
            italicWord="hospitality"
            titleSuffix="."
            subtitle="WORTH Association is a registered British Columbia non-profit society educating, elevating, and engaging women and gender-diverse professionals across recreation, tourism, and hospitality."
            className="mb-0"
          />
        </div>
      </section>

      {/* Story & Mission Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#9C1F5A]">
              Founded in British Columbia
            </span>
            <h2 className="font-jost text-3xl sm:text-4xl font-bold text-[#1F1A1C]">
              Why WORTH Exists
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#6B5E62] leading-relaxed">
              <p>
                In 2020, hotel executive Joanna Vance looked around senior leadership boardrooms across Western Canada and observed an undeniable contradiction: while women composed more than 60% of the tourism and hospitality workforce, female representation plummeted to less than 20% in General Manager, Vice President, and executive director offices.
              </p>
              <p>
                Hospitality careers can be uniquely exhausting—characterized by non-traditional hours, high-stakes shift pressures, and unspoken promotion channels. Without intentional sponsorship and financial governance training, exceptional women were opting out of the pipeline prematurely.
              </p>
              <p>
                WORTH was founded to provide that missing infrastructure: cohort leadership development, structured executive sponsorship, provincial equity research, and direct financial scholarships.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenDonate}
                className="px-6 py-3 rounded-full bg-signature-gradient text-white text-xs font-semibold shadow-md hover:opacity-95 transition-opacity inline-flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>Support Our Non-Profit Mission</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-96 sm:h-[450px]">
              <SmartImage
                src={IMAGES.conferenceSpeaker.url}
                alt="Women in hospitality leadership summit panel"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white max-w-xs">
                <span className="font-fraunces italic text-lg block text-amber-200">
                  &ldquo;When one woman leads, the entire room rises.&rdquo;
                </span>
                <span className="text-xs opacity-80 mt-1 block">
                  WORTH Leadership Summit
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers & Report Download */}
      <section className="py-20 bg-[#FBE9E4] border-y border-rose-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-12">
            <div className="p-6 rounded-2xl bg-white shadow-sm border border-rose-200/50">
              <span className="font-jost text-4xl sm:text-5xl font-black text-[#1F1A1C] tabular-nums block">
                {membersCount}+
              </span>
              <span className="text-xs uppercase tracking-wider text-[#9C1F5A] font-bold block mt-1">
                Community Members
              </span>
              <span className="text-xs text-[#6B5E62] block mt-0.5">
                Across Vancouver, Whistler & Okanagan
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-sm border border-rose-200/50">
              <span className="font-jost text-4xl sm:text-5xl font-black text-[#D6336C] tabular-nums block">
                {matchesCount}
              </span>
              <span className="text-xs uppercase tracking-wider text-[#9C1F5A] font-bold block mt-1">
                Mentor Matches
              </span>
              <span className="text-xs text-[#6B5E62] block mt-0.5">
                Structured 6-month cycles
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-sm border border-rose-200/50">
              <span className="font-jost text-4xl sm:text-5xl font-black text-[#1F1A1C] tabular-nums block">
                ${fundingCount}K+
              </span>
              <span className="text-xs uppercase tracking-wider text-[#9C1F5A] font-bold block mt-1">
                Scholarships Granted
              </span>
              <span className="text-xs text-[#6B5E62] block mt-0.5">
                100% non-repayable bursaries
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-sm border border-rose-200/50">
              <span className="font-jost text-4xl sm:text-5xl font-black text-[#9C1F5A] tabular-nums block">
                15+
              </span>
              <span className="text-xs uppercase tracking-wider text-[#9C1F5A] font-bold block mt-1">
                Executive Chefs
              </span>
              <span className="text-xs text-[#6B5E62] block mt-0.5">
                Celebrated annually at Yes Shef
              </span>
            </div>
          </div>

          {/* Impact Report Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-rose-200/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#9C1F5A]">
                Annual Reporting & Transparency
              </span>
              <h3 className="font-jost text-2xl font-bold text-[#1F1A1C]">
                WORTH 2025/2026 Annual Impact Report
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5E62] max-w-xl">
                Read our audited financial overview, cohort advancement outcomes, and provincial equity research conducted with BC academic partners.
              </p>
            </div>

            <div>
              {reportDownloaded ? (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Download initiated! (WORTH_Impact_Report.pdf)</span>
                </div>
              ) : (
                <button
                  onClick={handleDownloadReport}
                  className="px-6 py-3.5 rounded-xl bg-signature-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-opacity flex items-center gap-2 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Impact Report (PDF)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Grid with Hover Reveal Bios */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Our Leadership"
          title="Guided by experienced industry"
          italicWord="practitioners"
          titleSuffix="."
          subtitle="Our board, directors, and committee leads have managed luxury hotels, Michelin-starred dining rooms, tourism boards, and municipal recreation facilities."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="group bg-white rounded-3xl overflow-hidden border border-rose-200/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-72 overflow-hidden">
                <SmartImage
                  src={member.image.url}
                  alt={member.image.alt}
                  className="w-full h-full"
                  imgClassName="group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[11px] font-semibold text-amber-200 block">
                    {member.credentials}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-jost text-xl font-bold text-[#1F1A1C]">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#9C1F5A] mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-xs text-[#6B5E62] leading-relaxed mt-3">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-[#6B5E62]">
                  <span>British Columbia</span>
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#D6336C] transition-colors p-1"
                    aria-label={`${member.name} LinkedIn Profile`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Council */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FBE9E4] border border-rose-200/60">
          <h3 className="font-jost text-xl font-bold text-[#1F1A1C] mb-2">
            Advisory Board & Council
          </h3>
          <p className="text-xs text-[#6B5E62] mb-6 max-w-2xl">
            Providing ongoing strategic governance, financial oversight, and provincial policy guidance to the WORTH executive team.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BOARD_ADVISORS.map((advisor, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-rose-100 shadow-sm"
              >
                <div className="font-jost text-sm font-bold text-[#1F1A1C]">
                  {advisor.name}
                </div>
                <div className="text-xs text-[#9C1F5A] mt-0.5">{advisor.role}</div>
                <div className="text-[11px] text-[#6B5E62] mt-2 pt-2 border-t border-rose-50">
                  Focus: {advisor.focus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Land Acknowledgement */}
      <section className="py-12 bg-[#FDF7F4] border-t border-rose-200/60">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#9C1F5A]">
            Territorial Acknowledgment
          </span>
          <p className="text-xs sm:text-sm text-[#6B5E62] leading-relaxed max-w-2xl mx-auto">
            WORTH Association operates on the traditional, ancestral and unceded territory of the Coast Salish peoples, including the Musqueam, Squamish and Tsleil-Waututh Nations. We commit our organization to listening, unlearning, and building collaborative pathways with Indigenous tourism leaders.
          </p>
        </div>
      </section>
    </div>
  );
}
