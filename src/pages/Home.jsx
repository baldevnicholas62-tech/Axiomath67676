import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── Floating math symbols ── */
const SYMBOLS = [
  { char: "∑", x: "7%", y: "18%", size: "2.5rem", delay: 0, dur: 7 },
  { char: "π", x: "88%", y: "12%", size: "2rem", delay: 1.5, dur: 8 },
  { char: "∫", x: "15%", y: "55%", size: "2.8rem", delay: 3, dur: 9 },
  { char: "∞", x: "82%", y: "45%", size: "2rem", delay: 0.5, dur: 7.5 },
  { char: "√", x: "92%", y: "65%", size: "2.2rem", delay: 2, dur: 8.5 },
  { char: "Δ", x: "5%", y: "78%", size: "2rem", delay: 4, dur: 7 },
  { char: "θ", x: "50%", y: "8%", size: "1.8rem", delay: 1, dur: 9 },
  { char: "λ", x: "72%", y: "75%", size: "2rem", delay: 2.5, dur: 8 },
];

/* ── Animated counter hook ── */
function useCounter(target, duration = 2000, trigger = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setVal(target);
        clearInterval(id);
      } else {
        setVal(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [trigger, target, duration]);
  return val;
}

export default function Home() {
  const pageRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (entry.target.id === "stats-section") setStatsVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = pageRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stat1 = useCounter(500, 2000, statsVisible);
  const stat2 = useCounter(12, 1500, statsVisible);
  const stat3 = useCounter(95, 2000, statsVisible);

  return (
    <div
      ref={pageRef}
      className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-x-clip"
    >
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative -mt-10 overflow-hidden">
        {/* Night-sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040804] via-[#070a07] to-[#0a0a0a]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 grid-bg" />

        {/* Static starfield */}
        <div className="absolute inset-0 starfield opacity-60" />
        {/* Twinkling star layer */}
        <div className="absolute inset-0 starfield-twinkle" />

        {/* Large orbiting aurora blobs */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            top: "10%",
            left: "50%",
            background: "radial-gradient(circle, rgba(132,204,22,0.07) 0%, transparent 70%)",
            animation: "orb-drift-1 20s ease-in-out infinite, morph 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            top: "30%",
            left: "20%",
            background: "radial-gradient(circle, rgba(101,163,13,0.05) 0%, transparent 70%)",
            animation: "orb-drift-2 18s ease-in-out infinite, morph 12s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            top: "5%",
            right: "10%",
            background: "radial-gradient(circle, rgba(132,204,22,0.04) 0%, transparent 70%)",
            animation: "orb-drift-1 22s ease-in-out infinite reverse",
          }}
        />

        {/* Floating math symbols */}
        {SYMBOLS.map((s, i) => (
          <div
            key={i}
            className="absolute hidden md:block pointer-events-none select-none font-serif text-accent/[0.07]"
            style={{
              left: s.x,
              top: s.y,
              fontSize: s.size,
              animation: `float-symbol ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          >
            {s.char}
          </div>
        ))}

        {/* Fireflies */}
        {[
          { top: "20%", left: "10%", size: 3, delay: 0, dur: 4.5 },
          { top: "30%", left: "82%", size: 2, delay: 1.2, dur: 5 },
          { top: "45%", left: "22%", size: 2.5, delay: 2.5, dur: 5.5 },
          { top: "15%", left: "65%", size: 2, delay: 0.8, dur: 4 },
          { top: "55%", left: "90%", size: 2, delay: 3.5, dur: 6 },
          { top: "35%", left: "48%", size: 1.5, delay: 4, dur: 5 },
          { top: "60%", left: "35%", size: 2, delay: 1, dur: 5.5 },
          { top: "25%", left: "55%", size: 1.5, delay: 2, dur: 4.5 },
        ].map((f, i) => (
          <div
            key={i}
            className="absolute rounded-full hidden sm:block pointer-events-none"
            style={{
              top: f.top,
              left: f.left,
              width: f.size,
              height: f.size,
              backgroundColor: "rgba(132,204,22,0.7)",
              boxShadow: `0 0 ${f.size * 4}px rgba(132,204,22,0.5), 0 0 ${f.size * 10}px rgba(132,204,22,0.2)`,
              animation: `twinkle ${f.dur}s ease-in-out ${f.delay}s infinite, drift ${f.dur * 3}s ease-in-out ${f.delay}s infinite`,
            }}
          />
        ))}

        {/* Rolling hills */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path d="M0 200 V140 Q360 95 720 125 Q1080 85 1440 110 V200Z" fill="#0d110d" />
          <path d="M0 200 V165 Q400 140 800 155 Q1200 135 1440 152 V200Z" fill="#0b0d0b" />
          <path d="M0 200 V182 Q500 170 1000 177 Q1300 170 1440 175 V200Z" fill="#0a0a0a" />
        </svg>

        {/* Hero content */}
        <div className="relative max-w-4xl mx-auto px-6 pt-36 pb-52 text-center">
          <div className="animate-fade-in inline-flex items-center gap-2 bg-accent/[0.08] border border-accent/20 rounded-full px-4 py-1.5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-accent/80 text-xs font-medium tracking-wide uppercase">
              Free math competition training
            </span>
          </div>

          <h1
            className="animate-fade-in-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05]"
            style={{ animationDelay: "0.1s" }}
          >
            Train smarter for
            <br />
            <span className="text-shimmer">MATHCOUNTS & AMC</span>
          </h1>

          <p
            className="animate-fade-in-up mx-auto mt-7 max-w-xl text-text-muted/90 text-lg sm:text-xl leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            Focused sessions. Mastery-based progression.
            <br className="hidden sm:block" />
            No busywork — just what moves your score.
          </p>

          <div
            className="animate-fade-in-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/lessons"
              className="group relative inline-flex items-center gap-2.5 bg-accent hover:bg-accent-dark text-black font-bold px-9 py-4 rounded-2xl transition-all duration-300 hover:shadow-[0_0_60px_rgba(132,204,22,0.35)] hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Pulse rings */}
              <span className="absolute inset-0 rounded-2xl border border-accent/40" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
              <span className="absolute inset-0 rounded-2xl border border-accent/20" style={{ animation: "pulse-ring 2s ease-out 0.5s infinite" }} />

              <span className="relative">Start training — it's free</span>
              <svg
                className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/dashboard"
              className="text-sm text-text-muted hover:text-white transition-colors py-2 px-4 border border-transparent hover:border-border rounded-xl"
            >
              or view dashboard →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────── */}
      <section
        id="stats-section"
        className="reveal relative -mt-6 border-y border-border/40 bg-bg-card/30 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
          {[
            { value: stat1, suffix: "+", label: "Practice problems" },
            { value: stat2, suffix: "", label: "Topic tracks" },
            { value: stat3, suffix: "%", label: "Completion rate" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl sm:text-4xl font-extrabold text-accent tabular-nums">
                {s.value}{s.suffix}
              </div>
              <div className="text-xs sm:text-sm text-text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ───────────────────────────────────── */}
      <section className="reveal max-w-5xl mx-auto mt-28 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Built for <span className="text-accent">competition day</span>
          </h2>
          <p className="text-text-muted mt-3 max-w-lg mx-auto">
            Every feature is designed to move you closer to your target score.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                </svg>
              ),
              title: "Timed practice",
              desc: "Sessions mirror real contest pacing so you build speed under pressure.",
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Mastery unlocks",
              desc: "Move forward only when you've proven consistency — no skipping weak spots.",
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: "20 min sessions",
              desc: "Short, high-signal sessions you can stick with every day.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`card-shine animated-border group relative rounded-2xl bg-bg-card/50 backdrop-blur-sm p-7 transition-all duration-300 hover:bg-bg-card/80 hover:-translate-y-1 hover:shadow-[0_20px_60px_-12px_rgba(132,204,22,0.1)] reveal-delay-${i + 1}`}
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {item.icon}
              </div>
              <h3 className="font-bold text-base">{item.title}</h3>
              <p className="text-sm text-text-muted mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tracks ─────────────────────────────────────── */}
      <section className="reveal max-w-5xl mx-auto mt-32 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Pick your track</h2>
          <p className="text-text-muted mt-3">Two paths, both built for competition day.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              name: "MATHCOUNTS / AMC 8",
              grades: "Grades 6–8",
              topics: "Number theory, geometry, counting & probability",
              style: "Guided lessons + short timed drills",
              label: "Track A",
            },
            {
              name: "AMC 10",
              grades: "Grades 9–10",
              topics: "Algebra, combinatorics, advanced problem-solving",
              style: "Strategy lessons + challenge problem sets",
              label: "Track B",
            },
          ].map((track, i) => (
            <Link
              key={track.name}
              to="/lessons"
              className={`card-shine animated-border group relative rounded-2xl bg-bg-card/50 backdrop-blur-sm p-7 transition-all duration-300 hover:bg-bg-card/80 hover:-translate-y-1 hover:shadow-[0_20px_60px_-12px_rgba(132,204,22,0.1)] reveal-delay-${i + 1}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
                    {track.label}
                  </span>
                  <h3 className="font-bold text-xl">{track.name}</h3>
                  <span className="inline-block mt-1.5 text-xs text-accent font-semibold bg-accent/10 border border-accent/20 rounded-full px-3 py-0.5">
                    {track.grades}
                  </span>
                </div>
              </div>
              <p className="text-sm text-text-muted mt-4 leading-relaxed">{track.topics}</p>
              <p className="text-xs text-text-muted/70 mt-1.5">{track.style}</p>

              <div className="mt-6 flex items-center gap-2 text-sm text-accent font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Start this track
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How it works ───────────────────────────────── */}
      <section className="reveal max-w-2xl mx-auto mt-32 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Up and running in minutes</h2>
          <p className="text-text-muted mt-3">Three steps to your first session.</p>
        </div>

        <div className="space-y-0">
          {[
            { step: "1", title: "Pick your track", desc: "MATHCOUNTS / AMC 8 or AMC 10 — choose your path.", icon: "01" },
            { step: "2", title: "Take a quick diagnostic", desc: "We place you at the right level instantly.", icon: "02" },
            { step: "3", title: "Start your first session", desc: "One lesson, one drill, one checkpoint — done.", icon: "03" },
          ].map((item, idx) => (
            <div key={item.step} className="relative flex gap-6 pb-10">
              {idx < 2 && (
                <div className="absolute left-[22px] top-12 bottom-0 w-px bg-gradient-to-b from-accent/30 to-border/30" />
              )}
              <div className="relative z-10 flex-shrink-0 w-11 h-11 rounded-xl bg-accent/10 border border-accent/25 text-xs font-semibold tracking-wide text-accent flex items-center justify-center">
                {item.icon}
              </div>
              <div className="pt-2">
                <p className="font-bold text-base">
                  <span className="text-accent mr-2">Step {item.step}</span>
                  {item.title}
                </p>
                <p className="text-sm text-text-muted mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────── */}
      <section className="reveal max-w-5xl mx-auto mt-32 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold">From students & parents</h2>
          <p className="text-text-muted mt-3">Real feedback from real users.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              quote: "The pacing drills made me stop panicking on timed sets. I finally finish with a plan.",
              by: "AMC 8 student",
              stars: 5,
            },
            {
              quote: "My child stopped guessing and started explaining why each answer works.",
              by: "Parent",
              stars: 5,
            },
            {
              quote: "The mastery unlocks kept me honest. I couldn\u2019t skip weak topics anymore.",
              by: "AMC 10 student",
              stars: 5,
            },
          ].map((t, i) => (
            <blockquote
              key={t.by}
              className={`card-shine animated-border group relative rounded-2xl bg-bg-card/50 backdrop-blur-sm p-7 transition-all duration-300 hover:bg-bg-card/80 hover:-translate-y-1 reveal-delay-${i + 1}`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm leading-relaxed text-white/85">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                  {t.by[0]}
                </div>
                <span className="text-xs text-text-muted font-medium">{t.by}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────── */}
      <section className="reveal relative max-w-3xl mx-auto mt-32 mb-12 px-6">
        <div className="relative rounded-3xl border border-border/40 bg-bg-card/30 backdrop-blur-sm p-12 sm:p-16 text-center overflow-hidden">
          {/* Background orbs */}
          <div
            className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{
              top: "-50px",
              right: "-80px",
              background: "radial-gradient(circle, rgba(132,204,22,0.06) 0%, transparent 70%)",
              animation: "orb-drift-1 15s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[250px] h-[250px] rounded-full pointer-events-none"
            style={{
              bottom: "-60px",
              left: "-60px",
              background: "radial-gradient(circle, rgba(101,163,13,0.04) 0%, transparent 70%)",
              animation: "orb-drift-2 18s ease-in-out infinite",
            }}
          />

          <h2 className="relative text-3xl sm:text-4xl font-extrabold">Ready to start?</h2>
          <p className="relative text-text-muted mt-3 max-w-md mx-auto">
            Pick a track, take the diagnostic, finish your first session — all in under 25 minutes.
          </p>

          <Link
            to="/lessons"
            className="group relative inline-flex items-center gap-2.5 mt-10 bg-accent hover:bg-accent-dark text-black font-bold px-9 py-4 rounded-2xl transition-all duration-300 hover:shadow-[0_0_60px_rgba(132,204,22,0.35)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-0 rounded-2xl border border-accent/30" style={{ animation: "pulse-ring 2.5s ease-out infinite" }} />
            <span className="relative">Start training — it's free</span>
            <svg
              className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
