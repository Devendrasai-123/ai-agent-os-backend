## UI Reference Analysis - 9542ddcc8d14fb92148084b5dcbfe894_3.jpg

I'll analyze this VertexGuard security dashboard UI in detail, breaking down every aspect for design and development reference.

---

## OVERVIEW

This is a **dark-themed cybersecurity dashboard** with a left sidebar navigation and a main content area featuring data visualization cards, charts, and data tables. The design follows a modern SaaS dashboard pattern with a sophisticated color palette emphasizing purple/blue accents against deep navy backgrounds.

---

## LAYOUT STRUCTURE

### Overall Grid
- **Two-column layout**: Fixed sidebar (~220px) + fluid main content area
- **Main content**: Header bar + scrollable dashboard grid
- **Dashboard grid**: Multi-row card-based layout with varying column spans

### Content Zones
| Zone | Position | Description |
|------|----------|-------------|
| Sidebar | Left, fixed | Navigation + branding |
| Header | Top of main content | Search + user greeting + notifications |
| KPI Cards Row | Below header | 5 metric cards |
| Middle Section | Center-left | Threat Summary chart (larger) |
| Right Column | Fixed right panel | Risk Score + Threats by Virus + Threat by Device |
| Bottom Section | Full width below chart | Threat Details table |

---

## COLOR PALETTE

### Background Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Page background | Deep navy/black | `#0B0F19` or `#0D1117` |
| Sidebar background | Slightly lighter navy | `#111827` or `#1F2937` |
| Card backgrounds | Dark navy with subtle elevation | `#161B2E` or `#1E293B` |
| Table row hover | Slightly lighter | `#1E293B` |

### Accent Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Primary accent (active nav, highlights) | Purple/violet | `#8B5CF6` or `#A855F7` |
| Secondary accent (charts, icons) | Cyan/blue | `#06B6D4` or `#3B82F6` |
| Success/positive | Green | `#10B981` |
| Warning | Orange/amber | `#F59E0B` |
| Danger/critical | Red/pink | `#EF4444` or `#F43F5E` |

### Text Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Primary headings | White | `#FFFFFF` |
| Secondary text | Gray-300 | `#D1D5DB` |
| Muted text | Gray-400 | `#9CA3AF` |
| Subtle labels | Gray-500 | `#6B7280` |

### Chart Colors (Threat Summary)
- Purple gradient fill (area under line)
- Purple line stroke
- Pink/purple data point highlight

---

## TYPOGRAPHY

| Element | Font Style | Size Estimate | Weight |
|---------|-----------|-------------|--------|
| Logo "VertexGuard" | Sans-serif | 20px | 700 (Bold) |
| "Vertex" in white, "Guard" in purple | — | — | — |
| Section headings (Current Risk, Threat Summary) | Sans-serif | 18px | 600 |
| Card titles | Sans-serif | 14px | 500 |
| KPI numbers | Sans-serif | 28-32px | 700 |
| KPI labels | Sans-serif | 12px | 400 |
| Body text | Sans-serif | 14px | 400 |
| Table text | Sans-serif | 13px | 400 |
| Sidebar nav items | Sans-serif | 14px | 500 |

**Font Family**: Likely Inter, SF Pro, or similar modern geometric sans-serif

---

## SPACING SYSTEM

| Element | Value |
|---------|-------|
| Sidebar padding | 16-20px |
| Card padding | 20-24px |
| Card border-radius | 12-16px |
| Gap between cards | 16-20px |
| Header height | ~64px |
| Section vertical spacing | 24px |
| Inner card element spacing | 12-16px |

---

## SIDEBAR (LEFT NAVIGATION)

### Structure
- **Width**: ~220px, fixed
- **Background**: Dark navy with subtle distinction from main content
- **Sections**: Logo → General (collapsible) → Reports → Settings → Promo CTA → Log Out

### Navigation Items
| Item | Icon | State | Badge/Extra |
|------|------|-------|-------------|
| Overview | Layout/dashboard icon | **Active** (purple background, white text) | — |
| Issues | Alert/circle icon | Default | Right chevron `>` |
| Files | Folder icon | Default | — |
| Threat Details | Shield/search icon | Default | — |
| Threats | Bug/virus icon | Default | Right chevron `>` |
| Help & Supports | Lifebuoy icon | Default | — |
| Settings | Gear icon | Default | — |
| Log Out | Arrow-left/exit icon | Default | — |

### Promo Card (Bottom of Sidebar)
- **Background**: Gradient purple/pink
- **Content**: Robot illustration + "Add new layer to enhance your security" + "Upgrade →" link
- **Purpose**: Upgrade CTA to premium

---

## HEADER

### Elements (Left to Right)
| Element | Description |
|---------|-------------|
| User avatar | Circular, small (~32px), with green online indicator |
| Greeting text | "Welcome! Kathryn Murphy" (bold) + "Security is a process, not a product." (muted, italic) |
| Search bar | Centered, rounded, dark background, placeholder "Search Here" |
| Messages icon | Chat bubble with notification dot |
| Notifications bell | Bell icon with notification dot |

### Header Height
- ~64px with vertical centering

---

## KPI CARDS ROW ("Current Risk")

### Card Structure (×5)
Each card: Icon circle → Percentage → Label → Three-dot menu

| Card | Icon | Color | Value | Label |
|------|------|-------|-------|-------|
| 1 | Lock/shield | Pink/rose | 132% | Total Threats |
| 2 | Video/camera | Purple | 16% | Video File Risk |
| 3 | Image/photo | Pink | 43% | Image File Risk |
| 4 | Cloud upload | Blue | 7% | Docs File Risk |
| 5 | Folder | Cyan/blue | 66% | Folder File Risk |

### Card Design
- **Background**: Dark card with subtle border
- **Icon container**: 48px circle with colored background (low opacity)
- **Percentage**: Large bold number
- **Label**: Small muted text below
- **Menu**: Three vertical dots, top-right

### Time Filter
- "Daily" dropdown with chevron, positioned right of section title

---

## THREAT SUMMARY CHART

### Chart Type
- **Area chart** with gradient fill below line
- **Line chart** overlay with data points

### Features
- **Y-axis**: Percentage (0% to 500%)
- **X-axis**: Months (Jan–Dec)
- **Active tooltip**: "June 2024, Threats: 29" with purple background
- **Data point**: Highlighted circle on June
- **Time filter**: "Yearly" dropdown

### Visual Style
- Smooth curved line (cardinal spline)
- Gradient fill: Purple to transparent
- Grid lines: Subtle horizontal dashed lines

---

## RIGHT PANEL (3 STACKED CARDS)

### Card 1:

## UI Reference Analysis - 9542ddcc8d14fb92148084b5dcbfe894_4.jpg

I'll analyze this VertexGuard security dashboard UI in detail, breaking down every aspect for design and development reference.

---

## OVERVIEW

This is a **dark-themed cybersecurity dashboard** with a left sidebar navigation and a main content area featuring data visualization cards, charts, and data tables. The design follows a modern SaaS dashboard pattern with a sophisticated color palette emphasizing purple/blue accents against deep navy backgrounds.

---

## LAYOUT STRUCTURE

### Overall Grid
- **Two-column layout**: Fixed sidebar (~220px) + fluid main content area
- **Main content**: Header bar + scrollable dashboard grid
- **Dashboard grid**: Multi-row card-based layout with varying column spans

### Content Zones
| Zone | Position | Description |
|------|----------|-------------|
| Sidebar | Left, fixed | Navigation + branding |
| Header | Top of main content | Search + user greeting + notifications |
| KPI Cards Row | Below header | 5 metric cards |
| Middle Section | Center-left | Threat Summary chart (larger) |
| Right Column | Fixed right panel | Risk Score + Threats by Virus + Threat by Device |
| Bottom Section | Full width below chart | Threat Details table |

---

## COLOR PALETTE

### Background Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Page background | Deep navy/black | `#0B0F19` or `#0D1117` |
| Sidebar background | Slightly lighter navy | `#111827` or `#1F2937` |
| Card backgrounds | Dark navy with subtle elevation | `#161B2E` or `#1E293B` |
| Table row hover | Slightly lighter | `#1E293B` |

### Accent Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Primary accent (active nav, highlights) | Purple/violet | `#8B5CF6` or `#A855F7` |
| Secondary accent (charts, icons) | Cyan/blue | `#06B6D4` or `#3B82F6` |
| Success/positive | Green | `#10B981` |
| Warning | Orange/amber | `#F59E0B` |
| Danger/critical | Red/pink | `#EF4444` or `#F43F5E` |

### Text Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Primary headings | White | `#FFFFFF` |
| Secondary text | Gray-300 | `#D1D5DB` |
| Muted text | Gray-400 | `#9CA3AF` |
| Subtle labels | Gray-500 | `#6B7280` |

### Chart Colors (Threat Summary)
- Purple gradient fill (area under line)
- Purple line stroke
- Pink/purple data point highlight

---

## TYPOGRAPHY

| Element | Font Style | Size Estimate | Weight |
|---------|-----------|-------------|--------|
| Logo "VertexGuard" | Sans-serif | 20px | 700 (Bold) |
| "Vertex" in white, "Guard" in purple | — | — | — |
| Section headings (Current Risk, Threat Summary) | Sans-serif | 18px | 600 |
| Card titles | Sans-serif | 14px | 500 |
| KPI numbers | Sans-serif | 28-32px | 700 |
| KPI labels | Sans-serif | 12px | 400 |
| Body text | Sans-serif | 14px | 400 |
| Table text | Sans-serif | 13px | 400 |
| Sidebar nav items | Sans-serif | 14px | 500 |

**Font Family**: Likely Inter, SF Pro, or similar modern geometric sans-serif

---

## SPACING SYSTEM

