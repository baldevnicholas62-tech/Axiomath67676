import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const programs = [
  {
    name: "MATHCOUNTS / AMC 8",
    grades: "Grades 6-8",
    desc: "Build a strong foundation with competition-style problems designed for middle school students.",
    icon: "\u03C0",
    topics: "Algebra, Geometry, Number Theory",
    lessons: 12,
  },
  {
    name: "MATHCOUNTS / AMC 8",
    grades: "Grades 6-8",
    desc: "Master the MATHCOUNTS / AMC 8 format with targeted practice on number theory, geometry, and combinatorics.",
    icon: "\u0394",
    topics: "Combinatorics, Probability, Logic",
    lessons: 10,
  },
  {
    name: "AMC 10",
    grades: "Grades 9-10",
    desc: "Tackle advanced topics including algebra, coordinate geometry, and probability.",
    icon: "\u03A3",
    topics: "Advanced Algebra, Sequences, Proofs",
    lessons: 14,
  },
];

const features = [
  {
    title: "100% Free",
    desc: "No paywalls, no subscriptions. Quality math training accessible to everyone.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Adaptive Practice",
    desc: "Questions adjust to your level. Master each concept before moving on.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Structured Curriculum",
    desc: "Lessons organized by topic and difficulty, aligned to real competition formats.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Track Progress",
    desc: "See your improvement over time with detailed stats and mastery indicators.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "100+", label: "Lessons" },
  { value: "500+", label: "Practice Problems" },
  { value: "98%", label: "Student Success Rate" },
];

export default function Home() {
  const pageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = pageRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero — full width, breaks out of parent container */}
      <section
        className="relative -mx-6 -mt-10 flex items-center justify-center overflow-hidden"
        style={{ minHeight: "calc(100vh - 57px)" }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.045,
            backgroundImage:
              "linear-gradient(rgba(132, 204, 22, 0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(132, 204, 22, 0.75) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
            maskImage: "radial-gradient(circle at 50% 42%, black 35%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 42%, black 35%, transparent 85%)",
          }}
        />

        {/* Large arc with black fill */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none rounded-full"
          style={{
            width: "min(1100px, 90vw)",
            height: "min(1100px, 90vw)",
            top: "15%",
            background: "#0a0a0a",
            border: "1.5px solid rgba(132, 204, 22, 0.25)",
            boxShadow:
              "0 0 40px rgba(132, 204, 22, 0.06), 0 0 80px rgba(132, 204, 22, 0.03), inset 0 0 60px rgba(132, 204, 22, 0.03)",
          }}
        />

        {/* Bottom fade to background */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "40%",
            background: "linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)",
          }}
        />

        {/* Radial glow behind text */}
        <div
          className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(132, 204, 22, 0.06) 0%, transparent 70%)",
          }}
        />

        {/* Content — pushed down into the arc */}
        <div className="relative text-center px-6 mt-24 md:mt-32">
          <h1 className="animate-fade-in-up">
            <span className="block text-5xl md:text-7xl font-light tracking-tight mb-2">
              Master Math
            </span>
            <span
              className="block text-6xl md:text-8xl font-extrabold italic text-accent tracking-tight"
              style={{ animationDelay: "0.1s" }}
            >
              Olympiad Style
            </span>
          </h1>

          <p
            className="animate-fade-in-up text-text-muted text-base md:text-lg max-w-lg mx-auto mt-8"
            style={{ animationDelay: "0.25s" }}
          >
            Structured lessons and practice problems designed
            specifically for MATHCOUNTS / AMC 8 and AMC 10 success
          </p>

          <div
            className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center mt-10"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              to="/lessons"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-black font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_30px_#84cc1630]"
            >
              Start Training
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-white font-semibold px-8 py-3.5 rounded-xl border border-border transition-all hover:scale-105"
            >
              View Dashboard
            </Link>
          </div>

          {/* Stats Bar */}
          <div
            className="animate-fade-in-up grid grid-cols-3 gap-4 mt-12 w-full max-w-2xl mx-auto"
            style={{ animationDelay: "0.55s" }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-bg-card border border-border rounded-xl p-5 text-center hover:border-accent/30 transition-colors"
              >
                <div className="text-2xl md:text-3xl font-extrabold text-accent mb-1">{s.value}</div>
                <div className="text-text-muted text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of page */}
      <div className="space-y-28 mt-16">

        {/* Programs */}
        <section className="reveal">
          <div className="text-center mb-10">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Programs</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Choose Your Path</h2>
            <p className="text-text-muted mt-3 max-w-xl mx-auto">
              Three competition tracks, each with a structured curriculum that takes you from fundamentals to competition-ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((p) => (
              <Link
                key={p.name}
                to="/lessons"
                className="group bg-bg-card border border-border rounded-2xl p-7 hover:border-accent/50 transition-all hover:-translate-y-1 hover:shadow-[0_8px_40px_#84cc1612] block"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-2xl font-bold mb-5 group-hover:bg-accent/20 transition-colors">
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{p.name}</h3>
                <span className="text-xs text-accent font-semibold">{p.grades}</span>
                <p className="text-text-muted text-sm mt-3 leading-relaxed">{p.desc}</p>
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-text-muted">{p.topics}</span>
                  <span className="text-xs text-accent font-semibold">{p.lessons} lessons</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="reveal">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Three Steps to Mastery</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Learn", desc: "Read through focused lessons covering key competition topics and strategies." },
              { step: "02", title: "Practice", desc: "Solve adaptive problems that adjust difficulty based on your performance." },
              { step: "03", title: "Master", desc: "Prove mastery by answering 3 in a row correctly. Then move to the next topic." },
            ].map((s) => (
              <div key={s.step} className="relative">
                <span className="text-7xl font-black text-accent/10 absolute -top-4 -left-2 select-none pointer-events-none">{s.step}</span>
                <div className="relative pt-8 pl-1">
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="reveal">
          <div className="text-center mb-10">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Why Axiomath?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-bg-card border border-border rounded-2xl p-6 flex gap-5 items-start hover:border-accent/30 transition-all"
              >
                <div className="shrink-0 w-11 h-11 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="reveal relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-bg-card to-bg-card pointer-events-none" />
          <div className="relative text-center py-16 px-6 border border-accent/20 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to compete?</h2>
            <p className="text-text-muted text-lg max-w-lg mx-auto mb-8">
              Join thousands of students training for math competitions. Your first lesson is one click away.
            </p>
            <Link
              to="/lessons"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-black font-bold px-10 py-4 rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_30px_#84cc1630] text-lg"
            >
              Get Started Now
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
