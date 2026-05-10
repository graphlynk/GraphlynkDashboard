import { Download } from "lucide-react";

const TECH_SPEC_MD = `# Graphlynk — Technology & Product Specification

**Internal Handoff Document — Marketing, Design, Engineering, Customer Success**
*Version 1.0 · May 2026*

---

## 0. Purpose of This Document

This spec describes **how Graphlynk is built, how it works, and how each surface should feel** so that:

- **Marketing** can write accurate copy, landing pages, and positioning.
- **Design** can extend the system without breaking the Vision UI language.
- **Engineering** has a single source of truth for modules and data flow.
- **Customer Success / Sales** can demo and explain the product confidently.

---

## 1. Product Overview

**Graphlynk** is an AI-powered **SEO & Visibility Intelligence Platform**. It unifies traditional search visibility (Google, Bing), AI answer-engine visibility (ChatGPT, Perplexity, Gemini, Claude), and entity/knowledge-panel readiness into one premium dashboard.

### One-line pitch
> "Graphlynk shows you how visible your brand is — across Google, AI assistants, and the social web — and tells you exactly what to fix next."

### Core value pillars
1. **Visibility** — see where you appear (and where you don't).
2. **Readiness** — know how prepared your entity is for AI + knowledge panels.
3. **Action** — guided workflows that close the gaps.
4. **Multi-Entity** — one workspace for many brands, locations, or clients.

---

## 2. Design System & Aesthetic

### 2.1 Visual language: **Vision UI**
- Glassmorphism panels with subtle blur and inner gradients.
- Neon glow accents (cyan / electric blue) over deep navy backgrounds.
- Ambient pulsing background orbs for depth.
- Animated gradient text on hero headers (e.g., "SEO & VISIBILITY OVERVIEW").

### 2.2 Brand colors
| Token | Hex | Usage |
|---|---|---|
| Primary deep | \`#0b3d84\` | Backgrounds, primary CTAs |
| Accent neon | \`#6EE7F5\` | Glows, highlights, gradient ends |
| Surface dark | \`#0B0D10\` | App background (dark mode) |
| Surface light | \`#F9FAFB\` | App background (light mode) |

### 2.3 Typography
- Defaults defined in \`/src/styles/theme.css\`.
- Do NOT override with Tailwind \`text-*\`, \`font-*\`, or \`leading-*\` unless explicitly redesigning.

### 2.4 Motion principles
- Hover: subtle scale (1.02–1.05) + glow intensify.
- Idle: slow ambient pulse (4–6s loop) on hero text and orbs.
- Transitions: 200–300ms ease-out for UI, 600ms+ for ambient.
- Never block input — animations decorate, never gate interaction.

---

## 3. Information Architecture

### 3.1 Top-level navigation (Sidebar)
- **Dashboard** — SEO & Visibility Overview
- **Search** — keyword & SERP intelligence
- **Keywords** — tracking + opportunity discovery
- **Indexation** — crawl & index health
- **Schema** — structured data validator + generator
- **LLM** — AI answer-engine monitoring
- **Profile & Links** — entity profile builder + link claiming
- **Blog / Products / Pricing** — content surface optimizers
- **Messages / Help / Settings** — utility

### 3.2 Per-tab structure
Each tab follows the same pattern:
1. Page header (gradient title + supporting copy)
2. KPI strip (3–4 glass cards)
3. Primary visualization (chart, map, or table)
4. Action drawer / recommendations
5. Locked premium modules (greyed for Free tier)

---

## 4. Core Modules — How They Work

### 4.1 SEO & Visibility Overview (Dashboard)
**Purpose:** at-a-glance health of the user's visibility.
**Data sources:** SERP scraper, AI engine probes, social signal API, GA/GSC if connected.
**Key components:**
- Visibility Score (0–100) — weighted across SERP, AI, social.
- Trend chart (90-day rolling).
- Top movers (keywords / mentions).
- Panel Readiness card (links to module 4.3).

### 4.2 Multi-Entity Tabs
**Purpose:** workspace switcher for users with multiple brands/locations/clients.
- Pill-style tabs at top of the dashboard.
- Each entity has independent data scope (no leakage).
- "+ Add Entity" CTA respects the user's tier limit.
- Agency/Enterprise tiers: drag-to-reorder, group by client.

### 4.3 Panel Readiness
**Purpose:** measures how prepared a brand is to be recognized as a knowledge entity by Google, Bing, and LLMs.
**Score inputs (weighted):**
- Schema.org coverage (Organization, Person, Product, FAQ, etc.)
- Knowledge graph signals (Wikipedia/Wikidata, Crunchbase, LinkedIn presence)
- Entity consistency (NAP, brand name, descriptions across the web)
- AI mention rate (does ChatGPT/Perplexity describe the brand correctly?)
- Authoritative backlinks
**Output:** 0–100 score + ranked checklist of fixes.

### 4.4 LLM / AI Engine Monitoring
**Purpose:** track how each major LLM describes, recommends, or omits the brand.
**Engines monitored:** ChatGPT, Perplexity, Gemini, Claude, Bing Copilot.
**Method:** scheduled probe queries (brand name, "best [niche] tool", competitor comparisons) → captured response → parsed for mention, sentiment, accuracy.
**UI:** per-engine card with mention rate, sentiment trend, sample responses, "fix accuracy" CTA.

### 4.5 Profile & Links
**Purpose:** guided builder for the brand's entity profile + outbound link strategy.
- Pulls suggested directory & profile sites by niche.
- "Claim → Verify → Enrich" workflow per profile.
- Link health monitoring (broken, redirected, rel attributes).

### 4.6 Admin Console (Agency / Enterprise)
- Team seats + RBAC (Owner, Admin, Editor, Viewer).
- Client portals (white-label).
- Audit log.
- Usage analytics per seat / per entity.

### 4.7 Support Widget
- Floating glass widget, bottom-right.
- Routes to docs, live chat (paid tiers), and AI assistant for self-serve.

---

## 5. Tier Gating Logic

| Module | Free | Starter | Pro | Agency | Enterprise |
|---|---|---|---|---|---|
| Dashboard | ✓ | ✓ | ✓ | ✓ | ✓ |
| Multi-entity | 1 | 3 | 10 | 50 | ∞ |
| Panel Readiness | preview only | ✓ | ✓ | ✓ | ✓ |
| LLM Monitoring | locked (visible) | basic | full | full | full |
| Profile & Links | basic | ✓ | ✓ | ✓ | ✓ |
| Admin Console | — | — | — | ✓ | ✓ |
| API access | — | — | — | limited | full |
| White-label | — | — | — | ✓ | ✓ |

**UX rule:** Locked premium modules are **visible but greyed out** with a glass overlay and a "Unlock with Pro/Agency" CTA. This drives upgrade intent — never hide premium features.

---

## 6. Onboarding Flow

1. **Sign up** — email or SSO.
2. **Niche selection** — user picks one of 10 niches (Local Services, E-commerce, Creators, SaaS, Healthcare, Real Estate, Hospitality, Legal, Education, Agencies).
3. **Entity setup** — brand name, website, location(s), competitors.
4. **Initial scan** — runs Panel Readiness + first SERP/AI probes (~60s).
5. **Tailored dashboard** — KPIs, recommendations, and template content adapt to the chosen niche.
6. **Upgrade prompt** — surfaced after first "aha" moment (typically the first low Panel Readiness score or AI mismatch).

---

## 7. Technical Architecture

### 7.1 Frontend
- **Stack:** React + TypeScript + Tailwind CSS v4
- **Entrypoint:** \`src/app/App.tsx\`
- **Component library:** custom Vision UI primitives in \`src/app/components/*\`
- **State:** React context (\`src/app/context/ThemeContext\`) + lightweight per-tab state
- **Charts:** \`recharts\`
- **Animation:** \`motion/react\`
- **Toasts:** \`sonner\`
- **Icons:** \`lucide-react\`

### 7.2 Backend (planned / current)
- **API:** REST + selective GraphQL for multi-entity reads
- **Auth:** Supabase (email, OAuth, SSO for Enterprise)
- **DB:** Postgres (entities, scores, probes, history)
- **Workers:** scheduled jobs for SERP scraping & LLM probing
- **Storage:** object storage for snapshots, exported reports

### 7.3 Data flow
1. Worker pulls SERP + AI responses on schedule (tier-dependent cadence).
2. Normalizer extracts structured signals (mention, rank, sentiment, schema).
3. Scorer recalculates Visibility + Panel Readiness.
4. API exposes aggregates to the dashboard.
5. Frontend renders with optimistic UI; subscribes to live updates for Pro+.

### 7.4 AI / ML
- **Mention parsing:** LLM-assisted entity extraction + sentiment.
- **Recommendations engine:** rule-based (v1), ML-ranked (v2).
- **Forecasting (Q1 2027):** time-series model on visibility metrics.

---

## 8. Audience Segments — How They Should Experience the Product

| Segment | Primary jobs-to-be-done | Surfaces they live in |
|---|---|---|
| Solo creator / personal brand | "Am I showing up when people search me?" | Dashboard, LLM, Profile & Links |
| Local SMB | "Are people in my area finding me?" | Dashboard (local map), Panel Readiness |
| E-commerce brand | "Are products indexed and recommended?" | Schema, Products, LLM |
| SaaS / B2B | "Do AI assistants recommend me vs competitors?" | LLM, Keywords, Panel Readiness |
| Marketing agency | "Manage many clients efficiently" | Multi-entity, Admin, white-label |
| Enterprise / multi-location | "Roll-up + drill-down across the org" | Admin, multi-entity groups, API |

---

## 9. Marketing Hooks (for copy & ads)

- "See yourself the way ChatGPT sees you."
- "Your knowledge panel, ready in days — not years."
- "One dashboard. Every search. Every AI. Every entity."
- "SEO is no longer about keywords. It's about being known."
- "Locked behind your competitor's brand? Unlock visibility with Graphlynk."

**Tone:** confident, intelligent, slightly futuristic. Avoid hype words ("revolutionary", "10x", "guru"). Lean on clarity + premium feel.

---

## 10. Design Handoff Notes

- All glass surfaces use \`backdrop-blur-xl\` with \`border\` of \`rgba(110,231,245,0.2–0.4)\`.
- Glow shadows: \`shadow-[0_0_30px_rgba(110,231,245,0.4)]\` baseline; intensify on hover.
- Hero text: gradient \`from-[#0b3d84] via-[#6EE7F5] to-white\` with neon text-shadow.
- Locked modules: 60% opacity + grayscale(0.4) + glass overlay with lock icon.
- Always provide both light + dark modes — dark is primary.

---

## 11. Roadmap (Build Order)

| Quarter | Focus |
|---|---|
| Q2 2026 (now) | MVP: Dashboard, Signup w/ niche, Multi-entity, Panel Readiness, Admin |
| Q3 2026 | LLM monitoring full release, competitor benchmarking |
| Q4 2026 | Agency white-label, public API, integration marketplace |
| Q1 2027 | Enterprise SSO, predictive forecasting, advanced reporting |
| Q2 2027 | Mobile apps, automated content + schema generation |

---

## 12. Open Questions for Marketing & Design

1. Which 2–3 audience segments do we lead with for launch?
2. Should the brand voice skew "trusted SEO authority" or "AI-era challenger"?
3. Do we want an in-app guided tour, or rely on the empty-state recommendations?
4. Do we keep the locked-module pattern, or move to a teaser-modal pattern?
5. What does the public marketing site need that the app doesn't already showcase?

---

*Confidential — internal use only.*
`;

export function BusinessModelDownload() {
  const handleDownload = () => {
    const blob = new Blob([TECH_SPEC_MD], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Graphlynk_Tech_and_Product_Spec.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-[#0b3d84]/80 to-[#6EE7F5]/40 border border-[#6EE7F5]/40 text-white shadow-[0_0_30px_rgba(110,231,245,0.4)] hover:shadow-[0_0_45px_rgba(110,231,245,0.7)] transition-all hover:scale-105"
      style={{ fontFamily: "inherit" }}
    >
      <Download size={18} />
      <span>Download Tech & Product Spec (.md)</span>
    </button>
  );
}
