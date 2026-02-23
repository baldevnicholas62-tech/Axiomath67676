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
  const [sortBy, setSortBy] = useState("newest");

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

  const allWrong = (data?.questionAttempts ?? []).sort((a, b) => {
    if (sortBy === "newest") return (b.timestamp ?? 0) - (a.timestamp ?? 0);
    if (sortBy === "oldest") return (a.timestamp ?? 0) - (b.timestamp ?? 0);
    if (sortBy === "hardest") return (b.difficulty ?? 0) - (a.difficulty ?? 0);
    return 0;
  });

  const filtered =
    topicFilter === "All"
      ? allWrong
      : allWrong.filter((a) => a.topic === topicFilter);

  // Stats
  const topicCounts = {};
  allWrong.forEach((a) => {
    topicCounts[a.topic] = (topicCounts[a.topic] || 0) + 1;
  });
  const worstTopic = Object.entries(topicCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-6" style={{ animation: "fade-in-up 0.5s ease-out both" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Wrong Answer Museum</h1>
          <p className="text-text-muted text-sm">
            Review your mistakes and turn them into strengths.
          </p>
        </div>
        {allWrong.length > 0 && (
          <div className="flex items-center gap-3 text-xs">
            <span className="text-text-muted/50">{allWrong.length} mistake{allWrong.length !== 1 ? "s" : ""} total</span>
            {worstTopic && (
              <>
                <span className="w-px h-3 bg-border" />
                <span className="text-red-400/80">Most missed: {worstTopic[0]}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Topic filter */}
        <div className="flex flex-wrap gap-2 flex-1">
          {["All", ...topics].map((t) => (
            <button
              key={t}
              onClick={() => setTopicFilter(t)}
              className={`shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                topicFilter === t
                  ? "bg-accent text-black shadow-[0_0_16px_rgba(132,204,22,0.2)]"
                  : "bg-bg-surface text-text-muted hover:text-white border border-border"
              }`}
            >
              {t}
              {t !== "All" && topicCounts[t] ? (
                <span className="ml-1.5 text-[10px] opacity-60">({topicCounts[t]})</span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-bg-surface border border-border rounded-lg px-3 py-1.5 text-sm text-text-muted outline-none focus:border-accent/40 transition-colors cursor-pointer"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="hardest">Hardest first</option>
        </select>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div
          className="bg-bg-card border border-border/40 rounded-2xl p-12 text-center"
          style={{ animation: "scale-in 0.3s ease-out both" }}
        >
          <div className="text-5xl mb-4">&#127942;</div>
          <h3 className="text-xl font-bold text-accent mb-2">
            {topicFilter === "All"
              ? "No wrong answers yet!"
              : `No wrong answers in ${topicFilter}`}
          </h3>
          <p className="text-text-muted text-sm max-w-sm mx-auto">
            {topicFilter === "All"
              ? "Keep practicing — when you make mistakes, they'll show up here for review."
              : "Great work on this topic! Try filtering by another topic or keep practicing."}
          </p>
        </div>
      )}

      {/* Wrong answer cards */}
      {filtered.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((attempt) => {
            const color = difficultyColors[attempt.difficulty] ?? "#84cc16";
            return (
              <div
                key={attempt.id}
                className="card-shine group bg-bg-card/60 border border-border/40 rounded-2xl p-5 space-y-3 transition-all duration-300 hover:border-border hover:bg-bg-card/80"
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
                  <span className="ml-auto text-[11px] text-text-muted/40">
                    {attempt.timestamp ? formatDate(attempt.timestamp) : ""}
                  </span>
                </div>

                {/* Question */}
                <p className="text-sm font-medium leading-relaxed">
                  {attempt.questionText}
                </p>

                {/* Answers comparison */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-red-500/5 border border-red-500/15 rounded-lg px-3 py-2">
                    <span className="text-red-400/60 text-[10px] uppercase tracking-wide font-medium">Your answer</span>
                    <p className="text-red-400 font-semibold mt-0.5">{attempt.userAnswer}</p>
                  </div>
                  <div className="bg-accent/5 border border-accent/15 rounded-lg px-3 py-2">
                    <span className="text-accent/60 text-[10px] uppercase tracking-wide font-medium">Correct</span>
                    <p className="text-accent font-semibold mt-0.5">{attempt.correctAnswer}</p>
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
