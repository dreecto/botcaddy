"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function CheckIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 32L28 40L44 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">
      <div
        className={`text-center max-w-md transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Success Icon */}
        <div className="text-[var(--gold)] mb-8 flex justify-center">
          <CheckIcon />
        </div>

        {/* Heading */}
        <h1 className="heading-lg mb-4">You&apos;re In!</h1>
        <p className="body-lg mb-8">
          Your caddy is being set up. You&apos;ll receive a text message within
          the next few minutes to get started.
        </p>

        {/* What's Next */}
        <div className="bg-[var(--card)] border border-[var(--border-subtle)] rounded-lg p-6 mb-8 text-left">
          <h3 className="text-sm font-semibold text-[var(--fg)] mb-4">
            What happens next:
          </h3>
          <ol className="space-y-3 text-sm text-[var(--fg-secondary)]">
            <li className="flex gap-3">
              <span className="text-[var(--gold)] font-medium">1.</span>
              <span>Check your phone for a welcome text from PaisaCaddy</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--gold)] font-medium">2.</span>
              <span>Reply with your bag setup to get started</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--gold)] font-medium">3.</span>
              <span>After your next round, snap and send your scorecard</span>
            </li>
          </ol>
        </div>

        {/* Back to Home */}
        <a
          href="/"
          className="text-[var(--fg-secondary)] hover:text-[var(--fg)] text-sm transition-colors"
        >
          ← Back to PaisaCaddy
        </a>

        {/* Session ID for reference (hidden but useful for debugging) */}
        {sessionId && (
          <p className="mt-8 text-xs text-[var(--fg-tertiary)]">
            Reference: {sessionId.slice(0, 20)}...
          </p>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
          <div className="text-[var(--fg-secondary)]">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
