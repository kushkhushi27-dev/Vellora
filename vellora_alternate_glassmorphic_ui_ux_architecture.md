# VELLORA DUAL DESIGN SPECIFICATION (DESIGN2.MD)
*Exact Aesthetic Replica & Visual System Architecture*

---

## 1. VISUAL SYSTEM OVERVIEW & DECONSTRUCTION

This specification captures the exact aesthetic identity of the reference image: an atmospheric, soft-focus, heavy-frosted glassmorphic interface with floating curved panels, pill-shaped navigation triggers, high-contrast imagery, and low-contrast dark charcoal glass surfaces.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FLOATING HEADER DOCK                            │
│  [🔍 Search...]  (Pill Filters)  [Course] [Education]...  (🔔) (👤 User)   │
├───────────────────┬────────────────────────────────────────────────────┤
│ LEFT FLOATING RAIL│ CENTRAL CINEMATIC HERO                             │
│ ┌───────────────┐ │ ┌────────────────────────────────────────────────┐ │
│ │ New Content   │ │ │ ATMOSPHERIC COVER ART BACKGROUND                │ │
│ │ ┌───────────┐ │ │ │ 🔥 Trending Tag                                 │ │
│ │ │ Card 1    │ │ │ │ Hero Title & Synopsis Description              │ │
│ │ └───────────┘ │ │ │ [► Start] [📖 Guidebook] [🔖]        (◄) (►)  │ │
│ └───────────────┘ │ └────────────────────────────────────────────────┘ │
│ ┌───────────────┐ │ RECOMMENDED CAROUSEL GRID                          │
│ │ Progress Rail │ │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │ │
│ │ (List Items)  │ │ │ Card 1  │ │ Card 2  │ │ Card 3  │ │ Card 4  │   │ │
│ └───────────────┘ │ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │ │
└───────────────────┴────────────────────────────────────────────────────┘
```

---

## 2. EXACT COLOR PALETTE & GLASSTOKENS

```json
{
  "canvas": {
    "background_art": "Soft-focus atmospheric background image with 40px backdrop blur",
    "overlay_dim": "rgba(10, 12, 16, 0.55)"
  },
  "glass_containers": {
    "primary_surface": "rgba(32, 36, 44, 0.55)",
    "primary_border": "rgba(255, 255, 255, 0.08)",
    "primary_blur": "blur(24px) saturate(140%)",
    "secondary_surface": "rgba(24, 28, 34, 0.70)",
    "hover_surface": "rgba(45, 52, 64, 0.65)"
  },
  "pills_and_controls": {
    "pill_inactive": "rgba(255, 255, 255, 0.12)",
    "pill_active": "#FFFFFF",
    "pill_active_text": "#0D0F12",
    "pill_inactive_text": "#E5E7EB",
    "icon_button_bg": "rgba(255, 255, 255, 0.10)"
  },
  "typography": {
    "headline": "#FFFFFF",
    "subheading": "#D1D5DB",
    "caption": "#9CA3AF"
  },
  "corner_radii": {
    "hero_banner": "28px",
    "sidebar_panel": "24px",
    "card": "20px",
    "pill": "9999px",
    "icon_button": "9999px"
  }
}
```

---

## 3. COMPONENT SPECIFICATIONS (REPLICATING REFERENCE)

### 3.1 Floating Top Header Bar

* **Search Bar**: 
  * Height: `44px`
  * Radius: `9999px` (Full Pill)
  * Background: `rgba(255, 255, 255, 0.08)`
  * Placeholder: High-legibility subtle gray `#9CA3AF` with search magnifying glass icon anchored left.
* **Category Pill Selector**:
  * Active Pill (`Course` / `Books`): White solid background (`#FFFFFF`), dark text (`#0D0F12`), full pill radius.
  * Inactive Pills (`Education`, `Creative`, `Think`, `Short`): Transparent background, text opacity `0.75`. Hover transitions to `rgba(255, 255, 255, 0.15)`.
