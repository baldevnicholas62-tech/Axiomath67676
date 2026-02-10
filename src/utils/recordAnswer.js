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
}) {
  const attemptId = id();
  db.transact(
    tx.questionAttempts[attemptId].update({
      userId,
      questionId,
      questionText,
      userAnswer,
      correctAnswer,
      correct,
      topic,
      difficulty,
      timestamp: Date.now(),
    }),
  );
}
