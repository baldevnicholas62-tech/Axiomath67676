import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tx } from "@instantdb/react";
import db from "../db";

const PENDING_NAME_KEY = "axiomath_pending_name";

export default function SignIn() {
  const { isLoading, user } = db.useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sentTo, setSentTo] = useState(null);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  // Redirect if already signed in
  useEffect(() => {
    if (!user) return;

    const pendingName = localStorage.getItem(PENDING_NAME_KEY)?.trim();
    if (pendingName) {
      try {
        db.transact(
          tx.userProfiles[`profile-${user.id}`].update({
            userId: user.id,
            name: pendingName,
          }),
        );
      } finally {
        localStorage.removeItem(PENDING_NAME_KEY);
      }
    }

    navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  // Send magic code
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError(null);
    const trimmedName = fullName.trim();
    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    setSending(true);
    try {
      localStorage.setItem(PENDING_NAME_KEY, trimmedName);
      await db.auth.sendMagicCode({ email });
      setSentTo(email);
    } catch (err) {
      setError(err.body?.message || "Failed to send code. Please try again.");
    } finally {
      setSending(false);
    }
  };

  // Verify magic code
  const handleVerify = async (e) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      await db.auth.signInWithMagicCode({ email: sentTo, code });
    } catch (err) {
      setError(err.body?.message || "Invalid code. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  // Already signed in — waiting for redirect
  if (user) return null;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div
        className="w-full max-w-sm bg-bg-card border border-border/60 rounded-2xl p-8 shadow-[0_32px_80px_-12px_rgba(0,0,0,0.6)]"
        style={{ animation: "scale-in 0.25s ease-out both" }}
      >
        <h1 className="text-2xl font-bold text-center mb-1">Sign in to Axiomath</h1>
        <p className="text-sm text-text-muted text-center mb-6">
          {sentTo
            ? `Enter the code sent to ${sentTo}`
            : "Create your account with your name and email"}
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
            {error}
          </div>
        )}

        {!sentTo ? (
          /* ── Email entry ── */
          <form onSubmit={handleSendCode} className="space-y-4">
            <input
              type="text"
              required
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-bg-surface border border-border/60 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 outline-none focus:border-accent/60 focus:shadow-[0_0_0_3px_rgba(23,23,23,0.08)] transition-all"
              autoComplete="name"
              autoFocus
            />
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-bg-surface border border-border/60 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/40 outline-none focus:border-accent/60 focus:shadow-[0_0_0_3px_rgba(23,23,23,0.08)] transition-all"
              autoComplete="email"
            />
            <button
              type="submit"
              disabled={sending || !email || !fullName.trim()}
              className="w-full py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors shadow-[0_0_20px_rgba(23,23,23,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "Sending..." : "Send sign-in code"}
            </button>
          </form>
        ) : (
          /* ── Code verification ── */
          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              required
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-bg-surface border border-border/60 rounded-xl px-4 py-3 text-text-primary text-center text-lg tracking-widest placeholder:text-text-muted/40 placeholder:tracking-normal placeholder:text-base outline-none focus:border-accent/60 focus:shadow-[0_0_0_3px_rgba(23,23,23,0.08)] transition-all"
              autoFocus
            />
            <button
              type="submit"
              disabled={sending || !code}
              className="w-full py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors shadow-[0_0_20px_rgba(23,23,23,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "Verifying..." : "Verify code"}
            </button>
            <button
              type="button"
              onClick={() => { setSentTo(null); setCode(""); setError(null); }}
              className="w-full text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              Use a different email
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
