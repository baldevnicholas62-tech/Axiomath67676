import { useState } from "react";
import { Link } from "react-router-dom";

const allLessons = [
  { title: "Number Theory Basics", program: "MATHCOUNTS / AMC 8", status: "completed", slug: "example" },
  { title: "Counting Principles", program: "MATHCOUNTS / AMC 8", status: "in-progress", slug: "example" },
  { title: "Geometry Fundamentals", program: "MATHCOUNTS / AMC 8", status: "locked", slug: "example" },
  { title: "Ratio & Proportion", program: "MATHCOUNTS / AMC 8", status: "locked", slug: "example" },
  { title: "Divisibility & Primes", program: "MATHCOUNTS / AMC 8", status: "completed", slug: "example" },
  { title: "Combinatorics Intro", program: "MATHCOUNTS / AMC 8", status: "in-progress", slug: "example" },
  { title: "Probability Basics", program: "MATHCOUNTS / AMC 8", status: "locked", slug: "example" },
  { title: "Algebraic Expressions", program: "AMC 10", status: "locked", slug: "example" },
  { title: "Coordinate Geometry", program: "AMC 10", status: "locked", slug: "example" },
  { title: "Sequences & Series", program: "AMC 10", status: "locked", slug: "example" },
];

const filters = ["All", "MATHCOUNTS / AMC 8", "AMC 10"];

const statusStyles = {
  completed: "bg-accent/20 text-accent",
  "in-progress": "bg-white/10 text-white",
  locked: "bg-white/5 text-text-muted",
};

const statusLabels = {
  completed: "Completed",
  "in-progress": "In Progress",
  locked: "Locked",
};

export default function Lessons() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? allLessons
      : allLessons.filter((l) => l.program === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Lessons</h1>
        <p className="text-text-muted">Browse lessons by program.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-accent text-black"
                : "bg-bg-surface text-text-muted hover:text-white border border-border"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((l, i) => (
          <Link
            key={`${l.title}-${i}`}
            to={`/lessons/${l.slug}`}
            className="bg-bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-colors block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-accent font-medium">
                {l.program}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[l.status]}`}
              >
                {statusLabels[l.status]}
              </span>
            </div>
            <h3 className="font-semibold">{l.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