* **User Profile & Utility Pills**:
  * Notification Button: Circular glass pill (`44px` $\times$ `44px`) with dynamic notification indicator dot.
  * Profile Chip: Asymmetric rounded pill showing user avatar, name (`unknown`), badge tag (`entrepreneur`), and dropdown arrow.

---

### 3.2 Hero Banner Component (Cinematic Spotlight)

* **Dimensions**: Height `320px`, Radius `28px`.
* **Background Surface**: High-resolution atmospheric artwork with a bottom-to-top dark gradient scrim (`linear-gradient(to top, rgba(13,15,18,0.95) 0%, rgba(13,15,18,0.2) 60%, transparent 100%)`).
* **Tags**: Floating translucent pill badges (`🔥 Trending Course` / `🔥 Featured Book`) at top-left inside hero.
* **Action Buttons**:
  * Primary Trigger (`Start` / `Read`): Solid white rounded pill button (`height: 44px`), play/action icon, dark text.
  * Secondary Trigger (`Guidebook` / `Overview`): Glass translucent pill button with white outline and icon.
  * Bookmark Button: Circular glass button.
  * Carousel Navigation Controls: Floating bottom-right circular navigation arrows (`◄` `►`).

---

### 3.3 Left Rail Panels (Vertical Cards Stack)

* **Top Panel ("New Course" / "New Books")**:
  * Translucent glass container (`rgba(32, 36, 44, 0.55)`).
  * Card Items: Landscape aspect thumbnail images (`16:9` or `3:2`) with embedded title, subtitle, and play/action circular glass button overlay.
  * Header sorting trigger: "Sort by Today" subtle text menu.
* **Bottom Panel ("Continue Progress")**:
  * List of items with square rounded thumbnails (`48px` $\times$ `48px`), title, dynamic completion percentage tag, and quick play trigger.

---

### 3.4 Grid Content Cards ("You might like")

* **Layout**: 4-column horizontal grid.
* **Card Anatomy**:
  * Top Aspect Artwork Container: Full-bleed image with rounded top corners (`20px`).
  * Floating Badges: Pill tag in upper corner (e.g., `Edit`, `Animation`, `Effect`).
  * Three-Dot Action Trigger: Floating glass circle menu at upper-right.
  * Lower Content Overlay: Dark subtle gradient housing title, author/subtext, and bottom-right circular play/view action button.

---

## 4. VELLORA FEATURE MAPPING TO THIS EXACT THEME

| Reference Component | Vellora Ecosystem Equivalent |
| :--- | :--- |
| **Top Category Pills** | Book Format Selector (`All`, `E-Books`, `Web Novels`, `Light Novels`, `Non-Fiction`) |
| **Main Hero Banner** | Spotlight Featured Book Carousel (with synopsis & start reading trigger) |
| **"New Course" Left Panel** | "Recently Added to Library" & Quick Continue Reading list |
| **"Continue Progress" Rail**| Legal Web Reader active position tracker (enabled *only* for native web reader titles) |
| **"You Might Like" Grid** | Muse AI Personalized Recommendations & Trending Book Cards |
| **Right Utility Pill** | Profile identity chip + Muse AI quick trigger dock |

---

## 5. CSS IMPLEMENTATION SNIPPETS FOR THIS AESTHETIC

```css
/* Container Surface matching reference image */
.reference-glass-card {
  background: rgba(32, 36, 44, 0.55);
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
}

/* Floating White Pill Button */
.reference-pill-active {
  background: #FFFFFF;
  color: #0D0F12;
  font-weight: 600;
  border-radius: 9999px;
  padding: 8px 20px;
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.reference-pill-active:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.25);
}

/* Inactive Glass Pill */
.reference-pill-inactive {
  background: rgba(255, 255, 255, 0.10);
  color: #E5E7EB;
  border-radius: 9999px;
  padding: 8px 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.reference-pill-inactive:hover {
  background: rgba(255, 255, 255, 0.18);
}
```