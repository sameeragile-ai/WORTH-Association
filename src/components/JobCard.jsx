import { MapPin, DollarSign, Clock, ArrowRight } from 'lucide-react';

export default function JobCard({ job, onSelect }) {
  return (
    <div
      onClick={() => onSelect(job)}
      className="group bg-[#FDF7F4] rounded-2xl p-5 sm:p-6 border border-rose-200/50 hover:border-[#EC5F8B] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Kicker */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-[#9C1F5A] tracking-wider uppercase">
            {job.category}
          </span>
          {job.featured && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FBE9E4] text-[#D6336C]">
              Featured
            </span>
          )}
        </div>

        {/* Title & Company */}
        <h3 className="font-jost text-lg sm:text-xl font-bold text-[#1F1A1C] group-hover:text-[#D6336C] transition-colors leading-snug">
          {job.title}
        </h3>
        <p className="text-sm font-semibold text-[#6B5E62] mt-0.5">{job.company}</p>

        {/* Clean Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B5E62] mt-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#EC5F8B]" /> {job.location}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#EC5F8B]" /> {job.type}
          </span>
          <span aria-hidden="true">·</span>
          <span>Posted {job.postedDate}</span>
        </div>

        {/* Short description */}
        <p className="text-xs text-[#6B5E62] mt-3 line-clamp-2 leading-relaxed">
          {job.description}
        </p>
      </div>

      {/* Salary & Action Bottom */}
      <div className="mt-5 pt-4 border-t border-rose-100 flex items-center justify-between">
        <div className="text-xs font-semibold text-[#1F1A1C] flex items-center gap-1">
          <DollarSign className="w-3.5 h-3.5 text-[#D6336C]" />
          <span>{job.salary}</span>
        </div>

        <span className="text-xs font-semibold text-[#D6336C] group-hover:text-[#9C1F5A] flex items-center gap-1 transition-colors">
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
}
