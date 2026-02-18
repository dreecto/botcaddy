"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// Feature Icons
function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="20" height="14" rx="3"/>
      <circle cx="12" cy="13" r="4"/>
      <path d="M7 6V5a2 2 0 012-2h6a2 2 0 012 2v1"/>
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 20h18"/>
      <path d="M5 20v-8a2 2 0 012-2h2a2 2 0 012 2v8"/>
      <path d="M13 20V8a2 2 0 012-2h2a2 2 0 012 2v12"/>
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
  );
}

export default function Home() {
  const [navVisible, setNavVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [handicapValue, setHandicapValue] = useState(18.2);
  const [chatMessages, setChatMessages] = useState<number[]>([]);
  const heroRef = useRef<HTMLElement>(null);
  const handicapRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        setNavVisible(heroRef.current.getBoundingClientRect().bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) setMobileMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const start = 18.2, end = 12.4, duration = 1600;
            const startTime = performance.now();
            const animate = (time: number) => {
              const progress = Math.min((time - startTime) / duration, 1);
              setHandicapValue(Math.round((start - (start - end) * (1 - Math.pow(1 - progress, 3))) * 10) / 10);
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (handicapRef.current) observer.observe(handicapRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let i = 0;
            const interval = setInterval(() => {
              if (i < 4) { setChatMessages((prev) => [...prev, i]); i++; }
              else clearInterval(interval);
            }, 350);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (chatRef.current) observer.observe(chatRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sticky Nav */}
      <nav className={`nav-sticky ${navVisible ? "is-visible" : ""}`}>
        <div className="container flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <Image src="/logo.png" alt="BotCaddy" width={28} height={28} className="rounded-lg" />
            <span className="text-[var(--fg)] font-semibold text-sm">BotCaddy</span>
          </a>
          <a href="/checkout" className="btn-gold text-sm py-2 px-4">Get Started</a>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--bg)]">
          <div className="container py-4">
            <div className="flex items-center justify-between mb-8">
              <a href="#" className="flex items-center gap-2">
                <Image src="/logo.png" alt="BotCaddy" width={28} height={28} className="rounded-lg" />
                <span className="text-[var(--fg)] font-semibold">BotCaddy</span>
              </a>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2"><CloseIcon /></button>
            </div>
            <a href="/checkout" className="btn-gold w-full justify-center">Get Started <ArrowRight /></a>
          </div>
        </div>
      )}

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[90vh] flex flex-col" style={{ paddingTop: '0' }}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg.jpg" 
            alt="" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="container relative z-10 flex-1 flex flex-col">
          <div className="flex items-center justify-between py-4 mb-8 md:mb-12">
            <a href="#" className="flex items-center gap-2">
              <Image src="/logo.png" alt="BotCaddy" width={32} height={32} className="rounded-xl" />
              <span className="text-white font-semibold">BotCaddy</span>
            </a>
            <div className="hidden md:flex items-center gap-3">
              <a href="/checkout" className="btn-gold">Get Started <ArrowRight /></a>
            </div>
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-white"><MenuIcon /></button>
          </div>

          <div className="flex-1 flex items-center pb-16">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-5 leading-tight">
                A Caddy for the<br/>every day golfer.
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-md">
                Send a scorecard photo, get instant stats. Ask for a club, get a real answer. No app required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/checkout" className="btn-gold">Get Your Own AI Caddy! <ArrowRight /></a>
                <a 
                  href="https://x.com/botcaddy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-lg font-medium text-sm hover:bg-white/20 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Ask us anything
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section geo-bg" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="glow-line mb-16 reveal" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="feature-card reveal">
              <div className="feature-number">01</div>
              <div className="feature-icon"><CameraIcon /></div>
              <h3 className="feature-title">Photo → Stats</h3>
              <p className="feature-body">Snap your scorecard. Done.</p>
            </div>
            <div className="feature-card reveal reveal-delay-1">
              <div className="feature-number">02</div>
              <div className="feature-icon"><ChartIcon /></div>
              <h3 className="feature-title">Live Handicap</h3>
              <p className="feature-body">Updated every round.</p>
            </div>
            <div className="feature-card reveal reveal-delay-2">
              <div className="feature-number">03</div>
              <div className="feature-icon"><TargetIcon /></div>
              <h3 className="feature-title">Real Distances</h3>
              <p className="feature-body">Your clubs, your numbers.</p>
            </div>
            <div className="feature-card reveal reveal-delay-3">
              <div className="feature-number">04</div>
              <div className="feature-icon"><SendIcon /></div>
              <h3 className="feature-title">Ask Anything</h3>
              <p className="feature-body">"What should I hit here?"</p>
            </div>
          </div>
          <div className="glow-line mt-16 reveal" />
        </div>
      </section>

      {/* DEMO CONVERSATION */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <div ref={chatRef} className="chat-container">
                <div className="text-[10px] text-[var(--fg-tertiary)] text-center mb-4 uppercase tracking-[0.2em]">// Live conversation</div>
                <div className="space-y-3">
                  <div className={`chat-bubble user ${chatMessages.includes(0) ? "is-visible" : ""}`}>
                    Here&apos;s my card from TPC
                  </div>
                  <div className={`chat-bubble bot ${chatMessages.includes(1) ? "is-visible" : ""}`}>
                    82 — solid. 9/14 fairways, 8 GIR. Handicap now 12.4
                  </div>
                  <div className={`chat-bubble user ${chatMessages.includes(2) ? "is-visible" : ""}`}>
                    Where am I bleeding strokes?
                  </div>
                  <div className={`chat-bubble bot ${chatMessages.includes(3) ? "is-visible" : ""}`}>
                    Par 3s. You miss right 78% of the time. Aim left edge.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="section-label mb-4 reveal">// Intelligence</div>
              <h2 className="heading-lg mb-6 reveal reveal-delay-1">
                It knows your game<br/><span className="text-[var(--fg-tertiary)]">better than you do.</span>
              </h2>
              <p className="body-lg text-[var(--fg-secondary)] reveal reveal-delay-2">
                After a few rounds, BotCaddy spots patterns — which holes cost you, which clubs lie to you, where your misses go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center mb-16">
            <div className="section-label mb-4 reveal">// Proven Results</div>
            <h2 className="heading-lg reveal reveal-delay-1">Real golfers. <span className="text-[var(--fg-tertiary)]">Real improvement.</span></h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center reveal">
              <div ref={handicapRef} className="text-4xl md:text-5xl font-light text-[var(--fg)] mb-3">3-5</div>
              <p className="text-sm text-[var(--fg-tertiary)] leading-relaxed">Handicap drop<br/>in first 6 months</p>
            </div>
            <div className="text-center reveal reveal-delay-1">
              <div className="text-4xl md:text-5xl font-light text-[var(--fg)] mb-3">3.2</div>
              <p className="text-sm text-[var(--fg-tertiary)] leading-relaxed">Strokes saved per round<br/>with bag-aware AI</p>
            </div>
            <div className="text-center reveal reveal-delay-2">
              <div className="text-4xl md:text-5xl font-light text-[var(--green)] mb-3">∞</div>
              <p className="text-sm text-[var(--fg-tertiary)] leading-relaxed">Personal course history<br/>for smarter plays</p>
            </div>
            <div className="text-center reveal reveal-delay-3">
              <div className="text-4xl md:text-5xl font-light text-[var(--fg)] mb-3">0%</div>
              <p className="text-sm text-[var(--fg-tertiary)] leading-relaxed">Battery drain<br/>it&apos;s just texting</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section geo-bg" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glow-line mb-16 reveal" />
            <h2 className="text-3xl md:text-4xl font-light mb-4 reveal">
              Are you an early adopter?
            </h2>
            <p className="text-[var(--fg-tertiary)] mb-10 text-lg font-light reveal reveal-delay-1">
              This is for you.
            </p>
            <a href="/checkout" className="btn-gold reveal reveal-delay-2">
              Unlock Your Caddy — Only $40/year <ArrowRight />
            </a>
            <p className="text-xs text-[var(--fg-tertiary)] mt-8 tracking-wider reveal reveal-delay-3">
              Risk-free. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="BotCaddy" width={24} height={24} className="rounded-lg" />
              <span className="text-sm font-light tracking-[0.15em] uppercase text-[var(--fg)]">BotCaddy</span>
            </div>
            <div className="flex items-center gap-8">
              <a href="https://x.com/botcaddy" target="_blank" rel="noopener noreferrer">X</a>
              <a href="mailto:paisacaddy@gmail.com">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[var(--fg-tertiary)]">2025 BotCaddy. All rights reserved.</p>
            <p className="text-xs text-[var(--fg-tertiary)]">Your AI caddy, over text.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
