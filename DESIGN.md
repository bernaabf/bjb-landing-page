---
colors:
  casca: "#2A211B"
  casca-cross-ground: "#281918"
  casca-deep: "#211914"
  casca-elevated: "#342922"
  linho: "#EEE7D8"
  areia: "#DDD1B9"
  ocre: "#D9A566"
  ocre-cta: "#D69D63"
  ocre-cta-hover: "#E5B87E"
  musgo: "#4B4F3A"
  argila: "#9A4B30"
typography:
  display: "Space Grotesk"
  body: "Space Grotesk"
  mono: "Space Grotesk (tabular-nums)"
rounded:
  card: "16px"
  navbar: "12px"
  stage: "12px"
  input: "8px"
  pill: "9999px"
spacing:
  base: "8px"
  max-width: "1376px"
  container-gutter: "20px / 32px / 56px"
  section-y: "96px / 128px"
components:
  - navbar
  - hero-split-wordmark
  - diagnostic-accordion
  - services-inspector
  - pipeline-stepper
  - method-bento
  - audience-criteria-card
  - team-cards
  - diagnostic-form
  - arrow-icon
  - monumental-footer
---

# BJB Growth Design System

## 1. Overview

**Product & Aesthetic Direction:** **Estúdio Editorial Atmosférico** (`seed:c5e7032fa19217b2`) — a Brazilian Portuguese (`pt-BR`) editorial technology design system built for **BJB Growth** (`Build · Join · Business`). Rather than generic cool-blue/neon AI startup aesthetics, dark mode is derived directly from the official brandbook's organic palette: espresso brown grounds (**Casca `#2A211B`**), warm parchment breaks (**Linho `#EEE7D8`** and **Areia `#DDD1B9`**), restrained amber interactions (**Ocre `#D9A566`**), botanical moss contrast panels (**Musgo `#4B4F3A`**), and terracotta numerical accents (**Argila `#9A4B30`**).

**Design Philosophy:**
- **Editorial Rhythm:** Alternates dark architectural cross-grids (`Casca`) with high-legibility parchment breaks (`Linho` crosses and `Areia` dot matrices) so long-form operational content stays scannable without visual fatigue.
- **Restrained Smoked Glass:** Glassmorphism appears only on navigation (`bjb-glass-nav`) and inspector/form containers (`bjb-glass-panel`), never repeated as uniform translucent grids.
- **Truth & Honesty:** All components, copy, and visual tokens avoid fabricated client rosters, fake ROI metrics, and generic uncomped eyebrow stacks above section headings.

---

## 2. Colors

### Official Brandbook Palette & Surface Tokens

| Token | CSS Variable | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Casca** | `--bjb-casca` | `#2A211B` | Primary dark ink on light bands; active panel fill; root background base |
| **Hero Cross Ground** | — | `#281918` | `.bjb-cross-ground` hero & dark band ground under `casca-cross-texture.png` |
| **Casca Deep** | `--bjb-casca-deep` | `#211914` | Pipeline showcase section band, input fields, inner confirmation wells, scrollbar track |
| **Casca Elevated** | `--bjb-casca-elevated` | `#342922` | Elevated surface token |
| **Linho** | `--bjb-linho` | `#EEE7D8` | Primary light ink on dark grounds; Seção 02 ground (`.bjb-linho-cross-ground`); hero wordmark & `section02-band`; Method cards |
| **Areia** | `--bjb-areia` | `#DDD1B9` | Secondary dark-surface body ink; hairline dividers (`12%`–`30%` alpha); Seção 05 ground (`.bjb-areia-dot-ground`) |
| **Ocre** | `--bjb-ocre` | `#D9A566` | Active tab labels, focus rings, caret color, mobile primary CTAs, pipeline connector, protocol highlights |
| **Ocre CTA** | — | `#D69D63` | Primary desktop CTA pill fill (`Solicitar diagnóstico`), hover `#E5B87E` |
| **Musgo** | `--bjb-musgo` | `#4B4F3A` | Criteria highlight panel (`Seção 06`), ready-to-send status badge |
| **Argila** | `--bjb-argila` | `#9A4B30` | Diagnostic index numerals & `Critério de diagnóstico` heading on Linho; Method step numbers (`01`–`04`) |

### Verified Accessibility Contrast Pairs (WCAG 2.2 AA)