| Element | Value |
|---------|-------|
| Sidebar padding | 16-20px |
| Card padding | 20-24px |
| Card border-radius | 12-16px |
| Gap between cards | 16-20px |
| Header height | ~64px |
| Section vertical spacing | 24px |
| Inner card element spacing | 12-16px |

---

## SIDEBAR (LEFT NAVIGATION)

### Structure
- **Width**: ~220px, fixed
- **Background**: Dark navy with subtle distinction from main content
- **Sections**: Logo → General (collapsible) → Reports → Settings → Promo CTA → Log Out

### Navigation Items
| Item | Icon | State | Badge/Extra |
|------|------|-------|-------------|
| Overview | Layout/dashboard icon | **Active** (purple background, white text) | — |
| Issues | Alert/circle icon | Default | Right chevron `>` |
| Files | Folder icon | Default | — |
| Threat Details | Shield/search icon | Default | — |
| Threats | Bug/virus icon | Default | Right chevron `>` |
| Help & Supports | Lifebuoy icon | Default | — |
| Settings | Gear icon | Default | — |
| Log Out | Arrow-left/exit icon | Default | — |

### Promo Card (Bottom of Sidebar)
- **Background**: Gradient purple/pink
- **Content**: Robot illustration + "Add new layer to enhance your security" + "Upgrade →" link
- **Purpose**: Upgrade CTA to premium

---

## HEADER

### Elements (Left to Right)
| Element | Description |
|---------|-------------|
| User avatar | Circular, small (~32px), with green online indicator |
| Greeting text | "Welcome! Kathryn Murphy" (bold) + "Security is a process, not a product." (muted, italic) |
| Search bar | Centered, rounded, dark background, placeholder "Search Here" |
| Messages icon | Chat bubble with notification dot |
| Notifications bell | Bell icon with notification dot |

### Header Height
- ~64px with vertical centering

---

## KPI CARDS ROW ("Current Risk")

### Card Structure (×5)
Each card: Icon circle → Percentage → Label → Three-dot menu

| Card | Icon | Color | Value | Label |
|------|------|-------|-------|-------|
| 1 | Lock/shield | Pink/rose | 132% | Total Threats |
| 2 | Video/camera | Purple | 16% | Video File Risk |
| 3 | Image/photo | Pink | 43% | Image File Risk |
| 4 | Cloud upload | Blue | 7% | Docs File Risk |
| 5 | Folder | Cyan/blue | 66% | Folder File Risk |

### Card Design
- **Background**: Dark card with subtle border
- **Icon container**: 48px circle with colored background (low opacity)
- **Percentage**: Large bold number
- **Label**: Small muted text below
- **Menu**: Three vertical dots, top-right

### Time Filter
- "Daily" dropdown with chevron, positioned right of section title

---

## THREAT SUMMARY CHART

### Chart Type
- **Area chart** with gradient fill below line
- **Line chart** overlay with data points

### Features
- **Y-axis**: Percentage (0% to 500%)
- **X-axis**: Months (Jan–Dec)
- **Active tooltip**: "June 2024, Threats: 29" with purple background
- **Data point**: Highlighted circle on June
- **Time filter**: "Yearly" dropdown

### Visual Style
- Smooth curved line (cardinal spline)
- Gradient fill: Purple to transparent
- Grid lines: Subtle horizontal dashed lines

---

## RIGHT PANEL (3 STACKED CARDS)

### Card 1:

## UI Reference Analysis - f15f6c6c219ac0bc3fd030539a64becf.jpg

I'll analyze this UI reference in detail, breaking down its design system and identifying the components needed for implementation.

---

## OVERVIEW

This is a **brutalist/minimalist design system showcase** featuring the "MONORAMA" typeface. The design emphasizes extreme typography, high contrast, grid-based layouts, and functional information hierarchy. It spans four distinct sections: a kinetic typography header, a dual-card material study, an airline boarding pass, and an airport gate display. The aesthetic is Swiss/International Style meets contemporary brutalism—clean, utilitarian, and aggressively typographic.

---

## LAYOUT STRUCTURE

### Overall Composition
| Section | Position | Description |
|---------|----------|-------------|
| Hero Typography | Top full-width | Vertical slats with reversed letterforms |
| Material Cards | Upper middle | Two cards side by side (gray + orange) |
| Boarding Pass | Lower middle | Horizontal ticket with perforated edge |
| Gate Display | Bottom | Three-panel airport information system |

### Grid System
- **Implicit 6-8 column grid** in the hero section (one column per letter)
- **Asymmetric two-column** for material cards (~40/60 split)
- **Complex multi-zone grid** for boarding pass (vertical sidebar + main content + tear-off)
- **Three equal panels** for gate display

---

## COLOR PALETTE

### Primary Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Page/background | Off-white/cool gray | `#E8E8E8` or `#F0F0F0` |
| Deep gray (sidebar, shadows) | Char revamped charcoal | `#4A4A4A` or `#5A5A5A` |
| Pure black | Typography, rules | `#000000` |
| Vivid orange | Accent card, highlights | `#FF4D00` or `#FF5500` |

### Secondary/Functional Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Light gray (card background) | Concrete texture | `#C8C8C8` or `#D0D0D0` |
| White | Paper white | `#FFFFFF` |
| Barcode black | High contrast | `#000000` |

### No Gradients
- Flat color application throughout
- Texture (concrete) used instead of color variation for depth

---

## TYPOGRAPHY

### Primary Typeface: MONORAMA
| Characteristic | Description |
|----------------|-------------|
| Style | Geometric sans-serif, stencil-inspired |
| Weight | Heavy/black (900) |
| Distinctive features | Cut terminals, geometric construction, monospace feel |
| Letterforms | Angular, constructed from straight lines and arcs |

### Typographic Hierarchy
| Element | Font | Size | Weight | Tracking |
|---------|------|------|--------|----------|
| "MONORAMA" hero | Monorama | ~120px | 900 | Tight/negative |
| "DE XT" embossed | Monorama | ~60px | 900 | Normal |
| "A/02" | Monorama | ~48px | 900 | Normal |
| Boarding pass flight | Monorama | ~72px | 900 | Tight |
| Boarding pass time | Monorama | ~56px | 900 | Tight |
| Gate "C-4" | Monorama | ~96px | 900 | Tight |
| Body text/system | Monorama or system | ~10-12px | 400-700 | Wide |

### Text Treatments
- **Vertical text**: "BOARDING PASS / UO / UF D-3848" rotated 90°
- **Embossed/debossed**: "DE XT" on gray card (subtle, same-color)
- **Reversed**: White on black, black on orange
- **Dotted matrix**: "A/02" preceded by dot pattern

---

## SPACING SYSTEM

| Element | Value |
|---------|-------|
| Hero slat width | ~14% each (6-7 slats) |
| Card padding | 24-32px |
| Card gap | 16-24px |
| Boarding pass sections | Tight, information-dense |
| Perforation margin | ~40px from right edge |
| Gate display panel gap | 1px hairline rules |
| Internal element spacing | 8-12px tight |

---

## COMPONENT BREAKDOWN

### 1. HERO TYPOGRAPHY SECTION

| Element | Description |
|---------|-------------|
| Vertical slats | 6-7 vertical panels with subtle shadow depth |
| Letterforms | "MONORAMA" with reversed/mirrored effect |
| Top letters | "H O N O R A M A" as small caps |
| Depth effect | Slats appear to be physical, with shadow gaps |

**Visual Effect**: The "R" and "A" appear mirrored, creating a visual puzzle. The slats create parallax-ready depth.

---

### 2. MATERIAL CARDS (DE XT)

#### Left Card (Gray)
| Element | Description |
|---------|-------------|
| Background | Concrete/texture, light gray |
| Treatment | Embossed "DE XT" (subtle, tonal) |
| Effect | Debossed/embossed, no color contrast |

#### Right Card (Orange)
| Element | Description |
|---------|-------------|
| Background | Vivid orange `#FF4D00` |
| Header | "DE XT™" with trademark |
| Dot matrix | 5×8 grid of dots |
| Reference | "REF. A/02" |
| Arrow | Right-pointing, functional |
| Body | Small legal/terms text |

---

### 3. BOARDING PASS

| Zone | Content | Width |
|------|---------|-------|
| Vertical sidebar | "BOARDING PASS / UO / UF D-3848" | ~60px |
| Main content | Flight, date, time, gate, zone | ~60% |
| Perforation | Dotted line | ~20px gap |
| Tear-off | Seat, barcode, arrival time | ~30% |

#### Main Content Details
| Element | Value | Style |
|---------|-------|-------|
| Flight | UNITED FLIGHT D-3848 | Small caps, tracked |
| Gate | B12 | Huge, bold |
| Time | 4.20 PM | Huge, bold |
| Date | FEB.01.2016 | Medium, clear |
| Route | RAP-DEN | Small, boxed |
| Boarding zone | 3 | Large, circled? |
| Barcode | Standard 1D | Black on white |

#### Tear-off Details
| Element | Value |
|---------|-------|
| Seat | 18C COACH |
| Arrival | 6.30 PM |
| Barcode | Standard 1D |
| Name | LAST NAME, FIRST NAME |

---

### 4. GATE DISPLAY

| Panel | Content | Purpose |
|-------|---------|---------|
| Left | "SMITH INTERNATIONAL AIRPORT", "INTERNATIONAL DEPARTURE", "GATE C-4" | Location/departure info |
| Center | "METHOD SYSTEM BUILD INDEX PLAYER MODULE TYPE" | System/status list |
| Right | "N/A", flight details, gate info | Flight-specific data |

#### Left Panel Details
| Element | Description |
|---------|-------------|
| Airport name | Small, tracked caps |
| "INTERNATIONAL DEPARTURE" | Label with underline rule |
| "GATE" | Label |
| "C-4" | Massive, dominant typography |
| Arrow | Diagonal, pointing up-right |

#### Center Panel

