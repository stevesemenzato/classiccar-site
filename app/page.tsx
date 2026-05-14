import BetaForm from "./_components/beta-form";
import SafeImage, { hasPublicImage } from "./_components/safe-image";

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
      <SafeImage
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
    num: "01 · Search",
    title: "Ask in your own words.",
    body: "Describe the kind of car you're looking for in plain language. CCR reads the intent and returns a focused view across auctions, dealers, classifieds, and private sales.",
  },
  {
    num: "02 · Garage",
    title: "The cars on your radar, remembered.",
    body: "The cars you're tracking stay in view. New comparables appear when they do. The market around them is kept in context for you.",
  },
  {
    num: "03 · Watchlist",
    title: "Specific listings, monitored.",
    body: "Specific listings, watched. Price changes, days on market, the quiet shifts that tell you something has moved.",
  },
  {
    num: "04 · Compare",
    title: "Two or three candidates, side by side.",
    body: "Place candidates side by side. Spec, history, market position, comparable transactions — in one view.",
  },
  {
    num: "05 · Market view",
    title: "Where a car actually sits.",
    body: "For any listing: comp set, days on market, the gap between asking and the prices the market actually pays.",
  },
  {
    num: "06 · Advisor",
    title: "A knowledgeable second perspective.",
    body: "Not a chatbot. A short, considered note when something across your garage or watchlist is worth pausing on.",
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
    label: "Compare opportunities",
    statement:
      "Place candidates side by side. See where each one sits against the others — and against the market around them.",
  },
  {
    label: "Understand the market",
    statement:
      "Pricing, comparable transactions, and market movement on the cars you care about — kept current in the background.",
  },
  {
    label: "Spot concerns early",
    statement:
      "Days on market, asking-vs-paid gaps, condition flags — the quiet signals that something may need a closer look.",
  },
  {
    label: "Prepare for conversations",
    statement:
      "Arrive at a viewing or a call with the context already in hand. Better questions. Better negotiations.",
  },
  {
    label: "Revisit over time",
    statement:
      "CCR remembers the cars you've been watching and the categories you keep returning to. That continuity is yours.",
  },
  {
    label: "Decide with confidence",
    statement:
      "Approach important decisions with more clarity. The judgment — to act, to pass, to keep watching — stays with you.",
  },
];

/* Marque studies — editorial cards anchored to specific cars CCR
 * tracks closely. Each card carries an optional image slot at
 * /images/marques/<slug>.jpg. When the file isn't present the image
 * area collapses (handled by SafeImage + the .marque-card CSS rules) —
 * never a broken icon, never a gray placeholder block. Commissioned
 * photography drops in without code changes. */
const MARQUES = [
  {
    slug: "ferrari-f40",
    marque: "Ferrari",
    car: "F40",
    era: "1987–1992 · 1,315 built",
    note: "Twin-turbo V8 · the last Ferrari signed off by Enzo.",
    read: "Recent low-mileage examples have re-anchored the market after a quiet two years.",
  },
  {
    slug: "porsche-gt3-touring",
    marque: "Porsche",
    car: "991.2 / 992 GT3 Touring",
    era: "2017–present",
    note: "Mezger-lineage 4.0 · manual · no wing.",
    read: "Touring continues to separate from regular GT3 on the second-hand spread.",
  },
  {
    slug: "alfa-romeo-33-stradale",
    marque: "Alfa Romeo",
    car: "33 Stradale",
    era: "1967–1969 · 18 built",
    note: "Franco Scaglione · 2.0L V8 · 8,800 rpm.",
    read: "Rarely traded publicly; what little there is comes through private brokerage.",
  },
  {
    slug: "bmw-m3-e30",
    marque: "BMW",
    car: "M3 E30",
    era: "1986–1991",
    note: "S14 four · homologation special · evo variants.",
    read: "Documented Sport Evolution cars are clustering at the top of the curve.",
  },
  {
    slug: "mclaren-f1",
    marque: "McLaren",
    car: "F1",
    era: "1992–1998 · 106 built",
    note: "Gordon Murray · BMW S70/2 V12 · 627 hp.",
    read: "Provenance now matters more than condition. The market reads ownership.",
  },
  {
    slug: "lancia-delta-integrale",
    marque: "Lancia",
    car: "Delta Integrale Evoluzione",
    era: "1991–1994",
    note: "Group A homologation · turbocharged 2.0 · AWD.",
    read: "European market firming; documented Martini and Evo II cars setting the tone.",
  },
];

