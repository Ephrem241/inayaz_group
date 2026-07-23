# CLAUDE.md — INAYAZ Group Website Rebuild

## 1. Project Mission

Rebuild the existing INAYAZ Group website as a premium, cinematic, production-ready corporate platform for a diversified Ethiopian construction and business group.

The website must communicate:

- Strength
- Engineering precision
- Trust
- Scale
- Modern construction capability
- Real estate expertise
- Long-term legacy
- Ethiopian market leadership
- International-quality execution

The final result should feel architectural, cinematic, refined, and credible. It must not look like a generic template, SaaS dashboard, gaming website, or overly animated portfolio.

---

## 2. Existing Website Reference

Current website:

- https://inayaz-website.vercel.app/

The existing website is the **source of truth for company information**: business divisions, project details, contact information, leadership, and brand story. Extract and preserve this content in the rebuild.

Do not copy its visual design directly — the rebuild replaces the design entirely.

If information on the existing site conflicts with this document, flag it for confirmation rather than guessing.

Note: the live site was built by a previous developer. There is no access to its source code, CMS, or credentials — only the publicly visible pages.

**Primary content source: `docs/INAYAZ_Company_Profile.docx`** — a complete compilation of the live site's content (verified July 2026). Use it as the authoritative seed content for Sanity. The live site itself is the secondary reference and the source for images.

Verified section taglines from the live site (use these):

- About: "Built on Purpose. Driven by Integrity." / "Grounded in Humility, Committed to Excellence." / "Since 2015: A Legacy of Excellence"
- Divisions: "Integrated Expertise. Uncompromised Scale."
- Projects: "Proven Footprints. Future Landscapes."
- Import: "Sourced Globally. Delivered Locally. — The Machinery Behind Ethiopia's Progress"
- Travel: "Discover Ethiopia — Experience the Extraordinary" / "Ethiopia through expert eyes"
- Network: "Local Expertise. Global Reach." / "Stronger Together: Connecting Industry Leaders" 

---

## 3. Brand Foundation

### Company Name

INAYAZ Group

### Tagline

Building What’s Next

### Recommended Hero Message

Engineering Landmarks.  
Creating Lasting Value.

### Recommended Supporting Message

A diversified Ethiopian business group delivering construction, real estate, manufacturing, import, export, travel, and equipment solutions with precision, integrity, and long-term responsibility.

### Brand Meaning (verified from company profile)

INAYAZ (ኢናያ / عناية) means care, concern, attention, protection, kindness, and solicitude.

Guiding words: Precision · Responsibility · Care — Legacy — Attention to Detail & Excellence.

Legal/operating name on projects: **INAYAZ CONSTRUCTION and MATERIAL IMPORT EXPORT** (confirmed).

Recommended brand statement:

> INAYAZ represents care, precision, and responsibility. It reflects our commitment to protecting client interests, paying attention to every detail, and delivering every project with integrity and excellence.

---

## 4. Official Color System

Use these colors consistently across the entire website.

### Deep Navy

- Hex: `#0B1F33`
- Use for:
  - Hero overlays
  - Main navigation
  - Footer
  - Dark backgrounds
  - High-trust corporate sections
  - Mobile menu background

### Architectural Charcoal

- Hex: `#14181D`
- Use for:
  - Project pages
  - Dark editorial sections
  - Feature panels
  - Cinematic transitions
  - Content overlays

### Warm Stone

- Hex: `#D8C7A5`
- Use for:
  - Light editorial sections
  - Material accents
  - Cards
  - Background blocks
  - Architectural details

### Construction Gold

- Hex: `#B79052`
- Use for:
  - Primary buttons
  - Important labels
  - Metrics
  - Icons
  - Dividers
  - Hover states
  - Highlighted words
  - Premium decorative accents

### Off White

- Hex: `#F5F3EE`
- Use for:
  - Main light background
  - Text on dark backgrounds
  - Content surfaces
  - High-readability sections

### Steel Gray

- Hex: `#7B848C`
- Use for:
  - Metadata
  - Dividers
  - Secondary text
  - Project details
  - Timestamps
  - Subtle borders

### Suggested CSS Variables

```css
:root {
  --color-deep-navy: #0b1f33;
  --color-architectural-charcoal: #14181d;
  --color-warm-stone: #d8c7a5;
  --color-construction-gold: #b79052;
  --color-off-white: #f5f3ee;
  --color-steel-gray: #7b848c;

  --background: var(--color-off-white);
  --foreground: var(--color-architectural-charcoal);
  --primary: var(--color-construction-gold);
  --primary-foreground: var(--color-deep-navy);
  --muted: var(--color-warm-stone);
  --muted-foreground: var(--color-steel-gray);
  --dark: var(--color-deep-navy);
  --dark-secondary: var(--color-architectural-charcoal);
}
```

---

## 5. Visual Style Direction

Use a premium construction and real estate aesthetic inspired by:

- Global construction groups
- Luxury real estate brands
- Architectural studios
- Engineering consultancies
- High-end corporate documentaries
- Editorial architecture publications

The design must feel:

- Bold
- Structured
- Spacious
- Minimal
- High-trust
- Modern
- Cinematic
- Material-driven
- Strong but not aggressive

Avoid:

- Neon colors
- Excessive gradients
- Overuse of glassmorphism
- Too many rounded cards
- Generic startup illustrations
- Playful icons
- Constant animation
- Excessive shadows
- Bright blue SaaS styling
- Overloaded layouts
- Generic stock office teams

---

## 6. Typography

Recommended typography:

### Headings

Use one of:

- Playfair Display
- Cormorant Garamond
- Libre Baskerville
- Instrument Serif

Recommended default:

- `Playfair Display`

Use for:

- Hero headlines
- Section titles
- Project titles
- Editorial quotes
- Large metrics

### Body

Use one of:

- Inter
- DM Sans
- Manrope
- Plus Jakarta Sans

Recommended default:

- `DM Sans`

Use for:

- Body content
- Navigation
- Buttons
- Metadata
- Forms
- Project specifications

### Typography Rules

- Use large, confident headlines.
- Keep body text readable and restrained.
- Avoid overly tight line-height.
- Use uppercase sparingly for labels and eyebrow text.
- Use gold only for emphasis, not full paragraphs.
- Maintain strong contrast.
- Avoid using more than two font families.