## UI Reference Analysis - f15f6c6c219ac0bc3fd030539a64becf.jpg

I'll analyze this design reference in detail. This appears to be a **design system/mood board** showcasing a brutalist, industrial aesthetic rather than a functional app UI. Let me break it down comprehensively.

---

## OVERVIEW

This is a **graphic design reference board** for a brand identity system called "MONORAMA" (or similar—the mirrored text suggests a design studio portfolio piece). It demonstrates a **Swiss/International Typographic Style meets Brutalism** aesthetic with heavy use of monospace fonts, stark contrast, grid-based layouts, and industrial material textures. The four panels show: brand wordmark, product packaging/tags, boarding pass/ticket design, and airport gate signage/system typography.

---

## LAYOUT STRUCTURE

### Overall Composition Pillars (Top Section)
| Element | Description |
|---------|-------------|
| 7 vertical white pillars | Create rhythm and physical depth |
| "MONORAMA" text | Mirrored/reversed, black, spanning pillar gaps |
| "H O N O R A M A" | Spaced letters above pillars (possibly "MONORAMA" rearranged) |

### Four Content Panels (Stacked Vertically)

| Panel | Content | Background |
|-------|---------|------------|
| 1 | Brand wordmark with pillars | White/light gray |
| 2 | Two product tags/cards | Medium gray |
| 3 | Airline boarding pass | Light gray |
| 4 | Airport gate sign + system list | Light gray |

---

## COLOR PALETTE

| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Primary background | Off-white/cool gray | `#F5F5F5` or `#E8E8E8` |
| Dark gray panels | Industrial gray | `#808080` or `#6B7280` |
| Black (text, bars) | Pure black | `#000000` |
| Accent orange | Safety/construction orange | `#FF4D00` or `#FF6B00` |
| Tag texture | Concrete gray | `#C0C0C0` |

### Color Usage Rules
- **Black + white/gray** for 90% of content
- **Orange** used sparingly for high-visibility elements (emergency, important data)
- No gradients except in concrete texture (subtle)

---

## TYPOGRAPHY

### Font Characteristics
| Element | Style | Notes |
|---------|-------|-------|
| Primary typeface | **Monospace/OCR-style** | Likely a custom or modified font similar to OCR-B, DIN, or Foundry Gridnik |
| "MONORAMA" wordmark | Geometric sans, heavy weight | Custom letterforms with cut corners |
| All body text | Uppercase, tracked out | Extreme letter-spacing on some elements |

### Specific Text Treatments

| Location | Treatment | Size Estimate |
|----------|-----------|---------------|
| "MONORAMA" | Mirrored horizontally, black fill | ~120px |
| "H O N O R A M A" | Ultra-wide letter-spacing | ~14px |
| "DE XT" | Stacked, bold, with TM | ~48px |
| "A/02" | Large, bold, with slash | ~72px |
| Flight numbers (B12, 18C) | Very large, bold | ~64px |
| Gate "C-4" | Extremely large, bold | ~96px |
| System list | Regular weight, stacked | ~24px |

### Typography Rules
- **ALL CAPS** for everything
- **Monospace** for data/numbers
- **Extreme scale contrast** between labels and data
- **Slash "/" and dash "-"** used as decorative separators
- **Barcode/OCR patterns** as decorative/functional elements

---

## SPACING SYSTEM

| Element | Value |
|---------|-------|
| Pillar gaps | ~40px |
| Panel padding | Generous, asymmetric |
| Text block margins | Tight, almost touching |
| Letter-spacing (headings) | 0.2em to 0.5em |
| Letter-spacing (data) | Tight or normal |
| Line height | Very tight (0.9-1.1) |

---

## INDIVIDUAL PANEL ANALYSIS

### Panel 2: Product Tags

| Element | Left Tag (Concrete) | Right Tag (Orange) |
|---------|-------------------|-------------------|
| Material | Concrete/gray texture | Bright orange card stock |
| Text | "DE XT" embossed/debossed | "DE XT™" black, "A/02" large |
| Grid pattern | None | 5×8 dot matrix |
| Arrow | None | Black right arrow |
| Body text | None | Small paragraph, justified |
| Dimensions | Portrait ~3:4 | Portrait ~3:4 |

**Key Detail**: The orange tag uses a **perforated dot grid** as both decoration and functional data visualization (possibly indicating quantity or status).

---

### Panel 3: Boarding Pass

**Layout**: Horizontal ticket with tear-off perforation

| Section | Content |
|---------|---------|
| Left (black bar) | "BOARDING PASS / 80 / UF D-3848" rotated vertical |
| Main left | "UNITED FLIGHT D-3848", "DEPARTURE GATE B12", "BOARD AT 4.20 PM", "FEB.01.2016" |
| Center | Route "RAP-DEN", flight details, "BOARDING ZONE 3", barcode |
| Right tear-off | "UNITED普惠D-3848", "SEAT NO. 18C", "COACH", barcode, "6.30 PM" |

**Design Notes**:
- Vertical black bar creates strong left anchor
- Data hierarchy: Gate > Time > Date > Zone
- Barcode as both functional and aesthetic element
- Perforation line with dashed cut guide

---

### Panel 4: Airport Gate Sign

| Section | Content |
|---------|---------|
| Left | "GATTS INTERNATIONAL AIRPORT", "INTERNATIONAL DEPARTURE", "GATE C-4" |
| Center | Large arrow pointing up-right, "METHOD SYSTEM BUILD INDEX PLAYER MODULE TYPE" |
| Right | "N/R", small data fields, "RAPID CITY SD → DENVER CO" |

**Key Features**:
- Arrow as directional and decorative element
- System list reads like a tech stack or design principles
- "C-4" uses extremely large type with dash as visual anchor
- Right side has minimal flight info (cancelled/no route: "N/R")

---

## UI COMPONENTS IDENTIFIED

### For React/Tailwind Implementation

| Component | Description | Reuse Potential |
|-----------|-------------|---------------|
| `VerticalPillar` | Decorative column with optional text | Brand hero sections |
| `MirroredText` | Horizontally flipped text for visual effect | Headers, logos |
| `DataTag` | Small card with label + large data value | Dashboards, status displays |
| `MaterialCard` | Card with texture overlay (concrete, etc.) | Premium product displays |
| `BoardingPass` | Ticket layout with tear-off section | Events, travel, access passes |
| `GateDisplay` | Large-format information board | Airport, transit, warehouse |
| `DotMatrix` | Decorative/functional dot grid | Data visualization, patterns |
| `Barcode` | SVG barcode generator | Tickets, inventory, IDs |
| `VerticalLabel` | Rotated text for compact labels | Tables, tickets, edge labels |
| `SystemList` | Stacked uppercase text list | Navigation, tech stacks, features |

---

## PAGES NEEDED FOR

## UI Reference Analysis - f15f6c6c219ac0bc3fd030539a64becf.jpg

I'll analyze this UI screenshot in detail. This appears to be a **design system/mood board** showcasing the "MONOGRAM" brand identity with various print and digital applications. Let me break down every aspect.

---

## OVERVIEW

This is a **branding and design system presentation** showing the "MONOGRAM" identity across multiple formats: large display typography, product packaging/tags, airline boarding pass, and airport gate signage. The aesthetic is **brutalist/minimalist industrial** with heavy use of monospace typography, high contrast, and functional grid-based layouts.

---

## LAYOUT STRUCTURE

### Overall Composition (Vertical Stack)
| Section | Height | Description |
|---------|--------|-------------|
| Hero Typography | ~25% | Large "MONOGRAM" display with vertical slats |
| Product Tags | ~20% | Two vertical tags (gray texture + orange) |
| Boarding Pass | ~25% | Horizontal ticket with perforated edge |
| Gate Signage | ~20% | Airport departure gate display |

### Grid System
- **Rigid 6-8 column underlying grid** visible in all components
- **Vertical slats** in hero section create rhythm and modularity
- **Perforated lines** on boarding pass indicate tear-off sections
- **Clear information hierarchy** through size, weight, and position

---

## COLOR PALETTE

### Primary Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Background (hero) | Off-white/cool gray | `#E8E8E8` or `#F0F0F0` |
| Background (mid sections) | Medium gray | `#808080` or `#9CA3AF` |
| Pure black | `#000000` |
| Pure white | `#FFFFFF` |

### Accent Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Product tag (right) | Safety orange/vermillion | `#FF4500` or `#FF6B00` |
| Boarding pass accent | Black stripe | `#000000` |

### No Gradients
- **Flat color only** — no gradients, shadows, or effects
- Color contrast is achieved through pure value differences

---

## TYPOGRAPHY

### Primary Typeface
**Custom monospace/geometric sans-serif** — likely a bespoke font designed for the brand

### Characteristics
| Feature | Description |
|---------|-------------|
| Construction | Geometric, built from straight lines and perfect circles |
| "O" shape | Square with chamfered/cut corners |
| "M", "N", "R" | Angular, constructed from straight segments |
| "G" | Distinctive horizontal bar, almost like a "C" with a crossbar |
| Spacing | Very tight tracking in display sizes |

### Type Scale (Estimated)
| Usage | Size | Weight | Tracking |
|-------|------|--------|----------|
| Hero "MONOGRAM" | 120-150px | 900 | -50 (tight) |
| Section labels ("DE", "XT") | 48px | 700 | 0 |
| Body/functional text | 10-12px | 400 | +50 (loose) |
| Gate "C-4" | 72px | 900 | -20 |
| Boarding pass numbers | 36-48px | 700 | -10 |

### Text Treatments
- **Vertical text**: "BOARDING PASS / UO / UF D-3848" rotated 90°
- **All caps**: Predominant throughout
- **Mixed scale**: Large numbers paired with tiny functional text

---

## SPACING SYSTEM