| Foreground / Background | Verified Contrast | Notes |
| :--- | :--- | :--- |
| Casca `#2A211B` on Linho `#EEE7D8` | `12.8:1` | Section 02 headings, accordion text, Method cards |
| Casca `#2A211B` on Areia `#DDD1B9` | `10.4:1` | Section 05 headings & intro copy |
| Casca `#2A211B` on Ocre `#D9A566` / `#D69D63` | `7.2:1` (brandbook) | Primary buttons, active bottleneck pills, `Sites` badge |
| Linho `#EEE7D8` on Musgo `#4B4F3A` | `6.9:1` | Pilot criteria highlight card (`Seção 06`) |
| Argila `#9A4B30` on Linho `#EEE7D8` | `5.0:1` | Index numbers, Section 02 diagnostic criterion, Method numerals |
| `placeholder:text-[#DDD1B9]/70` on `#211914` | `>= 4.5:1` | Form input & textarea placeholders |
| `#DDD1B9/85` & `#EEE7D8/85` on `#281918` / `#2A211B` | `>= 4.5:1` | Uncompounded body copy & inactive tab text (never compound opacity) |

---

## 3. Typography

Single-family interface and display system anchored in **Space Grotesk** (bundled locally via `@fontsource/space-grotesk` weights `300`, `400`, `500`, `700`). Custom geometric brand lettering inside `brand-logo.png` (`BUILD JOIN}*& BUSINESS'`) and `B}b'` monogram rules are **never** re-typeset in Space Grotesk.

### Type Scale & Roles

| Role | Size / Class | Weight | Line Height | Tracking | Sample Token Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Wordmark (Desktop)** | `16.35cqw` | `700` (Bold) | `0.74` | `-0.008em` | Full-width uppercase `BJB GROWTH` anchored `bottom: 6.05%` over `section02-band` |
| **Hero Wordmark (Mobile)** | `15.4vw` | `700` (Bold) | `0.72` | `-0.015em` | Edge-contained uppercase `BJB GROWTH` with `-mb-[1.8vw]` into `section02-band` |
| **Footer Wordmark** | `14.2vw` | `700` (Bold) | `0.80` | `-0.03em` | Monumental closing `BJB GROWTH` watermark |
| **Hero Display H1 (Desktop)** | `max(28px, 3.314cqw)` | `500` (Medium) | `1.12` | `-0.025em` | Split-line two-line hero proposition |
| **Hero Display H1 (Mobile)** | `clamp(2.4rem, 8vw, 3.6rem)` | `500` (Medium) | `1.06` | `-0.03em` | Leads hero container cleanly without pre-title eyebrow stack |
| **Section Headings (H2)** | `clamp(2rem–2.1rem, 3.6vw–4vw, 3.3rem–3.8rem)` | `500` (Medium) | `1.03–1.06` | `-0.03em` to `-0.032em` | `[text-wrap:balance]` without preceding decorative eyebrows |
| **Lead / Subcopy** | `16px–17px` / `max(13px, 1.199cqw)` | `400` (Regular) | `1.36–1.55` | `0` | Concise intro columns (`40ch–44ch` max width) |
| **UI Labels & Indices** | `11.5px–14px` | `400`–`500` | `1.2–1.4` | `+0.04em` to `+0.06em` | `tabular-nums` (`01`–`05`), uppercase technical indicators |

---

## 4. Layout

### Editorial Section Alternation

1. **Seção 01 — Hero (`#topo`)**: `.bjb-cross-ground` (`#281918`) + atmospheric glow veil (`atmospheric-veil.png`) + cropped symbol watermark (`symbol-watermark.png`) + `BJB GROWTH` splitting seamlessly into the `#EEE7D8` `section02-band`.
2. **Seção 02 — O que trava a operação (`#problemas`)**: `.bjb-linho-cross-ground` (`#EEE7D8`) sticky 5-col / 7-col accordion grid.
3. **Seção 03 — O que entregamos (`#solucoes`)**: `.bjb-cross-ground` 7-col interactive vertical `tablist` + 5-col sticky smoked-glass inspector (`#service-detail-panel`).
4. **Seção 04 — Arquitetura integrada (`#fluxo`)**: Solid Casca Deep (`#211914`) with GSAP-scrubbed ochre connector across 4 horizontal stages (`Captação` → `Atendimento` → `Operação` → `Gestão`) and an interactive stage readout panel.
5. **Seção 05 — Como trabalhamos (`#metodo`)**: `.bjb-areia-dot-ground` (`#DDD1B9`) framing a crisp `1px`-gapped 4-column `Linho` (`#EEE7D8`) card grid.
6. **Seção 06 — Para quem construímos (`#publico`)**: `.bjb-cross-ground` 6-col target audience list paired with a 6-col `#4B4F3A` **Musgo** pilot-criteria panel.
7. **Seção 07 & 08 — Valor, Equipe e Diagnóstico (`#valor`, `#equipe`, `#diagnostico`)**: Solid `#211914` evolution/commercial breakdown followed by `.bjb-linho-cross-ground` (`#EEE7D8`) 3-card builders & owners showcase (`#equipe`), opening back into `.bjb-cross-ground` + glowing `.bjb-glass-panel` conversion form (`POST /api/diagnostico`).
8. **Seção 09 — Rodapé Monumental**: `.bjb-cross-ground` structured links + full-width bottom `BJB GROWTH` display type.

