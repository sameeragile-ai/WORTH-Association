import { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  ArrowRight,
  Sparkles,
  Building,
  CheckCircle,
  ShieldCheck,
  Send,
  X,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import JobCard from '../components/JobCard.jsx';
import PricingCard from '../components/PricingCard.jsx';
import Modal from '../components/Modal.jsx';
import { JOBS, JOB_CATEGORIES, JOB_LOCATIONS, JOB_TYPES } from '../data/jobs.js';
import { PRICING } from '../data/pricing.js';

export default function Careers({ onOpenApplication }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedType, setSelectedType] = useState('All Types');

  // Selected job for detail modal
  const [activeJob, setActiveJob] = useState(null);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const matchesSearch =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'All Categories' || job.category === selectedCategory;

      const matchesLoc =
        selectedLocation === 'All Locations' || job.location.includes(selectedLocation.replace(', BC', ''));

      const matchesType =
        selectedType === 'All Types' || job.type === selectedType;

      return matchesSearch && matchesCat && matchesLoc && matchesType;
    });
  }, [searchQuery, selectedCategory, selectedLocation, selectedType]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedLocation('All Locations');
    setSelectedType('All Types');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'All Categories' ||
    selectedLocation !== 'All Locations' ||
    selectedType !== 'All Types';

  return (
    <div className="pt-28 pb-20 bg-[#FDF7F4]">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-[#FBE9E4] border-b border-rose-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Career Hub"
            title="Leadership opportunities with verified"
            italicWord="inclusive"
            titleSuffix="employers."
            subtitle="Explore executive, departmental management, and culinary postings across British Columbia's hotels, recreation facilities, and tourism operators."
            className="mb-0"
          />
        </div>
      </section>

      {/* Main Job Board Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Filter Controls */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-200/60 shadow-sm mb-10 space-y-4">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-[#EC5F8B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, company, or keyword..."
              className="w-full pl-11 pr-4 py-3 bg-[#FDF7F4] border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] placeholder:text-[#6B5E62]/60 focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
            />
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9C1F5A] mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#FDF7F4] border border-rose-200/80 rounded-lg text-xs font-medium text-[#1F1A1C] focus:outline-none focus:ring-1 focus:ring-[#EC5F8B]"
              >
                {JOB_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9C1F5A] mb-1">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 bg-[#FDF7F4] border border-rose-200/80 rounded-lg text-xs font-medium text-[#1F1A1C] focus:outline-none focus:ring-1 focus:ring-[#EC5F8B]"
              >
                {JOB_LOCATIONS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9C1F5A] mb-1">
                Employment Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 bg-[#FDF7F4] border border-rose-200/80 rounded-lg text-xs font-medium text-[#1F1A1C] focus:outline-none focus:ring-1 focus:ring-[#EC5F8B]"
              >
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Status & Reset */}
          {hasActiveFilters && (
            <div className="pt-2 flex items-center justify-between text-xs text-[#6B5E62] border-t border-rose-100">
              <span>
                Showing {filteredJobs.length} of {JOBS.length} positions
              </span>
              <button
                onClick={clearFilters}
                className="text-[#D6336C] hover:underline font-semibold flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-rose-200/60 p-8">
            <h3 className="font-jost text-xl font-bold text-[#1F1A1C] mb-2">
              No matching postings found
            </h3>
            <p className="text-xs text-[#6B5E62] max-w-md mx-auto mb-4">
              Try adjusting your keyword search or clearing your category filters to view all current openings.
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2 rounded-xl bg-signature-gradient text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSelect={(j) => setActiveJob(j)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Employer Section: Post a Job Pricing & Form */}
      <section id="post-a-job" className="py-20 bg-[#FBE9E4] border-t border-rose-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="For Employers"
            title="Recruit visionary female"
            italicWord="talent"
            titleSuffix="."
            subtitle="Reach over 1,200 engaged women leaders in BC. All job board packages are reviewed by the WORTH team within 24 business hours to ensure transparent compensation."
          />

          {/* Pricing tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {PRICING.employerJobs.map((pkg) => (
              <PricingCard
                key={pkg.id}
                name={pkg.name}
                priceFormatted={pkg.priceFormatted}
                cadence={pkg.duration}
                description={pkg.description}
                features={pkg.features}
                isPopular={pkg.isPopular}
                ctaLabel="Select Posting Package"
                onSelect={() =>
                  onOpenApplication({
                    type: 'post-job',
                    contextData: { title: `${pkg.name} (${pkg.priceFormatted})` },
                  })
                }
              />
            ))}
          </div>

          {/* Employer Guarantee Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-rose-200/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="space-y-1">
              <h4 className="font-jost text-lg font-bold text-[#1F1A1C] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#EC5F8B]" />
                <span>Our Pay Transparency Standard</span>
              </h4>
              <p className="text-xs text-[#6B5E62] leading-relaxed max-w-xl">
                WORTH strictly requires transparent wage or salary bands on all approved postings. We believe equitable compensation disclosure builds trust and drives superior candidate applications.
              </p>
            </div>
            <button
              onClick={() =>
                onOpenApplication({
                  type: 'post-job',
                  contextData: { title: 'Featured Job Posting ($179)' },
                })
              }
              className="px-6 py-3 rounded-xl bg-signature-gradient text-white text-xs font-semibold shadow-md shrink-0 hover:opacity-95"
            >
              Post an Open Position
            </button>
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      {activeJob && (
        <Modal
          isOpen={!!activeJob}
          onClose={() => setActiveJob(null)}
          title={activeJob.title}
          subtitle={`${activeJob.company} · ${activeJob.location}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6">
            {/* Meta Ribbon */}
            <div className="p-4 rounded-xl bg-[#FBE9E4] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#D6336C]" />
                <span className="font-bold text-[#1F1A1C]">{activeJob.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-[#6B5E62]">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeJob.type}</span>
                <span>·</span>
                <span>Posted {activeJob.postedDate}</span>
              </div>
            </div>

            {/* Overview */}
            <div>
              <h4 className="font-jost text-sm font-bold uppercase tracking-wider text-[#9C1F5A] mb-2">
                Position Overview
              </h4>
              <p className="text-xs sm:text-sm text-[#1F1A1C]/85 leading-relaxed">
                {activeJob.description}
              </p>
            </div>

            {/* Key Responsibilities */}
            {activeJob.responsibilities && (
              <div>
                <h4 className="font-jost text-sm font-bold uppercase tracking-wider text-[#9C1F5A] mb-2">
                  Key Responsibilities
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#1F1A1C]/85">
                  {activeJob.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#D6336C] shrink-0 mt-1" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {activeJob.requirements && (
              <div>
                <h4 className="font-jost text-sm font-bold uppercase tracking-wider text-[#9C1F5A] mb-2">
                  Qualifications & Experience
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#1F1A1C]/85">
                  {activeJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#EC5F8B] font-bold">·</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Perks & Benefits */}
            {activeJob.perks && (
              <div className="p-4 rounded-xl bg-white border border-rose-100">
                <h4 className="font-jost text-xs font-bold uppercase tracking-wider text-[#1F1A1C] mb-2">
                  Compensation & Workplace Perks
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#6B5E62]">
                  {activeJob.perks.map((p, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-[#EC5F8B]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Apply Action */}
            <div className="pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#6B5E62]">
                Application routed directly to hiring manager at {activeJob.company}
              </span>

              <button
                onClick={() => {
                  const jobToApply = activeJob;
                  setActiveJob(null);
                  onOpenApplication({ type: 'job', contextData: jobToApply });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-signature-gradient text-white font-semibold text-xs shadow-md hover:opacity-95"
              >
                Submit Application Now
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
