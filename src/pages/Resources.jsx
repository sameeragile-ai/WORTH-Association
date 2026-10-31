import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  BookOpen,
  Download,
  Video,
  FileText,
  ExternalLink,
  CheckCircle,
  X,
  FileCheck,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import Modal from '../components/Modal.jsx';
import { RESOURCES, RESOURCE_CATEGORIES } from '../data/resources.js';

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('All Resources');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeResource, setActiveResource] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filteredResources = useMemo(() => {
    return RESOURCES.filter((res) => {
      const matchesCat =
        selectedCategory === 'All Resources' || res.category === selectedCategory;

      const matchesSearch =
        searchQuery === '' ||
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.author.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setActiveResource(null);
    }, 2000);
  };

  return (
    <div className="pt-28 pb-20 bg-[#FDF7F4]">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-[#FBE9E4] border-b border-rose-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Open Access Knowledge"
            title="Toolkits, research & leadership"
            italicWord="blueprints"
            titleSuffix="."
            subtitle="Download research studies, excel financial templates, inclusive hiring toolkits, and watch masterclass recordings produced by WORTH and industry partners."
            className="mb-0"
          />
        </div>
      </section>

      {/* Main Filter & Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar & Category Chips */}
        <div className="space-y-6 mb-12">
          {/* Keyword Search */}
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-[#EC5F8B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports, spreadsheet templates, guides..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-rose-200/80 rounded-xl text-sm text-[#1F1A1C] placeholder:text-[#6B5E62]/60 focus:outline-none focus:ring-2 focus:ring-[#EC5F8B]"
            />
          </div>

          {/* Filter Chips / Tabs (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-2">
            {RESOURCE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-signature-gradient text-white shadow-md'
                      : 'bg-white text-[#1F1A1C] hover:bg-[#FBE9E4] border border-rose-200/70'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {searchQuery && (
            <div className="flex items-center gap-2 text-xs text-[#6B5E62]">
              <span>
                Found {filteredResources.length} resources for &ldquo;{searchQuery}&rdquo;
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#D6336C] hover:underline font-semibold"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Resources Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <ResourceCard
                  resource={resource}
                  onSelect={(res) => setActiveResource(res)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Resource Detail & Download Modal */}
      {activeResource && (
        <Modal
          isOpen={!!activeResource}
          onClose={() => setActiveResource(null)}
          title={activeResource.title}
          subtitle={`${activeResource.author} · ${activeResource.publishedDate}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-[#FBE9E4] flex items-center justify-between text-xs">
              <span className="font-bold text-[#9C1F5A] uppercase tracking-wider">
                {activeResource.type}
              </span>
              <span className="text-[#6B5E62] font-mono">
                {activeResource.format} · {activeResource.readTime}
              </span>
            </div>

            <p className="text-sm text-[#1F1A1C]/85 leading-relaxed">
              {activeResource.description}
            </p>

            {activeResource.highlights && (
              <div className="p-4 rounded-xl bg-white border border-rose-100">
                <h4 className="font-jost text-xs font-bold uppercase tracking-wider text-[#1F1A1C] mb-2.5">
                  Core Topics Covered:
                </h4>
                <ul className="space-y-2 text-xs text-[#6B5E62]">
                  {activeResource.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#EC5F8B] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {downloadSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  Preparing your download ({activeResource.downloadName}). Enjoy your reading!
                </span>
              </div>
            ) : (
              <div className="pt-4 border-t border-rose-100 flex items-center justify-between gap-4">
                <span className="text-xs text-[#6B5E62]">
                  Size: {activeResource.fileSize}
                </span>

                <button
                  onClick={handleDownload}
                  className="px-6 py-3 rounded-xl bg-signature-gradient text-white text-xs font-bold shadow-md hover:opacity-95 flex items-center gap-2"
                >
                  {activeResource.category === 'Recordings' ? (
                    <>
                      <Video className="w-4 h-4" />
                      <span>Stream Recording</span>
                    </>
                  ) : activeResource.category === 'External' ? (
                    <>
                      <ExternalLink className="w-4 h-4" />
                      <span>Open External Hub</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Free PDF</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
