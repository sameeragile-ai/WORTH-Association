import { BookOpen, Video, FileText, Download, ExternalLink, ArrowRight } from 'lucide-react';

export default function ResourceCard({ resource, onSelect }) {
  const getIcon = () => {
    switch (resource.category) {
      case 'Recordings':
        return Video;
      case 'Research':
        return BookOpen;
      default:
        return FileText;
    }
  };

  const Icon = getIcon();

  return (
    <div className="group bg-[#FDF7F4] rounded-2xl p-6 border border-rose-200/50 hover:border-[#EC5F8B] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Category Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#9C1F5A] tracking-wider uppercase">
            <Icon className="w-4 h-4 text-[#EC5F8B]" />
            <span>{resource.type}</span>
          </div>
          <span className="text-xs text-[#6B5E62] font-mono">{resource.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="font-jost text-lg sm:text-xl font-bold text-[#1F1A1C] group-hover:text-[#D6336C] transition-colors leading-snug">
          {resource.title}
        </h3>

        {/* Subtitle / Author */}
        <p className="text-xs text-[#9C1F5A] font-medium mt-1">
          {resource.author} · {resource.publishedDate}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#6B5E62] leading-relaxed mt-3 line-clamp-3">
          {resource.description}
        </p>

        {/* Key takeaways bullet preview */}
        {resource.highlights && resource.highlights.length > 0 && (
          <div className="mt-4 pt-3 border-t border-rose-100/70 text-xs text-[#6B5E62] space-y-1">
            <span className="font-semibold text-[#1F1A1C] block text-[11px] uppercase tracking-wider">
              Inside This Resource:
            </span>
            <p className="line-clamp-1">· {resource.highlights[0]}</p>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-rose-100 flex items-center justify-between">
        <span className="text-xs text-[#6B5E62] font-medium">
          {resource.format}
        </span>

        <button
          onClick={() => onSelect(resource)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-rose-200 text-[#1F1A1C] group-hover:bg-signature-gradient group-hover:text-white group-hover:border-transparent transition-all shadow-sm"
        >
          {resource.category === 'External' ? (
            <>
              <span>Access Hub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </>
          ) : resource.category === 'Recordings' ? (
            <>
              <span>Watch Video</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Download PDF</span>
              <Download className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
