import { useState } from "react";
import { Link } from "react-router-dom";

const allLessons = [
  {
    title: "Number Theory Basics",
    subject: "Number Theory",
    status: "completed",
    slug: "example",
    description: "Understand factors, multiples, and divisibility rules.",
    difficulty: "Beginner",
    duration: "15 min",
    questions: 8,
  },
  {
    title: "Divisibility & Primes",
    subject: "Number Theory",
    status: "completed",
    slug: "example",
    description: "Master prime factorization and the fundamental theorem of arithmetic.",
    difficulty: "Beginner",
    duration: "20 min",
    questions: 10,
  },
  {
    title: "GCD & LCM",
    subject: "Number Theory",
    status: "in-progress",
    slug: "example",
    description: "Learn the Euclidean algorithm and relationship between GCD and LCM.",
    difficulty: "Intermediate",
    duration: "20 min",
    questions: 10,
  },
  {
    title: "Modular Arithmetic",
    subject: "Number Theory",
    status: "locked",
    slug: "example",
    description: "Explore congruences, remainders, and modular inverses.",
    difficulty: "Advanced",
    duration: "25 min",
    questions: 12,
  },
  {
    title: "Counting Principles",
    subject: "Counting and Probability",
    status: "in-progress",
    slug: "example",
    description: "Master the multiplication and addition principles for systematic counting.",
    difficulty: "Beginner",
    duration: "15 min",
    questions: 8,
  },
  {
    title: "Combinatorics Intro",
    subject: "Counting and Probability",
    status: "locked",
    slug: "example",
    description: "Permutations, combinations, and the binomial coefficient.",
    difficulty: "Intermediate",
    duration: "25 min",
    questions: 12,
  },
  {
    title: "Probability Basics",
    subject: "Counting and Probability",
    status: "locked",
    slug: "example",
    description: "Sample spaces, events, and computing probabilities.",
    difficulty: "Intermediate",
    duration: "20 min",
    questions: 10,
  },
  {
    title: "Geometry Fundamentals",
    subject: "Geometry",
    status: "locked",
    slug: "example",
    description: "Angles, triangles, and basic area and perimeter formulas.",
    difficulty: "Beginner",
    duration: "20 min",
    questions: 10,
  },
  {
    title: "Circle Theorems",
    subject: "Geometry",
    status: "locked",
    slug: "example",
    description: "Inscribed angles, tangent lines, and power of a point.",
    difficulty: "Advanced",
    duration: "25 min",
    questions: 12,
  },
  {
    title: "Coordinate Geometry",
    subject: "Geometry",
    status: "locked",
    slug: "example",
    description: "Distance, midpoint, slope, and equations of lines.",
    difficulty: "Intermediate",
    duration: "20 min",
    questions: 10,
  },
  {
    title: "Ratio & Proportion",
    subject: "Algebra",
    status: "locked",
    slug: "example",
    description: "Solve problems using ratios, proportions, and cross-multiplication.",
    difficulty: "Beginner",
    duration: "15 min",
    questions: 8,
  },
  {
    title: "Algebraic Expressions",
    subject: "Algebra",
    status: "locked",
    slug: "example",
    description: "Simplify, factor, and evaluate polynomial expressions.",
    difficulty: "Intermediate",
    duration: "20 min",
    questions: 10,
  },
  {
    title: "Sequences & Series",
    subject: "Algebra",
    status: "locked",
    slug: "example",
    description: "Arithmetic and geometric sequences, sums, and nth-term formulas.",
    difficulty: "Advanced",
    duration: "25 min",
    questions: 12,
  },
  {
    title: "Quadratic Equations",
    subject: "Algebra",
    status: "locked",
    slug: "example",
    description: "Factoring, completing the square, and the quadratic formula.",
    difficulty: "Intermediate",
    duration: "20 min",
    questions: 10,
  },
];

const filters = ["All", "Number Theory", "Counting and Probability", "Geometry", "Algebra"];

