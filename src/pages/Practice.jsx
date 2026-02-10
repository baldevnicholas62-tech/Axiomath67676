import { useState, useCallback } from "react";
import db from "../db";
import { questions, topics, difficultyLabels } from "../data/questions";
import { recordAnswer } from "../utils/recordAnswer";

const difficultyColors = {
  1: "#84cc16",
  2: "#a3e635",
  3: "#facc15",
  4: "#fb923c",
  5: "#f87171",
};

function getFiltered(topicFilter, difficulty) {
  return questions.filter(
    (q) =>
      (topicFilter === "All" || q.topic === topicFilter) &&
      q.difficulty === difficulty,
  );
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)] ?? null;
}

export default function Practice() {
  const { user } = db.useAuth();

  const [difficulty, setDifficulty] = useState(2);
  const [topicFilter, setTopicFilter] = useState("All");
  const [current, setCurrent] = useState(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [session, setSession] = useState({ correct: 0, wrong: 0 });

  const generate = useCallback(() => {
    const pool = getFiltered(topicFilter, difficulty);
    setCurrent(pickRandom(pool));
    setSelected(null);
    setFeedback(null);
  }, [topicFilter, difficulty]);

  function handleAnswer(choiceIdx) {
    if (feedback !== null || !current) return;
    setSelected(choiceIdx);

    const isCorrect = choiceIdx === current.answer;
    setFeedback(isCorrect ? "correct" : "wrong");
    setSession((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      wrong: s.wrong + (isCorrect ? 0 : 1),
    }));

    if (user) {
      recordAnswer({
        userId: user.id,
        questionId: current.id,
        questionText: current.q,
        userAnswer: current.choices[choiceIdx],
        correctAnswer: current.choices[current.answer],
        correct: isCorrect,
        topic: current.topic,
        difficulty: current.difficulty,
      });
    }
  }

  const pool = getFiltered(topicFilter, difficulty);
  const color = difficultyColors[difficulty];

  return (
    <div className="space-y-8" style={{ animation: "fade-in-up 0.5s ease-out both" }}>
      <div>
        <h1 className="text-3xl font-bold mb-1">Practice Mode</h1>
        <p className="text-text-muted text-sm">
          Tune the difficulty, pick a topic, and generate random problems.
        </p>
      </div>

      {/* ── Filters ── */}
      <section className="card-shine animated-border bg-bg-card/60 rounded-2xl p-6 space-y-6">
        {/* Difficulty slider */}
        <div>
          <label className="text-sm text-text-muted mb-3 block">
            Difficulty —{" "}
            <span className="font-semibold text-white">
              {difficultyLabels[difficulty]}
            </span>
          </label>
          <div className="relative flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={difficulty}
              onChange={(e) => {
                setDifficulty(Number(e.target.value));
                setCurrent(null);
                setFeedback(null);
              }}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${color} ${((difficulty - 1) / 4) * 100}%, #1c1c1c ${((difficulty - 1) / 4) * 100}%)`,
                accentColor: color,
              }}
            />
            <span
              className="text-2xl font-bold tabular-nums min-w-[2ch] text-center"
              style={{ color }}
            >
              {difficulty}
            </span>
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-text-muted/50 px-0.5">
            {[1, 2, 3, 4, 5].map((d) => (
              <span key={d}>{difficultyLabels[d]}</span>
            ))}
          </div>
        </div>

        {/* Topic filter */}
        <div>
          <label className="text-sm text-text-muted mb-3 block">Topic</label>
          <div className="flex flex-wrap gap-2">
            {["All", ...topics].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTopicFilter(t);
                  setCurrent(null);
                  setFeedback(null);
                }}
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
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          disabled={pool.length === 0}
          className="w-full py-3 rounded-xl bg-accent text-black font-semibold hover:bg-accent-dark transition-colors shadow-[0_0_20px_rgba(132,204,22,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {current ? "Next Question" : "Generate Question"}
        </button>

        {pool.length === 0 && (
          <p className="text-sm text-text-muted text-center">
            No questions available for this topic/difficulty combination.
          </p>
        )}
      </section>

      {/* ── Question ── */}
      {current && (
        <section
          className="bg-bg-card border border-border rounded-xl p-6 space-y-6"
          style={{ animation: "scale-in 0.25s ease-out both" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{
                backgroundColor: `${color}20`,
                color,
              }}
            >
              {difficultyLabels[current.difficulty]}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent font-semibold">
              {current.topic}
            </span>
          </div>

          <p className="text-lg font-medium">{current.q}</p>

          <div className="grid grid-cols-2 gap-3">
            {current.choices.map((c, i) => {
              let style =
                "bg-bg-surface border border-border hover:border-accent/40 cursor-pointer";
              if (feedback !== null) {
                if (i === current.answer) {
                  style = "bg-accent/20 border border-accent text-accent";
                } else if (i === selected && feedback === "wrong") {
                  style = "bg-red-900/30 border border-red-500/50 text-red-400";
                } else {
                  style = "bg-bg-surface border border-border opacity-50";
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={feedback !== null}
                  className={`${style} rounded-lg px-4 py-3 text-sm font-medium transition-colors text-left`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className="flex items-center justify-between">
              <span
                className={`text-sm font-medium ${
                  feedback === "correct" ? "text-accent" : "text-red-400"
                }`}
              >
                {feedback === "correct" ? "Correct!" : "Incorrect."}
              </span>
              <button
                onClick={generate}
                className="bg-accent hover:bg-accent-dark text-black text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                Next Question
              </button>
            </div>
          )}
        </section>
      )}

      {/* ── Session Stats ── */}
      {(session.correct > 0 || session.wrong > 0) && (
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <span>
            Session:{" "}
            <span className="text-accent font-medium">{session.correct}</span>{" "}
            correct
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>
            <span className="text-red-400 font-medium">{session.wrong}</span>{" "}
            wrong
          </span>
        </div>
      )}
    </div>
  );
}
