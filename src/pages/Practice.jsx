import { useState, useCallback, useEffect, useRef } from "react";
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

const TIMER_OPTIONS = [
  { label: "Off", value: 0 },
  { label: "30s", value: 30 },
  { label: "60s", value: 60 },
  { label: "90s", value: 90 },
  { label: "2m", value: 120 },
];

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

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Practice() {
  const { user } = db.useAuth();

  const [difficulty, setDifficulty] = useState(2);
  const [topicFilter, setTopicFilter] = useState("All");
  const [current, setCurrent] = useState(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [session, setSession] = useState({ correct: 0, wrong: 0 });

  // Timer state
  const [timerLimit, setTimerLimit] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  // Session elapsed time
  const [sessionStart, setSessionStart] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKey(e) {
      if (!current || feedback !== null) {
        if (feedback !== null && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          generate();
        }
        return;
      }
      const keyMap = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };
      const idx = keyMap[e.key.toLowerCase()];
      if (idx !== undefined) {
        e.preventDefault();
        handleAnswer(idx);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  // Session timer
  useEffect(() => {
    if (!sessionStart) return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - sessionStart) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [sessionStart]);

  // Question timer
  useEffect(() => {
    if (timerLimit <= 0 || !current || feedback !== null) {
      clearInterval(timerRef.current);
      return;
    }
    setTimeLeft(timerLimit);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Time's up — mark as wrong
          setFeedback("timeout");
          setSession((s) => ({ ...s, wrong: s.wrong + 1 }));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [current, timerLimit]);

  const generate = useCallback(() => {
    const pool = getFiltered(topicFilter, difficulty);
    setCurrent(pickRandom(pool));
    setSelected(null);
    setFeedback(null);
    if (!sessionStart) setSessionStart(Date.now());
  }, [topicFilter, difficulty, sessionStart]);

  function handleAnswer(choiceIdx) {
    if (feedback !== null || !current) return;
    clearInterval(timerRef.current);
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

  function resetSession() {
    setCurrent(null);
    setSelected(null);
    setFeedback(null);
    setSession({ correct: 0, wrong: 0 });
    setSessionStart(null);
    setElapsed(0);
  }

  const pool = getFiltered(topicFilter, difficulty);
  const color = difficultyColors[difficulty];
  const totalAnswered = session.correct + session.wrong;
  const accuracy = totalAnswered > 0 ? Math.round((session.correct / totalAnswered) * 100) : 0;

  return (
    <div className="space-y-6" style={{ animation: "fade-in-up 0.5s ease-out both" }}>
      {/* Header with session stats */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Practice Mode</h1>
          <p className="text-text-muted text-sm">
            Tune the difficulty, pick a topic, and generate random problems.
            <span className="hidden sm:inline text-text-muted/40"> Press 1-4 to answer.</span>
          </p>
        </div>

        {/* Live session stats */}
        {sessionStart && (
          <div className="flex items-center gap-4 text-sm bg-bg-card/60 border border-border/40 rounded-xl px-4 py-2.5">
            <span className="text-text-muted/60 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {formatTime(elapsed)}
            </span>
            <span className="w-px h-4 bg-border" />
            <span className="text-accent font-medium">{session.correct}</span>
            <span className="text-text-muted/30">/</span>
            <span className="text-red-400 font-medium">{session.wrong}</span>
            <span className="w-px h-4 bg-border" />
            <span className="font-medium" style={{ color: accuracy >= 70 ? "#171717" : accuracy >= 40 ? "#d97706" : "#f87171" }}>
              {accuracy}%
            </span>
            <button
              onClick={resetSession}
              className="text-text-muted/40 hover:text-text-primary transition-colors ml-1"
              title="Reset session"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <section className="card-shine animated-border bg-bg-card/60 rounded-2xl p-5 sm:p-6 space-y-5">
        {/* Difficulty slider */}
        <div>
          <label className="text-sm text-text-muted mb-3 block">
            Difficulty —{" "}
            <span className="font-semibold text-text-primary">
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
                background: `linear-gradient(to right, ${color} ${((difficulty - 1) / 4) * 100}%, #e5e5e5 ${((difficulty - 1) / 4) * 100}%)`,
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
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  topicFilter === t
                    ? "bg-accent text-white shadow-[0_0_16px_rgba(23,23,23,0.1)]"
                    : "bg-bg-surface text-text-muted hover:text-text-primary border border-border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Timer setting */}
        <div>
          <label className="text-sm text-text-muted mb-3 block">
            Timer per question
          </label>
          <div className="flex gap-2">
            {TIMER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTimerLimit(opt.value)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  timerLimit === opt.value
                    ? "bg-accent text-white shadow-[0_0_16px_rgba(23,23,23,0.1)]"
                    : "bg-bg-surface text-text-muted hover:text-text-primary border border-border"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          disabled={pool.length === 0}
          className="w-full py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-all duration-200 shadow-[0_0_20px_rgba(23,23,23,0.1)] hover:shadow-[0_0_30px_rgba(23,23,23,0.15)] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.99]"
        >
          {current ? "Next Question" : "Generate Question"}
          <span className="text-black/50 ml-2 text-sm font-normal">
            ({pool.length} available)
          </span>
        </button>
      </section>

      {/* Question */}
      {current && (
        <section
          className="bg-bg-card border border-border/60 rounded-2xl p-5 sm:p-6 space-y-5"
          style={{ animation: "scale-in 0.25s ease-out both" }}
        >
          {/* Header with badges + timer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{ backgroundColor: `${color}20`, color }}
              >
                {difficultyLabels[current.difficulty]}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent font-semibold">
                {current.topic}
              </span>
            </div>

            {/* Countdown timer */}
            {timerLimit > 0 && feedback === null && (
              <div className={`flex items-center gap-1.5 text-sm font-mono font-semibold ${timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-text-muted"}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {formatTime(timeLeft)}
              </div>
            )}

            {feedback === "timeout" && (
              <span className="text-sm font-semibold text-red-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Time's up!
              </span>
            )}
          </div>

          {/* Timer progress bar */}
          {timerLimit > 0 && feedback === null && (
            <div className="w-full h-1 bg-bg-surface rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-linear"
                style={{
                  width: `${(timeLeft / timerLimit) * 100}%`,
                  background: timeLeft <= 10 ? "#f87171" : timeLeft <= 20 ? "#facc15" : "#171717",
                  boxShadow: `0 0 8px ${timeLeft <= 10 ? "rgba(248,113,113,0.4)" : "rgba(23,23,23,0.2)"}`,
                }}
              />
            </div>
          )}

          <p className="text-lg font-medium leading-relaxed">{current.q}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.choices.map((c, i) => {
              const isTimedOut = feedback === "timeout";
              let style = "bg-bg-surface border border-border hover:border-accent/40 cursor-pointer";
              if (feedback !== null) {
                if (i === current.answer) {
                  style = "bg-accent/20 border border-accent text-accent";
                } else if (i === selected && (feedback === "wrong" || isTimedOut)) {
                  style = "bg-red-50 border border-red-300 text-red-500";
                } else {
                  style = "bg-bg-surface border border-border opacity-50";
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={feedback !== null}
                  className={`${style} rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 text-left flex items-center gap-3 group/choice`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    feedback !== null && i === current.answer
                      ? "bg-accent/30 text-accent"
                      : feedback !== null && i === selected && feedback !== "correct"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-black/[0.04] text-text-muted group-hover/choice:bg-accent/10 group-hover/choice:text-accent"
                  }`}>
                    {i + 1}
                  </span>
                  {c}
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className="flex items-center justify-between pt-1">
              <span
                className={`text-sm font-medium flex items-center gap-2 ${
                  feedback === "correct" ? "text-accent" : "text-red-400"
                }`}
              >
                {feedback === "correct" ? (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Correct!
                  </>
                ) : feedback === "timeout" ? (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    Time ran out. The answer was: {current.choices[current.answer]}
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Incorrect. Answer: {current.choices[current.answer]}
                  </>
                )}
              </span>
              <button
                onClick={generate}
                className="bg-accent hover:bg-accent-dark text-black text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(23,23,23,0.1)]"
              >
                Next
                <span className="hidden sm:inline"> Question</span>
                <span className="text-black/40 ml-1 text-xs">Enter</span>
              </button>
            </div>
          )}
        </section>
      )}

      {/* Keyboard hint */}
      {!current && (
        <div className="hidden sm:flex items-center justify-center gap-6 text-xs text-text-muted/30 py-4">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-black/[0.04] border border-black/[0.06] text-text-muted/50 font-mono">1</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-black/[0.04] border border-black/[0.06] text-text-muted/50 font-mono">2</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-black/[0.04] border border-black/[0.06] text-text-muted/50 font-mono">3</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-black/[0.04] border border-black/[0.06] text-text-muted/50 font-mono">4</kbd>
            to answer
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-black/[0.04] border border-black/[0.06] text-text-muted/50 font-mono">Enter</kbd>
            next question
          </span>
        </div>
      )}
    </div>
  );
}