| Element | Value |
|---------|-------|
| Slat width (hero) | ~60px each, 8 slats |
| Gap between slats | ~8px |
| Tag dimensions | ~200×350px |
| Boarding pass height | ~180px |
| Perforation margin | ~20px from right edge |
| Internal padding (tags) | 16-20px |
| Line spacing (body) | 1.2-1.4 |

---

## COMPONENT BREAKDOWN

### 1. HERO DISPLAY ("MONOGRAM")

| Element | Specification |
|---------|---------------|
| Structure | 8 vertical slats with gaps |
| Typography | "MONOGRAM" sliced across slats |
| Effect | Letters appear continuous but are segmented |
| Top labels | "H O N O G R A M A" — one letter per slat top |
| Technique | Creates moiré/parallax potential on scroll |

**Design Notes:**
- Letters are **not centered** in slats — they shift position creating dynamic rhythm
- "M" and "A" are partially cut at edges
- Negative space is as important as positive

---

### 2. PRODUCT TAGS (DE XT)

| Element | Left Tag | Right Tag |
|---------|----------|-----------|
| Background | Gray textured (concrete/fabric) | Solid safety orange |
| "DE" treatment | Embossed/debossed, subtle | Black, bold, top-left |
| "XT" treatment | Subtle, ghosted | Black, bold, below "DE" |
| Grid pattern | None | Dotted grid, "A/02" identifier |
| Arrow | None | Black right arrow |
| Body text | None | Small functional text block |

**Right Tag Details:**
- **Dotted grid**: 8×6 matrix of small squares
- **"A/02"**: Large identifier, possibly product code
- **"PROFILE"**: Section header with paragraph below
- **Vertical text**: "MONOGRAM" rotated along right edge

---

### 3. BOARDING PASS

| Section | Width | Content |
|---------|-------|---------|
| Left stripe | ~10% | Vertical "BOARDING PASS / UO / UF D-3848" |
| Main body | ~55% | Flight info, date, time, gate |
| Perforation | ~2% | Dotted tear line |
| Right stub | ~33% | Seat, barcode, arrival time |

**Information Architecture:**
```
LEFT STUB → MAIN BODY → TEAR LINE → RIGHT STUB
   (keep)    (keep)     (tear)     (give to passenger)
```

| Data Point | Display |
|------------|---------|
| Flight | UNITED FLIGHT D-3848 |
| Route | RRP→DEN |
| Departure gate | B12 |
| Boarding time | 4.20 PM |
| Date | FEB.01.2016 |
| Boarding zone | 3 |
| Seat | 18C |
| Arrival | 6.30 PM |

**Barcode**: Standard UPC-A format, black on white

---

### 4. GATE SIGNAGE

| Element | Specification |
|---------|---------------|
| Layout | Three-panel horizontal |
| Left panel | Airport info, gate number |
| Center panel | Arrow, system words |
| Right panel | Flight info, N/A status |

**Left Panel:**
- "GATTS INTERNATIONAL AIRPORT"
- "INTERNATIONAL DEPARTURE"
- "GATE"
- "C-4" (massive)

**Center Panel:**
- Large diagonal arrow (↗)
- Vertical word list: METHOD, SYSTEM, BUILD, INDEX, PLAYER, MODULE, TYPE

**Right Panel:**
- "N/A" status
- Small flight details
- "ARR → DEP" indicator

---

## INTERACTION PATTERNS (If Digital)

| Pattern | Implementation |
|---------|----------------|
| Hover on hero slats | Slight horizontal shift creating parallax |
| Tag hover

## UI Reference Analysis - f15f6c6c219ac0bc3fd030539a64becf.jpg

I'll analyze this UI screenshot in detail. This is the **MONORAMA design system reference** — a brutalist/industrial brand identity showcase. Let me break down every aspect for design and development reference.

---

## OVERVIEW

This is a **graphic design system presentation** demonstrating the "MONORAMA" brand identity across four distinct applications: large-scale display typography, product packaging/tags, an airline boarding pass, and airport gate signage. The aesthetic is **Swiss International Typographic Style meets Brutalism** — characterized by extreme typography, high contrast, rigid grid systems, and functional information hierarchy.

---

## LAYOUT STRUCTURE

### Overall Composition (Vertical Stack)
| Section | Approximate Height | Description |
|---------|-------------------|-------------|
| Hero Typography | ~25% | "MONORAMA" with vertical slat segmentation |
| Product Tags | ~20% | Two vertical tags side by side (concrete + orange) |
| Boarding Pass | ~25% | Horizontal ticket with perforated tear-off |
| Gate Signage | ~20% | Three-panel airport departure display |

### Underlying Grid System
- **Implicit 6-8 column grid** throughout
- **Vertical slats** in hero create modular rhythm
- **Perforated lines** indicate physical tear points
- **Information hierarchy** through dramatic scale contrast

---

## COLOR PALETTE

### Primary Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Hero background | Off-white/cool gray | `#E8E8E8` or `#F0F0F0` |
| Mid-section background | Medium gray | `#808080` or `#9CA3AF` |
| Pure black | Text, bars, rules | `#000000` |
| Pure white | Negative space | `#FFFFFF` |

### Accent Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Product tag (right) | Safety orange/vermillion | `#FF4500` or `#FF6B00` |

### Color Usage Rules
- **No gradients** — flat color only
- **No shadows or effects** — depth through physical layering only
- **High contrast** achieved through pure value differences
- **Orange used sparingly** for high-visibility/emphasis

---

## TYPOGRAPHY

### Primary Typeface
**Custom geometric sans-serif/monospace** — bespoke for the brand

### Characteristics
| Feature | Description |
|---------|-------------|
| Construction | Geometric, straight lines and perfect curves |
| "O" shape | Square with chamfered corners |
| "M", "N", "R" | Angular, constructed from straight segments |
| "G" | Distinctive horizontal bar |
| "A" | Flat top, no crossbar (or very low) |
| Spacing | Extremely tight in display, loose in functional text |

### Type Scale (Estimated)
| Usage | Size | Weight | Tracking |
|-------|------|--------|----------|
| Hero "MONORAMA" | 120-150px | 900 | -50 (very tight) |
| "DE XT" labels | 48px | 700 | 0 |
| "A/02" identifier | 72px | 700 | -10 |
| Gate "C-4" | 96px | 900 | -20 |
| Boarding pass numbers | 36-48px | 700 | -10 |
| Body/functional text | 10-12px | 400 | +50 to +100 (very loose) |

### Text Treatments
- **ALL CAPS** throughout
- **Vertical text**: "BOARDING PASS / UO / UF D-3848" rotated 90°
- **Mirrored/reversed**: "MONORAMA" appears mirrored in hero
- **Embossed/debossed**: "DE XT" on concrete tag (subtle, tonal)
- **Mixed scale**: Tiny labels paired with enormous data values

---

## SPACING SYSTEM

| Element | Value |
|---------|-------|
| Slat width (hero) | ~60px each, 8 slats |
| Gap between slats | ~8px |
| Tag dimensions | ~200×350px |
| Tag gap | ~16px |
| Boarding pass height | ~180px |
| Perforation margin | ~20px from right edge |
| Internal padding (tags) | 16-20px |
| Line spacing (body) | Very tight (0.9-1.1) |
| Letter-spacing (labels) | Very wide (0.2-0.5em) |

---

## COMPONENT BREAKDOWN

### 1. HERO DISPLAY ("MONORAMA")

| Element | Specification |
|---------|---------------|
| Structure | 8 vertical slats with narrow gaps |
| Typography | "MONORAMA" sliced across slats |
| Top labels | "H O N O R A M A" — one letter per slat top |
| Effect | Letters appear continuous but are segmented |
| Depth | Slats create physical depth with shadow gaps |

**Design Notes:**
- Letters shift position between slats creating dynamic rhythm
- "M" and "A" partially cut at edges
- Negative space is as important as positive
- Creates moiré/parallax potential on digital scroll

---

### 2. PRODUCT TAGS ("DE XT")

| Element | Left Tag (Concrete) | Right Tag (Orange) |
|---------|-------------------|-------------------|
| Background | Gray concrete texture | Solid safety orange `#FF4500` |
| "DE" treatment | Embossed/debossed, subtle | Black, bold, top-left |
| "XT" treatment | Subtle, ghosted | Black, bold, below "DE" |
| Grid pattern | None | Dotted grid, "A/02" identifier |
| Arrow | None | Black right arrow → |
| Body text | None | Small functional text block |
| Vertical text | None | "MONORAMA" rotated along right edge |

**Right Tag Details:**
- **Dotted grid**: 8×6 matrix of small squares
- **"A/02"**: Large identifier, product code format
- **"PROFILE"**: Section header with paragraph below
- **Arrow**: Functional, indicates direction/action

---

### 3. BOARDING PASS

| Section | Width | Content |
|---------|-------|---------|
| Left stripe | ~10% | Vertical "BOARDING PASS / UO / UF D-3848" |
| Main body | ~55% | Flight info, date, time, gate |
| Perforation | ~2% | Dotted tear line |
| Right stub | ~33% | Seat, barcode, arrival time |

**Information Architecture:**
```
LEFT STUB → MAIN BODY → TEAR LINE → RIGHT STUB
   (keep)    (keep)     (tear)     (give to passenger)
```

| Data Point | Display | Style |
|------------|---------|-------|
| Flight | UNITED FLIGHT D-3848 | Small caps, tracked |
| Departure gate | B12 | Very large, bold |
| Boarding time | 4.20 PM | Very large, bold |
| Date | FEB.01.2016 | Medium, clear |
| Route | RAP→DEN | Small, boxed |
| Boarding zone | 3 | Large, circled? |
| Seat | 18C | Very large, bold |
| Arrival | 6.30 PM | Large, bold |

**Barcode**: Standard UPC-A format, black on white

---

### 4. GATE SIGNAGE

| Element | Specification |
|---------|---------------|

