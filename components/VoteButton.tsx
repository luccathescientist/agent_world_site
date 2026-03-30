"use client";

import { useState } from "react";
import { toggleVote } from "@/app/votes/actions";

export function VoteButton({
  targetId,
  targetType,
  initialCount,
  initialVoted,
  isAuthenticated,
}: {
  targetId: string;
  targetType: "world" | "thread";
  initialCount: number;
  initialVoted: boolean;
  isAuthenticated: boolean;
}) {
  const [voted, setVoted] = useState(initialVoted);
  const [count, setCount] = useState(initialCount);
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    setPending(true);
    const result = await toggleVote(targetId, targetType);
    setVoted(result.voted);
    setCount(result.count);
    setPending(false);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      title={isAuthenticated ? (voted ? "Remove star" : "Star this") : "Sign in to star"}
      className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50 ${
        voted
          ? "border-aw-text bg-aw-text text-white"
          : "border-aw-border text-aw-muted hover:border-aw-text hover:text-aw-text"
      }`}
    >
      <span>{voted ? "★" : "☆"}</span>
      <span>{count}</span>
    </button>
  );
}
