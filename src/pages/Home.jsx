import { Link } from "react-router-dom";

const programs = [
  {
    name: "MathCounts",
    grades: "Grades 6-8",
    desc: "Build a strong foundation with competition-style problems designed for middle school students.",
  },
  {
    name: "AMC 8",
    grades: "Grades 6-8",
    desc: "Master the AMC 8 format with targeted practice on number theory, geometry, and combinatorics.",
  },
  {
    name: "AMC 10",
    grades: "Grades 9-10",
    desc: "Tackle advanced topics including algebra, coordinate geometry, and probability.",
  },
];

const features = [
  {
    title: "100% Free",
    desc: "No paywalls, no subscriptions. Quality math training accessible to everyone.",
  },
  {
    title: "Adaptive Practice",
    desc: "Questions adjust to your level. Master each concept before moving on.",
  },
  {
    title: "Structured Curriculum",
    desc: "Lessons organized by topic and difficulty, aligned to real competition formats.",
  },
];

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4">
          Train for Math Olympiads.{" "}
          <span className="text-accent">For Free.</span>
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto mb-8">
          Structured lessons, adaptive practice, and competition-level problems
          for MathCounts, AMC 8, and AMC 10 — completely free.
        </p>
        <Link
          to="/lessons"
          className="inline-block bg-accent hover:bg-accent-dark text-black font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Start Training
        </Link>
      </section>

      {/* Programs */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Programs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div
              key={p.name}
              className="bg-bg-card border border-border rounded-xl p-6 hover:border-accent/40 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
              <span className="text-xs text-accent font-medium">{p.grades}</span>
              <p className="text-text-muted text-sm mt-3">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Why Axiomath?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-bg-surface border border-border rounded-xl p-6"
            >
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-text-muted text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 bg-bg-card border border-border rounded-xl">
        <h2 className="text-2xl font-bold mb-3">Ready to compete?</h2>
        <p className="text-text-muted mb-6">
          Jump into your first lesson and start building real problem-solving skills.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-accent hover:bg-accent-dark text-black font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Go to Dashboard
        </Link>
      </section>
    </div>
  );
}
