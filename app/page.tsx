import Image from "next/image";
import BetaForm from "./_components/beta-form";

/* ════════════════════════════════════════════════════════════════════
 * Classic Car Radar — marketing homepage
 * Server component. Translates v0.4 concept (design/website_concept
 * in the product-app repo) into Next.js / React.
 *
 * Sections: Hero → Garage image → Why → How → Intelligence → Cockpit
 * image → Radar → Experience → Enthusiasts (ivory) → Trust → Lounge
 * image → Beta (form is the only client component) → Footer.
 *
 * Image moments are CSS-painted atmospheric placeholders pending
 * commissioned photography. See BRIEF in design/website_concept.
 * ════════════════════════════════════════════════════════════════════ */

function ChronographMark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10.5" stroke="#E8E3D8" strokeWidth="0.7" opacity="0.5" />
      <circle cx="12" cy="12" r="6.5" stroke="#C68F5E" strokeWidth="0.8" opacity="0.85" />
      <line x1="12" y1="3" x2="12" y2="5" stroke="#E8E3D8" strokeWidth="0.7" opacity="0.7" />
      <line x1="12" y1="19" x2="12" y2="21" stroke="#E8E3D8" strokeWidth="0.7" opacity="0.7" />
      <line x1="3" y1="12" x2="5" y2="12" stroke="#E8E3D8" strokeWidth="0.7" opacity="0.7" />
      <line x1="19" y1="12" x2="21" y2="12" stroke="#E8E3D8" strokeWidth="0.7" opacity="0.7" />
      <circle cx="12" cy="12" r="1.6" fill="#C68F5E" />
    </svg>
  );
}

function HeroDial() {
  return (
    <svg
      className="hero-dial"
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="dialFade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8E3D8" stopOpacity="0" />
          <stop offset="55%" stopColor="#E8E3D8" stopOpacity="0.10" />
          <stop offset="85%" stopColor="#E8E3D8" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#E8E3D8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dialRing" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C68F5E" stopOpacity="0" />
          <stop offset="60%" stopColor="#C68F5E" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#C68F5E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="290" fill="none" stroke="url(#dialFade)" strokeWidth="0.6" />
      <circle cx="300" cy="300" r="240" fill="none" stroke="url(#dialRing)" strokeWidth="1.2" />
      <circle cx="300" cy="300" r="200" fill="none" stroke="#E8E3D8" strokeOpacity="0.08" strokeWidth="0.5" />
      <circle cx="300" cy="300" r="160" fill="none" stroke="#E8E3D8" strokeOpacity="0.05" strokeWidth="0.4" />
      <circle cx="300" cy="300" r="110" fill="none" stroke="#E8E3D8" strokeOpacity="0.04" strokeWidth="0.4" />
      <g stroke="#E8E3D8" strokeOpacity="0.12" strokeWidth="0.6">
        <line x1="300" y1="55" x2="300" y2="85" />
        <line x1="300" y1="545" x2="300" y2="515" />
        <line x1="55" y1="300" x2="85" y2="300" />
        <line x1="545" y1="300" x2="515" y2="300" />
      </g>
      <g stroke="#E8E3D8" strokeOpacity="0.05" strokeWidth="0.4">
        {[30, 60, 120, 150, 210, 240, 300, 330].map((angle) => (
          <line
            key={angle}
            x1="300"
            y1="60"
            x2="300"
            y2="72"
            transform={`rotate(${angle} 300 300)`}
          />
        ))}
      </g>
      <circle cx="300" cy="300" r="3" fill="#C68F5E" fillOpacity="0.4" />
    </svg>
  );
}

function HeroBrush() {
  return (
    <svg
      className="hero-brush"
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="#E8E3D8" strokeOpacity="0.06" strokeWidth="0.3">
        {[0, 5, -5, 10, -10, 15, -15, 20, -20].map((angle) => (
          <line
            key={angle}
            x1="300"
            y1="100"
            x2="300"
            y2="160"
            transform={`rotate(${angle} 300 300)`}
          />
        ))}
      </g>
    </svg>
  );
}

type EditorialVariant = "garage" | "cockpit" | "lounge";

