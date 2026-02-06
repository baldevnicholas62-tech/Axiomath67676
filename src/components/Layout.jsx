import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/lessons", label: "Lessons" },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg-primary text-white">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Axio</span>math
        </NavLink>

        <div className="flex gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                isActive
                  ? "text-accent font-medium"
                  : "text-text-muted hover:text-white transition-colors"
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
