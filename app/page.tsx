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

function MessageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 12a9 9 0 01-9 9 9 9 0 01-6.36-2.64L3 21l2.64-2.64A9 9 0 1121 12z"/>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES - Single row, icon-forward */}
      <section className="section topo-pattern" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="feature-card reveal">
              <div className="feature-icon"><CameraIcon /></div>
              <h3 className="feature-title">Photo → Stats</h3>
              <p className="feature-body">Snap your scorecard. Done.</p>
            </div>
            <div className="feature-card reveal reveal-delay-1">
              <div className="feature-icon"><ChartIcon /></div>
              <h3 className="feature-title">Live Handicap</h3>
              <p className="feature-body">Updated every round.</p>
            </div>
            <div className="feature-card reveal reveal-delay-2">
              <div className="feature-icon"><TargetIcon /></div>
              <h3 className="feature-title">Real Distances</h3>
              <p className="feature-body">Your clubs, your numbers.</p>
            </div>
            <div className="feature-card reveal reveal-delay-3">
              <div className="feature-icon"><MessageIcon /></div>
              <h3 className="feature-title">Ask Anything</h3>
              <p className="feature-body">"What should I hit here?"</p>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO CONVERSATION - The "proof" section */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <div ref={chatRef} className="chat-container">
                <div className="text-[10px] text-[var(--fg-tertiary)] text-center mb-3 uppercase tracking-wide">Live conversation</div>
                <div className="space-y-2">
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
              <h2 className="heading-lg mb-4 reveal">
                It knows your game<br/>better than you do.
              </h2>
              <p className="body-md text-[var(--fg-secondary)] reveal reveal-delay-1">
                After a few rounds, BotCaddy spots patterns — which holes cost you, which clubs lie to you, where your misses go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="section golf-pattern" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center p-4 reveal">
              <div ref={handicapRef} className="text-4xl md:text-5xl font-bold text-[var(--green)] mb-2">3-5</div>
              <div className="text-sm text-[var(--fg-secondary)]">Handicap drop in first 6 months</div>
            </div>
            <div className="text-center p-4 reveal reveal-delay-1">
              <div className="text-4xl md:text-5xl font-bold text-[var(--green)] mb-2">3.2</div>
              <div className="text-sm text-[var(--fg-secondary)]">Strokes saved per round with bag-aware AI</div>
            </div>
            <div className="text-center p-4 reveal reveal-delay-2">
              <div className="text-4xl md:text-5xl font-bold text-[var(--green)] mb-2">
                <svg className="w-10 h-10 md:w-12 md:h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 8v4l3 3"/>
                  <circle cx="12" cy="12" r="9"/>
                </svg>
              </div>
              <div className="text-sm text-[var(--fg-secondary)]">Personal course history for smarter repeat plays</div>
            </div>
            <div className="text-center p-4 reveal reveal-delay-3">
              <div className="text-4xl md:text-5xl font-bold text-[var(--green)] mb-2">
                <svg className="w-10 h-10 md:w-12 md:h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="6" y="4" width="12" height="18" rx="2"/>
                  <path d="M6 18h12"/>
                  <path d="M10 22h4"/>
                </svg>
              </div>
              <div className="text-sm text-[var(--fg-secondary)]">No battery drain — it&apos;s just texting</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container text-center py-6">
          <h2 className="heading-lg mb-2 reveal">Are you an early adopter?</h2>
          <p className="text-[var(--fg-secondary)] mb-6 reveal">This is for you.</p>
          <a href="/checkout" className="btn-gold reveal reveal-delay-1">
            Unlock Your Caddy — Only $40/year <ArrowRight />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" style={{ background: 'var(--bg)' }}>
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2">
            <Image src="/logo.png" alt="BotCaddy" width={24} height={24} className="rounded-lg" />
            <span className="text-[var(--fg)] font-medium text-sm">BotCaddy</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com/botcaddy" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="mailto:paisacaddy@gmail.com">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
