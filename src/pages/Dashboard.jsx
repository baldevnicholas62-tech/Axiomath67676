import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ── data ─────────────────────────────────────────────────────── */

const progressData = [
  { program: "MATHCOUNTS / AMC 8", completed: 3, total: 12, pct: 25 },
  { program: "AMC 10", completed: 0, total: 14, pct: 0 },
];

const activityData = [
  { text: "Completed Number Theory Basics", time: "2h ago", type: "completed" },
  { text: "Mastered Divisibility Rules Quiz", time: "3h ago", type: "mastered" },
  { text: "Started Combinatorics Intro", time: "Yesterday", type: "started" },
];

const recommendations = [
  {
    title: "Counting Principles",
    program: "MATHCOUNTS / AMC 8",
    slug: "example",
    difficulty: "Intermediate",
    duration: "15 min",
    reason: "Next in your learning path",
  },
  {
    title: "Modular Arithmetic",
    program: "MATHCOUNTS / AMC 8",
    slug: "example",
    difficulty: "Beginner",
    duration: "20 min",
    reason: "Strengthen your fundamentals",
  },
  {
    title: "Coordinate Geometry",
    program: "AMC 10",
    slug: "example",
    difficulty: "Advanced",
    duration: "25 min",
    reason: "Push your limits",
  },
];

const getToday = () => new Date().toISOString().split("T")[0];

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const difficultyStyle = {
  Beginner: "bg-accent/15 text-accent",
  Intermediate: "bg-amber-500/15 text-amber-400",
  Advanced: "bg-red-500/15 text-red-400",
};

const activityDot = {
  completed: "bg-accent shadow-[0_0_6px_rgba(132,204,22,0.5)]",
  mastered: "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.5)]",
  started: "bg-white/40",
};

