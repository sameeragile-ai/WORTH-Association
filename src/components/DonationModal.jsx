import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, CheckCircle2, ShieldCheck } from 'lucide-react';
import Modal from './Modal.jsx';
import { PRICING, formatCAD } from '../data/pricing.js';

export default function DonationModal({ isOpen, onClose }) {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!finalAmount || finalAmount <= 0) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F2994A', '#EC5F8B', '#D6336C', '#9C1F5A'],
      });
    }, 800);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setCustomAmount('');
    setSelectedAmount(100);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={isSuccess ? 'Thank You for Your Generosity' : 'Support Women in Hospitality'}
      subtitle={
        isSuccess
          ? 'Your donation directly powers education scholarships across British Columbia.'
          : 'WORTH Association is a registered non-profit society in British Columbia (Society No. S0069800).'
      }
      maxWidth="max-w-lg"
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FBE9E4] text-[#D6336C] flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h4 className="font-jost text-2xl font-bold text-[#1F1A1C]">
              {formatCAD(finalAmount)} {frequency === 'monthly' ? '/ month' : ''} Confirmed
            </h4>
            <p className="text-sm text-[#6B5E62]">
              A confirmation receipt and tax receipt has been sent to{' '}
              <span className="font-semibold text-[#1F1A1C]">{email || 'your email'}</span>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FBE9E4]/60 text-xs text-[#6B5E62] leading-relaxed text-left border border-rose-200/50">
            <p className="font-semibold text-[#1F1A1C] mb-1">Your Impact in Action:</p>
            <p>
              Your contribution underwrites curriculum materials, bursary funds, and 1:1 mentorship access for female cooks, servers, sommeliers, and tourism guides advancing their careers.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl bg-signature-gradient text-white font-semibold text-sm shadow-md hover:opacity-95 transition-opacity"
          >
            Return to WORTH
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Frequency selector */}
          <div className="grid grid-cols-2 p-1 bg-[#FBE9E4] rounded-xl text-xs font-semibold text-[#6B5E62]">
            <button
              type="button"
              onClick={() => setFrequency('one-time')}
              className={`py-2 rounded-lg transition-all ${
                frequency === 'one-time'
                  ? 'bg-white text-[#1F1A1C] shadow-sm'
                  : 'hover:text-[#1F1A1C]'
              }`}
            >
              One-Time Gift
            </button>
            <button
              type="button"
              onClick={() => setFrequency('monthly')}
              className={`py-2 rounded-lg transition-all ${
                frequency === 'monthly'
                  ? 'bg-white text-[#1F1A1C] shadow-sm'
                  : 'hover:text-[#1F1A1C]'
              }`}
            >
              Monthly Champion
            </button>
          </div>

          {/* Preset Buttons */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#9C1F5A] mb-2">
              Select Donation Amount (CAD)
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {PRICING.donationPresets.map((amt) => {
                const isSelected = selectedAmount === amt && !customAmount;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-signature-gradient text-white shadow-md'
                        : 'bg-white border border-rose-200/60 text-[#1F1A1C] hover:bg-[#FBE9E4]'
                    }`}
                  >
                    ${amt}
                  </button>
                );
              })}
            </div>

            {/* Custom Amount input */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#6B5E62]">
                $
              </span>
              <input
                type="number"
                min="5"
                step="5"
                placeholder="Other custom amount (CAD)"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="w-full pl-8 pr-4 py-2.5 bg-white border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] placeholder:text-[#6B5E62]/60 focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
              />
            </div>
          </div>

          {/* Donor Information */}
          <div className="space-y-3 pt-2 border-t border-rose-100">
            <div>
              <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-3.5 py-2.5 bg-white border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F1A1C] mb-1">
                Email Address (for official receipt)
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.ca"
                className="w-full px-3.5 py-2.5 bg-white border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-[#EC5F8B] focus:ring-[#EC5F8B]"
              />
              <span className="text-xs text-[#6B5E62]">
                Keep my donation anonymous on our annual donor wall
              </span>
            </label>
          </div>

          {/* Secure note & Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || !finalAmount}
              className="w-full py-3.5 px-6 rounded-xl bg-signature-gradient text-white font-semibold text-sm shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>
                {isLoading
                  ? 'Processing Donation...'
                  : `Donate ${formatCAD(finalAmount)} CAD`}
              </span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6B5E62] mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#EC5F8B]" />
              <span>256-bit SSL encrypted · Eligible for Canadian tax credit</span>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
}
