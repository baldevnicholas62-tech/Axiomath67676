import { id, tx } from "@instantdb/react";
import db from "../db";

export function recordAnswer({
  userId,
  questionId,
  questionText,
  userAnswer,
  correctAnswer,
  correct,
  topic,
  difficulty,
  source,
}) {
  const attemptId = id();
  const payload = {
    userId,
    questionId,
    questionText,
    userAnswer,
    correctAnswer,
    correct,
    topic,
    difficulty,
    timestamp: Date.now(),
  };
  if (source) payload.source = source;
  db.transact(tx.questionAttempts[attemptId].update(payload));
}