/* ── Rounded-rect progress ring ── */
function ProgressRing({ percent, size = 140, rx = 28, strokeWidth = 7, color = "#84cc16", children }) {
  const p = Math.min(100, Math.max(0, percent));
  const half = strokeWidth / 2;
  const inner = size - strokeWidth;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <rect x={half} y={half} width={inner} height={inner} rx={rx}
          fill="none" stroke="#1c1c1c" strokeWidth={strokeWidth} />
        <rect x={half} y={half} width={inner} height={inner} rx={rx}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round" pathLength="100"
          strokeDasharray="100" strokeDashoffset={100 - p}
          style={{
            transition: "stroke-dashoffset 0.8s ease-out",
            filter: `drop-shadow(0 0 8px ${color}40)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/* ── small SVG icons (inline to avoid deps) ── */
const GearIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
  </svg>
);

const ResetIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform duration-300">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

/* ════════════════════════════════════════════════════════════════ */

export default function Dashboard() {
  /* ── daily-goal state ── */
  const [goal, setGoal] = useState(() => {
    try { const s = localStorage.getItem("axiomath_goal"); return s ? JSON.parse(s) : { type: "lessons", target: 3 }; }
    catch { return { type: "lessons", target: 3 }; }
  });

  const [todayProgress, setTodayProgress] = useState(() => {
    try {
      const s = localStorage.getItem("axiomath_today");
      if (s) { const d = JSON.parse(s); if (d.date === getToday()) return d.value; }
    } catch { /* ignore */ }
    return 0;
  });

  /* ── streak state ── */
  const [streak, setStreak] = useState(() => {
    try { const s = localStorage.getItem("axiomath_streak"); return s ? JSON.parse(s) : { count: 0, lastDate: null }; }
    catch { return { count: 0, lastDate: null }; }
  });

  /* ── accuracy state ── */
  const [accuracy, setAccuracy] = useState(() => {
    try { const s = localStorage.getItem("axiomath_accuracy"); return s ? JSON.parse(s) : { correct: 0, total: 0 }; }
    catch { return { correct: 0, total: 0 }; }
  });

  /* ── ui state ── */
  const [showSettings, setShowSettings] = useState(false);
  const [tempGoal, setTempGoal] = useState(goal);
  const [confirmReset, setConfirmReset] = useState(false);

  /* ── persist ── */
  useEffect(() => { localStorage.setItem("axiomath_goal", JSON.stringify(goal)); }, [goal]);
  useEffect(() => { localStorage.setItem("axiomath_today", JSON.stringify({ date: getToday(), value: todayProgress })); }, [todayProgress]);
  useEffect(() => { localStorage.setItem("axiomath_streak", JSON.stringify(streak)); }, [streak]);
  useEffect(() => { localStorage.setItem("axiomath_accuracy", JSON.stringify(accuracy)); }, [accuracy]);

  /* ── derived ── */
  const goalPercent = goal.target > 0 ? Math.round((todayProgress / goal.target) * 100) : 0;
  const goalClamped = Math.min(100, goalPercent);
  const accPercent = accuracy.total > 0 ? Math.round((accuracy.correct / accuracy.total) * 100) : 0;

  /* shared card base */
  const statCard =
    "card-shine animated-border group relative rounded-2xl bg-bg-card/60 backdrop-blur-sm p-6 flex flex-col items-center transition-all duration-300 hover:-translate-y-1";

  return (
    <div className="space-y-8">
      {/* ── Greeting ── */}
      <section style={{ animation: "fade-in-up 0.5s ease-out both" }}>
        <h1 className="text-3xl font-bold tracking-tight">{getGreeting()}</h1>
      </section>

      {/* ══════════ STATS ROW ══════════ */}
      <section style={{ animation: "fade-in-up 0.6s ease-out both", animationDelay: "0.08s" }}>
        <div className="grid md:grid-cols-3 gap-5">

          {/* ── Daily Goal ── */}
          <div className={`${statCard} hover:shadow-[0_20px_60px_-12px_rgba(132,204,22,0.12)]`}>
            <button
              onClick={() => { setTempGoal({ ...goal }); setShowSettings(true); }}
              className="absolute top-4 right-4 text-text-muted/60 hover:text-white transition-colors"
              title="Edit daily goal"
            >
              <GearIcon />
            </button>
            <ProgressRing percent={goalPercent}>
              <span className="text-3xl font-bold tracking-tight">{goalClamped}%</span>
            </ProgressRing>
            <h3 className="font-semibold mt-4 text-[13px] tracking-wide uppercase text-text-muted">
              Daily Goal
            </h3>
            <p className="text-xs text-text-muted/60 mt-0.5">
              {todayProgress} / {goal.target} {goal.type === "lessons" ? "lessons" : "min"}
            </p>
          </div>

          {/* ── Streak ── */}
          <div className={`${statCard} hover:shadow-[0_20px_60px_-12px_rgba(251,146,60,0.14)]`}>
            <ProgressRing percent={goalPercent} color="#fb923c">
              <span className="text-3xl leading-none">🔥</span>
              <span className="text-2xl font-bold leading-tight">{streak.count}</span>
            </ProgressRing>
            <h3 className="font-semibold mt-4 text-[13px] tracking-wide uppercase text-text-muted">
              Day Streak
            </h3>
            <p className="text-xs text-text-muted/60 mt-0.5">
              {goalPercent >= 100
                ? "Goal met today!"
                : streak.count > 0
                  ? `${goalClamped}% to keep streak`
                  : "Complete your goal to start"}
            </p>
          </div>

          {/* ── Accuracy ── */}
          <div className={`${statCard} hover:shadow-[0_20px_60px_-12px_rgba(132,204,22,0.12)]`}>
            <button
              onClick={() => setConfirmReset(true)}
              className="absolute top-4 right-4 text-text-muted/60 hover:text-red-400 transition-colors"
              title="Reset accuracy"
            >
              <ResetIcon />
            </button>
            <ProgressRing percent={accPercent}>
              <span className="text-3xl font-bold tracking-tight">{accPercent}%</span>
            </ProgressRing>
            <h3 className="font-semibold mt-4 text-[13px] tracking-wide uppercase text-text-muted">
              Accuracy
            </h3>
            <p className="text-xs text-text-muted/60 mt-0.5">
              {accuracy.total > 0
                ? `${accuracy.correct} / ${accuracy.total} questions`
                : "No data yet"}
            </p>

            {/* reset overlay */}
            {confirmReset && (
              <div className="absolute inset-0 bg-bg-card/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3 p-4 z-10">
                <p className="text-sm text-center">Reset accuracy to 0?</p>
                <div className="flex gap-2">
                  <button onClick={() => setConfirmReset(false)}
                    className="px-4 py-1.5 rounded-lg bg-bg-surface text-sm text-text-muted hover:text-white transition-colors">
                    Cancel
                  </button>
                  <button onClick={() => { setAccuracy({ correct: 0, total: 0 }); setConfirmReset(false); }}
                    className="px-4 py-1.5 rounded-lg bg-red-500/20 text-sm text-red-400 hover:bg-red-500/30 transition-colors">
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ══════════ PROGRESS + ACTIVITY (two-col) ══════════ */}
      <div
        className="grid lg:grid-cols-5 gap-5"
        style={{ animation: "fade-in-up 0.6s ease-out both", animationDelay: "0.16s" }}
      >
        {/* ── Progress (3 cols) ── */}
        <section className="lg:col-span-3 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2.5">
            <span className="w-1 h-5 rounded-full bg-accent" />
            Your Progress
          </h2>
          <div className="space-y-3">
            {progressData.map((p) => (
              <div
                key={p.program}
                className="card-shine group bg-bg-card/50 border border-border/40 rounded-xl p-5 transition-all duration-300 hover:bg-bg-card/80 hover:border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm">{p.program}</h3>
                  <span className="text-[11px] text-text-muted bg-bg-surface/80 px-2.5 py-0.5 rounded-full font-medium">
                    {p.completed} / {p.total} lessons
                  </span>
                </div>
                <div className="w-full h-1.5 bg-bg-surface rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${p.pct}%`,
                      background: p.pct > 0
                        ? "linear-gradient(90deg, #65a30d, #84cc16)"
                        : "#262626",
                      boxShadow: p.pct > 0 ? "0 0 12px rgba(132,204,22,0.35)" : "none",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Activity (2 cols) ── */}
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2.5">
            <span className="w-1 h-5 rounded-full bg-accent" />
            Recent Activity
          </h2>
          <div className="bg-bg-card/50 border border-border/40 rounded-xl overflow-hidden">
            {activityData.map((a, i) => (
              <div
                key={i}
                className="group/row px-4 py-3.5 flex items-start gap-3 border-b border-border/20 last:border-b-0 hover:bg-white/[0.02] transition-colors"
              >
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${activityDot[a.type]}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug group-hover/row:text-white transition-colors">
                    {a.text}
                  </p>
                  <p className="text-[11px] text-text-muted/50 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ══════════ RECOMMENDATIONS ══════════ */}
      <section style={{ animation: "fade-in-up 0.6s ease-out both", animationDelay: "0.24s" }}>
        <h2 className="text-lg font-semibold flex items-center gap-2.5 mb-5">
          <span className="w-1 h-5 rounded-full bg-accent" />
          Recommended for You
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {recommendations.map((r) => (
            <Link
              key={r.title}
              to={`/lessons/${r.slug}`}
              className="card-shine animated-border group relative rounded-2xl bg-bg-card/50 backdrop-blur-sm p-5 transition-all duration-300 hover:bg-bg-card/80 hover:-translate-y-1 hover:shadow-[0_20px_60px_-12px_rgba(132,204,22,0.08)] block"
            >
              {/* badges row */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${difficultyStyle[r.difficulty]}`}>
                  {r.difficulty}
                </span>
                <span className="text-[10px] text-text-muted/50 flex items-center gap-1">
                  <ClockIcon />
                  {r.duration}
                </span>
              </div>

              <span className="text-[11px] text-accent/70 font-medium">{r.program}</span>
              <h3 className="font-semibold mt-0.5 group-hover:text-accent transition-colors duration-200">
                {r.title}
              </h3>
              <p className="text-xs text-text-muted/50 mt-2 leading-relaxed">{r.reason}</p>

              {/* hover CTA */}
              <div className="flex items-center gap-1.5 mt-4 text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Start lesson
                <ArrowIcon />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ GOAL SETTINGS MODAL ══════════ */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="bg-bg-card border border-border/60 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-[0_32px_80px_-12px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "scale-in 0.25s ease-out both" }}
          >
            <h3 className="text-lg font-semibold mb-5">Set Daily Goal</h3>

            <div className="space-y-5">
              {/* type toggle */}
              <div>
                <label className="text-sm text-text-muted mb-2 block">Goal type</label>
                <div className="flex gap-2">
                  {["lessons", "minutes"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTempGoal({ ...tempGoal, type: t })}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 capitalize ${
                        tempGoal.type === t
                          ? "bg-accent text-black shadow-[0_0_20px_rgba(132,204,22,0.25)]"
                          : "bg-bg-surface text-text-muted hover:text-white hover:bg-bg-surface/80"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* target number */}
              <div>
                <label className="text-sm text-text-muted mb-2 block">
                  {tempGoal.type === "lessons" ? "Lessons per day" : "Minutes per day"}
                </label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={tempGoal.target}
                  onChange={(e) =>
                    setTempGoal({ ...tempGoal, target: Math.max(1, parseInt(e.target.value) || 1) })
                  }
                  className="w-full bg-bg-surface border border-border/60 rounded-xl px-4 py-2.5 text-white outline-none focus:border-accent/60 focus:shadow-[0_0_0_3px_rgba(132,204,22,0.1)] transition-all"
                />
              </div>

              {/* actions */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 py-2.5 rounded-xl bg-bg-surface text-text-muted hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setGoal({ ...tempGoal }); setShowSettings(false); }}
                  className="flex-1 py-2.5 rounded-xl bg-accent text-black font-semibold hover:bg-accent-dark transition-colors shadow-[0_0_20px_rgba(132,204,22,0.2)]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
