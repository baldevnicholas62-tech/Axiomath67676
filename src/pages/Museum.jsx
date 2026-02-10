import { useState } from "react";
import db from "../db";
import { topics, difficultyLabels } from "../data/questions";

const difficultyColors = {
  1: "#84cc16",
  2: "#a3e635",
  3: "#facc15",
  4: "#fb923c",
  5: "#f87171",
};

function formatDate(ts) {
  const d = new Date(ts);
  const now = new Date();
  const diff = now - d;
  if (diff < 60_000) return "Just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 172_800_000) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function Museum() {
  const { user } = db.useAuth();
  const { isLoading, error, data } = db.useQuery({
    questionAttempts: { $: { where: { userId: user.id, correct: false } } },
  });

  const [topicFilter, setTopicFilter] = useState("All");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <p className="text-red-400 text-sm">Failed to load wrong answers.</p>
          <p className="text-text-muted text-xs">{error.message}</p>
        </div>
      </div>
    );
  }

  const allWrong = (data?.questionAttempts ?? []).sort(
    (a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0),
  );

  const filtered =
    topicFilter === "All"
      ? allWrong
      : allWrong.filter((a) => a.topic === topicFilter);

  return (
    <div className="space-y-8" style={{ animation: "fade-in-up 0.5s ease-out both" }}>
      <div>
        <h1 className="text-3xl font-bold mb-1">Wrong Answer Museum</h1>
        <p className="text-text-muted text-sm">
          Review your mistakes and learn from them.
        </p>
      </div>

      {/* ── Topic filter ── */}
      <div className="flex flex-wrap gap-2">
        {["All", ...topics].map((t) => (
          <button
            key={t}
            onClick={() => setTopicFilter(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              topicFilter === t
                ? "bg-accent text-black"
                : "bg-bg-surface text-text-muted hover:text-white border border-border"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div
          className="bg-bg-card border border-border/40 rounded-2xl p-12 text-center"
          style={{ animation: "scale-in 0.3s ease-out both" }}
        >
          <div className="text-4xl mb-3">&#127942;</div>
          <h3 className="text-xl font-bold text-accent mb-2">
            {topicFilter === "All"
              ? "No wrong answers yet!"
              : `No wrong answers in ${topicFilter}`}
          </h3>
          <p className="text-text-muted text-sm">
            Keep practicing to maintain your streak.
          </p>
        </div>
      )}

      {/* ── Wrong answer cards ── */}
      {filtered.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((attempt) => {
            const color = difficultyColors[attempt.difficulty] ?? "#84cc16";
            return (
              <div
                key={attempt.id}
                className="card-shine bg-bg-card border border-border/40 rounded-xl p-5 space-y-3 transition-all duration-300 hover:border-border"
              >
                {/* Header */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent font-semibold">
                    {attempt.topic}
                  </span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ backgroundColor: `${color}20`, color }}
                  >
                    {difficultyLabels[attempt.difficulty] ?? `Lvl ${attempt.difficulty}`}
                  </span>
                  <span className="ml-auto text-[11px] text-text-muted/50">
                    {attempt.timestamp ? formatDate(attempt.timestamp) : ""}
                  </span>
                </div>

                {/* Question */}
                <p className="text-sm font-medium leading-relaxed">
                  {attempt.questionText}
                </p>

                {/* Answers */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                    <span className="text-red-400">Your answer:</span>
                    <span className="text-red-400 font-medium">
                      {attempt.userAnswer}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    <span className="text-accent">Correct answer:</span>
                    <span className="text-accent font-medium">
                      {attempt.correctAnswer}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
