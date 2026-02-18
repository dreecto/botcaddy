"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function CheckIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2"/>
      <path d="M15 24L21 30L33 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-5">
      <div className={`text-center max-w-xs transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="text-[var(--green)] mb-5 flex justify-center">
          <CheckIcon />
        </div>

        <h1 className="heading-md mb-2">You&apos;re in!</h1>
        <p className="body-md mb-8">Check your phone for a welcome text in the next few minutes.</p>

        <div className="bg-white border border-[var(--border-subtle)] rounded-xl p-5 mb-8 text-left text-sm">
          <div className="space-y-3 text-[var(--fg-secondary)]">
            <div className="flex gap-3">
              <span className="text-[var(--green)] font-semibold">1.</span>
              <span>Reply with your bag setup</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[var(--green)] font-semibold">2.</span>
              <span>Play a round</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[var(--green)] font-semibold">3.</span>
              <span>Send your scorecard</span>
            </div>
          </div>
        </div>

        <a href="/" className="text-[var(--fg-secondary)] hover:text-[var(--fg)] text-sm font-medium">
          ← Back to BotCaddy
        </a>

        {sessionId && <p className="mt-6 text-xs text-[var(--fg-tertiary)]">Ref: {sessionId.slice(0, 12)}...</p>}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg)] flex items-center justify-center"><div className="text-[var(--fg-secondary)] text-sm">Loading...</div></div>}>
      <SuccessContent />
    </Suspense>
  );
}
