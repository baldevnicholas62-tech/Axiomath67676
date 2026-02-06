import { useState } from "react";

const questions = [
  {
    q: "If f(x) = 3x² + 7x − 4, what is f(2)?",
    choices: ["18", "22", "26", "14"],
    answer: 1,
  },
  {
    q: "How many prime numbers are less than 30?",
    choices: ["9", "10", "11", "8"],
    answer: 1,
  },
  {
    q: "What is the remainder when 2⁴⁰ is divided by 7?",
    choices: ["1", "2", "4", "6"],
    answer: 2,
  },
  {
    q: "A triangle has sides 5, 12, and 13. What is its area?",
    choices: ["30", "60", "65", "32.5"],
    answer: 0,
  },
  {
    q: "In how many ways can 4 books be arranged on a shelf?",
    choices: ["12", "16", "24", "32"],
    answer: 2,
  },
  {
    q: "What is the sum of the interior angles of a hexagon?",
    choices: ["540°", "720°", "900°", "1080°"],
    answer: 1,
  },
  {
    q: "If log₂(x) = 5, what is x?",
    choices: ["10", "25", "32", "64"],
    answer: 2,
  },
  {
    q: "What is the greatest common divisor of 84 and 126?",
    choices: ["14", "21", "42", "7"],
    answer: 2,
  },
];

export default function Lesson() {
  const [qIndex, setQIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [mastered, setMastered] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  const current = questions[qIndex % questions.length];

  function handleAnswer(choiceIdx) {
    if (feedback !== null) return;
    setSelected(choiceIdx);

    const isCorrect = choiceIdx === current.answer;
    setFeedback(isCorrect ? "correct" : "wrong");

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
      {/* Lesson Content */}
      <section>
        <h1 className="text-3xl font-bold mb-1">Counting Principles</h1>
        <span className="text-xs text-accent font-medium">MathCounts</span>

        <div className="bg-bg-card border border-border rounded-xl p-6 mt-6 space-y-4">
          <div className="aspect-video bg-bg-surface rounded-lg flex items-center justify-center text-text-muted">
            Video placeholder
          </div>

          <div className="text-text-muted text-sm leading-relaxed space-y-3">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
              ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
              curae. Integer vitae nisi at magna fermentum tincidunt vel ac nisl.
            </p>
            <p>
              Suspendisse potenti. Morbi sollicitudin velit at neque elementum, a
              pretium quam molestie. Proin accumsan, tortor id cursus blandit, risus
              nulla volutpat ex, eget pellentesque urna odio quis arcu.
            </p>
            <p>
              Donec at felis nec sapien facilisis dapibus. Curabitur sodales augue
              nec dolor bibendum, sit amet ultrices lacus convallis. Nulla facilisi.
              Fusce volutpat elit ac ex sagittis, id feugiat metus iaculis.
            </p>
          </div>
        </div>
      </section>

      {/* Adaptive Quiz */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Adaptive Practice</h2>

        {mastered ? (
          <div className="bg-bg-card border border-accent/40 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">★</div>
            <h3 className="text-2xl font-bold text-accent mb-2">
              Concept Mastered!
            </h3>
            <p className="text-text-muted mb-1">
              You answered 3 questions correctly in a row.
            </p>
            <p className="text-text-muted text-sm">
              {stats.correct} correct · {stats.wrong} incorrect
            </p>
          </div>
        ) : (
          <div className="bg-bg-card border border-border rounded-xl p-6 space-y-6">
            {/* Progress indicator */}
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

            {/* Question */}
            <p className="text-lg font-medium">{current.q}</p>

            {/* Choices */}
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

            {/* Feedback */}
            {feedback && (
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-medium ${
                    feedback === "correct" ? "text-accent" : "text-red-400"
                  }`}
                >
                  {feedback === "correct"
                    ? "Correct!"
                    : "Incorrect — streak reset."}
                </span>
                <button
                  onClick={nextQuestion}
                  className="bg-accent hover:bg-accent-dark text-black text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
                >
                  Next Question
                </button>
              </div>
            )}

            {/* Stats */}
            <p className="text-xs text-text-muted">
              {stats.correct} correct · {stats.wrong} incorrect
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