const TRANSITION_IMAGES: Record<EditorialVariant, { src: string; alt: string; priority: boolean }> = {
  garage: {
    src: "/images/ccr-editorial/garage-collector.jpg",
    alt: "Atmospheric collector garage interior — used as backdrop, heavily desaturated and darkened.",
    priority: false,
  },
  cockpit: {
    src: "/images/ccr-editorial/cockpit-dusk.jpg",
    alt: "Automotive silhouette at blue hour — used as backdrop, heavily desaturated and darkened.",
    priority: false,
  },
  lounge: {
    src: "/images/ccr-editorial/lounge-evening.jpg",
    alt: "Evening city light with car silhouette — used as backdrop, heavily desaturated and darkened.",
    priority: false,
  },
};

function EditorialTransition({
  variant,
  phrase,
  mark,
  ariaLabel,
}: {
  variant: EditorialVariant;
  phrase: string;
  mark?: string;
  ariaLabel: string;
}) {
  const img = TRANSITION_IMAGES[variant];
  return (
    <aside
      className={`editorial-transition editorial-transition--${variant}`}
      aria-label={ariaLabel}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="100vw"
        priority={img.priority}
        className="editorial-transition-bg"
      />
      <div className="editorial-transition-overlay" aria-hidden="true" />
      <div className="editorial-transition-inner">
        <span className="editorial-transition-rule" aria-hidden="true" />
        <p className="editorial-transition-phrase">{phrase}</p>
        {mark ? <span className="editorial-transition-mark">{mark}</span> : null}
      </div>
    </aside>
  );
}

const HOW_CARDS = [
  {
    num: "01 · Daily sweep",
    title: "A coherent read, every morning.",
    body: "CCR walks the major sources overnight. Surfaces what is worth a closer look. Sorts by what you watch, not by what was paid for.",
  },
  {
    num: "02 · Cars on your radar",
    title: "A garage that remembers.",
    body: "The cars you're tracking stay in view. New comparables appear when they do. The market around them is read for you.",
  },
  {
    num: "03 · Watchlist",
    title: "Signals, monitored.",
    body: "Specific listings, watched. Price changes, days on market, the quiet shifts that tell you something has moved.",
  },
  {
    num: "04 · Compare",
    title: "Conviction through context.",
    body: "Stand two or three candidates side by side. Spec, history, market position, comparable transactions — in one read.",
  },
  {
    num: "05 · Detail intelligence",
    title: "Where a car actually sits.",
    body: "For any listing: comp set, days on market, the gap between asking and the prices the market actually pays.",
  },
  {
    num: "06 · Advisor",
    title: "An editorial read, written for you.",
    body: "Not a chatbot. A short, observational note when something across your garage or watchlist is worth pausing on.",
  },
];

const RADAR = [
  {
    num: "N° 01",
    car: "Ferrari 550 Maranello manuals",
    dossier: { marque: "Ferrari", era: "1996–2001", note: "F133 V12 · 6-speed manual" },
    obs: "Manual 550s remain thinly supplied; condition and history are doing more work than mileage.",
    meta: ["European cohort", "9 listings observed"],
  },
  {
    num: "N° 02",
    car: "BMW M5 E39",
    dossier: { marque: "BMW", era: "1998–2003", note: "S62 V8 · 6-speed manual" },
    obs: "E39 M5 asking prices are clustering, but condition spread is widening.",
    meta: ["North America", "Across dealer inventory"],
  },
  {
    num: "N° 03",
    car: "997 GT3 Touring",
    dossier: { marque: "Porsche", era: "2017–2019", note: "Mezger-lineage 4.0 · no wing" },
    obs: "Touring cars continue to separate from regular 997 GT3s on the second-hand spread — most visibly at the lower-mileage end.",
    meta: ["Global", "Lower-mileage band"],
  },
  {
    num: "N° 04",
    car: "Mercedes-Benz 190E 2.5-16 Evo II",
    dossier: { marque: "Mercedes-Benz", era: "1990", note: "Cosworth M102 · 502 built" },
    obs: "Cosworth Evo IIs are moving in fewer, larger transactions; private sales are doing most of the price discovery.",
    meta: ["Auction cohort", "Private transactions"],
  },
  {
    num: "N° 05",
    car: "Aston Martin V12 Vantage S manuals",
    dossier: { marque: "Aston Martin", era: "2014–2017", note: "5.9L V12 · 7-spd manual" },
    obs: "Manual V12 Vantage Ss are trading in a narrower band than last summer; the volatility has come out of this generation for now.",
    meta: ["UK + EU", "2025 vs. 2024"],
  },
  {
    num: "N° 06",
    car: "Porsche 964 Carrera 2",
    dossier: { marque: "Porsche", era: "1989–1994", note: "M64 air-cooled · G50/05" },
    obs: "Driver-grade 964s are showing more movement than collector-grade cars.",
    meta: ["North America", "Driver vs. collector"],
  },
];

