import { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Ticket,
  Flame,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import SmartImage from '../components/SmartImage.jsx';
import EventCard from '../components/EventCard.jsx';
import { EVENTS } from '../data/events.js';
import { useCountdown } from '../hooks/useCountdown.js';
import IMAGES from '../data/images.js';

export default function Events({ onOpenApplication }) {
  const featuredEvent = EVENTS[0]; // Yes Shef Vancouver 2026
  const countdown = useCountdown(featuredEvent.targetDateIso);

  return (
    <div className="pt-28 pb-20 bg-[#FDF7F4]">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-[#FBE9E4] border-b border-rose-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Signature Gatherings"
            title="Where connections become lifelong"
            italicWord="alliances"
            titleSuffix="."
            subtitle="Join our community of hospitality leaders, chefs, general managers, and tourism champions at our signature galas, conferences, and intimate morning roundtables."
            className="mb-0"
          />
        </div>
      </section>

      {/* FEATURED EVENT HERO: Yes Shef Vancouver with Live Countdown Timer */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#1F1A1C] text-white shadow-2xl border border-rose-950/40">
          {/* Background Image Scrim */}
          <div className="absolute inset-0 z-0">
            <SmartImage
              src={IMAGES.yesShefEvent.url}
              alt={IMAGES.yesShefEvent.alt}
              className="w-full h-full opacity-40 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1F1A1C] via-[#1F1A1C]/90 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-signature-gradient text-white text-xs font-bold uppercase tracking-wider shadow-md">
              <Flame className="w-3.5 h-3.5" />
              <span>Flagship Annual Gala · Tickets Now Live</span>
            </div>

            <h2 className="font-jost text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Yes Shef Vancouver{' '}
              <span className="font-fraunces italic font-normal text-gradient">
                2026
              </span>
            </h2>

            <p className="font-fraunces italic text-lg sm:text-xl text-[#F2994A]">
              November 18, 2026 at Fairmont Pacific Rim
            </p>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              British Columbia’s premier culinary tasting pavilion celebrating over 15 acclaimed female executive chefs, master pastry creators, and lead sommeliers. Raising funds for 2027 educational scholarships.
            </p>

            {/* LIVE COUNTDOWN TIMER */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-200 block mb-2">
                Countdown to Doors Open (5:30 PM PST)
              </span>
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md">
                <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                  <span className="font-jost text-2xl sm:text-4xl font-black block text-white tabular-nums">
                    {countdown.days}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider">
                    Days
                  </span>
                </div>
                <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                  <span className="font-jost text-2xl sm:text-4xl font-black block text-white tabular-nums">
                    {countdown.hours}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider">
                    Hours
                  </span>
                </div>
                <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                  <span className="font-jost text-2xl sm:text-4xl font-black block text-white tabular-nums">
                    {countdown.minutes}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider">
                    Mins
                  </span>
                </div>
                <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                  <span className="font-jost text-2xl sm:text-4xl font-black block text-white tabular-nums text-[#F2994A]">
                    {countdown.seconds}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider">
                    Secs
                  </span>
                </div>
              </div>
            </div>

            {/* Ticket Tier Options Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/15">
              {featuredEvent.pricingTiers.map((tier) => (
                <div
                  key={tier.id}
                  className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white">{tier.name}</span>
                      <span className="font-jost text-lg font-black text-amber-300">
                        {tier.priceFormatted}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mb-3">{tier.description}</p>
                  </div>
                  <button
                    onClick={() =>
                      onOpenApplication({
                        type: 'event',
                        contextData: { ...featuredEvent, defaultTier: tier.id },
                      })
                    }
                    className="w-full py-2 rounded-xl bg-white text-[#1F1A1C] hover:bg-[#FDF7F4] text-xs font-bold transition-colors text-center"
                  >
                    Select {tier.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full Events Calendar List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Upcoming Calendar"
          title="All scheduled gatherings &"
          italicWord="summits"
          titleSuffix="."
          subtitle="Reserve tickets for the WORTH Annual Leadership Summit, regional roundtables, and virtual masterclasses."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={(ev) =>
                onOpenApplication({ type: 'event', contextData: ev })
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
