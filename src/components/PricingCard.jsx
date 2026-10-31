import { Check, Sparkles } from 'lucide-react';

export default function PricingCard({
  name,
  priceFormatted,
  cadence,
  description,
  features = [],
  isPopular = false,
  ctaLabel = 'Select Package',
  onSelect,
}) {
  return (
    <div
      className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
        isPopular
          ? 'bg-white shadow-xl ring-2 ring-[#EC5F8B] lg:-translate-y-2'
          : 'bg-[#FDF7F4] shadow-sm hover:shadow-md border border-rose-200/50'
      }`}
    >
      {/* Most Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-signature-gradient text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Most Popular</span>
        </div>
      )}

      <div>
        <div className="mb-4">
          <h3 className="font-jost text-xl font-bold text-[#1F1A1C]">{name}</h3>
          <p className="text-xs text-[#6B5E62] mt-1 min-h-[36px]">{description}</p>
        </div>

        {/* Price Lockup */}
        <div className="mb-6 pb-6 border-b border-rose-100 flex items-baseline gap-1.5">
          <span className="font-jost text-4xl sm:text-5xl font-black text-[#1F1A1C] tracking-tight">
            {priceFormatted}
          </span>
          {cadence && (
            <span className="text-xs text-[#6B5E62] font-medium">/ {cadence}</span>
          )}
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#9C1F5A]">
            What’s Included:
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#1F1A1C]/85">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="mt-0.5 rounded-full p-0.5 bg-[#FBE9E4] text-[#D6336C] shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={onSelect}
        className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95 ${
          isPopular
            ? 'bg-signature-gradient text-white shadow-md hover:opacity-95'
            : 'bg-white text-[#1F1A1C] hover:bg-[#FBE9E4] border border-rose-200/80'
        }`}
      >
        {ctaLabel}
      </button>
    </div>
  );
}
