import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-32 pb-20 px-4 bg-[#FDF7F4]">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-rose-200/60 shadow-xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#FBE9E4] text-[#D6336C] flex items-center justify-center">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div>
          <span className="font-mono text-xs font-bold text-[#EC5F8B] tracking-widest uppercase block mb-1">
            404 Error · Page Not Found
          </span>
          <h1 className="font-jost text-3xl font-bold text-[#1F1A1C]">
            Off the Beaten Path
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5E62] mt-2 leading-relaxed">
            The page you are seeking might have been relocated, updated, or does not exist. Let&apos;s guide you back to our community.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-signature-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-opacity inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/programs"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FBE9E4] text-[#1F1A1C] hover:bg-rose-100 text-xs font-semibold transition-colors inline-flex items-center justify-center gap-2"
          >
            <span>Explore Programs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
