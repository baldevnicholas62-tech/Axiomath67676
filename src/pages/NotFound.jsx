import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6" style={{ animation: "fade-in-up 0.5s ease-out both" }}>
      {/* Large 404 */}
      <div className="relative mb-6">
        <span className="text-[120px] sm:text-[160px] font-extrabold tracking-tight leading-none text-black/[0.03]">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl sm:text-6xl font-extrabold text-accent">404</span>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-text-muted text-sm max-w-sm mb-8">
        This page doesn't exist or has been moved. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(23,23,23,0.15)]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
          </svg>
          Go home
        </Link>
        <Link
          to="/lessons"
          className="inline-flex items-center gap-2 border border-border hover:border-accent/40 text-text-muted hover:text-text-primary px-6 py-3 rounded-xl text-sm transition-all duration-200"
        >
          Browse lessons
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