## UI Reference Analysis - f15f6c6c219ac0bc3fd030539a64becf.jpg

I'll analyze this UI reference in detail. This is a **brutalist typographic design system showcase** rather than a functional app UI—it's a portfolio piece demonstrating the "MONORAMA" typeface across four distinct applications: brand identity, product tags, airline boarding pass, and airport gate signage.

---

## OVERVIEW

This design exemplifies **Swiss International Style meets contemporary Brutalism**—aggressively typographic, grid-based, high-contrast, and utilitarian. It prioritizes information hierarchy through extreme scale contrast, monospace letterforms, and industrial material textures over decorative elements.

---

## LAYOUT STRUCTURE

### Four Stacked Sections (Vertical Scroll)

| Section | Position | Content | Purpose |
|---------|----------|---------|---------|
| 1.4. Hero/Brand | Top full-width | Vertical pillars + mirrored "MONORAMA" | Typeface showcase |
| 2. Product Tags | Upper middle | Two cards (concrete + orange) | Packaging application |
| 3. Boarding Pass | Lower middle | Horizontal ticket with perforation | Travel/document application |
| 4. Gate Display | Bottom | Three-panel airport information system | Environmental signage |

### Implicit Grid System
- **Hero**: 7-column vertical grid (one per letter/pillar)
- **Tags**: 2-column asymmetric (~45/55 split)
- **Boarding Pass**: Complex multi-zone (sidebar + main + tear-off)
- **Gate Display**: 3 equal panels with 1px hairline separators

---

## COLOR PALETTE

| Element | Color | Hex Estimate | Usage |
|---------|-------|--------------|-------|
| Page background | Cool off-white | `#E8E8E8` or `#F0F0F0` | Global canvas |
| Pure black | `#000000` | Typography, rules, barcodes | 70% of content |
| Concrete gray | `#C0C0C0` or `#B8B8B8` | Left tag texture, backgrounds |
| Industrial dark gray | `#808080` or `#6B7280` | Section separators |
| Safety orange | `#FF4D00` or `#FF5500` | Right tag, high-visibility accent |
| Paper white | `#FFFFFF` | Boarding pass base |

### Color Rules
- **No gradients** (except subtle concrete texture)
- **Orange used sparingly** (<5% surface area) for maximum impact
- **Black + gray + white** dominate for industrial authenticity

---

## TYPOGRAPHY

### Primary Typeface: MONORAMA
| Characteristic | Description |
|----------------|-------------|
| Classification | Geometric sans-serif, stencil/OCR hybrid |
| Weight | Heavy/Black (900) |
| Construction | Straight lines + perfect circles, cut terminals |
| Spacing | Monospace feel with occasional proportional adjustments |

### Typographic Scale (Extreme Contrast)

| Element | Size | Weight | Tracking | Treatment |
|---------|------|--------|----------|-----------|
| "MONORAMA" hero | ~120px | 900 | Tight | Mir7ored horizontally |
| "H O N O R A M A" | ~14px | 400 | Ultra-wide (0.5em) | Small caps, spaced |
| "DE XT" | ~48px | 900 | Normal | Stacked, embossed on gray |
| "A/02" | ~72px | 900 | Tight | With ×5 dot matrix prefix |
| Flight "B12" / "18C" | ~64px | 900 | Tight | Data display |
| Gate "C-4" | ~96px | 900 | Tight | Dominant, with hyphen |
| Body/system text | ~10-12px | 400-700 | Wide or normal | All caps, functional |

### Text Treatments
- **Mirrored/reversed**: "MONOR.AMA" (R and A flipped)
- **Embossed/debossed**: "DE XT" on concrete (same-color, texture-only)
- **Rotated 90°**: "BOARDING PASS / 80 / UF D-3848"
- **Dot matrix prefix**: 5×8 grid before "A/02"

---

## SPACING SYSTEM

| Element | Value |
|---------|-------|
| Pillar width/gap | ~14% each, ~40px gap |
| Section vertical padding | 48-64px |
| Card internal padding | 24-32px |
| Card gap | 16-24px |
| Perforation margin | ~40px from right edge |
| Hairline rules | 1px solid black |
| Tight line-height | 0.9-1.1 |
| Extreme letter-spacing (labels) | 0.2-0.5em |

---

## COMPONENT BREAKDOWN

### 1. HERO TYPOGRAPHY SECTION

| Element | Description | Implementation Notes |
|---------|-------------|----------------------|
| Vertical pillars | 7 white columns with shadow depth | CSS `box-shadow` or pseudo-elements |
| "MONORAMA" text | Black, spans pillar gaps, mirrored R/A | `transform: scaleX(-1)` on specific letters |
| "H O N O R A M A" | Ultra-spaced small caps above | Individual `<span>` elements with `letter-spacing` |

**Visual Effect**: Parallax-ready depth through overlapping layers; the mirrored letters create visual tension and brand recognition.

---

### 2. MATERIAL TAGS (DE XT)

#### Left Tag — Concrete
| Property | Value |
|----------|-------|
| Background | Concrete texture (photographic or CSS noise) |
| Text | "DE XT" debossed (subtle, same-color) |
| Dimensions | Portrait ~3:4 ratio |
| Border | None, raw edge |

#### Right Tag — Orange
| Element | Description |
|---------|-------------|
| Background | Flat safety orange `#FF4D00` |
| Header | "DE XT™" with trademark symbol |
| Dot matrix | 5 columns × 8 rows of black dots |
| Reference | "REF. A/02" with slash separator |
| Arrow | Black right-pointing, functional |
| Body | Small justified paragraph (terms/legal) |
| Vertical text | "INFORMATION" rotated on right edge |

---

### 3. BOARDING PASS

| Zone | Width | Content | Style |
|------|-------|---------|-------|
| Vertical sidebar | ~60px | "BOARDING PASS / 80 / UF D-3848" | Rotated 90°, black background, white text |
| Main content | ~55% | Flight, gate, time, date, route | Black on white, hierarchical |
| Perforation | ~20px | Dotted cut line | Functional, visual break |
| Tear-off | ~30% | Seat, barcode, arrival | Compact, essential data |

#### Data Hierarchy (Main Content)
```
UNITED FLIGHT D-3848  (small, tracked)
DEPARTURE GATE
B12                    [LARGEST — primary action]
BOARD AT
4.20 PM                [SECONDARY — time-critical]
FEB.01.2016            [tertiary]
RAP-DEN                [route, boxed]
BOARDING ZONE 3        [procedural]
[BARCODE]              [functional]
```

#### Tear-off Details
| Element | Value |
|---------|-------|
| Flight repeat | UNITED FLIGHT D-3848 |
| Seat | 18C COACH |
| Arrival | 6.30 PM |
| Barcode | Standard 1D, black on white |
| Name placeholder | LAST

## UI Reference Analysis - f15f6c6c219ac0bc3fd030539a64becf.jpg

I'll analyze this MONORAMA design system reference in detail, extracting every element for design and development use.

---

## OVERVIEW

This is a **brutalist typographic design system showcase** demonstrating the "MONORAMA" typeface across four applications: brand identity display, product packaging/tags, airline boarding pass, and airport gate signage. The aesthetic is **Swiss International Typographic Style meets Brutalism**—characterized by extreme scale contrast, rigid grid systems, monospace/geometric letterforms, and industrial material textures.

---

## LAYOUT STRUCTURE

### Four Stacked Sections (Vertical)

| Section | Position | Height | Content |
|---------|----------|--------|---------|
| Hero Typography | Top | ~25% | Vertical pillars + mirrored "MONORAMA" |
| Product Tags | Upper middle | ~20% | Two cards (concrete texture + safety orange) |
| Boarding Pass | Lower middle | ~25% | Horizontal ticket with perforated tear-off |
| Gate Display | Bottom | ~20% | Three-panel airport information system |

### Grid System
- **Hero**: 7-column vertical grid (one column per letter/pillar)
- **Tags**: 2-column asymmetric (~45/55 split)
- **Boarding Pass**: Multi-zone (vertical sidebar + main content + perforation + tear-off)
- **Gate Display**: 3 equal panels with hairline separators

---

## COLOR PALETTE

| Element | Color | Hex Estimate | Usage |
|---------|-------|--------------|-------|
| Page background | Cool off-white | `#E8E8E8` or `#F0F0F0` | Global canvas |
| Pure black | `#000000` | Typography, rules, barcodes | ~70% of content |
| Concrete gray | `#C0C0C0` or `#B8B8B8` | Left tag texture, section backgrounds |
| Industrial dark gray | `#808080` or `#6B7280` | Section separators, secondary surfaces |
| Safety orange | `#FF4D00` or `#FF5500` | Right tag, high-visibility accent | <5% surface area |
| Paper white | `#FFFFFF` | Boarding pass base, pillar surfaces |

### Color Rules
- **Flat color only** — no gradients, shadows, or effects
- **High contrast** through pure value differences
- **Orange used sparingly** for maximum impact
- **Black + gray + white** dominate for industrial authenticity

---

## TYPOGRAPHY

### Primary Typeface: MONORAMA (Custom Geometric Sans)

| Characteristic | Description |
|----------------|-------------|
| Classification | Geometric sans-serif, stencil/OCR hybrid |
| Weight | Heavy/Black (900) |
| Construction | Straight lines + perfect circles, cut terminals |
| "O" shape | Square with chamfered/cut corners |
| "M", "N", "R" | Angular, constructed from straight segments |
| "G" | Distinctive horizontal bar (like "C" with crossbar) |
| "A" | Flat top, no crossbar (or very low) |
| Spacing | Monospace feel with occasional proportional adjustments |

### Typographic Scale (Extreme Contrast)