### Containers & Breakpoints

- **Desktop comp-matched Hero canvas:** Engaged at `lg:` (`>= 1024px`) with `aspect-[1376/768]` and `[container-type:inline-size]`, scaling all measured `--r-*` positions via `%` and `cqw`.
- **Standard section shell:** Centered `max-w-[1376px]` with responsive horizontal padding `px-5` (mobile), `sm:px-8` (`>= 640px`), `lg:px-14` (`>= 1024px`).

---

## 5. Elevation & Depth

- **Layer 0 — Textured Grounds:** Seamless CSS/raster brand patterns (`casca-cross-texture.png` SVG/plate repeat `360px`, SVG `Cruzes em Linho` `36px`, CSS `radial-gradient` dots `16px`).
- **Layer 1 — Flush Cards & List Rows:** Separated by `1px` structural hairline borders (`border-[#DDD1B9]/15` on dark, `border-[#2A211B]/18` on light) rather than heavy drop shadows.
- **Layer 2 — Smoked Glass (`bjb-glass-nav`, `bjb-glass-panel`):**
  - `.bjb-glass-nav`: horizontal translucent gradient (`rgba(42, 33, 27, 0.72)` → `rgba(62, 50, 35, 0.56)` → `rgba(42, 33, 27, 0.74)`), `backdrop-filter: blur(18px)`, `1px solid rgba(221, 209, 185, 0.2)`, `box-shadow: 0 18px 40px rgba(15, 10, 8, 0.34)`.
  - `.bjb-glass-panel`: diagonal warm dark glass (`rgba(42, 33, 27, 0.74)` → `rgba(33, 25, 20, 0.82)`), `backdrop-filter: blur(20px)`, `1px solid rgba(221, 209, 185, 0.18)`, `box-shadow: 0 24px 54px rgba(14, 9, 7, 0.38)`.
- **Layer 3 — Active Stage & Highlight Elevation:** Selected pipeline tab adds `shadow-[0_14px_34px_rgba(0,0,0,0.35)]` and `#D9A566` border; Section 06 criteria panel uses `#4B4F3A` **Musgo** (`shadow-[0_24px_60px_rgba(12,10,8,0.45)]`).

---

## 6. Shapes

- **Border Radius Scale:**
  - `rounded-full` (`9999px`): Primary/secondary action pills, bottleneck toggle chips, service category badges (`Sites`, `Automação`, `IA`, `Integração`, `Painéis`), pipeline step circles.
  - `rounded-2xl` (`16px`): `.bjb-glass-panel` cards, `#metodo` grid outer frame, `#publico` Musgo panel, `#fluxo` readout container.
  - `rounded-xl` (`12px`): Pipeline interactive stage tabs, diagnostic summary wells, `"EXEMPLO ILUSTRATIVO"` multi-line wrap pill on small viewports.
  - `rounded-[12px]`: Top navbar glass container and scrolled floating pill.
  - `rounded-lg` (`8px`): Inputs, `<select>`, `<textarea>`, mobile drawer menu toggle & close buttons.
- **Iconography & Brand Assets:**
  - Complete wordmark (`/assets/plates/brand-logo.png`): `min-w-[96px]` strictly enforced in Navbar (top, scrolled, and mobile) and Monumental Footer.
  - App Icon (`src/app/icon.png`): Cropped left arrow-to-bar symbol on anti-aliased rounded Casca `#2A211B`.
  - Directional arrows: Authored `<ArrowIcon direction="right|left|up|down" />` stroke SVG (`14x14px`, `strokeWidth="1.5"`).