const AUDIENCES = [
  {
    title: "The classic car enthusiast",
    body: "You know the cars that matter. You've followed the auctions for years. CCR is the quiet desk that keeps a coherent view of what's currently on offer in your corner of the market.",
  },
  {
    title: "The modern classics buyer",
    body: "Air-cooled is one thing. The last generation of petrol-powered GT cars is another. CCR tracks the modern collectibles as they enter their early market chapters.",
  },
  {
    title: "The patient researcher",
    body: "You are not buying this month. You are watching condition, watching prices, watching for the right example to finally come up. Calm browsing is a first-class mode here.",
  },
  {
    title: "The serious buyer",
    body: "When you are ready, CCR's read on a specific listing is what stands between aspiration and informed conviction — the context you'd want before any important decision.",
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
            <a href="#radar">Radar</a>
            <a href="#marques">Marques</a>
            <a href="#voice">Advisor</a>
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
            A collector&apos;s space — curated vehicles, market
            intelligence, and signals worth watching.
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
                Keeping up with the collector market is difficult,
                fragmented, and time-consuming.
              </h2>
              <p className="section-lede">
                Interesting cars are spread across auctions, dealer sites,
                classifieds, forums, and private listings. The challenge
                is not finding cars. It is finding the right cars.
              </p>
              <div className="why-pull">
                To help enthusiasts navigate the market more intelligently
                — and find the cars that genuinely fit what they&apos;re
                looking for.
              </div>
              <p
                className="section-lede"
                style={{ marginTop: "28px", fontStyle: "italic", opacity: 0.78 }}
              >
                Not to replace the hunt. To make the hunt more intelligent.
              </p>
            </div>
            <div className="why-notes">
              <div className="why-note">
                <div className="why-note-label">Fragmented supply</div>
                <div className="why-note-body">
                  The cars you watch live across auctions, dealers,
                  classifieds, forums, and private sales — none of which
                  talk to each other.
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
                <div className="why-note-label">Missing context</div>
                <div className="why-note-body">
                  Year, trim, paint, history — the details that decide value
                  rarely sit alongside the listings.
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
            A quiet daily read — calibrated to the cars you care about.
          </h2>
          <p className="section-lede">
            A daily read on the market. Search, garage, watchlist, compare,
            and an advisor that keeps context on the cars you&apos;re
            following.
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
          <div className="section-eyebrow">Collector intelligence</div>
          <h2 className="section-title">
            An AI advisor that understands the collector market.
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
              <div className="intel-queries-label">Ask in natural language</div>
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
                CCR reads the question, applies the right context,
                <br />
                and returns the cars worth a closer look.
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
              <h2 className="section-title">Recently worth watching.</h2>
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

      {/* ───── MARQUE STUDIES ─────
       * Six cars CCR follows closely. Each card has an optional image
       * slot under /images/marques/<slug>.jpg — SafeImage renders the
       * image when committed; otherwise the slot collapses cleanly and
       * the editorial card carries on its own merits. */}
      <section className="section band-bone-deep" id="marques">
        <div className="section-inner">
          <div className="section-eyebrow">Marque studies</div>
          <h2 className="section-title">
            The cars CCR follows most closely.
          </h2>
          <p className="section-lede">
            A working dossier on six of the marques where CCR&apos;s
            collector intelligence is densest — chosen by the readers,
            shaped by the auctions, anchored in the daily sweep.
          </p>
          <div className="marque-grid">
            {MARQUES.map((m) => {
              const imgSrc = `/images/marques/${m.slug}.jpg`;
              const hasImage = hasPublicImage(imgSrc);
              return (
                <article
                  key={m.slug}
                  className={`marque-card${hasImage ? " marque-card--with-image" : ""}`}
                >
                  {hasImage ? (
                    <div className="marque-image-slot">
                      <SafeImage
                        src={imgSrc}
                        alt={`${m.marque} ${m.car} — editorial study`}
                        fill
                        sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw"
                        className="marque-image"
                      />
                    </div>
                  ) : null}
                  <div className="marque-body">
                    <div className="marque-marque">{m.marque}</div>
                    <h3 className="marque-car">{m.car}</h3>
                    <div className="marque-era">{m.era}</div>
                    <p className="marque-note">{m.note}</p>
                    <p className="marque-read">{m.read}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="marque-foot">
            Six of more than ninety marques and chassis CCR currently tracks.
          </div>
        </div>
      </section>

      {/* ───── EXPERIENCE ───── */}
      <section className="section band-graphite" id="experience">
        <div className="section-inner">
          <div className="section-eyebrow">The CCR experience</div>
          <h2 className="section-title">
            The more you explore, the more aligned CCR becomes.
          </h2>
          <p className="section-lede" style={{ marginBottom: "112px" }}>
            The more you explore the market, the more aligned CCR becomes
            with your interests, priorities, and collector focus. Over
            time, it becomes a more informed and useful advisor around the
            cars worth your attention.
          </p>

          {/* Search */}
          <div className="exp-row">
            <div className="exp-text">
              <div className="exp-text-eyebrow">Search</div>
              <h3>Ask questions naturally.</h3>
              <p>
                &ldquo;Air-cooled 911 manual under 100k.&rdquo; &ldquo;California
                T under 130.&rdquo; Ask in your own words. CCR reads the
                question, applies the right context, and returns the cars
                worth a closer look.
              </p>
              <p>
                No facets to manage. No filter sidebars. The language is the
                interface — and the answers come back with the context
                needed to make more informed decisions.
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
                  <span>22 in your view today</span>
                  <span>Daily sweep · 04:18</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className="exp-row flip">
            <div className="exp-text">
              <div className="exp-text-eyebrow">Market view</div>
              <h3>Read the listing past the listing.</h3>
              <p>
                Every car opens into its market view — comparable
                transactions, days on market, the gap between asking and
                the prices the market actually pays.
              </p>
              <p>
                No badges. No &ldquo;great deal&rdquo; stamps. The context
                is shown, and the decision stays with you.
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
              <div className="exp-text-eyebrow">Advisor</div>
              <h3>A trusted second perspective.</h3>
              <p>
                Your CCR advisor keeps track of the cars and categories
                that matter to you — surfacing opportunities worth a closer
                look when the market moves.
              </p>
              <p>
                Not a chatbot. Not a copilot. A short, considered note when
                something across your garage or watchlist deserves
                attention. You can dismiss it. It will not return until
                something changes.
              </p>
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
          <h2 className="section-title">
            Built for collectors, enthusiasts, restorers, and drivers.
          </h2>
          <p className="section-lede">
            For people who genuinely care about the market and the machines
            within it. About preservation, craftsmanship, long-term
            ownership, and the analog, petrol-powered culture around these
            cars.
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
            Support for better enthusiast judgment.
          </h2>
          <p className="section-lede">
            CCR is designed to support the way thoughtful enthusiasts
            evaluate cars. A daily read on the market — with an AI
            advisor available when you want a second perspective. Rather
            than replacing your judgment, CCR is designed to strengthen
            it.
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

      {/* ───── VOICE-FIRST ADVISOR ─────
       * Bloomberg Terminal x Sotheby's framing — premium, restrained,
       * substance-over-hype. The advisor is conversational and has
       * persistent memory of the cars you follow, but the surface
       * language stays editorial, not chatbot. */}
      <section className="section band-graphite" id="voice">
        <div className="section-inner">
          <div className="section-eyebrow">The CCR advisor</div>
          <h2 className="section-title">
            A voice-first advisor that understands the collector market.
          </h2>
          <p className="section-lede">
            CCR is built around an AI-native advisor that holds context
            across auctions, dealers, classifieds, and private sales —
            and remembers what each collector is following.
          </p>

          <div className="voice-grid">
            <div className="voice-text">
              <ul className="voice-points">
                <li>
                  <span className="voice-point-label">Persistent memory.</span>
                  The cars you watch, the marques you study, the price
                  bands you care about — CCR remembers, and gets sharper
                  the more you use it.
                </li>
                <li>
                  <span className="voice-point-label">Conversational intelligence.</span>
                  Ask in your own words. CCR reads the question, applies
                  the right context, and answers with the comp set behind
                  the read.
                </li>
                <li>
                  <span className="voice-point-label">Cross-market analysis.</span>
                  One coherent view across BaT, Collecting Cars, RM and
                  Bonhams catalogues, dealer inventory, and the
                  classifieds — not six tabs that disagree.
                </li>
                <li>
                  <span className="voice-point-label">Opportunity discovery.</span>
                  CCR surfaces the listings worth a closer look before
                  the rest of the market notices — quietly, and with the
                  evidence on hand.
                </li>
              </ul>
            </div>

            <div className="voice-mock">
              <div className="voice-mock-rail">
                <span className="voice-mock-meta">CCR · advisor</span>
                <span className="voice-mock-meta">Today · 06:42</span>
              </div>
              <div className="voice-mock-q">
                You · &ldquo;What&apos;s happened to manual 550s this month?&rdquo;
              </div>
              <div className="voice-mock-a">
                <p>
                  Seven manual 550 Maranellos changed hands in the past
                  thirty days — three at auction, four through dealers.
                  Median transaction up roughly 6&nbsp;% versus the prior
                  quarter, but condition spread is widening.
                </p>
                <p>
                  Two of the cars on your radar moved with the median.
                  One held above it. The London car you flagged in March
                  is still listed; days-on-market is at 84.
                </p>
                <p className="voice-mock-byline">— CCR</p>
              </div>
              <div className="voice-mock-foot">
                Speak to CCR · Ask a question · Open the comp set
              </div>
            </div>
          </div>

          <div className="voice-pull">
            &ldquo;A terminal for the collector market — quiet, intelligent,
            and yours.&rdquo;
          </div>
        </div>
      </section>

      {/* ───── TRANSITION 3 · WHERE DECISIONS HAPPEN ───── */}
      <EditorialTransition
        variant="lounge"
        ariaLabel="Editorial transition — where decisions happen"
        phrase="Where collectors think about cars. Warm light, considered materials — the room where the decisions actually happen."
        mark="Chapter III · Begin"
      />

      {/* ───── BETA ───── */}
      <section className="section beta" id="beta">
        <div className="beta-bg" />
        <div className="section-inner beta-inner">
          <div className="beta-grid">
            <div>
              <div className="section-eyebrow">Request early access</div>
              <h2 className="section-title">
                Begin tracking the collector market with CCR.
              </h2>
              <p className="section-lede">
                CCR is in private beta. We are adding enthusiasts in calm
                cohorts — and when we add you, we&apos;d like CCR to
                already understand the cars you&apos;re following.
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
              A collector&apos;s space — curated vehicles, market
              intelligence, and signals worth watching.
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