---

## 7. Recommended Technology Stack

Build with:

- Next.js latest stable version
- TypeScript
- App Router
- Tailwind CSS
- ShadCN UI only where useful
- GSAP
- GSAP ScrollTrigger
- Lenis for smooth scrolling
- Lucide React
- React Hook Form
- Zod
- Sanity (headless CMS — content, projects, news, and site settings; matches the live project setup)
- next-sanity and @sanity/image-url for integration
- Sanity's image CDN for production images (no Cloudinary needed)
- Resend for transactional email
- Vitest for unit tests
- Playwright for end-to-end tests
- Vercel for deployment

Animation library decision: **GSAP only.** Do not install Framer Motion. All motion — scroll-driven, parallax, reveals, transitions — goes through GSAP + ScrollTrigger, with Lenis for smooth scrolling. Keep motion logic isolated in `lib/motion/`.

Do not use Prisma, PostgreSQL, or a custom database. Sanity is the content backend. Do not build a custom admin dashboard or custom authentication — Sanity Studio is the admin interface.

Do not install unnecessary dependencies.

Before adding any package, verify whether the project already has an equivalent solution.

---

## 8. Motion and Cinematic System

The website should use cinematic motion inspired by architectural films.

### Allowed Motion

- Slow pan
- Controlled zoom
- Scroll-driven parallax
- Foreground and background depth
- Mask reveals
- Clip-path reveals
- Text stagger
- Opacity fades
- Perspective movement
- Image overlap
- Crossfade transitions
- Section progress indicators
- Subtle pointer movement on desktop

### Avoid

- Bouncing
- Spinning
- Flashing
- Overshoot animation
- Constant movement
- Scroll-jacking
- Forced horizontal scrolling on mobile
- Excessive page loaders
- Large animation delays
- Unreadable transitions

### Motion Timing

- Micro-interactions: `0.2s–0.5s`
- Section transitions: `0.8s–1.5s`
- Cinematic image motion: `1.5s–3s`
- Use easing:
  - `power2.out`
  - `power3.out`
  - `expo.out`
  - Custom cubic-bezier curves

### Accessibility

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled:

- Disable parallax.
- Disable pointer-based motion.
- Disable large zoom effects.
- Disable scroll-linked transforms.
- Show content immediately.
- Keep only simple fades when appropriate.

---

# PHASE 1 — PROJECT AUDIT

## Step 1: Inspect the Existing Codebase

Before writing code:

1. Inspect the project structure.
2. Identify the Next.js version.
3. Confirm whether App Router or Pages Router is used.
4. Inspect current Tailwind configuration.
5. Identify current UI libraries.
6. Identify current animation libraries.
7. Check existing routes.
8. Check current CMS or hardcoded data.
9. Inspect image hosting.
10. Inspect forms and contact handling.
11. Inspect SEO implementation.
12. Check responsiveness.
13. Run:
   - lint
   - type-check
   - build
14. Record all existing errors.
15. Do not remove working functionality without replacing it.

Create an audit summary before implementation.

---

# PHASE 2 — PROJECT FOUNDATION

## Step 2: Create the New Architecture

Recommended folder structure:

```txt
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── group/
│   │   ├── services/
│   │   ├── projects/
│   │   ├── sustainability/
│   │   ├── news/
│   │   └── contact/
│   ├── studio/           # Embedded Sanity Studio route (/studio)
│   ├── api/
│   ├── layout.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── not-found.tsx
│   └── error.tsx
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── sections/
│   ├── motion/
│   ├── projects/
│   ├── services/
│   ├── forms/
│   └── ui/
├── sanity/
│   ├── schemas/          # project, division, service, article, siteSettings, contactSubmission
│   ├── lib/              # client, image builder, GROQ queries
│   └── sanity.config.ts
├── lib/
│   ├── validations/
│   ├── services/
│   ├── seo/
│   ├── motion/
│   └── utils/
├── types/
├── hooks/
├── constants/
└── styles/
```

---

## Step 3: Configure the Design System

Create:

- Global color tokens
- Typography tokens
- Spacing system
- Container widths
- Border styles
- Button styles
- Section styles
- Animation presets
- Focus styles
- Dark and light section variants

Suggested spacing:

```ts
export const sectionSpacing = {
  mobile: "py-16",
  tablet: "md:py-24",
  desktop: "lg:py-32",
};
```

Suggested containers:

```css
.container-wide {
  width: min(100% - 2rem, 1440px);
  margin-inline: auto;
}

.container-content {
  width: min(100% - 2rem, 1200px);
  margin-inline: auto;
}

.container-narrow {
  width: min(100% - 2rem, 820px);
  margin-inline: auto;
}
```

---

# PHASE 3 — FRONTEND BUILD

## Step 4: Build the Global Layout

Create:

- Announcement bar if required
- Main header
- Desktop navigation
- Mobile menu
- Global footer
- Page transition wrapper
- Smooth scrolling provider
- Reduced motion provider
- Cookie/analytics support only if required

### Navigation

Recommended items:

- Home
- About
- Our Group
- Projects
- Services
- Sustainability
- News
- Contact

Primary CTA:

- Start a Project
- Contact Us

Header behavior:

- Transparent over hero
- White text over dark hero
- Becomes solid or blurred after scrolling
- Smooth background transition
- Accessible keyboard navigation
- Premium full-screen mobile menu
- Clear active route state

---

## Step 5: Build the Homepage Hero

Create a cinematic layered hero.

### Hero Content

Eyebrow:

> INAYAZ GROUP

Headline:

> Engineering Landmarks.  
> Creating Lasting Value.

Supporting text:

> A diversified Ethiopian business group delivering construction, real estate, manufacturing, import, export, travel, and equipment solutions with precision, integrity, and long-term responsibility.

Primary CTA:

> Explore Our Projects

Secondary CTA:

> Discover INAYAZ

### Hero Visual Layers

1. Background construction or architectural image
2. Midground building or crane layer
3. Foreground structural detail, worker, or machinery
4. Dark navy cinematic overlay
5. Subtle grain or atmospheric texture
6. Text content
7. Scroll indicator

### Hero Animation

