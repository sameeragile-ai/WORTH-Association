import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Heart, Mail, ExternalLink } from 'lucide-react';

export default function Footer({ onOpenDonate }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 600);
  };

  return (
    <footer className="bg-[#1F1A1C] text-[#FDF7F4] pt-16 pb-12 relative overflow-hidden border-t border-rose-950/40">
      {/* Decorative gradient blur backdrop */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#EC5F8B]/10 via-[#F2994A]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#9C1F5A]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-jost text-3xl font-black tracking-tight text-white">
                WORTH
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] block text-[#E8907E] font-medium mt-0.5">
                Women of Recreation, Tourism & Hospitality
              </span>
            </Link>

            <p className="text-sm text-[#FDF7F4]/70 leading-relaxed max-w-sm">
              A Canadian non-profit society educating, elevating, and engaging women and gender-diverse professionals across recreation, tourism, and hospitality through mentorship, leadership cohorts, and community.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 text-xs font-fraunces italic text-[#F2994A]">
                <span>Subscribe</span>
                <span>→</span>
                <span>Attend</span>
                <span>→</span>
                <span>Learn</span>
                <span>→</span>
                <span>Lead</span>
                <span>→</span>
                <span>Mentor</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenDonate}
                className="px-4 py-2 text-xs font-semibold rounded-full bg-signature-gradient text-white hover:opacity-95 transition-opacity inline-flex items-center gap-1.5 shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 fill-white/20" />
                <span>Support Our Mission</span>
              </button>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F2994A]">
              Programs
            </h4>
            <ul className="space-y-2 text-sm text-[#FDF7F4]/75">
              <li>
                <Link to="/programs#academy" className="hover:text-white transition-colors">
                  WORTH Academy
                </Link>
              </li>
              <li>
                <Link to="/programs#mentorship" className="hover:text-white transition-colors">
                  Mentorship Program
                </Link>
              </li>
              <li>
                <Link to="/programs#scholarships" className="hover:text-white transition-colors">
                  Scholarships & Grants
                </Link>
              </li>
              <li>
                <Link to="/programs#worthshops" className="hover:text-white transition-colors">
                  WORTHshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Pathways & Community (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F2994A]">
              Community
            </h4>
            <ul className="space-y-2 text-sm text-[#FDF7F4]/75">
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  Events & Yes Shef
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">
                  Career Job Board
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Resource Hub
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="hover:text-white transition-colors">
                  Corporate Partnerships
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Our Society
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Mini Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F2994A]">
              Stay Connected
            </h4>
            <p className="text-xs text-[#FDF7F4]/70 leading-relaxed">
              Receive our bi-weekly dispatch featuring leadership opportunities, scholarship deadlines, and exclusive event presales.
            </p>

            {isSubscribed ? (
              <div className="p-3.5 rounded-xl bg-[#2D2427] border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-200">
                <CheckCircle2 className="w-4 h-4 text-[#EC5F8B] shrink-0" />
                <span>Thank you for subscribing! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#EC5F8B] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#EC5F8B]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2.5 rounded-xl bg-signature-gradient text-white text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0 flex items-center gap-1"
                  >
                    <span>{loading ? 'Subscribing...' : 'Join'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-white/40">
                  Zero spam. Unsubscribe anytime in one click.
                </p>
              </form>
            )}

            <div className="pt-2 flex items-center gap-4 text-xs text-white/60">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Land Acknowledgement & Legal Footnote */}
        <div className="pt-8 space-y-4 text-xs text-[#FDF7F4]/60">
          {/* Land Acknowledgement */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 max-w-4xl">
            <p className="font-semibold text-white/80 mb-1 flex items-center gap-1.5">
              <span>Land Acknowledgement</span>
            </p>
            <p className="leading-relaxed text-[12px] text-white/70">
              WORTH operates on the traditional, ancestral and unceded territory of the Coast Salish peoples, including the Musqueam, Squamish and Tsleil-Waututh Nations. We honor their enduring stewardship of these lands and waters where we gather, recreate, and work.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] pt-4">
            <p>
              © {new Date().getFullYear()} WORTH Association. Registered nonprofit society in British Columbia, Canada | Society No. S0069800
            </p>
            <div className="flex items-center gap-4 text-white/50">
              <span>Privacy Policy</span>
              <span>·</span>
              <span>Code of Conduct</span>
              <span>·</span>
              <span>Bylaws & Governance</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
