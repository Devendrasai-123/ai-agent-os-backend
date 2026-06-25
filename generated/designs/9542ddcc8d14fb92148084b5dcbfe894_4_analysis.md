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