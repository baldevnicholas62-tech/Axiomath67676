import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import db from "../db";

const links = [
  { to: "/", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" },
  { to: "/dashboard", label: "Dashboard", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
  { to: "/lessons", label: "Lessons", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { to: "/practice", label: "Practice", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { to: "/museum", label: "Museum", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
];

export default function Layout() {
  const { isLoading, user } = db.useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleSignOut = () => {
    db.auth.signOut();
    navigate("/");
  };

  const userInitial = user?.email?.[0]?.toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-bg-primary text-white">
      {/* Sticky glassmorphism header */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-bg-primary/70 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="group flex items-center gap-3">
            <div className="relative">
              <svg
                width="34"
                height="34"
                viewBox="0 0 40 40"
                fill="none"
                className="transition-transform duration-300 group-hover:scale-110"
              >
                <path
                  d="M20 3L35.59 12.5V31.5L20 41L4.41 31.5V12.5L20 3Z"
                  stroke="#84cc16"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.4"
                />
                <polygon
                  points="20,10 30,28 10,28"
                  stroke="#84cc16"
                  strokeWidth="1.8"
                  fill="rgba(132,204,22,0.08)"
                  strokeLinejoin="round"
                />
                <text
                  x="20"
                  y="24"
                  textAnchor="middle"
                  fill="#84cc16"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="serif"
                >
                  &Sigma;
                </text>
              </svg>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full opacity-80 animate-glow-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-accent">Axio</span>
              <span className="text-white/90">math</span>
            </span>
          </NavLink>

          {/* Center nav links in pill container — desktop */}
          <div className="hidden md:flex items-center bg-white/[0.04] border border-white/[0.06] rounded-full px-1.5 py-1.5 gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-accent text-black shadow-[0_0_12px_rgba(132,204,22,0.3)]"
                      : "text-text-muted hover:text-white hover:bg-white/[0.06]"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Right side: auth + hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Auth controls — desktop */}
            {isLoading ? (
              <div className="w-20 h-9 rounded-full bg-white/[0.04] animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className="hidden sm:flex w-8 h-8 rounded-full bg-accent/20 border border-accent/30 items-center justify-center text-accent text-sm font-bold"
                  title={user.email}
                >
                  {userInitial}
                </div>
                <button
                  onClick={handleSignOut}
                  className="hidden md:inline-flex items-center rounded-full border border-border/50 px-3 py-1.5 text-sm text-text-muted hover:text-white hover:border-border transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <NavLink
                to="/signin"
                className="hidden md:inline-flex items-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent text-sm font-semibold px-5 py-2 rounded-full border border-accent/20 hover:border-accent/40 transition-all duration-200 hover:shadow-[0_0_20px_rgba(132,204,22,0.15)]"
              >
                Sign In
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </NavLink>
            )}

            {/* Hamburger button — mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] transition-colors hover:bg-white/[0.08]"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-[5px]">
                <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
                <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className={`absolute top-16 right-0 w-72 max-h-[calc(100vh-4rem)] bg-bg-card/95 backdrop-blur-xl border-l border-b border-white/[0.06] rounded-bl-2xl shadow-[0_32px_80px_-12px_rgba(0,0,0,0.8)] transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 space-y-1">
            {links.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-accent/15 text-accent shadow-[inset_0_0_20px_rgba(132,204,22,0.05)]"
                      : "text-text-muted hover:text-white hover:bg-white/[0.04]"
                  }`
                }
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={l.icon} />
                </svg>
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Auth section in mobile */}
          <div className="border-t border-white/[0.06] p-4">
            {isLoading ? (
              <div className="h-10 rounded-xl bg-white/[0.04] animate-pulse" />
            ) : user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-sm font-bold">
                    {userInitial}
                  </div>
                  <span className="text-sm text-text-muted truncate">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 rounded-xl border border-border/50 text-sm text-text-muted hover:text-white hover:border-border transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <NavLink
                to="/signin"
                className="flex items-center justify-center gap-2 w-full bg-accent/10 hover:bg-accent/20 text-accent text-sm font-semibold px-5 py-3 rounded-xl border border-accent/20 hover:border-accent/40 transition-all"
              >
                Sign In
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-bg-primary/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid sm:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                  <path d="M20 3L35.59 12.5V31.5L20 41L4.41 31.5V12.5L20 3Z" stroke="#84cc16" strokeWidth="1.5" fill="none" opacity="0.4" />
                  <polygon points="20,10 30,28 10,28" stroke="#84cc16" strokeWidth="1.8" fill="rgba(132,204,22,0.08)" strokeLinejoin="round" />
                  <text x="20" y="24" textAnchor="middle" fill="#84cc16" fontSize="12" fontWeight="bold" fontFamily="serif">&Sigma;</text>
                </svg>
                <span className="font-bold text-lg">
                  <span className="text-accent">Axio</span><span className="text-white/90">math</span>
                </span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Free math competition training for MATHCOUNTS and AMC students.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-white/80">Platform</h4>
              <div className="space-y-2">
                {links.slice(1).map((l) => (
                  <NavLink key={l.to} to={l.to} className="block text-sm text-text-muted hover:text-accent transition-colors">
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-white/80">Topics</h4>
              <div className="space-y-2 text-sm text-text-muted">
                <p>Number Theory</p>
                <p>Algebra</p>
                <p>Geometry</p>
                <p>Counting & Probability</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-text-muted/50">
              &copy; {new Date().getFullYear()} Axiomath. Built for math competitors.
            </p>
            <p className="text-xs text-text-muted/30">
              Made with dedication to mathematical excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