- Background scale from approximately `1.05` to `1.12`
- Midground vertical movement
- Foreground slightly stronger movement
- Slow text reveal
- Subtle mask reveal
- Pointer-based depth on desktop only
- Disable pointer effect on touch devices
- Reduced motion fallback

---

## Step 6: Build the Company Introduction

Section title:

> Built on Purpose. Driven by Integrity.

Body:

> Since 2015, INAYAZ has grown into a diversified Ethiopian business group built on care, technical excellence, professional responsibility, and disciplined execution.

> From complex high-rise developments to international trade and manufacturing, every INAYAZ business is guided by one shared principle: deliver lasting value while protecting the interests of clients, partners, employees, and communities.

Add:

- Editorial image reveal
- Large quote
- Small company timeline
- “About INAYAZ” CTA

---

## Step 7: Build the Business Divisions Section

Create the six core business divisions.

### Construction and Real Estate

Description:

> INAYAZ Construction and Real Estate combines technical expertise, financial reliability, and modern development thinking to deliver high-quality projects across Ethiopia. From complex high-rise construction to premium residential and commercial developments, we build structures designed for performance, comfort, and enduring investment value.

Services:

- Category 1 General Contracting, GC-1
- High-rise construction
- Residential development
- Commercial development
- Real estate development
- Project management
- Machinery and equipment rental

### Export Trade

Description:

> INAYAZ Export Trade connects high-value Ethiopian agricultural products with international markets through reliable sourcing, quality control, and market-driven trade operations.

Products:

- Coffee and tea
- Oil seeds
- Cereals and pulses
- Fruits and vegetables
- Spices

### Import

Description:

> INAYAZ Import provides contractors, manufacturers, developers, and industrial operators with reliable access to internationally sourced equipment, materials, vehicles, and technical products.

Categories:

- Vehicles
- Industrial machinery
- Construction machinery
- Electrical equipment
- Metal materials
- Non-metal scraps

Verified key figures (from company profile): 5+ import product categories · 10+ years of trade experience · 100% documentation compliance.

Import process (4 steps, verified): 01 Needs Assessment → 02 Supplier Sourcing → 03 Procurement & Order Placement → 04 Shipping & Freight Management.

Import service lines (verified copy exists in the company profile): Premium & Passenger Automobiles, Commercial & Construction Vehicles, Industrial & Bulk Materials, Heavy-Duty Construction Machinery.

Credentials: Licensed Import Trader · Multi-Sector Procurement Expertise.

### Manufacturing

Description:

> INAYAZ Manufacturing produces essential metal, clay, and ceramic products supporting Ethiopia’s construction and industrial sectors.

Products:

- Primary nonferrous metal products
- Structural clay products
- Ceramic products
- Custom manufacturing orders

### Tour Operation and Travel

Description:

> INAYAZ Tour Operation and Travel delivers curated journeys and professional travel services that showcase Ethiopia’s cultural heritage, natural landscapes, and historic destinations.

Services:

- Historical and heritage tours
- Nature and wildlife tours
- Cultural immersion experiences

Audience (verified): leisure visitors, diaspora travelers, business delegations, cultural explorers.

Travel process (4 steps, verified): 01 Booking & Reservations → 02 Pre-Departure Briefing → 03 On-Ground Support → 04 Experience Delivery.

Verified key figures: 100% client satisfaction focus · Multilingual expert guides.

Credentials: Licensed Tour Operator · Diaspora Travel Specialist.

### Machinery and Equipment Rental

Description:

> INAYAZ provides flexible machinery and equipment rental solutions that help contractors, agricultural operators, and industrial businesses execute projects efficiently without the cost of long-term ownership.

Rental categories:

- Heavy construction machinery
- Construction equipment
- Construction materials
- Agricultural machinery
- Industrial machinery

### Interaction Design

Use:

- Large editorial layout
- Image changes on hover or selection
- Gold icons
- Dark navy background
- Smooth text transitions
- No generic small-card grid for the main presentation

---

## Step 8: Build the Featured Projects Section

Create a cinematic project showcase.

### Existing Projects

All project descriptions below are VERIFIED copy from the company profile — use them as the seed `description` content in Sanity.

Construction execution scope (applies to every project page): 01 Site Preparation → 02 Structural Construction → 03 High-Rise Execution → 04 Quality Control.

#### Ameliyaz

- Client: Akoya Properties
- Contractor: INAYAZ Construction and Material Import Export
- Structure: 2B + G + M + 30 + T (33 levels)
- Consultant: KH Consulting
- Category: Category 1 General Contractor, GC-1
- Description: Landmark high-rise designed to redefine Addis Ababa's skyline — 2 basements, ground, mezzanine, 30 stories, and terrace — blending premium corporate and residential spaces with advanced structural design and world-class engineering execution.

#### Akoya Ozone Apartment Project

- Client: Akoya Properties
- Contractor: INAYAZ Construction and Material Import Export
- Structure: 2B + G + M + 16 + T (19 levels)
- Consultant: KH Consulting
- Category: Category 1 General Contractor, GC-1
- Description: Premium high-density residential development in the heart of Addis Ababa, emphasizing modern spatial efficiency, luxurious residential comfort, and robust structural durability.

#### Tes Realty Apartment

- Client: Mr. Daniel Tesfaye
- Contractor: INAYAZ Construction and Material Import Export
- Structure: 1B + G + 17 (19 levels)
- Consultant: KH Consulting
- Category: Category 1 General Contractor, GC-1
- Description: Modern high-rise residential development for Mr. Daniel Tesfaye focused on spatial efficiency, contemporary architectural aesthetics, structural longevity, and strict safety compliance.

#### Twinz Residential Building

- Client: Akoya Properties
- Contractor: INAYAZ Construction and Material Import Export
- Structure: B + G + M + 12 (15 levels)
- Consultant: KH Consulting
- Category: Category 1 General Contractor, GC-1
- Description: (Listed on the site without a case study — write a short neutral summary consistent with the others; do not invent specifics.)

#### Park View Apartment Project