const TRUST = [
  {
    label: "Independent",
    statement:
      "No commissions. No paid placement. Not owned by any seller, auction house, or marketplace.",
  },
  {
    label: "Transparent",
    statement:
      "Every market read is grounded in the comp set behind it. Click through and see the same data we did.",
  },
  {
    label: "Quiet",
    statement:
      "No notifications. No urgency theater. No countdown clocks. CCR sits in the background.",
  },
  {
    label: "Long horizon",
    statement:
      "Built for the reader who thinks in decades. Watching and waiting are first-class modes.",
  },
  {
    label: "Memory",
    statement:
      "CCR remembers the cars you've been watching and the focus you keep returning to. That continuity is yours.",
  },
  {
    label: "Posture",
    statement:
      "CCR's job is to help you understand. The decision — to act, to pass, to keep watching — is yours.",
  },
];

const AUDIENCES = [
  {
    title: "The classic car enthusiast",
    body: "You know the cars that matter. You've read the auctions for years. CCR is the quiet desk that keeps a coherent view of what's currently on offer in your corner of it.",
  },
  {
    title: "The modern classics buyer",
    body: "Air-cooled is one thing. The last generation of petrol-powered GT cars is another. CCR tracks the modern collectibles as they enter their early market chapters.",
  },
  {
    title: "The patient researcher",
    body: "You are not buying this month. You are watching condition, watching prices, watching for the right example to finally surface. Calm browsing is a first-class mode here.",
  },
  {
    title: "The serious buyer",
    body: "When you are ready, CCR's read on the specific listing is what stands between aspiration and informed conviction.",
  },
];