---

## 7. Components

- **Navbar (`src/components/Navbar.tsx`):** Single bar aligned to hero comp (`--r-nav-bar-*`) at `scrollY = 0`; condenses into centered floating pill (`w-[min(92vw,995px)] h-[62px]`) past `60px`; accessible mobile drawer (`#bjb-mobile-menu`) with `Escape` handling and deterministic `closeBtnRef`/`menuBtnRef` focus management.
- **HeroSection (`src/components/HeroSection.tsx`):** Responsive split layout (`< 1024px` mobile stack without above-headline eyebrows vs `>= 1024px` `1376/768` comp canvas). GSAP ScrollTrigger split-line reveal & scrub motion gated by `prefers-reduced-motion: reduce`.
- **ProblemsSection (`src/components/ProblemsSection.tsx`):** Accordion list (`01`–`04`) on `.bjb-linho-cross-ground` revealing paired *Como aparece no dia a dia* (`Areia`) and *Efeito na operação* (`Casca`) detail cards.
- **ServicesSection (`src/components/ServicesSection.tsx`):** Accessible `role="tablist"` (`aria-orientation="vertical"`) with `ArrowUp`/`ArrowDown`/`Home`/`End` keyboard navigation (click-activated only, zero hover-stealing) synchronized to sticky `#service-detail-panel`.
- **PipelineSection (`src/components/PipelineSection.tsx`):** 4-stage `role="tablist"` (`ArrowLeft`/`ArrowRight`/`Home`/`End`) + GSAP-animated SVG line connector + `"EXEMPLO ILUSTRATIVO"` attribution badge + stage prev/next buttons using `<ArrowIcon />`.
- **MethodAndAudienceSection (`src/components/MethodAndAudienceSection.tsx`):** 4-step `Linho` bento on `.bjb-areia-dot-ground` followed by SME segment profiles paired with `#4B4F3A` **Musgo** pilot checklist.
- **TeamSection (`src/components/TeamSection.tsx`):** 3-column architectural founder & developer cards (`#equipe`) on `.bjb-linho-cross-ground` highlighting exact roles, technical background, and operational responsibilities with initial seals (`BC`, `JVC`, `BF`) and GSAP stagger guarded by `prefers-reduced-motion`.
- **ValueAndConversionSection (`src/components/ValueAndConversionSection.tsx`):** Split `ValueSection` & `ConversionSection` delivering indicator/commercial readouts plus the client-validated diagnostic form (`POST /api/diagnostico`), dark custom-chevron `<select>`, and honest in-session confirmation (`"Pré-escopo preparado · {protocolo}"`).
- **MonumentalFooter (`src/components/MonumentalFooter.tsx`):** 3-column navigation/pillars/CTA structure, `min-w-[96px]` logo, `<ArrowIcon direction="up" />` back-to-top anchor, and full-bleed `BJB GROWTH` signature.

---

## 8. Do's and Don'ts

### Do
- Keep every text-over-dark / text-over-light pair at `>= 4.5:1` contrast (use `placeholder:text-[#DDD1B9]/70` on `#211914` inputs and single-layer opacity on inactive tabs).
- Enforce `min-w-[96px]` (`25 mm`) on all placements of the complete logo (`brand-logo.png`).
- Gate GSAP typography/parallax motion behind `(prefers-reduced-motion: no-preference)`.
- Label illustrative workflows and example metrics (`"EXEMPLO ILUSTRATIVO"`) unambiguously.
- Implement accessible `role="tablist"` keyboard controls (`Arrow*`, `Home`, `End`, `tabIndex`) and visible `:focus-visible` outlines (`#D9A566` / `#EEE7D8` / `#9A4B30`).

### Don't
- **Never** invent cool-blue, purple, or neon gradients; stay strictly inside the Casca / Linho / Areia / Ocre / Musgo / Argila palette.
- **Never** stretch, rotate, recolor off-palette, or re-typeset `BUILD JOIN}*& BUSINESS'` / `B}b'` in Space Grotesk or another font.
- **Never** add decorative eyebrow labels or uncomped section index prefixes above `<h2>` section headings.
- **Never** publish fabricated client names, logos, testimonials, proven ROI claims, or placeholder emails/phone numbers.
- **Never** trigger tab selection on `onMouseEnter` or substitute raw Unicode arrows (`→`, `↑`, `←`) where `<ArrowIcon />` provides crisp vector strokes.
