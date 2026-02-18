"use client";

import { useState } from "react";

function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13 8H3M3 8L7 4M3 8L7 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    caddyName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      {/* Header */}
      <header className="py-6 border-b border-[var(--border-subtle)]">
        <div className="container">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[var(--fg-secondary)] hover:text-[var(--fg)] transition-colors text-sm"
          >
            <ArrowLeft /> Back to PaisaCaddy
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16">
        <div className="container max-w-lg mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <span className="section-label mb-4 block">GET STARTED</span>
            <h1 className="heading-lg mb-4">Set Up Your Caddy</h1>
            <p className="body-md">
              $40/year — Cancel anytime. Your caddy is ready in seconds.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[var(--fg)] mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border-subtle)] rounded-lg text-[var(--fg)] placeholder-[var(--fg-tertiary)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                placeholder="John Smith"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--fg)] mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border-subtle)] rounded-lg text-[var(--fg)] placeholder-[var(--fg-tertiary)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                placeholder="john@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-[var(--fg)] mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border-subtle)] rounded-lg text-[var(--fg)] placeholder-[var(--fg-tertiary)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                placeholder="+1 (555) 123-4567"
              />
              <p className="text-xs text-[var(--fg-tertiary)] mt-2">
                This is where your caddy will text you
              </p>
            </div>

            {/* Caddy Bot Name */}
            <div>
              <label
                htmlFor="caddyName"
                className="block text-sm font-medium text-[var(--fg)] mb-2"
              >
                Name Your Caddy
              </label>
              <input
                type="text"
                id="caddyName"
                name="caddyName"
                value={formData.caddyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border-subtle)] rounded-lg text-[var(--fg)] placeholder-[var(--fg-tertiary)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                placeholder="Ace, Birdie, Tiger..."
              />
              <p className="text-xs text-[var(--fg-tertiary)] mt-2">
                Give your AI caddy a name — make it yours
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-gold justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  Continue to Payment <ArrowRight />
                </>
              )}
            </button>

            {/* Fine Print */}
            <p className="text-center text-xs text-[var(--fg-tertiary)]">
              By continuing, you agree to our Terms of Service.
              <br />
              Your subscription renews annually at $40/year.
            </p>
          </form>

          {/* What's Included */}
          <div className="mt-16 pt-12 border-t border-[var(--border-subtle)]">
            <h3 className="text-center text-sm font-medium text-[var(--fg)] mb-6">
              What&apos;s Included
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-[var(--gold)]">✓</span>
                <span className="text-[var(--fg-secondary)]">
                  Unlimited round tracking
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--gold)]">✓</span>
                <span className="text-[var(--fg-secondary)]">
                  Real-time handicap updates
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--gold)]">✓</span>
                <span className="text-[var(--fg-secondary)]">
                  Club distance tracking
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--gold)]">✓</span>
                <span className="text-[var(--fg-secondary)]">
                  On-course caddy advice
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--gold)]">✓</span>
                <span className="text-[var(--fg-secondary)]">
                  Pattern analysis
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--gold)]">✓</span>
                <span className="text-[var(--fg-secondary)]">
                  Text-based interface
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
