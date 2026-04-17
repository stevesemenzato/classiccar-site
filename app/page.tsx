"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  Database,
  Gauge,
  LineChart,
  Mail,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

export default function ClassicCarRadarWebsite() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const marketRows = useMemo(
    () => [
      {
        title: "2017 Ferrari California T",
        source: "Dealer Listing",
        price: "$134,500",
        tag: "Negotiation Watch",
        image: "/images/california_t_1.jpeg",
        note: "Above rolling market median. Strong car only if condition, spec, and history justify the premium.",
      },
      {
        title: "2016 Ferrari California T Handling Speciale",
        source: "Auction Sold",
        price: "$121,000",
        tag: "Sold Benchmark",
        image: "/images/california_t_2.jpeg",
        note: "Useful comp anchor for a buyer conversation against dealer asking prices.",
      },
      {
        title: "2015 Ferrari California T",
        source: "Dealer Listing",
        price: "$118,900",
        tag: "Value Signal",
        image: "/images/california_t_3.jpeg",
        note: "Lower ask, but likely mileage-driven. Worth deeper condition review.",
      },
    ],
    []
  );

  const pillars = [
    {
      icon: Search,
      title: "Proven classics",
      text: "Deep market context on the established collectibles — the cars whose trajectory is already clear and whose pricing deserves precision.",
    },
    {
      icon: LineChart,
      title: "Modern performance",
      text: "Track the GT cars, limited editions, and driver-focused machines of the last two decades as the market begins to recognize their significance.",
    },
    {
      icon: Sparkles,
      title: "Future collectibles",
      text: "Identify the cars being defined as collectible right now — the final naturally aspirated engines, the last manual transmissions, the end of an era.",
    },
    {
      icon: Gauge,
      title: "Market positioning",
      text: "Understand where each car sits relative to its true market — across dealer supply, auction results, and private sales — so you can act with confidence.",
    },
  ];

  const workflow = [
    "Electrification is accelerating. Every major manufacturer has committed to a transition timeline — and production shifts are already underway.",
    "The supply of internal combustion cars is now finite. No new naturally aspirated flat-sixes, high-revving V10s, or mechanical GT cars are coming.",
    "The cars that defined driving — analog steering, manual gearboxes, atmospheric engines — represent a closed chapter in automotive history.",
    "The market has not fully repriced this shift. The window between recognition and valuation is where informed collectors find opportunity.",
  ];

  const stats = [
    { value: "Classics", label: "proven collectibles" },
    { value: "Modern", label: "performance era" },
    { value: "Future", label: "emerging collectibles" },
    { value: "ICE", label: "final generation" },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;

    setSubmitting(true);
    setSubmitMessage("");
    setSubmitted(false);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setSubmitMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      setSubmitMessage(data.message || "Thanks — you're on the CCR waitlist.");
      setEmail("");
    } catch {
      setSubmitMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] text-white selection:bg-white selection:text-black">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_20%_20%,rgba(160,160,160,0.11),transparent_18%),radial-gradient(circle_at_80%_8%,rgba(120,120,120,0.12),transparent_18%)]" />

      <section className="relative border-b border-white/10">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.72) 42%, rgba(5,5,5,0.98) 100%), url('https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.58)_36%,rgba(0,0,0,0.4)_100%)]" />

        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/5 shadow-[0_0_40px_rgba(255,255,255,0.08)]">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.26em] text-white/92">
                  CLASSIC CAR RADAR
                </p>
                <p className="text-[11px] uppercase tracking-[0.34em] text-white/40">
                  Intelligence for Classic, Modern & Future Collectible Cars
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
              <a href="#platform" className="transition hover:text-white">
                Platform
              </a>
              <a href="#intelligence" className="transition hover:text-white">
                Intelligence
              </a>
              <a href="#waitlist" className="transition hover:text-white">
                Waitlist
              </a>
              
                href="https://classiccarradar.com"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white transition hover:bg-white/10"
              >
                Open Product
              </a>
            </nav>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/72 backdrop-blur">
              <Bell className="h-4 w-4" />
              The Final ICE Generation
            </div>

            <h1 className="mt-8 text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              What you drive today <span className="text-white/58">could be a future classic.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              As the world moves beyond internal combustion, a finite set of cars becomes
              something else entirely — collectible.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/58 sm:text-xl">
              Classic Car Radar helps you identify them early, understand their true market
              position, and act before the market catches up.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              
                href="#waitlist"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
              >
                Request Early Access
                <ArrowRight className="h-4 w-4" />
              </a>
              
                href="https://classiccarradar.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Open the Product
              </a>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 + index * 0.08 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl"
                >
                  <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/45">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[40px] bg-white/5 blur-3xl" />
            <div className="relative rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
              <div className="rounded-[28px] border border-white/10 bg-[#0a0a0a] p-5">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                      Live query workspace
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                      Ferrari California T
                    </h2>
                  </div>
                  <div className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Market-active
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {marketRows.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.18 + index * 0.08 }}
                      className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] transition hover:bg-white/[0.05]"
                    >
                      <div className="grid md:grid-cols-[140px_1fr]">
                        <div className="relative min-h-[140px]">
                          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_20%,rgba(0,0,0,0.28)_100%)]" />
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-base font-semibold tracking-[-0.02em]">
                                  {item.title}
                                </p>
                                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/50">
                                  {item.tag}
                                </span>
                              </div>
                              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/40">
                                {item.source}
                              </p>
                            </div>
                            <p className="text-lg font-semibold tracking-tight">{item.price}</p>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-white/65">{item.note}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 rounded-[24px] border border-sky-300/10 bg-sky-300/10 p-4 text-sm leading-6 text-sky-50">
                  <span className="font-semibold">AI Market Read:</span> Dealer pricing should be
                  judged against sold-market reality, not just current asking inventory. This spec
                  is interesting, but only compelling if it can be bought close to true market and
                  the story is strong.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="platform" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-white/42">
              Market intelligence platform
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Past. Present. Future.
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-base leading-8 text-white/66 sm:text-lg">
              CCR is built around a simple idea: the next generation of collectible cars is being
              defined right now.
            </p>
            <p className="mt-4 text-base leading-8 text-white/56 sm:text-lg">
              From proven classics to modern performance cars to the final era of internal
              combustion, we give you the context to understand where each car sits — and where
              it&apos;s going.
            </p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03]">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80"
                alt="Porsche detail"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.2),rgba(0,0,0,0.55))]" />
            </div>
            <div className="relative min-h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80"
                alt="Ferrari detail"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.55),rgba(0,0,0,0.2))]" />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{pillar.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="intelligence" className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-white/42">
              The macro shift
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              The last great era of internal combustion.
            </h2>
            <div className="mt-8 space-y-5">
              {workflow.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="flex gap-4 rounded-[26px] border border-white/10 bg-black/25 p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold">
                    0{index + 1}
                  </div>
                  <p className="pt-1 text-white/74">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-3 text-white/85">
              <Database className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.26em]">What CCR delivers</p>
            </div>
            <div className="mt-6 space-y-4">
              {[
                "Identify which modern cars are emerging as collectibles before consensus forms",
                "Track real transaction data across dealers, auctions, and private sales",
                "Understand where a car sits in its market cycle — rising, plateaued, or undervalued",
                "Separate genuine scarcity from manufactured hype with data, not speculation",
                "Act with precision when the right car appears at the right price",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-white/80" />
                  <p className="text-white/72">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="waitlist" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 shadow-[0_25px_100px_rgba(0,0,0,0.45)] lg:grid-cols-[1fr_0.9fr] lg:p-12">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-white/42">Early access</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Get ahead of the market.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
              Request early access to CCR and be among the first to use institutional-grade
              market intelligence for the collectible car market.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/30 p-6 backdrop-blur-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm text-white/70">Email address</label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-13 w-full rounded-2xl border border-white/10 bg-white/5 px-11 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/30"
                    required
                    disabled={submitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Request Early Access"}
                </button>
              </div>
              <p className="text-xs leading-6 text-white/45">
                Request early access to the CCR platform. Limited availability.
              </p>

              {submitMessage && !submitted && (
                <div className="rounded-2xl border border-red-400/15 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {submitMessage}
                </div>
              )}

              {submitted && (
                <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                  {submitMessage || "Thanks — you're on the CCR waitlist. We'll be in touch."}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid gap-6 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] p-0 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="relative min-h-[280px] p-8 lg:p-10">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.42) 100%), url('https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1800&q=80')",
              }}
            />
            <div className="relative z-10 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.26em] text-white/42">
                The platform
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                Built for collectors who think in decades, not weekends.
              </h3>
              <p className="mt-3 max-w-2xl text-white/65">
                Classic Car Radar is a premium market-intelligence platform for serious
                collectors, advisors, and enthusiasts who understand that the collectible car
                market rewards preparation, context, and timing.
              </p>
            </div>
          </div>
          <div className="px-8 pb-8 lg:px-10 lg:pb-0">
            
              href="https://classiccarradar.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Launch CCR
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
