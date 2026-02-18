"use client";

import { useEffect, useRef, useState } from "react";

// Golf Flag SVG Component
function GolfFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50 10V190"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M50 10L90 30L50 50V10Z"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <ellipse
        cx="50"
        cy="190"
        rx="20"
        ry="5"
        fill="currentColor"
        fillOpacity="0.2"
      />
    </svg>
  );
}

// Golf Ball SVG Component
function GolfBall({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="2" />
      <circle cx="22" cy="22" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="38" cy="22" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="30" cy="30" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="22" cy="38" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="38" cy="38" r="3" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

// Arrow Icon
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

export default function Home() {
  const [navVisible, setNavVisible] = useState(false);
  const [handicapValue, setHandicapValue] = useState(18.2);
  const [chatMessages, setChatMessages] = useState<number[]>([]);
  const heroRef = useRef<HTMLElement>(null);
  const handicapRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  // Handle sticky nav visibility
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setNavVisible(heroBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Animated handicap counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate from 18.2 to 12.4
            const startValue = 18.2;
            const endValue = 12.4;
            const duration = 2000;
            const startTime = performance.now();

            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easedProgress = easeOutCubic(progress);
              const currentValue =
                startValue - (startValue - endValue) * easedProgress;
              setHandicapValue(Math.round(currentValue * 10) / 10);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (handicapRef.current) {
      observer.observe(handicapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animated bars
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (barsRef.current) {
      const bars = barsRef.current.querySelectorAll(".animated-bar");
      bars.forEach((bar) => observer.observe(bar));
    }

    return () => observer.disconnect();
  }, []);

  // Chat animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate messages one by one
            const totalMessages = 5;
            let currentMessage = 0;

            const interval = setInterval(() => {
              if (currentMessage < totalMessages) {
                setChatMessages((prev) => [...prev, currentMessage]);
                currentMessage++;
              } else {
                clearInterval(interval);
              }
            }, 500);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (chatRef.current) {
      observer.observe(chatRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Progress line animation
  useEffect(() => {
    const progressLines = document.querySelectorAll(".progress-line");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    progressLines.forEach((line) => observer.observe(line));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sticky Navigation */}
      <nav className={`nav-sticky ${navVisible ? "is-visible" : ""}`}>
        <div className="container flex items-center justify-between">
          <a href="#" className="text-[var(--fg)] font-semibold text-lg">
            PaisaCaddy
          </a>
          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="btn-ghost hidden sm:inline-flex">
              How It Works
            </a>
            <a href="#features" className="btn-ghost hidden sm:inline-flex">
              Features
            </a>
            <a href="/checkout" className="btn-gold text-sm py-2.5 px-5">
              Start Texting <ArrowRight />
            </a>
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section
        ref={heroRef}
        className="section section-full section-gradient-1 relative overflow-hidden"
      >
        {/* Floating Golf Flag Accent */}
        <div className="absolute right-[10%] top-[20%] float-animation-slow hidden lg:block">
          <GolfFlag className="w-24 h-48 text-[var(--gold)] opacity-20" />
        </div>
        <div className="absolute left-[5%] bottom-[25%] float-animation hidden lg:block">
          <GolfBall className="w-16 h-16 text-[var(--gold)] opacity-15" />
        </div>

        <div className="container">
          {/* Top Nav */}
          <div className="flex items-center justify-between mb-20">
            <a href="#" className="text-[var(--fg)] font-semibold text-xl">
              PaisaCaddy
            </a>
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="#how-it-works"
                className="btn-ghost hidden sm:inline-flex"
              >
                How It Works
              </a>
              <a href="#features" className="btn-ghost hidden sm:inline-flex">
                Features
              </a>
              <span className="badge">
                <span>⛳</span> Free During Beta
              </span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="max-w-3xl">
            <h1 className="heading-xl mb-6 reveal">
              Dropping your handicap starts with{" "}
              <span className="text-[var(--gold)]">knowing your game.</span>
            </h1>
            <p className="body-lg max-w-xl mb-10 reveal reveal-delay-1">
              Learn every round, track your handicap, manage your clubs, and get
              on-course caddy advice — all over text.
            </p>
            <div className="reveal reveal-delay-2">
              <a href="/checkout" className="btn-gold mb-4">
                Start Texting PaisaCaddy <ArrowRight />
              </a>
              <p className="text-[var(--fg-tertiary)] text-sm mt-4">
                No app to download. No account to create. Just text.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="section section-gradient-2 section-radial-glow">
        <div className="container container-narrow text-center">
          <span className="section-label mb-6 block reveal">
            THE PLATEAU PROBLEM
          </span>
          <h2 className="heading-lg mb-6 reveal reveal-delay-1">
            You play every weekend. You hit the range.
            <br className="hidden sm:block" /> But your handicap won&apos;t
            move.
          </h2>
          <p className="body-lg mb-16 reveal reveal-delay-2">
            The issue isn&apos;t effort — it&apos;s information. You don&apos;t
            know which holes are costing you, which clubs are lying to you, or
            what your real tendencies are. You&apos;re improving blind.
          </p>

          {/* Animated Bars */}
          <div ref={barsRef} className="max-w-lg mx-auto space-y-6">
            <div className="reveal reveal-delay-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--fg-secondary)]">
                  Rounds played without tracking data
                </span>
              </div>
              <div
                className="animated-bar"
                style={{ "--target-width": "85%" } as React.CSSProperties}
              >
                <div className="bar-fill muted"></div>
              </div>
            </div>
            <div className="reveal reveal-delay-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--gold)]">
                  Strokes identified as fixable with data
                </span>
              </div>
              <div
                className="animated-bar"
                style={{ "--target-width": "35%" } as React.CSSProperties}
              >
                <div className="bar-fill gold"></div>
              </div>
            </div>
          </div>

          <p className="text-[var(--fg-tertiary)] text-sm mt-8 italic reveal reveal-delay-5">
            &ldquo;The average 15-handicap loses 4–6 strokes per round to
            patterns they can&apos;t see.&rdquo;
          </p>
        </div>
      </section>

      {/* SECTION 3: THE FOUR PILLARS */}
      <section id="features" className="section section-gradient-3">
        <div className="container">
          <div className="text-center mb-16">
            <span className="section-label mb-6 block reveal">
              WHAT PAISACADDY DOES
            </span>
            <h2 className="heading-lg reveal reveal-delay-1">
              Four things. All over text.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="pillar-card reveal reveal-delay-1">
              <span className="card-number">01 — LEARN</span>
              <h3 className="card-title">Learns Every Round</h3>
              <p className="card-body">
                Snap your scorecard after a round — photo or screenshot.
                PaisaCaddy pulls scores, fairways, greens, putts, and builds
                your history automatically. After 3 rounds, it starts seeing
                patterns you can&apos;t.
              </p>
            </div>

            {/* Card 2 */}
            <div className="pillar-card reveal reveal-delay-2">
              <span className="card-number">02 — TRACK</span>
              <h3 className="card-title">Tracks Your Handicap</h3>
              <p className="card-body">
                Your handicap updates after every round using WHS methodology.
                See the trend over time. Know exactly where you stand — and what
                it&apos;ll take to drop the next stroke. No manual entry. No
                second app.
              </p>
            </div>

            {/* Card 3 */}
            <div className="pillar-card reveal reveal-delay-3">
              <span className="card-number">03 — MANAGE</span>
              <h3 className="card-title">Manages Your Clubs</h3>
              <p className="card-body">
                Tell PaisaCaddy what&apos;s in your bag. It tracks your real
                carry distances — not what the fitting said, what you actually
                hit. When there&apos;s a gap or an overlap, it&apos;ll tell you.
              </p>
            </div>

            {/* Card 4 */}
            <div className="pillar-card reveal reveal-delay-4">
              <span className="card-number">04 — CADDY</span>
              <h3 className="card-title">On-Course Caddy</h3>
              <p className="card-body">
                Standing over a shot you&apos;re not sure about? Text
                PaisaCaddy. Get a club recommendation based on your real
                numbers, your history on that hole, and where you tend to miss.
                Use it when it matters, pocket it when it doesn&apos;t.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HANDICAP IN MOTION */}
      <section className="section section-gradient-2 section-radial-glow">
        <div className="container text-center">
          <span className="section-label mb-8 block reveal">
            TRACK YOUR PROGRESS
          </span>

          <div ref={handicapRef} className="mb-8">
            <span className="handicap-counter">{handicapValue.toFixed(1)}</span>
          </div>

          <div className="progress-line mx-auto">
            <div className="progress-fill"></div>
          </div>

          <h2 className="heading-md mt-12 mb-4 reveal">
            From guessing to knowing. That&apos;s where the strokes go.
          </h2>
          <p className="body-md max-w-lg mx-auto reveal reveal-delay-1">
            PaisaCaddy tracks your handicap round by round. No spreadsheets. No
            forgetting to log. Just play, send your card, and watch the trend.
          </p>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section id="how-it-works" className="section section-gradient-3">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Steps */}
            <div>
              <span className="section-label mb-6 block reveal">
                HOW IT WORKS
              </span>
              <h2 className="heading-lg mb-10 reveal reveal-delay-1">
                It&apos;s just texting.
              </h2>

              <div className="step-list">
                <div className="step-item reveal reveal-delay-2">
                  <h4>Get your invite link</h4>
                  <p>
                    Tap the link. Opens a text conversation. That&apos;s your
                    caddy.
                  </p>
                </div>
                <div className="step-item reveal reveal-delay-3">
                  <h4>Tell it your bag</h4>
                  <p>
                    &ldquo;I carry PW through 4-iron, 3-hybrid, 3-wood,
                    driver.&rdquo; Done. Update anytime.
                  </p>
                </div>
                <div className="step-item reveal reveal-delay-4">
                  <h4>Play a round. Send your scorecard.</h4>
                  <p>
                    Photo of the paper card or screenshot from your GPS app.
                    PaisaCaddy reads it and logs everything.
                  </p>
                </div>
                <div className="step-item reveal reveal-delay-5">
                  <h4>Ask anything about your game</h4>
                  <p>
                    &ldquo;What&apos;s my handicap?&rdquo; &ldquo;How do I play
                    par 3s?&rdquo; &ldquo;What should I hit here?&rdquo; — just
                    text it.
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Mockup */}
            <div className="reveal reveal-delay-2">
              <div ref={chatRef} className="chat-container mx-auto lg:ml-auto">
                <div className="space-y-3">
                  <div
                    className={`chat-bubble user ${chatMessages.includes(0) ? "is-visible" : ""}`}
                  >
                    Just finished at TPC Scottsdale. Here&apos;s my card.
                  </div>
                  <div
                    className={`chat-bubble user image ${chatMessages.includes(1) ? "is-visible" : ""}`}
                  >
                    <div className="image-placeholder">
                      📷 scorecard_tpc.jpg
                    </div>
                  </div>
                  <div
                    className={`chat-bubble bot ${chatMessages.includes(2) ? "is-visible" : ""}`}
                  >
                    Got it. 82 today — nice round. 9/14 fairways, 8/18 GIR, 33
                    putts. Your handicap moves to 12.4 from 12.8. Want the full
                    breakdown?
                  </div>
                  <div
                    className={`chat-bubble user ${chatMessages.includes(3) ? "is-visible" : ""}`}
                  >
                    Where am I losing the most strokes?
                  </div>
                  <div
                    className={`chat-bubble bot ${chatMessages.includes(4) ? "is-visible" : ""}`}
                  >
                    Par 3s are your bleed — averaging 3.6 strokes vs 3.1
                    expected at your level. You&apos;re missing greens right on
                    78% of par 3s. Alignment or club selection. Want to look at
                    it by hole?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHO THIS IS FOR */}
      <section className="section section-gradient-2">
        <div className="container text-center">
          <span className="section-label mb-6 block reveal">BUILT FOR</span>
          <h2 className="heading-lg mb-12 reveal reveal-delay-1">
            Golfers who are done guessing.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="persona-card reveal reveal-delay-2">
              <p className="text-[var(--fg-secondary)] text-sm">
                The <strong>18-handicap</strong> who wants to break into the low
                teens
              </p>
            </div>
            <div className="persona-card reveal reveal-delay-3">
              <p className="text-[var(--fg-secondary)] text-sm">
                The <strong>12-handicap</strong> chasing single digits
              </p>
            </div>
            <div className="persona-card reveal reveal-delay-4">
              <p className="text-[var(--fg-secondary)] text-sm">
                The <strong>weekend player</strong> who practices but
                can&apos;t find the leak
              </p>
            </div>
            <div className="persona-card reveal reveal-delay-5">
              <p className="text-[var(--fg-secondary)] text-sm">
                The <strong>competitive golfer</strong> who wants data without
                the spreadsheet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section id="cta" className="section section-gradient-3 section-radial-glow">
        <div className="container text-center py-12">
          <h2 className="heading-lg mb-6 reveal">
            Your game has a memory now.
            <br />
            Start <span className="text-[var(--gold)]">using it.</span>
          </h2>
          <p className="body-md max-w-lg mx-auto mb-10 reveal reveal-delay-1">
            No app to download. No data to enter. Just text your caddy and play
            better golf.
          </p>
          <div className="reveal reveal-delay-2">
            <a href="/checkout" className="btn-gold mb-6">
              Get Your Invite <ArrowRight />
            </a>
            <p className="text-[var(--fg-tertiary)] text-sm mt-6">
              <a
                href="https://twitter.com/paisa_golf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--fg-secondary)] transition-colors"
              >
                @paisa_golf
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[var(--fg)] font-semibold">PaisaCaddy</span>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/paisa_golf"
              target="_blank"
              rel="noopener noreferrer"
            >
              X / Twitter
            </a>
            <a href="mailto:hello@paisacaddy.com">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
