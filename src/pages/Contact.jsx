import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Phone } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'General Inquiries',
    organization: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inquiryOptions = [
    'General Inquiries & Membership',
    'Corporate Partnerships & Sponsorship',
    'Media, Speaking & Press',
    'WORTH Academy & Mentorship Inquiries',
    'Scholarship Foundation Donors',
  ];

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
        particleCount: 65,
        spread: 55,
        origin: { y: 0.6 },
        colors: ['#F2994A', '#EC5F8B', '#D6336C'],
      });
    }, 700);
  };

  return (
    <div className="pt-28 pb-20 bg-[#FDF7F4]">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-[#FBE9E4] border-b border-rose-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Connect With Us"
            title="We’d love to hear from"
            italicWord="you"
            titleSuffix="."
            subtitle="Whether you are an aspiring leader, a corporate partner exploring sponsorship, or a journalist covering women in British Columbia hospitality, reach out to our team."
            className="mb-0"
          />
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="font-jost text-2xl font-bold text-[#1F1A1C] mb-3">
                WORTH Association
              </h3>
              <p className="text-sm text-[#6B5E62] leading-relaxed">
                Registered non-profit society in British Columbia, Canada (Society No. S0069800).
              </p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FBE9E4] text-[#D6336C] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1F1A1C]">Headquarters & Mailing</h4>
                  <p className="text-[#6B5E62] text-xs sm:text-sm mt-0.5 leading-relaxed">
                    Suite 400 – 1055 West Hastings Street<br />
                    Vancouver, BC V6E 2E9, Canada
                  </p>
                  <p className="text-[11px] text-[#9C1F5A] mt-1 font-medium">
                    Traditional Coast Salish Territories
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FBE9E4] text-[#D6336C] shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1F1A1C]">Direct Email Inquiries</h4>
                  <p className="text-[#6B5E62] text-xs sm:text-sm mt-0.5">
                    General: hello@worthassociation.com<br />
                    Partnerships: partnerships@worthassociation.com<br />
                    Press & Media: media@worthassociation.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FBE9E4] text-[#D6336C] shrink-0 mt-0.5">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1F1A1C]">Response Time Commitment</h4>
                  <p className="text-[#6B5E62] text-xs sm:text-sm mt-0.5 leading-relaxed">
                    Our team reviews all incoming notes and responds within 24 to 48 business hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Box */}
            <div className="p-6 rounded-2xl bg-[#FBE9E4]/60 border border-rose-200/50 space-y-2">
              <h4 className="font-jost text-sm font-bold text-[#1F1A1C]">
                Looking for Yes Shef Vancouver tickets?
              </h4>
              <p className="text-xs text-[#6B5E62] leading-relaxed">
                Tickets for our November 18, 2026 event at Fairmont Pacific Rim can be reserved directly on our Events page.
              </p>
            </div>
          </div>

          {/* Right Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-rose-200/60 shadow-lg">
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#FBE9E4] text-[#D6336C] flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-jost text-2xl font-bold text-[#1F1A1C]">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-[#6B5E62] max-w-md mx-auto">
                    Thank you, {formData.name}. Your note regarding &ldquo;{formData.inquiryType}&rdquo; has been routed to our leadership team. We will be in touch shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        inquiryType: 'General Inquiries',
                        organization: '',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-signature-gradient text-white text-xs font-semibold shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Inquiry Type Selector */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-[#9C1F5A] mb-1.5">
                      What is your inquiry regarding?
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#FDF7F4] border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
                    >
                      {inquiryOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        placeholder="Sarah Jenkins"
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sarah@company.ca"
                        className="w-full px-3.5 py-2.5 bg-[#FDF7F4] border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
                      />
                    </div>
                  </div>

                  {/* Phone & Organization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (604) 555-0192"
                        className="w-full px-3.5 py-2.5 bg-[#FDF7F4] border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                        Organization / Hotel Property
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="e.g. Whistler Lodge"
                        className="w-full px-3.5 py-2.5 bg-[#FDF7F4] border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows="4"
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can our team support you or your team?"
                      className="w-full px-3.5 py-2.5 bg-[#FDF7F4] border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl bg-signature-gradient text-white text-sm font-semibold shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isLoading ? 'Transmitting Note...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