| Element | Size | Weight | Tracking | Treatment |
|---------|------|--------|----------|-----------|
| "MONORAMA" hero | ~120-150px | 900 | Tight (-50) | Mirrored R/A |
| "H O N O R A M A" | ~14px | 400 | Ultra-wide (0.5em) | Small caps, spaced |
| "DE XT" | ~48px | 900 | Normal | Stacked, embossed on gray |
| "A/02 bakery" | ~72px | 900 | Tight | With dot matrix prefix |
| Flight "B12" / "18C" | ~64px | 900 | Tight | Data display |
| Gate "C-4" | ~96px | 900 | Tight | Dominant, with hyphen |
| Body/system text | ~10-12px | 400-700 | Wide or normal | All caps, functional |

### Text Treatments
- **ALL CAPS** throughout
- **Mirrored/reversed**: "MONORAMA" with R and A flipped horizontally
- **Embossed/debossed**: "DE XT" on concrete tag (same-color, texture-only)
- **Rotated 90°**: "BOARDING PASS / 80 / UF D-3848"
- **Dot matrix prefix**: 5×8 grid of dots before "A/02"

---

## SPACING SYSTEM

| Element | Value |
|---------|-------|
| Pillar width | ~60px each, 8 pillars |
| Gap between pillars | ~8px |
| Section vertical padding | 48-64px |
| Tag dimensions | ~200×350px |
| Tag gap | ~16-24px |
| Card internal padding | 24-32px |
| Boarding pass height | ~180px |
| Perforation margin | ~20-40px from right edge |
| Hairline rules | 1px solid black |
| Tight line-height | 0.9-1.1 |
| Extreme letter-spacing (labels) | 0.2-0.5em |

---

## COMPONENT BREAKDOWN

### 1. HERO TYPOGRAPHY SECTION

| Element | Specification | Implementation |
|---------|-------------|----------------|
| Vertical pillars | 8 white columns with shadow depth | CSS `box-shadow` or pseudo-elements for depth |
| "MONORAMA" text | Black, spans pillar gaps, mirrored R/A | `transform: scaleX(-1)` on specific letters |
| "H O N O R A M A" | Ultra-spaced small caps above pillars | Individual `<span>` elements with `letter-spacing: 0.5em` |

**Visual Effect**: Letters shift position between pillars creating dynamic rhythm; "M" and "A" partially cut at edges; negative space equals positive space; parallax-ready depth.

---

### 2. PRODUCT TAGS ("DE XT")

#### Left Tag — Concrete
| Property | Value |
|----------|-------|
| Background | Concrete texture (photographic or CSS noise filter) |
| Text | "DE XT" debossed/embossed — subtle, same-color, texture-only |
| Dimensions | Portrait ~3:4 ratio |
| Border | None, raw edge |

#### Right Tag — Safety Orange
| Element | Description |
|---------|-------------|
| Background | Flat safety orange `#FF4D00` |
| Header | "DE XT™" with trademark symbol, black, top-left |
| Dot matrix | 5 columns × 8 rows of black dots |
| Reference | "REF. A/02" with slash separator, large |
| Arrow | Black right-pointing arrow → |
| Body | Small justified paragraph (terms/legal text) |
| Vertical text | "INFORMATION" rotated 90° along right edge |

---

### 3. BOARDING PASS

| Zone | Width | Content | Style |
|------|-------|---------|-------|
| Vertical sidebar | ~10% (~60px) | "BOARDING PASS / 80 / UF D-3848" | Rotated 90°, black background, white text |
| Main content | ~55% | Flight, gate, time, date, route | Black on white, hierarchical |
| Perforation | ~2% (~20px) | Dotted cut line | Functional, visual break |
| Tear-off stub | ~33% | Seat, barcode, arrival | Compact, essential data

## UI Reference Analysis - f15f6c6c219ac0bc3fd030539a64becf.jpg

I'll analyze this MONORAMA design system reference in detail, extracting every element for potential reuse in our project.

---

## OVERVIEW

This is a **brutalist typographic design system showcase** demonstrating the "MONORAMA" typeface across four applications: brand identity, product tags, airline boarding pass, and airport gate signage. The aesthetic is **Swiss International Style meets contemporary Brutalism**—aggressively typographic, grid-based, high-contrast, and utilitarian.

---

## LAYOUT STRUCTURE

### Four Stacked Sections (Vertical)

| Section | Position | Content | Purpose |
|---------|----------|---------|---------|
| Hero/Brand | Top full-width | Vertical pillars + mirrored "MONORAMA" | Typeface showcase |
| Product Tags | Upper middle | Two cards (concrete + orange) | Packaging application |
| Boarding Pass | Lower middle | Horizontal ticket with perforation | Travel/document application |
| Gate Display | Bottom | Three-panel airport information system | Environmental signage |

### Grid System
- **Hero**: 7-column vertical grid (one per letter/pillar)
- **Tags**: 2-column asymmetric (~45/55 split)
- **Boarding Pass**: Complex multi-zone (sidebar + main + tear-off)
- **Gate Display**: 3 equal panels with hairline separators

---

## COLOR PALETTE

| Element | Color | Hex Estimate | Usage |
|---------|-------|--------------|-------|
| Page background | Cool off-white | `#E8E8E8` or `#F0F0F0` | Global canvas |
| Pure black | `#000000` | Typography, rules, barcodes | 70% of content |
| Concrete gray | `#C0C0C0` or `#B8B8B8` | Left tag texture, backgrounds |
| Industrial dark gray | `#808080` or `#6B7280` | Section separators |
| Safety orange | `#FF4D00` or `#FF5500` | Right tag, high-visibility accent |
| Paper white | `#FFFFFF` | Boarding pass base |

### Color Rules
- **No gradients** (except subtle concrete texture)
- **Orange used sparingly** (<5% surface area) for maximum impact
- **Black + gray + white** dominate for industrial authenticity

---

## TYPOGRAPHY

### Primary Typeface: MONORAMA

| Characteristic | Description |
|----------------|-------------|
| Classification | Geometric sans-serif, stencil/OCR hybrid |
| Weight | Heavy/Black (900) |
| Construction | Straight lines + perfect circles, cut terminals |
| Spacing | Monospace feel with occasional proportional adjustments |

### Typographic Scale (Extreme Contrast)

| Element | Size | Weight | Tracking | Treatment |
|--------- unmanned|------|--------|----------|-----------|
| "MONORAMA" hero | ~120px | 900 | Tight | Mirrored horizontally |
| "H O N O R A M A" | ~14px | 400 | Ultra-wide (0.5em) | Small caps, spaced |
| "DE XT" | ~48px | 900 | Normal | Stacked, embossed on gray |
| "A/02" | ~72px | 900 | Tight | With ×5 dot matrix prefix |
| Flight "B12" / "18C" | ~64px | 900 | Tight | Data display |
| Gate "C-4" | ~96px | 900 | Tight | Dominant, with hyphen |
| Body/system text | ~10-12px | 400-700 | Wide or normal | All caps, functional |

### Text Treatments
- **ALL CAPS** throughout
- **Mirrored/reversed**: "MONORAMA" with flipped R and A
- **Embossed/debossed**: "DE XT" on concrete (same-color, texture-only)
- **Rotated 90°**: "BOARDING PASS / 80 / UF D-3848"
- **Dot matrix prefix**: 5×8 grid before "A/02"

---

## SPACING SYSTEM

| Element | Value |
|---------|-------|
| Pillar width/gap | ~14% each, ~40px gap spacing |
| Section vertical padding | 48-64px |
| Card internal padding | 24-32px |
| Card gap | 16-24px |
| Perforation margin | ~40px from right edge |
| Hairline rules | 1px solid black |
| Tight line-height | 0.9-1.1 |
| Extreme letter-spacing (labels) | 0.2-0.5em |

---

## COMPONENT BREAKDOWN

### 1. HERO TYPOGRAPHY SECTION

| Element | Description | Implementation Notes |
|---------|-------------|----------------------|
| Vertical pillars | 7 white columns with shadow depth | CSS `box-shadow` or pseudo-elements |
| "MONORAMA" text | Black, spans pillar gaps, mirrored R/A | `transform: scaleX(-1)` on specific letters |
| "H O N O R A M A" | Ultra-spaced small caps above | Individual `<span>` elements with `letter-spacing` |

**Visual Effect**: Parallax-ready depth through overlapping layers; mirrored letters create visual tension.

---

### 2. MATERIAL TAGS (DE XT)

#### Left Tag — Concrete
| Property | Value |
|----------|-------|
| Background | Concrete texture (photographic or CSS noise) |
| Text | "DE XT" debossed (subtle, same-color) |
| Dimensions | Portrait ~3:4 ratio |
| Border | None, raw edge |

#### Right Tag — Orange
| Element | Description |
|---------|-------------|
| Background | Flat safety orange `#FF4D00` |
| Header | "DE XT™" with trademark symbol |
| Dot matrix | 5 columns × 8 rows of black dots |
| Reference | "REF. A/02" with slash separator |
| Arrow | Black right-pointing, functional |
| Body | Small justified paragraph (terms/legal tacit) |
| Vertical text | "INFORMATION" rotated on right edge |

---

### 3. BOARDING PASS

| Zone | Width | Content | Style |
|------|-------|---------|-------|
| Vertical sidebar | ~60px | "BOARDING PASS / 80 / UF D-3848" | Rotated 90°, black background, white text |
| Main content | ~55% | Flight info, gate, time, date, route | Black on white, hierarchical |
| Perforation | ~20px | Dotted cut line | Functional, visual break |
| Tear-off | ~30% | Seat, barcode, arrival time | Compact, essential data |

#### Data Hierarchy (Main Content)
```
UNITED FLIGHT D-3848  (small, tracked)
DEPARTURE GATE
B12                    [LARGEST — primary action]
BOARD AT
4.20 PM                [SECONDARY — time-critical]
FEB.01.2016            [tertiary]
RAP-DEN                [route, boxed]
BOARDING ZONE 3        [procedural]
[BARCODE]              [functional]
```

