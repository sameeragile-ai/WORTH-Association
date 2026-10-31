import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Heart, Users, Award, BookOpen, Handshake } from 'lucide-react';
import SmartImage from './SmartImage.jsx';
import IMAGES from '../data/images.js';

export default function MegaMenu({ type, isOpen, onClose }) {
  if (!isOpen) return null;

  const content = {
    programs: {
      title: 'Pathways to Leadership',
      subtitle: 'Cohort education, individual sponsorship, and skill masterclasses for women at every stage.',
      items: [
        {
          title: 'WORTH Academy',
          desc: '6-Week leadership accelerator for managers and rising directors',
          icon: Award,
          path: '/programs#academy',
          badge: 'Next Cohort Oct 2026',
        },
        {
          title: 'Mentorship Program',
          desc: '1:1 intentional pairings with senior BC hospitality executives',
          icon: Users,
          path: '/programs#mentorship',
          badge: '6-Month Cycle',
        },
        {
          title: 'Scholarships & Funding',
          desc: 'Education bursaries ($1,000 to $5,000) for tuition & credentials',
          icon: Sparkles,
          path: '/programs#scholarships',
          badge: 'Dec 15 Deadline',
        },
        {
          title: 'WORTHshops',
          desc: 'Practical 90-minute operational masterclasses and tools',
          icon: BookOpen,
          path: '/programs#worthshops',
          badge: 'Upcoming: Dec 3',
        },
      ],
      featuredImage: IMAGES.academyWorkshop,
      featuredTitle: 'WORTH Academy Cohort 5',
      featuredText: 'Join 24 ambitious leaders across BC hotels, restaurants, and resorts.',
      featuredCta: 'Explore Syllabus',
      featuredPath: '/programs',
    },
    'get-involved': {
      title: 'Fuel the Movement',
      subtitle: 'Collaborate with WORTH as an employer, donor, sponsor, or volunteer.',
      items: [
        {
          title: 'Corporate Partnerships',
          desc: 'Underwrite cohorts, access talent, and champion provincial equity',
          icon: Handshake,
          path: '/get-involved#partnerships',
          badge: 'Tiered Alliances',
        },
        {
          title: 'Make a Donation',
          desc: '100% of donations directly fund scholarships and bursaries',
          icon: Heart,
          path: '/get-involved#donate',
          badge: 'Tax Deductible',
        },
        {
          title: 'Volunteer & Committees',
          desc: 'Join event production, mentorship review, or research teams',
          icon: Users,
          path: '/get-involved#volunteer',
          badge: 'Community Led',
        },
        {
          title: 'Partner Ad Space',
          desc: 'Reach thousands of decision-makers in BC tourism & recreation',
          icon: Sparkles,
          path: '/get-involved#ad-space',
          badge: 'Career & Hub Ads',
        },
      ],
      featuredImage: IMAGES.pathwayEmployers,
      featuredTitle: 'Yes Shef 2026 Sponsorship',
      featuredText: 'Brand alignment at Fairmont Pacific Rim in front of 400+ leaders.',
      featuredCta: 'View Sponsorship Tiers',
      featuredPath: '/get-involved',
    },
  }[type];

  if (!content) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-full left-1/2 -translate-x-1/2 w-[780px] max-w-[95vw] mt-2 bg-[#FDF7F4] rounded-2xl shadow-2xl border border-rose-200/60 p-6 overflow-hidden z-50 text-[#1F1A1C]"
        onMouseLeave={onClose}
      >
        <div className="grid grid-cols-12 gap-6">
          {/* Main Links Column (7 cols) */}
          <div className="col-span-7 flex flex-col justify-between">
            <div>
              <div className="mb-4 pb-3 border-b border-rose-100">
                <h3 className="font-jost text-base font-semibold text-[#1F1A1C]">
                  {content.title}
                </h3>
                <p className="text-xs text-[#6B5E62] mt-0.5">{content.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {content.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={onClose}
                      className="group p-2.5 rounded-xl hover:bg-[#FBE9E4]/60 transition-colors flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-white border border-rose-100 text-[#EC5F8B] group-hover:bg-signature-gradient group-hover:text-white transition-all shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#1F1A1C] group-hover:text-[#D6336C] transition-colors">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9C1F5A] bg-[#FBE9E4] px-1.5 py-0.5 rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6B5E62] line-clamp-1 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-fraunces italic text-[#6B5E62]">
                Educate · Elevate · Engage
              </span>
              <Link
                to={type === 'programs' ? '/programs' : '/get-involved'}
                onClick={onClose}
                className="text-xs font-semibold text-[#D6336C] hover:text-[#9C1F5A] flex items-center gap-1 transition-colors"
              >
                View all {type === 'programs' ? 'Programs' : 'Opportunities'}{' '}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Featured Card Column (5 cols) */}
          <div className="col-span-5 bg-[#FBE9E4]/60 rounded-xl p-4 flex flex-col justify-between border border-rose-200/40">
            <div>
              <div className="rounded-lg overflow-hidden h-36 mb-3 relative shadow-sm">
                <SmartImage
                  src={content.featuredImage.url}
                  alt={content.featuredImage.alt}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] uppercase tracking-wider font-bold text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                  Spotlight
                </span>
              </div>
              <h4 className="font-jost text-sm font-bold text-[#1F1A1C] mb-1">
                {content.featuredTitle}
              </h4>
              <p className="text-xs text-[#6B5E62] leading-relaxed">
                {content.featuredText}
              </p>
            </div>

            <Link
              to={content.featuredPath}
              onClick={onClose}
              className="mt-3 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg bg-signature-gradient text-white shadow-sm hover:opacity-95 transition-opacity"
            >
              <span>{content.featuredCta}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
