import { Link } from "react-router-dom";

const progress = [
  { program: "MathCounts", completed: 3, total: 12, pct: 25 },
  { program: "AMC 8", completed: 1, total: 10, pct: 10 },
  { program: "AMC 10", completed: 0, total: 14, pct: 0 },
];

const activity = [
  { text: "Completed Lesson: Number Theory Basics", time: "2 hours ago" },
  { text: "Mastered: Divisibility Rules Quiz", time: "3 hours ago" },
  { text: "Started: AMC 8 - Combinatorics Intro", time: "Yesterday" },
];

const quickStart = [
  { title: "Counting Principles", program: "MathCounts", slug: "example" },
  { title: "Modular Arithmetic", program: "AMC 8", slug: "example" },
  { title: "Coordinate Geometry", program: "AMC 10", slug: "example" },
];

export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Welcome */}
      <section>
        <h1 className="text-3xl font-bold mb-1">Welcome back</h1>
        <p className="text-text-muted">Pick up where you left off.</p>
      </section>

      {/* Progress */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {progress.map((p) => (
            <div
              key={p.program}
              className="bg-bg-card border border-border rounded-xl p-5"
            >
              <h3 className="font-semibold mb-1">{p.program}</h3>
              <p className="text-text-muted text-sm mb-3">
                {p.completed} / {p.total} lessons
              </p>
              <div className="w-full h-2 bg-bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all"
                  style={{ width: `${p.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-bg-card border border-border rounded-xl divide-y divide-border">
          {activity.map((a, i) => (
            <div key={i} className="px-5 py-4 flex justify-between items-center">
              <span className="text-sm">{a.text}</span>
              <span className="text-xs text-text-muted">{a.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickStart.map((l) => (
            <Link
              key={l.title}
              to={`/lessons/${l.slug}`}
              className="bg-bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-colors block"
            >
              <span className="text-xs text-accent font-medium">
                {l.program}
              </span>
              <h3 className="font-semibold mt-1">{l.title}</h3>
              <span className="text-text-muted text-sm mt-2 inline-block">
                Continue →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