#### Tear-off Details
| Element | Value |
|---------|-------|
| Flight repeat | UNITED FLIGHT D-3848 |
| Seat | 18C COACH |
| Arrival | 6.30 PM |
| Barcode | Standard 1D, black on white |
| Name placeholder | LAST NAME, FIRST NAME |

---

### 4. GATE SIGNAGE

| Element | Specification |
|---------|---------------|
| Layout | Three equal panels with 1

## UI Reference Analysis - f15f6c6c219ac0bc3fd030539a64becf.jpg

**[UI Vision Analyzer Agent]**  
*Analyzing MONORAMA design system reference image...*

---

## MONORAMA Design System — UI Analysis

### 1. HERO / BRAND SECTION

| Element | Description |
|---------|-------------|
| **Vertical Pillars** | 8 white vertical columns with subtle shadow depth, creating physical dimensionality |
| **"MONORAMA" Typography** | Black, bold geometric sans-serif spanning pillar gaps; "R" and "A" are mirrored/reversed for visual tension |
| **Top Labels** | "H O N O R A M A" — Typography with ultra-wide letter-spacing above pillars |
| **Vertical Sidebar Text** | "INFORMATION / DESIGN / TYPE / MONORAMA" rotated 90° on far right edge |

**Key Design Details:**
- Letters shift position between pillars creating dynamic rhythm
- "M" and "A" partially cut at edges — negative space is as important as positive
- Parallax-ready depth through overlapping layers
- Mirrored "R" and "A" create visual puzzle and brand recognition

---

### 2. PRODUCT TAGS (DE XT)

| Element | Left Tag (Concrete) | Right Tag (Safety Orange) |
|---------|-------------------|-------------------|
| **Background** | Concrete texture, light gray `#C0C0C0` | Flat safety orange `#FF4D00` |
| **"DE XT" Treatment** | Embossed/debossed, subtle same-color texture | Black, bold, top-left with ™ symbol |
| **Dot Matrix** | None | 5×8 grid of black dots |
| **Reference** | None | "REF. A/02" with slash separator |
| **Arrow** | None | Black right-pointing arrow → |
| **Body Text** | None | Small justified paragraph (terms/legal) |
| **Vertical Text** | None | "INFORMATION" rotated 90° on right edge |

**Right Tag Details:**
- "A/02" uses large bold type with dot matrix prefix
- "PROFILE" section header with paragraph below
- Clean, utilitarian, industrial aesthetic

---

### 3. BOARDING PASS

| Zone | Width | Content | Style |
|------|-------|---------|-------|
| **Vertical Sidebar** | ~10% | "BOARDING PASS / 80 / UF D-3848" | Rotated 90°, black background, white text |
| **Main Content** | ~55% | Flight, gate, time, date, route | Black on white, hierarchical |
| **Perforation** | ~2% | Dotted cut line | Functional, visual break |
| **Tear-off Stub** | ~33% | Seat, barcode, arrival | Compact, essential data |

**Data Hierarchy (Main Content):**
```
UNITED FLIGHT D-3848  (small, tracked)
DEPARTURE GATE
B12                    [LARGEST — primary action]
BOARD AT
4.20 PM                [SECONDARY — time-critical]
FEB.01.2016            [tertiary]
RAP-DEN                [route, boxed]
BOARDING ZONE 3        [procedural]
[BARCODE]              [functional]
```

**Tear-off Details:**
| Element | Value |
|---------|-------|
| Flight | UNITED FLIGHT D-3848 |
| Seat | 18C COACH |
| Arrival | 6.30 PM |
| Barcode | Standard 1D, black on white |
| Name | LAST NAME, FIRST NAME |

---

### 4. GATE SIGNAGE

| Element | Left Panel | Center Panel | Right Panel |
|---------|-----------|-------------|-------------|
| **Content** | "SMITH INTERNATIONAL AIRPORT", "INTERNATIONAL DEPARTURE", "GATE C-4" | Large diagonal arrow ↗, "METHOD SYSTEM BUILD INDEX PLAYER MODULE TYPE" | "N/A", flight details, "RAPID CITY SD → DENVER CO" |
| **Typography** | Small tracked caps, "GATE" label, "C-4" massive | Stacked uppercase list, functional | Minimal data, "N/A" status |

**Key Features:**
- Arrow as directional and decorative element
- System list reads like a tech stack or design principles
- "C-4" uses extremely large type with dash as visual anchor
- Right side has minimal flight info (cancelled/no route: "N/R")

---

## DESIGN SYSTEM TOKENS

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#E8E8E8` | Page background |
| `--color-bg-secondary` | `#C0C0C0` | Card backgrounds, concrete texture |
| `--color-bg-dark` | `#000000` | Sidebar, high contrast elements |
| `--color-accent-orange` | `#FF4D00` | High-visibility accent, CTAs |
| `--color-text-primary` | `#000000` | Headings, primary text |
| `--color-text-inverse` | `#FFFFFF` | Text on dark backgrounds |

### Typography
| Token | Value | Usage |
|-------|-------|-------|
| `--font-family-primary` | MONORAMA (custom geometric sans) | All text |
| `--font-size-hero` | 120-150px | Hero "MONORAMA" |
| `--font-size-display` | 72-96px | Gate numbers, flight data |
| `--font-size-body` | 10-14px | Functional text, labels |
| `--letter-spacing-wide` | 0.2-0.5em | Labels, small caps |
| `--letter-spacing-tight` | -0.05em | Display type |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-pillar-gap` | 8px | Hero pillar separation |
| `--spacing-section` | 48-64px | Vertical section padding |
| `--spacing-card-gap` | 16-24px | Between cards |
| `--spacing-card-padding` | 24-32px | Internal card padding |

---

## COMPONENT INVENTORY

| Component | Description | Reuse reusability |
|-----------|-------------|-----------------|
| `VerticalPillar` | Decorative column with optional text | Brand hero sections |
| `MirroredText` | Horizontally flipped text for visual effect | Headers, logos |
| `DataTag` | Small card with label + large data value | Dashboards, status displays |
| `MaterialCard` | Card with texture overlay (concrete, etc.) | Premium product displays |
| `BoardingPass` | Ticket layout with tear-off section | Events, travel, access passes |
| `GateDisplay` | Large-format information board | Airport, transit, warehouse |
| `DotMatrix` | Decorative/functional dot grid | Data visualization, patterns |
| `Barcode` | SVG barcode generator | Tickets, inventory, IDs |
| `VerticalLabel` | Rotated text for compact labels | Tables, tickets, edge labels |
| `SystemList` | Stacked uppercase text list | Navigation, tech stacks, features |

---

## IMPLEMENTATION NOTES

### For Frontend Development
1. **CSS Grid/Flexbox

## UI Reference Analysis - f15f6c6c219ac0bc3fd030539a64becf.jpg

I'll analyze this MONORAMA design system reference image in detail, extracting all UI elements for design and development reference.

---

## OVERVIEW

This is a **brutalist typographic design system showcase** demonstrating the "MONORAMA" typeface across four distinct applications: brand identity display, product packaging/tags, airline boarding pass, and airport gate signage. The aesthetic is **Swiss International Typographic Style meets contemporary Brutalism**—characterized by extreme scale contrast, rigid grid systems, monospace/geometric letterforms, and industrial material textures.

---

## LAYOUT STRUCTURE

### Four Stacked Sections (Vertical)

| Section | Position | Approximate Height | Content |
|---------|----------|-------------------|---------|
| Hero/Brand | Top full-width | ~25% | Vertical pillars + mirrored "MONORAMA" |
| Product Tags | Upper middle | ~20% | Two cards (concrete texture + safety orange) |
| Boarding Pass | Lower middle | ~25% | Horizontal ticket with perforated tear-off |
| Gate Display | Bottom | ~20% | Three-panel airport information system |

### Grid System
- **Hero**: 8-column vertical grid (one per letter/pillar)
- **Tags**: 2-column asymmetric (~45/55 split)
- **Boarding Pass**: Complex multi-zone (vertical sidebar + main content + perforation + tear-off)
- **Gate Display**: 3 equal panels with hairline separators

---

## COLOR PALETTE

| Element | Color | Hex Estimate | Usage |
|---------|-------|--------------|-------|
| Page background | Cool off-white | `#E8E8E8` or `#F0F0F0` | Global canvas |
| Pure black | `#000000` | Typography, rules, barcodes | ~70% of content |
| Concrete gray | `#C0C0C0` or `#B8B8B8` | Left tag texture, section backgrounds |
| Industrial dark gray | `#808080` or `#6B7280` | Section separators |
| Safety orange | `#FF4D00` or `#FF5500` | Right tag, high-visibility accent | <5% surface area |
| Paper white | `#FFFFFF` | Boarding pass base, pillar surfaces |

### Color Rules
- **Flat color only** — no gradients, shadows, or effects
- **High contrast** through pure value differences
- **Orange used sparingly** for maximum impact
- **Black + gray + white** dominate for industrial authenticity

---

## TYPOGRAPHY

### Primary Typeface: MONORAMA (Custom Geometric Sans)

| Characteristic | Description |
|----------------|-------------|
| Classification | Geometric sans-serif, stencil/OCR hybrid |
| Weight | Heavy/Black (900) |
| Construction | Straight lines + perfect circles, cut terminals |
| "O" shape | Square with chamfered/cut corners |
| "M", "N", "R" | Angular, constructed from straight segments |
| "G" | Distinctive horizontal bar (like "C" with crossbar) |
| "A" | Flat top, no crossbar (or very low) |
| Spacing | Monospace feel with occasional proportional adjustments |

### Typographic Scale (Extreme Contrast)

