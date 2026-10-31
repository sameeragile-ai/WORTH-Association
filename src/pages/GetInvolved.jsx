import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Heart,
  Handshake,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Send,
  Building,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import SectionHeading from '../components/SectionHeading.jsx';
import PricingCard from '../components/PricingCard.jsx';
import { PRICING, formatCAD } from '../data/pricing.js';

export default function GetInvolved({ onOpenDonate, onOpenApplication }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elem = document.querySelector(location.hash);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // In-page donation form state
  const [donateAmount, setDonateAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [donateFreq, setDonateFreq] = useState('one-time');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donateLoading, setDonateLoading] = useState(false);
  const [donateSuccess, setDonateSuccess] = useState(false);

  // Volunteer form state
  const [volName, setVolName] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volInterest, setVolInterest] = useState('Event Production (Yes Shef)');
  const [volNotes, setVolNotes] = useState('');
  const [volLoading, setVolLoading] = useState(false);
  const [volSuccess, setVolSuccess] = useState(false);

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : donateAmount;

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    if (!effectiveAmount || effectiveAmount <= 0) return;
    setDonateLoading(true);
    setTimeout(() => {
      setDonateLoading(false);
      setDonateSuccess(true);
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#F2994A', '#EC5F8B', '#D6336C'],
      });
    }, 700);
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    setVolLoading(true);
    setTimeout(() => {
      setVolLoading(false);
      setVolSuccess(true);
    }, 600);
  };

  return (
    <div className="pt-28 pb-20 bg-[#FDF7F4]">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-[#FBE9E4] border-b border-rose-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Collective Action"
            title="Every voice, gift, and partnership builds our"
            italicWord="future"
            titleSuffix="."
            subtitle="Explore how employers, industry pioneers, individual allies, and volunteers fuel the WORTH mission across British Columbia."
            className="mb-0"
          />
        </div>
      </section>

      {/* 1. Corporate Partnerships & Tiered Sponsorship */}
      <section id="partnerships" className="py-20 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Corporate Alliances"
            title="Sponsor cohorts & champion"
            italicWord="equity"
            titleSuffix="."
            subtitle="Demonstrate concrete corporate leadership. Our partners underwrite WORTH Academy cohorts, endow scholarships, and connect with BC’s most promising leaders."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.sponsorshipTiers.map((tier) => (
              <PricingCard
                key={tier.id}
                name={tier.name}
                priceFormatted={tier.priceFormatted}
                cadence="annual alliance"
                description={tier.description}
                features={tier.features}
                isPopular={tier.isPopular}
                ctaLabel="Enquire About Tier"
                onSelect={() =>
                  onOpenApplication({
                    type: 'sponsor',
                    contextData: { title: `${tier.name} (${tier.priceFormatted})` },
                  })
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Donate Section */}
      <section id="donate" className="py-20 bg-[#FBE9E4] border-b border-rose-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#9C1F5A]">
              Philanthropy
            </span>
            <h2 className="font-jost text-3xl sm:text-5xl font-bold text-[#1F1A1C] mt-2">
              Invest in a woman’s{' '}
              <span className="font-fraunces italic font-normal text-gradient">
                potential
              </span>
            </h2>
            <p className="text-sm text-[#6B5E62] max-w-xl mx-auto mt-3">
              100% of individual gifts directly underwrite mentorship bursaries and scholarships for female cooks, sommeliers, and hospitality students across British Columbia.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-rose-200/60">
            {donateSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FBE9E4] text-[#D6336C] flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-jost text-2xl font-bold text-[#1F1A1C]">
                  Thank you, {donorName || 'Champion'}!
                </h3>
                <p className="text-sm text-[#6B5E62] max-w-md mx-auto">
                  Your gift of {formatCAD(effectiveAmount)}{' '}
                  {donateFreq === 'monthly' ? 'monthly' : ''} is confirmed. A tax receipt has been sent to{' '}
                  <span className="font-semibold text-[#1F1A1C]">{donorEmail}</span>.
                </p>
                <button
                  onClick={() => setDonateSuccess(false)}
                  className="px-6 py-2.5 rounded-full bg-signature-gradient text-white text-xs font-semibold shadow-md"
                >
                  Make Another Contribution
                </button>
              </div>
            ) : (
              <form onSubmit={handleDonateSubmit} className="space-y-6">
                {/* Frequency */}
                <div className="grid grid-cols-2 p-1 bg-[#FBE9E4] rounded-xl text-xs font-semibold text-[#6B5E62] max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => setDonateFreq('one-time')}
                    className={`py-2 rounded-lg transition-all ${
                      donateFreq === 'one-time'
                        ? 'bg-white text-[#1F1A1C] shadow-sm'
                        : 'hover:text-[#1F1A1C]'
                    }`}
                  >
                    One-Time Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonateFreq('monthly')}
                    className={`py-2 rounded-lg transition-all ${
                      donateFreq === 'monthly'
                        ? 'bg-white text-[#1F1A1C] shadow-sm'
                        : 'hover:text-[#1F1A1C]'
                    }`}
                  >
                    Monthly Champion
                  </button>
                </div>

                {/* Amount presets */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#9C1F5A] mb-2 text-center">
                    Select Donation Tier (CAD)
                  </label>
                  <div className="grid grid-cols-4 gap-2.5 max-w-md mx-auto mb-3">
                    {PRICING.donationPresets.map((amt) => {
                      const isSel = donateAmount === amt && !customAmount;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setDonateAmount(amt);
                            setCustomAmount('');
                          }}
                          className={`py-3 rounded-xl text-sm font-bold transition-all ${
                            isSel
                              ? 'bg-signature-gradient text-white shadow-md'
                              : 'bg-[#FDF7F4] border border-rose-200/80 text-[#1F1A1C] hover:bg-rose-100'
                          }`}
                        >
                          ${amt}
                        </button>
                      );
                    })}
                  </div>

                  <div className="max-w-md mx-auto relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#6B5E62]">
                      $
                    </span>
                    <input
                      type="number"
                      min="5"
                      step="5"
                      placeholder="Or enter custom CAD amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setDonateAmount(null);
                      }}
                      className="w-full pl-8 pr-4 py-2.5 bg-[#FDF7F4] border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
                    />
                  </div>
                </div>

                {/* Donor Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-4 border-t border-rose-100">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 bg-[#FDF7F4] border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="jane@example.ca"
                      className="w-full px-3.5 py-2.5 bg-[#FDF7F4] border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
                    />
                  </div>
                </div>

                <div className="max-w-xl mx-auto">
                  <button
                    type="submit"
                    disabled={donateLoading || !effectiveAmount}
                    className="w-full py-4 px-6 rounded-xl bg-signature-gradient text-white font-semibold text-sm shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-white/20" />
                    <span>
                      {donateLoading
                        ? 'Processing Donation...'
                        : `Complete Contribution of ${formatCAD(effectiveAmount)} CAD`}
                    </span>
                  </button>
                  <p className="text-[11px] text-[#6B5E62] text-center mt-2.5">
                    WORTH Association is a registered non-profit society in BC (Society No. S0069800). Official receipt emailed immediately.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. Partner Ad Space Packages */}
      <section id="ad-space" className="py-20 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Targeted Reach"
            title="Partner ad space &"
            italicWord="visibility"
            titleSuffix="."
            subtitle="Promote your hospitality brand, tourism services, or culinary offerings directly to hundreds of verified industry decision-makers."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {PRICING.partnerAds.map((ad) => (
              <PricingCard
                key={ad.id}
                name={ad.name}
                priceFormatted={ad.priceFormatted}
                cadence={ad.cadence}
                description={ad.description}
                features={ad.features}
                isPopular={ad.isPopular}
                ctaLabel="Request a Spot"
                onSelect={() =>
                  onOpenApplication({
                    type: 'sponsor',
                    contextData: { title: `Ad Space: ${ad.name}` },
                  })
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Volunteer Form */}
      <section id="volunteer" className="py-20 bg-[#FDF7F4]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#9C1F5A]">
              Grassroots Impact
            </span>
            <h2 className="font-jost text-3xl sm:text-4xl font-bold text-[#1F1A1C] mt-2">
              Volunteer with{' '}
              <span className="font-fraunces italic font-normal text-gradient">
                WORTH
              </span>
            </h2>
            <p className="text-sm text-[#6B5E62] mt-2">
              From day-of coordination at Yes Shef Vancouver to serving on our scholarship jury, our community thrives through volunteers.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-rose-200/60 shadow-md">
            {volSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#FBE9E4] text-[#D6336C] flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-jost text-2xl font-bold text-[#1F1A1C]">
                  Volunteer Application Received!
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5E62]">
                  Thank you, {volName}. Our community manager will reach out with upcoming volunteer schedules.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={volName}
                      onChange={(e) => setVolName(e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full px-3.5 py-2.5 bg-[#FDF7F4] border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={volEmail}
                      onChange={(e) => setVolEmail(e.target.value)}
                      placeholder="jane@example.ca"
                      className="w-full px-3.5 py-2.5 bg-[#FDF7F4] border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                    Areas of Interest
                  </label>
                  <select
                    value={volInterest}
                    onChange={(e) => setVolInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FDF7F4] border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
                  >
                    <option value="Event Production (Yes Shef)">
                      Event Production & Guest Experience (Yes Shef Gala)
                    </option>
                    <option value="Scholarship Review Committee">
                      Scholarship & Bursary Review Committee
                    </option>
                    <option value="Mentorship Facilitation">
                      Mentorship Program Cohort Facilitation
                    </option>
                    <option value="Social Media & Storytelling">
                      Content, Photography & Social Storytelling
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                    Tell us about your background & availability
                  </label>
                  <textarea
                    rows="3"
                    value={volNotes}
                    onChange={(e) => setVolNotes(e.target.value)}
                    placeholder="e.g. 5 years in hotel banquets, available weekends..."
                    className="w-full px-3.5 py-2.5 bg-[#FDF7F4] border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={volLoading}
                  className="w-full py-3.5 rounded-xl bg-signature-gradient text-white text-sm font-semibold shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{volLoading ? 'Submitting...' : 'Join as Volunteer'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
