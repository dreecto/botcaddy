"use client";

import { useState } from "react";
import Image from "next/image";

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", caddyName: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  const features = ["Unlimited rounds", "Handicap tracking", "Club distances", "On-course advice"];

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      <header className="py-4 border-b border-[var(--border-subtle)]">
        <div className="container flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 text-[var(--fg-secondary)] hover:text-[var(--fg)] text-sm font-medium">
            <ArrowLeft /> Back
          </a>
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="BotCaddy" width={24} height={24} className="rounded-lg" />
            <span className="text-[var(--fg)] font-semibold text-sm">BotCaddy</span>
          </a>
        </div>
      </header>

      <main className="flex-1 py-10 md:py-14">
        <div className="container max-w-sm mx-auto">
          <div className="text-center mb-8">
            <h1 className="heading-md mb-2">Set up your caddy</h1>
            <p className="text-[var(--green)] font-semibold">$40/year</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--fg)] mb-1">Name</label>
              <input
                type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                className="w-full px-3 py-2.5 bg-white border border-[var(--border)] rounded-lg text-[var(--fg)] placeholder-[var(--fg-tertiary)] focus:outline-none focus:border-[var(--green)] focus:ring-1 focus:ring-[var(--green)] text-sm"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--fg)] mb-1">Email</label>
              <input
                type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                className="w-full px-3 py-2.5 bg-white border border-[var(--border)] rounded-lg text-[var(--fg)] placeholder-[var(--fg-tertiary)] focus:outline-none focus:border-[var(--green)] focus:ring-1 focus:ring-[var(--green)] text-sm"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[var(--fg)] mb-1">Phone</label>
              <input
                type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required
                className="w-full px-3 py-2.5 bg-white border border-[var(--border)] rounded-lg text-[var(--fg)] placeholder-[var(--fg-tertiary)] focus:outline-none focus:border-[var(--green)] focus:ring-1 focus:ring-[var(--green)] text-sm"
                placeholder="+1 (555) 123-4567"
              />
              <p className="text-xs text-[var(--fg-tertiary)] mt-1">Where your caddy texts you</p>
            </div>
            <div>
              <label htmlFor="caddyName" className="block text-sm font-medium text-[var(--fg)] mb-1">Name your caddy</label>
              <input
                type="text" id="caddyName" name="caddyName" value={formData.caddyName} onChange={handleChange} required
                className="w-full px-3 py-2.5 bg-white border border-[var(--border)] rounded-lg text-[var(--fg)] placeholder-[var(--fg-tertiary)] focus:outline-none focus:border-[var(--green)] focus:ring-1 focus:ring-[var(--green)] text-sm"
                placeholder="Ace, Birdie, Tiger..."
              />
            </div>

            {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}

            <button type="submit" disabled={isLoading} className="w-full btn-gold py-3 mt-2 disabled:opacity-50">
              {isLoading ? <Spinner /> : <>Continue to Payment <ArrowRight /></>}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-[var(--border-subtle)]">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[var(--fg-secondary)]">
                  <span className="text-[var(--green)]"><CheckIcon /></span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
