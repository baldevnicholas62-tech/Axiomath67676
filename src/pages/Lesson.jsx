import { useState } from "react";
import db from "../db";
import { questions } from "../data/questions";
import { recordAnswer } from "../utils/recordAnswer";

const textLessonMessages = [
  {
    role: "coach",
    text: "Welcome to Counting Principles. We use structure to count quickly without listing every outcome.",
  },
  {
    role: "coach",
    text: "Rule 1: If task A has m ways and task B has n ways, together they have m x n ways.",
  },
  {
    role: "example",
    text: "Example: 3 shirts and 4 pants gives 3 x 4 = 12 outfits.",
  },
  {
    role: "coach",
    text: "Rule 2: When choices do not overlap, add counts instead of multiply.",
  },
  {
    role: "example",
    text: "Example: 5 ways to travel by bus or 2 by train gives 5 + 2 = 7 choices.",
  },
  {
    role: "coach",
    text: "For arrangements, order matters. 4 different books can be arranged in 4 x 3 x 2 x 1 = 24 ways.",
  },
];

export default function Lesson() {
  const { user } = db.useAuth();
  const [mode, setMode] = useState(null);
  const [textStep, setTextStep] = useState(1);
  const [qIndex, setQIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [mastered, setMastered] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  const current = questions[qIndex % questions.length];
  const isTextLessonComplete = textStep >= textLessonMessages.length;

  function resetQuiz() {
    setQIndex(0);
    setStreak(0);
    setSelected(null);
    setFeedback(null);
    setMastered(false);
    setStats({ correct: 0, wrong: 0 });
  }

  function startMode(nextMode) {
    setMode(nextMode);
    setTextStep(1);
    resetQuiz();
  }

  function handleAnswer(choiceIdx) {
    if (feedback !== null) return;
    setSelected(choiceIdx);

    const isCorrect = choiceIdx === current.answer;
    setFeedback(isCorrect ? "correct" : "wrong");

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

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setStats((s) => ({ ...s, correct: s.correct + 1 }));
      if (newStreak >= 3) {
        setMastered(true);
      }
    } else {
      setStreak(0);
      setStats((s) => ({ ...s, wrong: s.wrong + 1 }));
    }
  }

  function nextQuestion() {
    setFeedback(null);
    setSelected(null);
    setQIndex((i) => i + 1);
  }

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold mb-1">Counting Principles</h1>
        <span className="text-xs text-accent font-medium">MATHCOUNTS / AMC 8</span>
      </section>

      {mode === null && (
        <section className="bg-bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Choose how you want to learn</h2>
          <p className="text-sm text-text-muted mb-5">
            Pick one path for this lesson. All paths lead to the same mastery test.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => startMode("video-quiz")}
              className="text-left bg-bg-surface border border-border rounded-lg p-4 hover:border-accent/50 transition-colors"
            >
              <p className="text-sm text-accent font-semibold mb-1">Option 1</p>
              <p className="font-medium">Video lesson + mastery quiz</p>
            </button>
            <button
              onClick={() => startMode("text-quiz")}
              className="text-left bg-bg-surface border border-border rounded-lg p-4 hover:border-accent/50 transition-colors"
            >
              <p className="text-sm text-accent font-semibold mb-1">Option 2</p>
              <p className="font-medium">Text-message lesson + examples + mastery quiz</p>
            </button>
            <button
              onClick={() => startMode("test-only")}
              className="text-left bg-bg-surface border border-border rounded-lg p-4 hover:border-accent/50 transition-colors"
            >
              <p className="text-sm text-accent font-semibold mb-1">Option 3</p>
              <p className="font-medium">Skip lesson and go straight to mastery test</p>
            </button>
          </div>
        </section>
      )}

      {mode === "video-quiz" && (
        <section className="bg-bg-card border border-border rounded-xl p-6 mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Video Lesson</h2>
            <button
              onClick={() => setMode(null)}
              className="text-xs text-text-muted hover:text-text-primary transition-colors"
            >
              Change option
            </button>
          </div>
          <div className="aspect-video bg-bg-surface rounded-lg flex items-center justify-center text-text-muted">
            Video placeholder
          </div>
          <div className="text-text-muted text-sm leading-relaxed space-y-3">
            <p>
              Learn the multiplication and addition principles for counting problems.
            </p>
            <p>
              Pause the video whenever needed, then continue to the mastery test below.
            </p>
          </div>
        </section>
      )}

      {mode === "text-quiz" && (
        <section className="bg-bg-card border border-border rounded-xl p-6 mt-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Text Lesson</h2>
            <button
              onClick={() => setMode(null)}
              className="text-xs text-text-muted hover:text-text-primary transition-colors"
            >
              Change option
            </button>
          </div>

          <div className="space-y-3">
            {textLessonMessages.slice(0, textStep).map((message, index) => (
              <div
                key={index}
                className={`max-w-xl rounded-lg px-4 py-3 text-sm ${
                  message.role === "example"
                    ? "bg-accent/10 border border-accent/40 text-accent"
                    : "bg-bg-surface border border-border text-text-muted"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {!isTextLessonComplete ? (
              <button
                onClick={() => setTextStep((step) => step + 1)}
                className="bg-accent hover:bg-accent-dark text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                Reveal next message
              </button>
            ) : (
              <span className="text-sm text-accent font-medium">
                Lesson complete. Continue to the mastery test.
              </span>
            )}
            <span className="text-xs text-text-muted">
              {Math.min(textStep, textLessonMessages.length)}/{textLessonMessages.length} messages
            </span>
          </div>
        </section>
      )}

      {mode !== null && (mode !== "text-quiz" || isTextLessonComplete) && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Test for Mastery</h2>

          {mastered ? (
            <div className="bg-bg-card border border-accent/40 rounded-xl p-8 text-center">
              <div className="text-4xl mb-3">*</div>
              <h3 className="text-2xl font-bold text-accent mb-2">
                Concept Mastered!
              </h3>
              <p className="text-text-muted mb-1">
                You answered 3 questions correctly in a row.
              </p>
              <p className="text-text-muted text-sm">
                {stats.correct} correct | {stats.wrong} incorrect
              </p>
            </div>
          ) : (
            <div className="bg-bg-card border border-border rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-text-muted">Mastery streak:</span>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`w-8 h-2 rounded-full transition-colors ${
                        i < streak ? "bg-accent" : "bg-bg-surface"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-muted">{streak}/3</span>
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
                    {feedback === "correct"
                      ? "Correct!"
                      : "Incorrect - streak reset."}
                  </span>
                  <button
                    onClick={nextQuestion}
                    className="bg-accent hover:bg-accent-dark text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
                  >
                    Next Question
                  </button>
                </div>
              )}

              <p className="text-xs text-text-muted">
                {stats.correct} correct | {stats.wrong} incorrect
              </p>
            </div>
          )}
        </section>
      )}

      {mode === "text-quiz" && !isTextLessonComplete && (
        <section className="bg-bg-card border border-border rounded-xl p-5">
          <p className="text-sm text-text-muted">
            Finish all text messages to unlock the mastery test.
          </p>
        </section>
      )}

      {mode === null && (
        <section className="bg-bg-card border border-border rounded-xl p-5">
          <p className="text-sm text-text-muted">
            Select one of the three options above to begin this lesson.
          </p>
        </section>
      )}
    </div>
  );
}
