import { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Send, ArrowRight } from 'lucide-react';
import Modal from './Modal.jsx';

export default function ApplicationModal({
  isOpen,
  onClose,
  type = 'general', // 'event' | 'academy' | 'mentorship' | 'scholarship' | 'job' | 'sponsor' | 'volunteer' | 'post-job'
  contextData = null,
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    experienceYears: '3–5 years',
    notes: '',
    ticketTier: '',
    selectedTier: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const titles = {
    event: contextData ? `Register: ${contextData.title}` : 'Event Registration',
    academy: 'Apply for WORTH Academy',
    mentorship: 'Apply for Mentorship Program',
    scholarship: 'Apply for Education Scholarship',
    job: contextData ? `Apply: ${contextData.title}` : 'Job Application',
    'post-job': 'Submit Employer Job Posting',
    sponsor: 'Enquire About Corporate Partnership',
    volunteer: 'Join WORTH as a Volunteer',
    general: 'Get in Touch with WORTH',
  };

  const subtitles = {
    event: contextData
      ? `${contextData.date} · ${contextData.venue}`
      : 'Secure your registration for upcoming WORTH gatherings.',
    academy: '6-Week cohort accelerator for managers and rising hospitality directors.',
    mentorship: '6-Month intentional 1:1 matching with senior BC industry leaders.',
    scholarship: 'Non-repayable grants ($1,000 to $5,000) for tuition & credentials.',
    job: contextData ? `${contextData.company} · ${contextData.location}` : 'Career application.',
    'post-job': 'Reviewed by the WORTH team within 24 hours before going live.',
    sponsor: 'Collaborate with WORTH to advance industry equity and connect with 1,200+ leaders.',
    volunteer: 'Support event production, committees, or mentorship coordination.',
    general: 'Reach out to our leadership team.',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F2994A', '#EC5F8B', '#D6336C'],
      });
    }, 700);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      role: '',
      experienceYears: '3–5 years',
      notes: '',
      ticketTier: '',
      selectedTier: '',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isSuccess ? 'Submission Received!' : titles[type] || titles.general}
      subtitle={isSuccess ? 'Thank you for connecting with WORTH Association.' : subtitles[type] || subtitles.general}
      maxWidth="max-w-lg"
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FBE9E4] text-[#D6336C] flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h4 className="font-jost text-2xl font-bold text-[#1F1A1C]">
              We have received your details!
            </h4>
            <p className="text-sm text-[#6B5E62]">
              A confirmation email has been dispatched to{' '}
              <span className="font-semibold text-[#1F1A1C]">{formData.email || 'your email'}</span>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FBE9E4]/60 text-xs text-[#6B5E62] leading-relaxed text-left border border-rose-200/50">
            <p className="font-semibold text-[#1F1A1C] mb-1">What happens next?</p>
            <p>
              Our program coordinators review all applications within two business days. You will receive an onboarding packet or invoice directly in your inbox.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-full py-3 rounded-xl bg-signature-gradient text-white font-semibold text-sm shadow-md hover:opacity-95 transition-opacity"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* If event and has pricing tiers, let user select tier */}
          {type === 'event' && contextData?.pricingTiers && (
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#9C1F5A] mb-1.5">
                Select Ticket Tier
              </label>
              <div className="space-y-2">
                {contextData.pricingTiers.map((tier) => (
                  <label
                    key={tier.id}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      formData.ticketTier === tier.id
                        ? 'bg-[#FBE9E4] border-[#EC5F8B] shadow-sm'
                        : 'border-rose-100 hover:bg-[#FBE9E4]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="ticketTier"
                        value={tier.id}
                        defaultChecked={tier.isPopular}
                        onChange={handleChange}
                        className="text-[#EC5F8B] focus:ring-[#EC5F8B]"
                      />
                      <div>
                        <span className="font-bold text-[#1F1A1C]">{tier.name}</span>
                        <p className="text-[11px] text-[#6B5E62] line-clamp-1">{tier.description}</p>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-[#1F1A1C] shrink-0 ml-2">
                      {tier.priceFormatted}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className="w-full px-3.5 py-2.5 bg-white border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@company.ca"
                className="w-full px-3.5 py-2.5 bg-white border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
              />
            </div>
          </div>

          {/* Organization & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                Current Employer / Property
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="e.g. Fairmont / Independent"
                className="w-full px-3.5 py-2.5 bg-white border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                Current Role / Title
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Assistant General Manager"
                className="w-full px-3.5 py-2.5 bg-white border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
              />
            </div>
          </div>

          {/* Industry Experience dropdown */}
          <div>
            <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
              Years in Recreation, Tourism or Hospitality
            </label>
            <select
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-white border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
            >
              <option value="Under 2 years">Under 2 years (Student / Emerging)</option>
              <option value="3–5 years">3–5 years (Supervisory / Lead)</option>
              <option value="6–10 years">6–10 years (Department Head / Manager)</option>
              <option value="10+ years">10+ years (Director / Executive / Owner)</option>
            </select>
          </div>

          {/* Statement / Message */}
          <div>
            <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
              {type === 'scholarship'
                ? 'Brief statement of study or credential intent'
                : type === 'post-job'
                ? 'Job Title, Salary Range & Application Link'
                : type === 'sponsor'
                ? 'Which partnership level aligns with your goals?'
                : 'What are you hoping to gain or contribute?'}
            </label>
            <textarea
              rows="3"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Tell us a little about your aspirations or questions..."
              className="w-full px-3.5 py-2.5 bg-white border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B] resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-signature-gradient text-white font-semibold text-sm shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isLoading ? 'Submitting Application...' : 'Submit Application'}</span>
            </button>
            <p className="text-[11px] text-[#6B5E62] text-center mt-2">
              By submitting, you agree to receive WORTH Association updates. You can unsubscribe anytime.
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
}
