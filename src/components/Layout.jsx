import { NavLink, Outlet, useNavigate } from "react-router-dom";
import db from "../db";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/lessons", label: "Lessons" },
  { to: "/practice", label: "Practice" },
  { to: "/museum", label: "Museum" },
];

export default function Layout() {
  const { isLoading, user } = db.useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    db.auth.signOut();
    navigate("/");
  };

  const userInitial = user?.email?.[0]?.toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-bg-primary text-white">
      {/* Sticky glassmorphism header */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-bg-primary/70 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
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
                {/* Outer hexagon */}
                <path
                  d="M20 3L35.59 12.5V31.5L20 41L4.41 31.5V12.5L20 3Z"
                  stroke="#84cc16"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.4"
                />
                {/* Inner triangle */}
                <polygon
                  points="20,10 30,28 10,28"
                  stroke="#84cc16"
                  strokeWidth="1.8"
                  fill="rgba(132,204,22,0.08)"
                  strokeLinejoin="round"
                />
                {/* Sigma symbol */}
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
              {/* Glow dot */}
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full opacity-80 animate-glow-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-accent">Axio</span>
              <span className="text-white/90">math</span>
            </span>
          </NavLink>

          {/* Center nav links in pill container */}
          <div className="hidden sm:flex items-center bg-white/[0.04] border border-white/[0.06] rounded-full px-1.5 py-1.5 gap-1">
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

          {/* Auth controls */}
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
                className="inline-flex items-center rounded-full border border-border/50 px-3 py-1.5 text-sm text-text-muted hover:text-white hover:border-border transition-colors"
              >
                Log out
              </button>
            </div>
          ) : (
            <NavLink
              to="/signin"
              className="inline-flex items-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent text-sm font-semibold px-5 py-2 rounded-full border border-accent/20 hover:border-accent/40 transition-all duration-200 hover:shadow-[0_0_20px_rgba(132,204,22,0.15)]"
            >
              Sign In
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NavLink>
          )}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
