import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import SmartImage from './SmartImage.jsx';

export default function EventCard({ event, onRegister }) {
  const minPrice =
    event.pricingTiers && event.pricingTiers.length > 0
      ? event.pricingTiers[0].priceFormatted
      : 'Free';

  return (
    <div className="group bg-[#FDF7F4] rounded-2xl border border-rose-200/50 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Frame */}
        <div className="relative h-48 overflow-hidden">
          <SmartImage
            src={event.image.url}
            alt={event.image.alt}
            className="w-full h-full"
            imgClassName="group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Category Tag & Status */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[11px] font-bold">
            <span className="px-2.5 py-1 rounded-full bg-white/90 text-[#1F1A1C] backdrop-blur-sm shadow-sm">
              {event.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
              {event.status}
            </span>
          </div>

          {/* Date Overlay */}
          <div className="absolute bottom-3 left-3 text-white">
            <span className="text-xs font-semibold uppercase tracking-wider block text-amber-200">
              {event.date}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-3">
          <h3 className="font-jost text-xl font-bold text-[#1F1A1C] group-hover:text-[#D6336C] transition-colors leading-snug">
            {event.title}
          </h3>

          {/* Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B5E62]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#EC5F8B]" /> {event.time}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#EC5F8B]" /> {event.venue}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#6B5E62] leading-relaxed line-clamp-2">
            {event.description}
          </p>
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="p-5 sm:p-6 pt-0 mt-2 flex items-center justify-between border-t border-rose-100/60">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#6B5E62] block">
            Tickets from
          </span>
          <span className="font-jost text-lg font-black text-[#1F1A1C]">
            {minPrice}
          </span>
        </div>

        <button
          onClick={() => onRegister(event)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-rose-200 text-[#1F1A1C] group-hover:bg-signature-gradient group-hover:text-white group-hover:border-transparent transition-all shadow-sm"
        >
          <span>Get Tickets</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