- Client: Akoya Properties
- Contractor: INAYAZ Construction and Material Import Export
- Structure: SB + 1B + G + 12 (15 levels)
- Consultant: KH Consulting
- Category: Category 1 General Contractor, GC-1
- Description: Elite high-rise residential development designed to overlook the urban landscape, blending luxury high-density living with advanced structural design, exceptional spatial layout, and high-end modern amenities.

#### Novelty Apartment

- Client: Akoya Properties
- Contractor: INAYAZ Construction and Material Import Export
- Structure: 3B + G + 18 (22 levels)
- Consultant: KH Consulting
- Category: Category 1 General Contractor, GC-1
- Description: Architectural landmark of premier high-rise residential luxury — a symbol of contemporary urban living and sophisticated structural engineering with exceptional spatial planning and maximum structural durability.

#### Gold Souq

- Client: Akoya Properties
- Contractor: INAYAZ Construction and Material Import Export (confirmed by INAYAZ)
- Type: Commercial — 14 levels of retail spaces
- Location: 4 Kilo district, Addis Ababa (verified from Akoya's site)
- Status: New launch
- Consultant: NOT confirmed — do not assume KH Consulting; mark as pending until INAYAZ confirms
- Structure notation (e.g., xB + G + n): NOT confirmed — request from INAYAZ; use "14 levels" until then
- Description (from Akoya, adapt for INAYAZ's contractor perspective): a landmark of luxury, prestige, and promise in the heart of Addis Ababa's 4 Kilo district — 14 levels of vibrant retail spaces designed for visibility, value, and success. On the INAYAZ site, present it from the construction standpoint (structural execution, commercial fit-out scale) rather than Akoya's investor-sales angle ("guaranteed returns" language stays on Akoya's site only).

### Project Experience

Use:

- Full-width visuals
- Large project titles
- Project metadata
- Scroll-based image scale
- Masked reveal
- Category labels
- View Project CTA
- Alternate dark and light compositions
- Secondary project grid for remaining items

---

## Step 9: Build the Construction Process Section

Stages:

1. Vision
2. Planning
3. Engineering
4. Construction
5. Quality Control
6. Delivery

Interaction:

- Active stage changes on scroll
- Visual changes through crossfade or masks
- Text fades between stages
- Progress line shows active stage
- No scroll-jacking
- Mobile version becomes a vertical timeline

---

## Step 10: Build the Metrics Section

Possible metrics:

- Years of Experience
- Completed Projects
- Active Developments
- Skilled Professionals
- Cities Served
- Total Built Area

Do not invent final numbers. The only verified figures are division-level (Import: 5+ categories, 10+ years trade experience, 100% documentation compliance; since 2015 → 11 years operating). Company-wide totals (completed projects, professionals, built area) are NOT yet confirmed — use clearly marked placeholders and request real numbers from INAYAZ.

Animation:

- Count once when entering viewport
- Do not repeat counters
- Respect reduced motion
- Use gold numbers on navy or charcoal background

---

## Step 11: Build Why Choose INAYAZ

The first three strengths below are VERIFIED from the live site ("Classic, clear, corporate-safe"). The last three are suggested additions — keep them, but they may be edited by INAYAZ.

### Trusted Expertise (verified)

As a Category 1 General Contractor, INAYAZ brings proven technical knowledge, professional leadership, and construction capability to every project.

### Built on Responsibility (verified)

Every project is approached with care, discipline, accountability, safety, and close attention to detail.

### Reliable Delivery (verified)

From planning to completion, INAYAZ prioritizes clear execution, efficient project management, quality control, and long-term value.

### Integrated Capabilities (suggested)

Construction, real estate, import, manufacturing, trade, and equipment operations work together under one group.

### Financial Reliability (suggested)

Disciplined operations and trusted institutional relationships support the successful delivery of demanding projects.

### Local Expertise, Global Standards (suggested)

INAYAZ combines an understanding of Ethiopia’s market with international standards of quality, engineering, and professionalism.

---

## Step 12: Build Mission, Vision, and Values

### Mission

> To deliver high-quality construction, real estate, manufacturing, import, and export services that meet international standards while contributing to economic growth. Through skilled professionals, modern technology, and efficient project management, we create long-term value for our clients, partners, employees, and stakeholders while maintaining the highest standards of integrity, safety, and environmental responsibility.

### Vision

> To become a leading and trusted construction and diversified business group in Ethiopia and the region, recognized for excellence, innovation, integrity, and sustainable development.

### Core Values

- Integrity
- Quality Excellence
- Innovation
- Professionalism
- Safety First

Present values as large editorial panels, not generic icon cards.

---

## Step 13: Build the Recognition and Trust Section

Verified recognitions (from company profile):

- **"A Proven Partner" — Commercial Bank of Ethiopia (CBE):** formally recognizes INAYAZ for its exemplary record of financial responsibility, integrity, and disciplined business operations. Presented as a series of downloadable certificates on the live site.
- **"Recommended By" — COOP:** formally recognizes INAYAZ for its exemplary record of financial responsibility, integrity, and disciplined business operations.

Still needed before launch:

- High-resolution certificate scans
- Certificate dates
- Logo usage permission from CBE and COOP

Do not publish unverified claims beyond the two above.

Use:

- Partner logos
- Client logos
- Consultant logos
- Awards
- Certifications
- Safety credentials
- GC-1 certification

---

## Step 14: Build the Sustainability Section

Include:

- Environmental responsibility
- Sustainable materials
- Energy-efficient construction
- Worker safety
- Community impact
- Long-term asset value
- Responsible sourcing

Use:

- Warm stone backgrounds
- Natural material textures
- Large editorial images
- Clean data points
- Restrained motion

---

## Step 15: Build the Contact Section

Official contact details:

### Address (verified)

ZULYEKA Building  
6th Floor, Office 603  
Addis Ababa, Ethiopia

Spelling confirmed as "ZULYEKA" per the company profile.

### Email

info@inayazgroup.com

### Telephone

+251 973 223 312  
+251 968 666 664

### Contact Form Fields

- Full name
- Company name
- Email
- Phone
- Service interest
- Project type
- Estimated budget
- Project location
- Message
- Consent checkbox

Validation:

- React Hook Form
- Zod
- Server-side validation
- Spam protection
- Rate limiting
- Clear success and error states

---

# PHASE 4 — INNER PAGES

## Step 16: About Page

Include:

- Brand story
- Meaning of INAYAZ
- Company history
- Mission
- Vision
- Values
- Leadership
- Timeline
- Certifications
- Why choose INAYAZ
- CTA

---

## Step 17: Our Group Page

### Our Networks / Sub-Brands (verified)

The live site presents a sub-brand family under "Local Expertise. Global Reach." and "Stronger Together: Connecting Industry Leaders":

- INAYAZ Construction
- INAYAZ Export
- INAYAZ Motors

### Sister Company: Akoya Properties (verified)

**Akoya Properties (https://akoyarealproperty.com/) is a sister company of INAYAZ.** This is publicly confirmed on Akoya's own website, which describes "our sister company, Inayaz Construction" and displays the INAYAZ logo in its partners section. Akoya is the client/developer on five of the six showcased projects; INAYAZ is the contractor.

How to present it:

- Add Akoya Properties to the Group/Network section as a sister company (with its gold logo and a link to akoyarealproperty.com).
- On project pages where the client is Akoya, note the sister-company relationship — it signals an integrated developer + GC-1 contractor model ("full control over construction… delivers projects on schedule" is how Akoya frames it).
- Frame it as a strength: in-house development + construction under one group family.

Useful verified data from Akoya's site (enriches INAYAZ project pages):

- AMELIYAZ: located in **Sarbet**, Addis Ababa — near the Canadian Embassy and the African Union; residential towers rising up to 28 floors plus a commercial zone; status: new launch.
- Gold Souq (DECIDED): INAYAZ IS the contractor on Gold Souq — include it in the INAYAZ portfolio as the seventh project (developer/client: Akoya Properties). See the Featured Projects section for its data.
- Status hints from Akoya: Akoya Ozone, Twinz, Park View = under construction; Ameliyaz, Novelty = new launch. Verify current statuses with INAYAZ at content entry.
- Akoya: 16 years experience; Architectural Excellence Winner, Ethio Real Estate Award 2025; first real-estate ShebaMiles Platinum Partner of Ethiopian Airlines.

**Official project naming standard (DECIDED — use these exact forms site-wide):**

| Official name | Old INAYAZ site variant (do not use) |
| --- | --- |
| Ameliyaz | AMELIYAZ |
| Akoya Ozone | AKOYA OZON |
| Tes Realty | TES REALTY |
| Twinz | TWINZ / TwIInz |
| Park View | PARKVIEW |
| Novelty | NOVELITY |
| Gold Souq | — (new addition, not on old site) |

Use these title-case forms in all page titles, navigation, slugs (ameliyaz, akoya-ozone, tes-realty, twinz, park-view, novelty, gold-souq), metadata, and Sanity documents. Display in uppercase only where the design system uppercases labels via CSS — the stored data stays title case.

Include a Networks/Sub-Brands section on the Group page (and optionally the homepage) presenting the three sub-brands plus Akoya Properties. Request logos from INAYAZ; use text-based treatments as placeholders.

Create one section or page per division:

- Construction and Real Estate
- Export Trade
- Import
- Manufacturing
- Tour Operation and Travel
- Machinery and Equipment Rental

Each division page should include:

- Hero
- Overview
- Services
- Capabilities
- Relevant images
- Related projects
- Contact CTA

---

## Step 18: Projects Listing Page

Filters:

- Category
- Status
- Location
- Year

Sorting:

- Featured
- Newest
- Completed
- Ongoing

Project cards should include:

- Title
- Main image
- Category
- Location
- Status
- Short summary
- CTA

---

## Step 19: Project Detail Page

Each project page should include:

- Hero image
- Project title
- Client
- Contractor
- Consultant
- Structure
- Location
- Status
- Completion year
- Built area
- Units
- Scope
- Services delivered
- Project description
- Challenges
- Solutions
- Gallery
- Timeline
- Related projects
- Contact CTA

Recommended project type:

```ts
export type Project = {
  id: string;
  title: string;
  slug: string;
  client: string;
  contractor: string;
  consultant: string;
  structureType: string;
  category: string;
  location?: string;
  status?: "Completed" | "Ongoing" | "Upcoming";
  startYear?: number;
  completionYear?: number;
  description: string;
  shortDescription?: string;
  heroImage: string;
  gallery: string[];
  services: string[];
  builtArea?: string;
  units?: number;
  featured: boolean;
  _createdAt: string;
  _updatedAt: string;
};

// Note: draft/published state is handled by Sanity's draft system,
// not a boolean field. Generate types from the Sanity schema
// (sanity typegen) rather than maintaining this by hand.
```

---

## Step 20: Services Page

Include:

- General Construction
- Design and Build
- Real Estate Development
- Infrastructure Development
- Project Management
- Engineering Consultancy
- Interior Fit-Out
- Facility Management
- Machinery Rental
- Import and Supply

Use an architectural layout with service-controlled imagery.

---

## Step 21: News and Insights

Create:

- News listing
- Article detail page
- Categories
- Featured article
- Related articles
- Share controls
- SEO metadata
- Structured data

Seed article (verified, exists on the live site): **"Building Ethiopia's Future Through Responsible Construction"** — by INAYAZ, published June 6, 2026. Opening: construction is more than building structures — it's about creating lasting value through care, quality, and responsibility. Key section: "A Responsibility, Not Just a Project." Extract the full text from the live site and enter it as the first article in Sanity. Note: it appears twice on the old News page — enter it only ONCE.

Share controls on articles: LinkedIn, Facebook, Telegram.

Potential future topics:

- Project milestones
- Construction progress
- Company announcements
- Sustainability
- Engineering insights
- Ethiopian construction market
- Awards and recognition

---

# PHASE 5 — SANITY CMS

## Step 22: Configure Sanity

Sanity is the content backend, matching the live project setup. No custom database, no Prisma, no PostgreSQL.

This is a fresh build. The live site was built by a previous developer and we have NO access to their Sanity account, project ID, dataset, or any credentials. Do not attempt to connect to or reuse the old Sanity project.

Setup:

1. Create a brand new Sanity project under the client's own account (`npm create sanity@latest` or the Sanity dashboard).
2. Embed Sanity Studio at `/studio` using `next-sanity`.
3. Use a dedicated dataset for production (`production`) and optionally `staging` for content review.
4. Configure CORS origins in Sanity for local and production URLs.

Create environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
NEXT_PUBLIC_SITE_URL=
RESEND_API_KEY=
CONTACT_EMAIL=
ADMIN_EMAIL=
```

Never commit secrets. The write token is server-only — never expose it to the client.

### Seed Content

After schemas exist, seed the new Sanity dataset from `docs/INAYAZ_Company_Profile.docx` (the authoritative content compilation): the six divisions with their verified descriptions/processes/credentials, the seven projects (six with verified case-study descriptions from the profile, plus Gold Souq per the Featured Projects section), mission/vision/values, the two recognitions, the three sub-brands, the seed news article, and contact info. Use a seed script or manual Studio entry. Mark anything unverifiable as a clearly labeled placeholder — do not invent data.

---

## Step 23: Create Sanity Schemas

Recommended document schemas (in `sanity/schemas/`):

### project

- title (string, required)
- slug (slug, required, unique)
- client (string)
- contractor (string)
- consultant (string)
- structureType (string)
- category (string, required)
- location (string)
- status (string list: Completed | Ongoing | Upcoming)
- startYear (number)
- completionYear (number)
- shortDescription (text)
- description (portable text)
- heroImage (image with alt text, required)
- gallery (array of images with alt text)
- services (array of strings)
- builtArea (string)
- units (number)
- featured (boolean, default false)
- orderRank (for manual ordering)

### division

- title, slug, description (portable text), image, services (array of strings), featured

### service

- title, slug, description, image, icon, featured

### article

- title, slug, excerpt, content (portable text), coverImage, category, publishedAt

### siteSettings (singleton)

- contact information
- phone numbers
- email
- address
- social links
- homepage metrics (with a `confirmed` boolean per metric — unconfirmed metrics render as clearly marked placeholders)
- footer content
- featured projects (references)

### contactSubmission

- fullName, companyName, email, phone, serviceInterest, projectType, estimatedBudget, projectLocation, message
- status (string list: New | Contacted | Qualified | Closed | Spam, default New)
- submittedAt (datetime)

Schema rules:

- Require alt text on all images.
- Use slug validation and uniqueness.
- Use Sanity's built-in draft/publish workflow instead of a `published` boolean.
- Add preview configuration so editors see meaningful titles in the Studio.

---

## Step 24: Create the Data Layer

Create in `sanity/lib/`:

- Sanity client (separate read client with CDN enabled and server client with token for drafts/writes)
- Typed GROQ queries per content type
- Image URL builder helper with hotspot support

Implement:

- Published-only public queries (exclude drafts)
- Slug lookups
- Featured records
- Pagination for project and article listings
- Filtering by category, status, location, and year
- Error handling and empty states
- ISR or tag-based revalidation, with a Sanity webhook hitting a revalidation route on publish

Do not query Sanity directly from client components — fetch in server components or route handlers.

---

## Step 25: API Routes and Server Actions

### Public

- Read projects, project by slug, divisions, services, news — via GROQ in server components
- Submit contact form — server action or route handler that:
  1. Validates with Zod
  2. Checks rate limit
  3. Sanitizes input
  4. Creates a `contactSubmission` document in Sanity (server-side write token)
  5. Sends notification and confirmation emails via Resend

### Content management

All create/edit/publish operations happen in Sanity Studio — do not build custom CRUD APIs for content.

Use:

- Zod validation on all form input
- Rate limiting on the contact endpoint
- Sanitization
- Structured error responses
- Revalidation webhook secured with a shared secret

---

# PHASE 6 — SANITY STUDIO (ADMIN)

## Step 26: Configure Sanity Studio

Sanity Studio replaces any custom admin dashboard and custom authentication. Do not build NextAuth/Clerk auth or `/admin` routes.

Requirements:

- Embed the Studio at `/studio` with `next-sanity`.
- Restrict Studio access through Sanity project members and roles (invite INAYAZ staff as editors; keep admin rights limited).
- Organize the Studio structure (desk structure) into clear groups:
  - Projects
  - Divisions
  - Services
  - News
  - Leads (contact submissions, read-only fields except status)
  - Site Settings (singleton)
- Configure document previews so editors can preview draft content on the live site (draft mode).
- Enable the built-in draft → publish workflow; editors publish content themselves.

Lead management in Studio:

- View submissions sorted by newest
- Change lead status (New / Contacted / Qualified / Closed / Spam)
- Filter by status

---

# PHASE 7 — IMAGE SYSTEM

## Step 28: Configure Image Management

Use Sanity's built-in image pipeline for production. All content images are uploaded through Sanity Studio and served from Sanity's image CDN.

Implementation:

- Use `@sanity/image-url` to build URLs with width, format, and quality parameters.
- Enable hotspot and crop on all image fields.
- Require alt text on every image field in the schema.
- Use Sanity's LQIP/blurhash metadata for blur placeholders with `next/image`.
- Add the Sanity CDN domain to `next.config` image remote patterns.

Image categories:

- Hero
- Projects
- Divisions
- Leadership
- Certificates
- News
- Equipment
- Manufacturing
- Travel
- Export products

Do not use random remote images in production.

---

## Step 29: Image Sourcing Strategy

Primary source: the live site at https://inayaz-website.vercel.app/ contains the company's existing images (project photos, division imagery, logo).

During the audit phase:

1. Crawl every public page of the live site (home, about, group, projects, services, contact).
2. Collect all image URLs. For Next.js-optimized images (`/_next/image?url=...`), decode the `url=` parameter and download the ORIGINAL source file, not the compressed WebP output.
3. Save downloaded images into a local `assets-from-live-site/` folder with descriptive names (e.g., `project-ameliyaz-hero.jpg`, `division-export-coffee.jpg`).
4. Create an inventory: image, source page, what it depicts, resolution.
5. Upload usable images into Sanity with alt text; assign them to the matching project/division documents.

Rules:

- Company-owned images (project photos, logo, certificates) are safe to reuse.
- Images on the old site that appear to be third-party stock must NOT be copied — the previous developer's stock license does not transfer. Source fresh ones instead (see placeholder system below).
- Never claim a placeholder or stock image is an INAYAZ project photo.

### Placeholder Image System

Where no real INAYAZ image exists, stock placeholders ARE allowed so the build is never blocked. Rules:

1. Only use free-license stock (Unsplash or Pexels — no attribution or purchase required). Never hotlink; download the files.
2. Store every placeholder in the repo at `public/images/`, organized by section, so each file is easy to find and replace later:

```txt
public/images/
├── hero/
├── projects/
│   ├── ameliyaz/
│   ├── akoya-ozone/
│   ├── tes-realty/
│   ├── twinz/
│   ├── park-view/
│   ├── novelty/
│   └── gold-souq/
├── divisions/
│   ├── construction/
│   ├── export/
│   ├── import/
│   ├── manufacturing/
│   ├── travel/
│   └── rental/
├── about/
├── sustainability/
└── brand/            # logo variants, certificates (real assets only)
```

3. Prefix placeholder filenames with `placeholder-` (e.g., `placeholder-ameliyaz-hero.jpg`). Real images downloaded from the live site keep normal names. This makes finding what needs replacement a one-line search.
4. Maintain `public/images/PLACEHOLDERS.md` — an inventory table listing every placeholder file, where it is used on the site, what real image should replace it, and the stock source URL.
5. Choose stock that matches the image style rules (dark architectural lighting, real construction activity, Ethiopian context where possible). Never use images of recognizable non-INAYAZ buildings presented as INAYAZ projects — prefer construction detail shots, cranes, materials, and abstract architectural imagery for project placeholders.
6. Replacement workflow: when a real image arrives, drop it in the same folder, update the reference (or re-upload to Sanity), and delete the placeholder + its PLACEHOLDERS.md row.
7. During development, images can be referenced from `public/images/`. Before launch, final confirmed images move into Sanity so editors manage them in the Studio; the folder remains the staging area for swaps.

## Step 29b: Required Image Assets

### Company Assets

- Main INAYAZ logo in SVG
- White logo
- Gold logo
- Dark logo
- Favicon
- Brand guide
- GC-1 certificate
- Recognition certificates

### Hero Assets

- Premium completed building
- Construction-site aerial
- Engineer or worker foreground
- Crane or structure
- Optional cinematic video

### Project Assets

For each project:

- Exterior render
- Construction progress
- Completed exterior
- Interior or lobby
- Aerial
- Night image
- Site team
- Architectural drawings

### Leadership Assets

- CEO portrait
- Executive team
- Project directors
- Engineers
- Site managers
- Group photo

### Division Assets

- Coffee and agricultural exports
- Import machinery
- Manufacturing facility
- Ethiopian travel locations
- Rental equipment
- Warehouses

### Trust Assets

- Client logos
- Partner logos
- Consultant logos
- Certificates
- Awards
- Safety credentials

---

## Step 30: Image Style Rules

Use images with:

- Dark architectural lighting
- Strong geometry
- Steel, glass, stone, and concrete
- Golden-hour highlights
- Deep navy shadows
- Real construction activity
- Ethiopian locations where possible
- Professional workwear
- Large-scale engineering views

Avoid:

- Low-resolution WhatsApp photos
- Oversaturated or obviously generic stock images (choose stock that fits the style rules)
- Fake AI machinery
- Foreign skylines presented as Ethiopia
- Inconsistent HDR editing
- Unverified project renders
- Generic office teams

---

# PHASE 8 — CONTACT, EMAIL, AND LEAD FLOW

## Step 31: Contact Form Backend

On submission:

1. Validate with Zod.
2. Check rate limit.
3. Sanitize input.
4. Save as a contactSubmission document in Sanity (server-side write token).
5. Send confirmation email to user.
6. Send notification email to INAYAZ.
7. Return clear success response.
8. Log failures safely.
9. Never expose server secrets.

Use Resend.

Email templates:

- New lead notification
- User confirmation
- Internal project inquiry
- Optional follow-up notification

---

# PHASE 9 — SEO

## Step 32: Implement Technical SEO

Add:

- Metadata API
- Canonical URLs
- Open Graph
- Twitter cards
- Sitemap
- Robots file
- Structured data
- Breadcrumbs
- Organization schema
- Local business schema
- Article schema
- Project schema where appropriate
- Dynamic metadata per project
- Dynamic metadata per article

Recommended organization data:

- INAYAZ Group
- Addis Ababa, Ethiopia
- Official phone numbers
- Official email
- Official address
- Business divisions

Do not publish unverified claims.

---

# PHASE 10 — PERFORMANCE

## Step 33: Optimize Performance

Requirements:

- Use Next.js Image
- Prefer AVIF and WebP
- Lazy-load below-fold media
- Preload only critical hero media
- Use responsive image sizes
- Avoid oversized images
- Dynamically import heavy animation code
- Disable expensive motion on mobile
- Clean up GSAP timelines
- Prevent layout shifts
- Avoid hydration errors
- Avoid horizontal overflow
- Minimize client components
- Use server components by default
- Cache public data appropriately

Targets:

- Strong Lighthouse performance
- Smooth 60fps motion on capable devices
- Fast initial load
- Stable layout
- Good mobile performance
- No console errors

---

# PHASE 11 — RESPONSIVE DESIGN

## Step 34: Mobile Rules

Do not shrink desktop layouts directly.

For mobile:

- Reduce visual layers
- Disable pointer parallax
- Reduce animation distance
- Use shorter transitions
- Avoid sticky scroll traps
- Use vertical project layouts
- Maintain large tap targets
- Use responsive typography
- Preserve strong hierarchy
- Keep forms simple
- Test Android devices carefully

Breakpoints should be tested at:

- 360px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px

---

# PHASE 12 — ACCESSIBILITY

## Step 35: Accessibility Requirements

Implement:

- Semantic HTML
- Correct heading hierarchy
- Keyboard navigation
- Skip-to-content link
- Visible focus states
- Accessible mobile menu
- Form labels
- Error messages
- Descriptive alt text
- Sufficient contrast
- Reduced motion
- Accessible dialogs
- Accessible tabs
- No text embedded in essential images

Target WCAG AA.

---

# PHASE 13 — SECURITY

## Step 36: Security Requirements

Implement:

- Server-side authorization
- Zod validation
- Rate limiting
- Sanitization
- Environment variable protection
- Secure headers
- CSRF protection where required
- Safe image upload validation
- File size restrictions
- MIME type validation
- No secret exposure
- No raw Sanity/API errors exposed to the client
- Studio access restricted to invited Sanity project members
- Revalidation webhook protected with a shared secret

---

# PHASE 14 — TESTING

## Step 37: Testing Strategy

Testing tools:

- **Vitest** for unit tests: Zod validation schemas, utility functions, GROQ query helpers, motion utilities.
- **Playwright** for end-to-end tests in a real browser: navigation, mobile menu, contact form submission (success and validation errors), project filtering, project detail rendering, reduced-motion fallback (`prefers-reduced-motion` emulation), Studio route loads.

Add tests for:

- Navigation and mobile menu (Playwright)
- Contact form: validation, rate limiting, success and error states (Playwright + Vitest for the Zod schema)
- Project filtering and sorting (Playwright)
- Project detail rendering from Sanity data (Playwright)
- Reduced motion fallback (Playwright with reduced-motion emulation)
- Contact submission server action logic (Vitest)
- GROQ query helpers and data mappers (Vitest)

Run:

```bash
npm run lint
npm run type-check
npm run test        # Vitest
npm run test:e2e    # Playwright
npm run build
```

Fix all errors before completion.

---

# PHASE 15 — DEPLOYMENT

## Step 38: Deployment Checklist

Before deploying:

- Confirm the new Sanity project ID and production dataset
- Configure Sanity CORS origins for the production domain
- Set up the Sanity revalidation webhook
- Invite INAYAZ editors to the Sanity project with correct roles
- Configure Resend
- Configure environment variables
- Verify domain
- Configure analytics only if approved
- Verify sitemap
- Verify robots
- Verify Open Graph
- Verify contact email
- Verify all phone links
- Verify all project links
- Test mobile
- Test reduced motion
- Test forms
- Test Studio access at /studio
- Run production build

Deploy to Vercel.

---

# PHASE 16 — FINAL CONTENT CHECK

## Step 39: Verify Company Information

Already confirmed via the company profile (docs/INAYAZ_Company_Profile.docx):

- Operating name: INAYAZ Construction and Material Import Export
- Operating since 2015
- GC-1 contractor grade
- Address: ZULYEKA Building, 6th Floor, Office 603, Addis Ababa
- Phone: +251 973 223 312 · +251 968 666 664
- Email: info@inayazgroup.com
- Project structures, levels, clients, consultant (KH Consulting)
- Certificate titles (CBE "A Proven Partner", COOP "Recommended By")

Additionally confirmed:

- Akoya Properties is a sister company (stated on Akoya's own website)
- AMELIYAZ location: Sarbet, Addis Ababa

Additionally decided:

- Official project names: Ameliyaz, Akoya Ozone, Tes Realty, Twinz, Park View, Novelty (title case, site-wide)
- Gold Souq: INAYAZ is the contractor — included as the seventh portfolio project

Still confirm before production launch:

- Official registered legal name (vs. operating name)
- GC-1 registration number/details
- Gold Souq: consultant name and full structure notation
- Project locations
- Project statuses
- Project completion years
- Built areas
- Unit counts
- Client permissions
- Consultant permissions
- Logo usage permissions
- Recognition certificate details
- Partner logo permissions
- Leadership names and titles

Do not invent missing company data.

Use placeholders clearly marked as pending confirmation.

---

# PHASE 17 — FINAL QUALITY GATE

## Step 40: Final Verification

Before declaring the project complete, confirm:

- Premium visual quality
- Consistent brand palette
- Cinematic but restrained animation
- Readable typography
- Strong mobile experience
- No layout shift
- No broken links
- No blurry images
- No hydration errors
- No console warnings
- No TypeScript errors
- No lint errors
- Production build passes
- Contact form works
- Emails send
- Database writes work
- Studio access limited to project members
- Content publishes and revalidates correctly
- Reduced motion works
- SEO metadata is complete
- Accessibility checks pass

---

# Required Reusable Components

Create reusable components such as:

- `CinematicHero`
- `LayeredParallaxScene`
- `MaskRevealImage`
- `SectionHeadingReveal`
- `ProjectShowcase`
- `ProjectStoryPanel`
- `ScrollProgressLine`
- `AnimatedMetric`
- `ServiceImageSwitcher`
- `MotionSection`
- `ReducedMotionProvider`
- `PremiumHeader`
- `MobileNavigation`
- `ProjectCard`
- `ProjectFilters`
- `ProjectGallery`
- `DivisionPanel`
- `ContactForm`
- `RecognitionGrid`
- `Footer`

---

# Coding Standards

- Use TypeScript strict mode.
- Avoid `any`.
- Use server components by default.
- Use client components only where interaction requires them.
- Keep components small and composable.
- Use clear naming.
- Add comments only where logic is non-obvious.
- Do not duplicate styles.
- Do not hardcode repeated content inside components.
- Use typed data.
- Validate all external input.
- Handle loading, empty, and error states.
- Keep motion logic isolated.
- Clean up event listeners and GSAP instances.
- Use accessible primitives.
- Preserve performance.

---

# Claude Execution Instructions

When implementing this project:

1. Audit first.
2. Write a concise implementation plan.
3. Work phase by phase.
4. Complete frontend foundation before backend.
5. Do not skip mobile.
6. Do not skip accessibility.
7. Do not skip backend validation.
8. Do not use fake project data without marking it.
9. Do not stop at mockups.
10. Connect the UI to real data.
11. Run lint, type-check, tests, and build.
12. Fix all errors.
13. Summarize every modified file.
14. List all installed packages.
15. List all required environment variables.
16. List all content and images still needed from INAYAZ.
17. Keep the existing website functional during migration.
18. Avoid destructive changes unless necessary.
19. Change Sanity schemas carefully — schema changes affect existing documents; migrate content with Sanity migration scripts when field names change.
20. Never expose credentials.

---

# Final Response Format for Claude

After each major phase, provide:

1. What was completed
2. Files created
3. Files modified
4. Packages installed
5. Commands run
6. Errors fixed
7. Remaining work
8. Assets needed
9. Risks or assumptions
10. Next recommended phase

Do not claim completion unless the production build passes.