| Element | Size | Weight | Tracking | Treatment |
|---------|------|--------|----------|-----------|
| "MONORAMA" hero | ~120-150px | 900 | Tight (-50) | Mirrored R/A |
| "H O N O R A M A" | ~14px | 400 | Ultra-wide (0.5em) | Small caps, spaced |
| "DE XT" | ~48px | 900 | Normal | Stacked, embossed on gray |
| "A/02" | ~72px | 900 | Tight | With dot matrix prefix |
| Flight "B12" / "18C" | ~64px | 900 | Tight | Data display |
| Gate "C-4" | ~96px | 900 | Tight | Dominant, with hyphen |
| Body/system text | ~10-12px | 400-700 | Wide or normal | All caps, functional |

### Text Treatments
- **ALL CAPS** throughout
- **Mirrored/reversed**: "MONORAMA" with flipped R and A
- **Embossed/debossed**: "DE XT" on concrete (same-color, texture-only)
- **Rotated 90°**: "BOARDING PASS / 80 / UF D-3848"
- **Dot matrix prefix**: 5×8 grid before "A/02"

---

## SPACING SYSTEM

| Element | Value |
|---------|-------|
| Pillar width | ~60px each, 8 pillars |
| Gap between pillars | ~8px |
| Section vertical padding | 48-64px |
| Tag dimensions | ~200×350px |
| Tag gap | ~16-24px |
| Card internal padding | 24-32px |
| Boarding pass height | ~180px |
| Perforation margin | ~20-40px from right edge |
| Hairline rules | 1px solid black |
| Tight line-height | 0.9-1.1 |
| Extreme letter-spacing (labels) | 0.2-0.5em |

---

## COMPONENT BREAKDOWN

### 1. HERO TYPOGRAPHY SECTION

| Element | Description | Implementation Notes |
|---------|-------------|----------------------|
| Vertical pillars | 8 white columns with shadow depth | CSS `box-shadow` or pseudo-elements for depth |
| "MONORAMA" text | Black, spans pillar gaps, mirrored R/A | `transform: scaleX(-1)` on specific letters |
| "H O N O R A M A" | Ultra-spaced small caps above pillars | Individual `<span>` elements with `letter-spacing: 0.5em` |

**Visual Effect**: Letters shift position between pillars creating dynamic rhythm; "M" and "A" partially cut at edges; negative space equals positive space; parallax-ready depth.

---

### 2. PRODUCT TAGS ("DE XT")

#### Left Tag — Concrete
| Property | Value |
|----------|-------|
| Background | Concrete texture (photographic or CSS noise filter) |
| Text | "DE XT" debossed/embossed — subtle, same-color, texture-only |
| Dimensions | Portrait ~3:4 ratio |
| Border | None, raw edge |

#### Right Tag — Safety Orange
| Element | Description |
|---------|-------------|
| Background | Flat safety orange `#FF4D00` |
| Header | "DE XT™" with trademark symbol, black, top-left |
| Dot matrix | 5 columns × 8 rows of black dots |
| Reference | "REF. A/02" with slash separator, large |
| Arrow | Black right-pointing arrow → |
| Body | Small justified paragraph (terms/legal text) |
| Vertical text | "INFORMATION" rotated 90° along right edge |

---

### 3. BOARDING PASS

| Zone | Width | Content | Style |
|------|-------|---------|-------|
| Vertical sidebar | ~10% (~60px) | "BOARDING PASS / 80 / UF D-3848" | Rotated 90°, black background, white text |
| Main content | ~55% | Flight, gate, time, date, route | Black on white, hierarchical |
| Perforation | ~2% (~20px) | Dotted cut line | Functional, visual break |
| Tear-off stub | ~33% | Seat, barcode, arrival | Compact

## UI Reference Analysis - ec37ae7152e3fa18dc51026eb940534d.jpg

I'll analyze this medical/health dashboard UI in detail, extracting every element for design and development reference.

---

## OVERVIEW

This is a **modern medical/healthcare patient dashboard** with a distinctive **light gray + neon yellow accent** color scheme. It features a patient profile sidebar, anatomical body visualization with interactive hotspots, vital signs monitoring, and a diagnosis timeline. The design balances clinical functionality with an approachable, modern aesthetic—avoiding the sterile feel of traditional medical software.

---

## LAYOUT STRUCTURE

### Overall Grid
| Zone | Position | Width | Description |
|------|----------|-------|-------------|
| Top Navigation | Fixed top | Full width | Patient avatars + tab navigation |
| Left Sidebar | Left | ~320px | Patient profile + vitals |
| Center Stage | Center | ~40% | Anatomical body model with hotspots |
| Right Panel | Right | ~35% | Diagnosis timeline + history |

### Content Zones Detail
```
┌─────────────────────────────────────────────────────────┐
│  TOP NAV: Patient avatars  |  Overview  Notes  Docs...  │
├────────────────┬─────────────────────┬──────────────────┤
│                │                     │                  │
│  PATIENT       │   ANATOMICAL        │  DIAGNOSIS       │
│  PROFILE       │   BODY MODEL        │  TIMELINE        │
│                │   (interactive)     │                  │
│  ───────────   │                     │  [2012.2021]     │
│                │   [hotspots with    │  Heart failure    │
│  Vitals        │    condition        │  ⚙ 2             │
│  Heart beat 98 │    counts]          │                  │
│  [watch]       │                     │  [2012.2017]     │
│  Pressure      │                     │  Valve disease    │
│  120/60        │                     │  ⚙ 2  🔗 1       │
│                │                     │                  │
│  ───────────   │                     │  [17.08.2015]    │
│                │                     │  Arrhythmia       │
│  Allergies     │   [+/- zoom]        │  ⚙ 2             │
│  [pills]       │   [↔ expand]        │                  │
│                │                     │  [2012.2013]      │
│                │                     │  Angina           │
│                │                     │                  │
└────────────────┴─────────────────────┴──────────────────┘
```

---

## COLOR PALETTE

### Background Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Page background | Light warm gray | `#E8E8E6` or `#E5E5E3` |
| Card backgrounds | White | `#FFFFFF` |
| Top nav background | Same as page | `#E8E8E6` |
| Diagnosis cards (dark) | Charcoal | `#2D2D2D` or `#1A1A1A` |
| Diagnosis cards (medium) | Gray | `#6B6B6B` or `#808080` |

### Accent Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Primary accent (active states, CTAs) | Neon yellow/lime | `#E5FF00` or `#D4F500` |
| Secondary accent (icons, highlights) | Same yellow | `#E5FF00` |
| Hotspot badges | Yellow with black text | `#E5FF00` |

### Semantic Colors
| Element | Color | Usage |
|---------|-------|-------|
| Vital signs (normal) | Black/dark gray | Heart rate, BP, temp |
| Vital signs (XT) | Yellow accent | Watch sync indicator |
| Alert/warning | Yellow badge | Condition count badges |
| Body model | Realistic muscle tones | #D4A574, #C4846C, etc. |

### Text Colors
| Element | Color | Hex Estimate |
|---------|-------|--------------|
| Primary headings | Dark charcoal | `#1A1A1A` |
| Body text | Dark gray | `#333333` |
| Muted labels | Medium gray | `#6B6B6B` |
| Inverse text (on dark cards) | White | `#FFFFFF` |

---

## TYPOGRAPHY

| Element | Font Style | Size Estimate | Weight | Color |
|---------|-----------|-------------|--------|-------|
| Patient name "James Heatfield" | Sans-serif | 20-24px | 600 | `#1A1A1A` |
| Patient details (Male, 34) | Sans-serif | 13px | 400 | `#6B6B6B` |
| Blood type/height/weight | Sans-serif | 12px | 500 | `#333333` |
| Section labels ("Vitals") | Sans-serif | 11px | 600 | `#6B6B6B` uppercase |
| Vital numbers (98, 120/60) | Sans-serif | 24-28px | 700 | `#1A1A1A` |
| Vital units | Sans-serif | 12px | 400 | `#6B6B6B` |
| Tab labels | Sans-serif | 14px | 500 | `#6B6B6B` |
| Active tab | Sans-serif | 14px |Studio 600 | `#1A1A1A` |
| Diagnosis date | Sans-serif | 12px | 400 | `#9CA3AF` |
| Diagnosis title | Sans-serif | 16-18px | 600 | `#FFFFFF` |
| Diagnosis count | Sans-serif | 12px | 500 | `#9CA3AF` |

**Font Family**: Likely Inter, SF Pro, or similar modern geometric sans-serif

---

## SPACING SYSTEM

| Element | Value |
|---------|-------|
| Page padding | 24px |
| Card border-radius | 16-20px |
| Card padding | 20-24px |
| Gap between cards | 16px |
| Sidebar width | ~320px |
| Top nav height | ~72px |
| Avatar size (top nav) | 40px |
| Avatar size (patient profile) | 80px |
| Hotspot badge size | 24-28px |
| Section vertical spacing | 24px |

---

## TOP NAVIGATION

### Patient Avatar Row (Left)
| Element | Description |
|---------|-------------|
| Active patient | Circular avatar with yellow ring indicator |
| Other patients | Circular avatars, slightly muted |
| Add patient | "+" circle button, gray background |

### Tab Navigation (Center-Right)
| Tab | Icon | State |
|-----|------|-------|
| Overview | Grid/dashboard | **Active** (yellow pill background) |
| Notes | Document | Default |
| Docs | Folder | Default |
| Labs | Flask/beaker | Default |
| Imagines | Image/scan | Default |
| Calendar | Calendar | Default |

**Active Tab Style**: Yellow/lime pill background (`#E5FF00`), black text, rounded-full

---

## LEFT SIDEBAR — PATIENT PROFILE

### Profile Header
| Element | Description |
|---------|-------------|
| Avatar | Large circular photo (~80px) |
| Name | "James Heatfield" |
| Details | "Male, 34" |
| Metadata | "A+" (blood type), "5'11 / 160" (height/weight) |

### Vitals Card
| Vital | Value | Visual