const statusConfig = {
  completed: {
    bg: "bg-accent/15",
    text: "text-accent",
    label: "Completed",
    icon: "M5 13l4 4L19 7",
  },
  "in-progress": {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    label: "In Progress",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  locked: {
    bg: "bg-black/5",
    text: "text-text-muted/60",
    label: "Locked",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  },
};

const difficultyStyle = {
  Beginner: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20" },
  Intermediate: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  Advanced: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
  Expert: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" },
};

const subjectIcons = {
  "Number Theory": "M7 20l4-16m2 16l4-16M6 9h14M4 15h14",
  "Counting and Probability": "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
  Geometry: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5",
  Algebra: "M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0A17.926 17.926 0 0021 12a17.926 17.926 0 00-1.871-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m-6 0l3-7",
};

export default function Lessons() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allLessons.filter((l) => {
    const matchesFilter = filter === "All" || l.subject === filter;
    const matchesSearch = search === "" || l.title.toLowerCase().includes(search.toLowerCase()) || l.subject.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const completedCount = allLessons.filter((l) => l.status === "completed").length;
  const totalCount = allLessons.length;

  return (
    <div className="space-y-8" style={{ animation: "fade-in-up 0.5s ease-out both" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Lessons</h1>
          <p className="text-text-muted text-sm">
            {completedCount} of {totalCount} lessons completed
          </p>
        </div>
        {/* Overall progress bar */}
        <div className="flex items-center gap-3 sm:min-w-[200px]">
          <div className="flex-1 h-2 bg-bg-surface rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.round((completedCount / totalCount) * 100)}%`,
                background: "linear-gradient(90deg, #404040, #171717)",
                boxShadow: "0 0 12px rgba(23,23,23,0.15)",
              }}
            />
          </div>
          <span className="text-xs text-accent font-semibold tabular-nums">
            {Math.round((completedCount / totalCount) * 100)}%
          </span>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="space-y-4">
        {/* Search bar */}
        <div className="relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search lessons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-card/60 border border-border/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/40 outline-none focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(23,23,23,0.06)] transition-all"
          />
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? "bg-accent text-white shadow-[0_0_16px_rgba(23,23,23,0.1)]"
                  : "bg-bg-surface text-text-muted hover:text-text-primary border border-border hover:border-border/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">&#128270;</div>
          <h3 className="text-lg font-semibold mb-1">No lessons found</h3>
          <p className="text-sm text-text-muted">Try adjusting your search or filter.</p>
        </div>
      )}

      {/* Lesson Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((l, i) => {
          const status = statusConfig[l.status];
          const diff = difficultyStyle[l.difficulty];
          const isLocked = l.status === "locked";

          return (
            <Link
              key={`${l.title}-${i}`}
              to={isLocked ? "#" : `/lessons/${l.slug}`}
              onClick={(e) => isLocked && e.preventDefault()}
              className={`card-shine group relative bg-bg-card/60 border border-border/40 rounded-2xl p-5 transition-all duration-300 block ${
                isLocked
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:border-accent/30 hover:bg-bg-card/80 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-12px_rgba(23,23,23,0.06)]"
              }`}
            >
              {/* Top row: subject + status */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={subjectIcons[l.subject]} />
                  </svg>
                  <span className="text-xs text-accent/80 font-medium">{l.subject}</span>
                </div>
                <span className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium ${status.bg} ${status.text}`}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={status.icon} />
                  </svg>
                  {status.label}
                </span>
              </div>

              {/* Title + description */}
              <h3 className={`font-semibold text-[15px] mb-1.5 ${!isLocked ? "group-hover:text-accent transition-colors duration-200" : ""}`}>
                {l.title}
              </h3>
              <p className="text-sm text-text-muted/70 leading-relaxed mb-4">
                {l.description}
              </p>

              {/* Bottom row: metadata */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${diff.bg} ${diff.text} ${diff.border}`}>
                  {l.difficulty}
                </span>
                <span className="text-[11px] text-text-muted/50 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {l.duration}
                </span>
                <span className="text-[11px] text-text-muted/50 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {l.questions} questions
                </span>
              </div>

              {/* Hover arrow */}
              {!isLocked && (
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