export default function Page() {
  return (
    <>
      {/* ───── NAV ───── */}
      <nav className="nav">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="Classic Car Radar — home">
            <ChronographMark />
            <span className="brand-name">Classic Car Radar</span>
          </a>
          <div className="nav-links">
            <a href="#why">Why</a>
            <a href="#how">How</a>
            <a href="#intelligence">Intelligence</a>
            <a href="#radar">Radar</a>
            <a href="#experience">Experience</a>
            <a href="#trust">Trust</a>
          </div>
          <a href="#beta" className="nav-cta">
            Request Access
          </a>
        </div>
      </nav>

      {/* ───── HERO ───── */}
      <section className="hero" id="top">
        <div className="hero-bg" />
        <HeroDial />
        <HeroBrush />
        <div className="hero-horizon" />
        <div className="hero-vignette" />
        <div className="hero-grain" />

        <div className="hero-inner">
          <div className="hero-eyebrow">Classic Car Radar · Private Beta</div>
          <h1 className="hero-headline">
            Trusted intelligence
            <br />
            for the <em>classic car</em> enthusiast.
          </h1>
          <p className="hero-sub">
            Signals worth watching. Opportunities worth pursuing.
          </p>
          <div className="hero-ctas">
            <a href="#beta" className="btn btn-primary">
              Request Early Access <span className="btn-arrow">→</span>
            </a>
            <a href="#how" className="btn btn-ghost">
              See How CCR Works
            </a>
          </div>
        </div>

        <div className="hero-meta">
          <div className="lhs">
            <span>
              <span className="dot" />
              Daily sweep · Live
            </span>
          </div>
          <div className="rhs">Private beta · Limited cohorts</div>
        </div>
      </section>

      {/* ───── TRANSITION 1 · COLLECTOR'S SPACE ───── */}
      <EditorialTransition
        variant="garage"
        ariaLabel="Editorial transition — collector's space"
        phrase="A collector's space. Architectural quiet, warm indirect light — the room comes first."
        mark="Chapter I · Why CCR exists"
      />

      {/* ───── WHY ───── */}
      <section className="section band-graphite" id="why">
        <div className="section-inner">
          <div className="why-grid">
            <div>
              <div className="section-eyebrow">Why CCR exists</div>
              <h2 className="section-title">
                A market that rewards context — and punishes its absence.
              </h2>
              <p className="section-lede">
                Listings live across auctions, dealers, classifieds, and
                private sales. Asking prices drift. Conviction is hard to
                find when the signal is fragmented and the noise is constant.
              </p>
              <div className="why-pull">
                CCR turns scattered listings into a coherent read of the cars
                you actually care about.
              </div>
            </div>
            <div className="why-notes">
              <div className="why-note">
                <div className="why-note-label">Fragmented supply</div>
                <div className="why-note-body">
                  The cars you watch live across a dozen surfaces — none of
                  which talk to each other.
                </div>
              </div>
              <div className="why-note">
                <div className="why-note-label">Asking-price drift</div>
                <div className="why-note-body">
                  Public prices reflect aspiration. Real transactions tell a
                  different story.
                </div>
              </div>
              <div className="why-note">
                <div className="why-note-label">Context vacuum</div>
                <div className="why-note-body">
                  Year, trim, paint, history — the details that decide value
                  are rarely surfaced together.
                </div>
              </div>
              <div className="why-note">
                <div className="why-note-label">Emotional purchase risk</div>
                <div className="why-note-body">
                  The right tool slows you down at the right moment, and
                  replaces hesitation with clarity.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── HOW ───── */}
      <section className="section band-obsidian" id="how">
        <div className="section-inner">
          <div className="section-eyebrow">How CCR works</div>
          <h2 className="section-title">
            A quiet daily read — calibrated to the cars on your radar.
          </h2>
          <p className="section-lede">
            Six surfaces, one conviction. A daily sweep. A memory of what you
            watch. An advisor that reads the result alongside you.
          </p>
          <div className="how-grid">
            {HOW_CARDS.map((card) => (
              <div key={card.num} className="how-card">
                <div className="how-num">{card.num}</div>
                <h3 className="how-title">{card.title}</h3>
                <p className="how-body">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── INTELLIGENCE ───── */}
      <section className="section band-graphite" id="intelligence">
        <div className="section-inner">
          <div className="section-eyebrow">Intelligence layer</div>
          <h2 className="section-title">
            A more coherent read of the market itself.
          </h2>

          <div className="intel-grid">
            <div className="intel-text">
              <p className="intel-lede">
                Thousands of collector listings shift daily across auctions,
                dealers, classifieds, and private sales.
              </p>
              <p className="intel-body">
                CCR maintains a continuously updated read on the market —
                identifying patterns, comparable vehicles, pricing movement,
                and emerging signals that would be difficult to track
                manually.
              </p>
              <p className="intel-body">
                The result is not more inventory. It is a more coherent
                understanding of the market itself.
              </p>
            </div>
            <div className="intel-queries">
              <div className="intel-queries-label">Read in natural language</div>
              <div className="intel-query">
                &ldquo;Air-cooled 911 manual under 100k.&rdquo;
                <span className="intel-query-dossier">
                  Porsche 911 · 1965–1998 · G-series &amp; 993 manuals
                </span>
              </div>
              <div className="intel-query">
                &ldquo;California T under 130.&rdquo;
                <span className="intel-query-dossier">
                  Ferrari · 2014–2017 · Turbocharged GT
                </span>
              </div>
              <div className="intel-query">
                &ldquo;Driver-grade 964 with recent engine work.&rdquo;
                <span className="intel-query-dossier">
                  Porsche 911 · 1989–1994 · M64 maintenance focus
                </span>
              </div>
              <div className="intel-query">
                &ldquo;Late-90s GT3 in Europe, no track use.&rdquo;
                <span className="intel-query-dossier">
                  Porsche 996.1 GT3 · 1999–2001 · originality bias
                </span>
              </div>
              <div className="intel-queries-foot">
                CCR reads intent — not just filters.
                <br />
                The language is the interface.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── TRANSITION 2 · ANALOG ERA ───── */}
      <EditorialTransition
        variant="cockpit"
        ariaLabel="Editorial transition — analog era"
        phrase="From the analog era. Gauges, materials — the instruments that decide whether a number is a deal or a premium."
        mark="Chapter II · What CCR notices"
      />

      {/* ───── RADAR ───── */}
      <section className="section radar" id="radar">
        <div className="section-inner">
          <div className="radar-head">
            <div>
              <div className="section-eyebrow">Cars currently on radar</div>
              <h2 className="section-title">Recently surfaced.</h2>
            </div>
            <div className="radar-issue">
              <strong>Issue No. 12</strong>
              <br />
              Week of{" "}
              <span style={{ color: "var(--bone-warm)", opacity: 0.85 }}>
                May 11
              </span>
            </div>
          </div>

          <div className="radar-list">
            {RADAR.map((r) => (
              <article key={r.num} className="radar-item">
                <div className="radar-num">{r.num}</div>
                <div>
                  <h3 className="radar-car">{r.car}</h3>
                  <div className="radar-dossier">
                    <strong>{r.dossier.marque}</strong>
                    <span>·</span>
                    <span>{r.dossier.era}</span>
                    <span>·</span>
                    <span>{r.dossier.note}</span>
                  </div>
                  <p className="radar-obs">{r.obs}</p>
                  <div className="radar-meta">
                    {r.meta.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="radar-foot">
            <span>
              Observations from the daily sweep. Not advice. Not solicitations.
            </span>
            <span>Next issue · Monday</span>
          </div>
        </div>
      </section>

      {/* ───── EXPERIENCE ───── */}
      <section className="section band-graphite" id="experience">
        <div className="section-inner">
          <div className="section-eyebrow">The CCR experience</div>
          <h2 className="section-title">
            Restrained surfaces. Considered language.
          </h2>
          <p className="section-lede" style={{ marginBottom: "112px" }}>
            Every surface in CCR is built on one principle. The reader is
            already smart. We surface what is worth a closer look — and stay
            out of the way of the rest.
          </p>

          {/* Search */}
          <div className="exp-row">
            <div className="exp-text">
              <div className="exp-text-eyebrow">Search · Command surface</div>
              <h3>Ask the market a question.</h3>
              <p>
                &ldquo;Air-cooled 911 manual under 100k.&rdquo; &ldquo;California
                T under 130.&rdquo; CCR reads the question, applies the right
                filters, and returns a focused view.
              </p>
              <p>
                No facets to manage. No filter sidebars to click through. The
                language is the interface.
              </p>
            </div>
            <div className="exp-mock">
              <div className="mock-panel">
                <div className="mock-label">
                  Live query · Air-cooled 911 manual under 100k
                </div>
                <div className="mock-row">
                  <div>
                    <div className="mock-name">1989 Porsche 911 Carrera</div>
                    <div className="mock-sub">
                      Triple Black · 3.2 · G50 manual · 84k mi
                    </div>
                    <div className="mock-dossier">G-series · 1984–1989</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="mock-price">$89,500</div>
                    <div className="mock-delta">↓ 4% past 30d</div>
                  </div>
                </div>
                <div className="mock-row">
                  <div>
                    <div className="mock-name">1995 Porsche 911 Carrera 4</div>
                    <div className="mock-sub">
                      Polar Silver · 993 · manual · 71k mi
                    </div>
                    <div className="mock-dossier">993 · 1994–1998 · final air-cooled</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="mock-price">$97,800</div>
                    <div className="mock-delta neutral">·  At market</div>
                  </div>
                </div>
                <div className="mock-row">
                  <div>
                    <div className="mock-name">
                      1987 Porsche 911 Carrera Targa
                    </div>
                    <div className="mock-sub">
                      Guards Red · G50 manual · 52k mi
                    </div>
                    <div className="mock-dossier">G-series Targa · 1984–1989</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="mock-price">$78,200</div>
                    <div className="mock-delta">Worth a closer look</div>
                  </div>
                </div>
                <div className="mock-meta">
                  <span>22 currently surfaced</span>
                  <span>Daily sweep · 04:18</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className="exp-row flip">
            <div className="exp-text">
              <div className="exp-text-eyebrow">Detail · Opportunity analysis</div>
              <h3>Read the listing past the listing.</h3>
              <p>
                Every car opens to a detail surface that places it in its
                market — comparable transactions, days on market, the gap
                between asking and observed prices.
              </p>
              <p>
                No badges. No &ldquo;great deal&rdquo; stamps. The read is
                shown, and the reader is trusted to act.
              </p>
            </div>
            <div className="exp-mock">
              <div className="mock-panel">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "22px",
                  }}
                >
                  <div>
                    <div className="mock-label" style={{ marginBottom: "8px" }}>
                      Detail · Opportunity analysis
                    </div>
                    <div className="mock-name" style={{ fontSize: "17px" }}>
                      1990 Porsche 964 Carrera 2
                    </div>
                    <div className="mock-sub" style={{ marginTop: "6px" }}>
                      Midnight Blue · manual · 67,400 mi
                    </div>
                    <div className="mock-dossier">964 · 1989–1994 · M64 air-cooled</div>
                  </div>
                  <span className="mock-tag">Worth a closer look</span>
                </div>
                <div className="mock-row">
                  <div className="mock-sub">Asking</div>
                  <div className="mock-price">$112,500</div>
                </div>
                <div className="mock-row">
                  <div className="mock-sub">Rolling market median (90d)</div>
                  <div className="mock-price">$124,800</div>
                </div>
                <div className="mock-row">
                  <div className="mock-sub">Comparable transactions</div>
                  <div className="mock-price">7 within 18%</div>
                </div>
                <div className="mock-row">
                  <div className="mock-sub">Days on market</div>
                  <div className="mock-price">14</div>
                </div>
                <div className="mock-meta">
                  <span>Comp set · auction · dealer · private</span>
                  <span>Condition · review needed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advisor */}
          <div className="exp-row">
            <div className="exp-text">
              <div className="exp-text-eyebrow">Advisor · Observational reads</div>
              <h3>A short note, when something is worth a pause.</h3>
              <p>
                Not a chatbot. Not a greeting. An editorial read of what CCR
                is seeing across your garage and watchlist.
              </p>
              <p>You can dismiss it. It will not return until something changes.</p>
            </div>
            <div className="exp-mock">
              <div className="mock-panel mock-advisor">
                <div className="mock-label">Advisor</div>
                <div className="mock-advisor-headline">
                  Two of your watchlist cars softened this week.
                </div>
                <div className="mock-advisor-body">
                  Both 964 Carreras you&apos;ve been tracking dropped their
                  asking prices over the past nine days. The comp set around
                  them is steady. A quieter window than the past quarter.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── ENTHUSIASTS (ivory) ───── */}
      <section className="section band-bone" id="enthusiasts">
        <div className="section-inner">
          <div className="section-eyebrow">Built for enthusiasts</div>
          <h2 className="section-title">For the reader who thinks in decades.</h2>
          <p className="section-lede">
            Most CCR readers are not in the market this week. They are
            watching. Reading. Building conviction. CCR validates that
            posture — and is there when the right car shows up.
          </p>
          <div className="audience-grid">
            {AUDIENCES.map((a) => (
              <div key={a.title} className="audience-card">
                <h3 className="audience-title">{a.title}</h3>
                <p className="audience-body">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TRUST ───── */}
      <section className="section band-obsidian" id="trust">
        <div className="section-inner">
          <div className="section-eyebrow">How CCR thinks</div>
          <h2 className="section-title">
            Intelligence, not inventory. Context, not commerce.
          </h2>
          <p className="section-lede">
            CCR is not a dealer, not a marketplace, and not a paid-placement
            platform. Our work is to help you read the market well — and to
            be worth keeping open for the years you may spend watching it.
          </p>
          <div className="trust-grid">
            {TRUST.map((t) => (
              <div key={t.label} className="trust-item">
                <div className="trust-label">{t.label}</div>
                <div className="trust-statement">{t.statement}</div>
              </div>
            ))}
          </div>
          <div className="trust-pull">
            &ldquo;The right tool for this market is the one that respects
            your judgment and stays out of the way of it.&rdquo;
          </div>
        </div>
      </section>

      {/* ───── TRANSITION 3 · WHERE DECISIONS HAPPEN ───── */}
      <EditorialTransition
        variant="lounge"
        ariaLabel="Editorial transition — where decisions happen"
        phrase="Where collectors think about cars. Warm light, considered surfaces — the room where the decisions actually happen."
        mark="Chapter III · Begin"
      />

      {/* ───── BETA ───── */}
      <section className="section beta" id="beta">
        <div className="beta-bg" />
        <div className="section-inner beta-inner">
          <div className="beta-grid">
            <div>
              <div className="section-eyebrow">Request early access</div>
              <h2 className="section-title">Begin watching the market with CCR.</h2>
              <p className="section-lede">
                CCR is in private beta. We are adding readers in calm
                cohorts — and when we add you, we&apos;d like the platform
                to already understand what you watch.
              </p>
              <div className="beta-meta">
                Private beta · Limited cohorts
                <br />
                Reply by email · No marketing list
              </div>
            </div>
            <BetaForm />
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="brand">
              <ChronographMark />
              <span className="brand-name">Classic Car Radar</span>
            </div>
            <div className="footer-tag">
              Trusted intelligence for the classic car enthusiast. Signals
              worth watching.
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">The platform</div>
            <a href="#why">Why CCR</a>
            <a href="#how">How it works</a>
            <a href="#radar">On radar</a>
            <a href="#trust">How CCR thinks</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Access</div>
            <a href="#beta">Request early access</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Reach us</div>
            <a href="mailto:hello@classiccarradar.com">hello@classiccarradar.com</a>
          </div>
        </div>
        <div className="footer-fine">
          <span>© 2026 Classic Car Radar</span>
        </div>
      </footer>
    </>
  );
}
