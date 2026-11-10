# VELLORA DESIGN SYSTEM & UI ARCHITECTURE

*Version 1.2.0 — Comprehensive UI/UX Design Specification & Single Source of Truth*

---

## 1. PRODUCT OVERVIEW

### 1.1 Tagline & Core Purpose

* **Tagline**: *Every story has a place in your heart.*
* **Purpose**: Vellora is an all-in-one social reading ecosystem engineered for book lovers. It unifies the content discovery and rating depth of IMDb, the reading tracking and profile identity of MyAnimeList, the fluid social interaction of Discord, the community discussions of Wattpad, and an intelligent AI recommendation companion named **Muse**.
* **Identity**: Vellora is an atmospheric digital home where readers discover stories, track journeys, participate in communities, analyze reading habits, and build a lasting reader identity.

### 1.2 Target Audience & Core Use Cases

* **Avid Readers & Bookworms**: Tracking multi-format reading journeys (e-books, web novels, light novels, non-fiction, academic literature, fanfiction) with customized shelves, statuses, and personal statistics.
* **Community Explorers**: Engaging in book-level discussion rooms, joining genre-focused reading clubs, sharing bookshelf aesthetics, and connecting with friends.
* **Story Seekers**: Discovering obscure, niche, or complex cross-genre recommendations using Muse's deep contextual understanding rather than rigid genre-tag matching.

---

## 2. DESIGN PHILOSOPHY

Vellora’s design philosophy balances **Dark Editorial Luxury**, **Modern Glassmorphism**, and **Cinematic Literary Atmosphere**.

```
    [ CINEMATIC LITERARY ATMOSPHERE ]
    - Deep, rich imagery & ambient backdrops
    - Story-driven visuals & immersive depth
                │
                ├──►  VELLORA VISUAL SYNTHESIS
                │     "A Digital Sanctuary for Readers"
                │
    [ DARK EDITORIAL LUXURY ]                 [ MODERN GLASSMORPHISM ]
    - High-contrast serif headlines           - Translucent obsidian panels
    - Refined, restrained typography           - Multi-layered background blurs
    - Muted jewel-tone accents                 - Subtle ambient glow outlines
```

* **Dark Editorial Luxury**: High-contrast serif typography for titles, generous whitespace, controlled layout hierarchy, and sophisticated dark charcoal/obsidian canvas tones (`#0A0C0E`, `#111418`).
* **Modern Glassmorphism**: Translucent container surfaces (`rgba(22, 26, 33, 0.65)`), background blurs (`20px`), and 1px soft borders (`rgba(255, 255, 255, 0.07)`).
* **Cinematic Literary Atmosphere**: High-resolution book cover artwork, dynamic soft atmospheric glows derived from active book cover palettes, and subtle paper-like textures.

---

## 3. VISUAL REFERENCE ANALYSIS

### 3.1 Reference 1: Personal Dashboard Deconstruction

* **Dark Charcoal Palette**: Layered deep background shades (`#0D0F12`, `#14171D`).
* **Atmospheric Blurred Background**: Subdued light gradients bleeding through translucent glass panels.
* **Information-Dense Cards**: Modular glass tiles displaying statistics and activity streams with refined accent indicators.
* **Sidebar Navigation**: Fixed vertical dock for primary navigation, quick shortcuts, and account controls.
* **Activity & Feed Panel**: Right-side dynamic stream for social updates and interactive notifications.

### 3.2 Reference 2: Discovery Interface Deconstruction

* **Cinematic Hero Display**: Wide-aspect hero banner featuring full-bleed artwork, gradient overlays, floating tag badges, and prominent CTA triggers.
* **Image-Driven Navigation**: Visual content tiles with rounded corners (`16px`), rich poster art, and clear metadata hierarchy.
* **Pill Filter Bars**: Floating horizontal pill selectors with backdrop blur and active highlight states.
* **Horizontal Content Carousels**: Tiered rows of discovery collections with directional scroll indicators.

### 3.3 Synthesis & Unique Identity for Vellora

* **Refined Palette**: Translucent dark obsidian glass cards with jewel-tone accent borders (`#E0A82E`, `#4E9F70`, `#8B7BB8`).
* **Book-First Geometry**: Portrait ratio (`2:3`) optimized cover display for all literature formats.
* **Elevated Typography**: Pairing clean geometric sans-serif body type (`Inter`, `Plus Jakarta Sans`) with high-contrast serif headers (`Cinzel Decorative`, `Playfair Display`).

---

## 4. VELLORA BRAND IDENTITY

### 4.1 Visual Pillars

* **Ink & Obsidian**: Rich dark foundations with translucent floating panels.
* **Illuminated Marginalia**: Soft accent lighting used strictly for focus states, streaks, and Muse interactions.
* **Literary Precision**: Crisp grid layouts, clear typographic hierarchies, and pristine spacing.

### 4.2 Tone & Voice

* **Tone**: Warm, refined, articulate, and encouraging.
* **Microcopy Framing**: Use literary framing ("Library", "Reading Journey", "Current Title", "Literary Circle"). Avoid technical jargon or excessive casual slang.

---

## 5. DESIGN PRINCIPLES

1. **Content is the Atmosphere**: Book cover art casts soft ambient background glows (`backdrop-filter: blur(40px)`, opacity `0.15`).
2. **Contextual Glass Layering**: UI elements exist on distinct optical z-planes: Canvas (`Z0`) $\rightarrow$ Glass Cards (`Z10`) $\rightarrow$ Floating Navigation (`Z20`) $\rightarrow$ Overlay Drawers & Modals (`Z30`).
3. **Zero Visual Noise**: Controls maintain low contrast (`opacity: 0.6`) until hovered or focused.
4. **Uncompromised Accessibility**: All text elements meet WCAG AAA contrast guidelines against dark glass backgrounds.

---

## 6. INFORMATION ARCHITECTURE

```
                                  ┌───────────────────────────────┐
                                  │      VELLORA ECOSYSTEM        │
                                  └──────────────┬────────────────┘
                                                 │
        ┌───────────────────┬────────────────────┼────────────────────┬───────────────────┐
        │                   │                    │                    │                   │
  ┌─────┴──────┐     ┌──────┴──────┐      ┌──────┴──────┐      ┌──────┴──────┐     ┌──────┴──────┐
  │  DISCOVER  │     │ MY HEADQUARTR│     │ MY LIBRARY  │     │   SOCIAL    │     │ METRICS & AI│
  └─────┬──────┘     └──────┬──────┘      └──────┬──────┘      └──────┬──────┘     └──────┬──────┘
        │                   │                    │                    │                   │
  ├── Featured Hero   ├── Active Reads     ├── Shelf Status     ├── Activity Feed    ├── Muse AI Chat
  ├── Genre Grid      ├── Reading Streaks  │   (5 statuses)     ├── Direct Messages  ├── Read Statistics
  ├── Recommendations ├── Personal Stats   ├── Custom Lists     ├── Communities      └── Custom Lists
  └── Collections     └── Muse Quick-Prompt└── Private Notes    ├── Reading Clubs
                                                                └── Book Discussions
```

---

## 7. SITEMAP

```
Vellora App Structure
├── Auth & Onboarding
│   ├── Landing Page (`/`)
│   ├── Login (`/login`)
│   ├── Register (`/register`)
│   ├── Password Recovery (`/forgot-password`)
│   └── Onboarding Flow (`/onboarding`)
├── Core Application (Authenticated Frame)
│   ├── Home Dashboard (`/dashboard`)
│   ├── Discover (`/discover`)
│   │   ├── Genre Explorer (`/discover/genres`)
│   │   └── Collection Detail (`/discover/collection/:id`)
│   ├── Book Detail (`/book/:id`)
│   │   ├── Editions & Versions (`/book/:id/editions`)
│   │   ├── Book Discussion Room (`/book/:id/discussion`)
│   │   └── Suggest Edit / Catalog Workflow (`/book/:id/suggest-edit`)
│   ├── Legal Web Reader (`/read/:bookId`)
│   ├── Muse AI Companion (`/muse`)
│   ├── My Library (`/library`)
│   ├── Reader Profile (`/profile/:username`)
│   │   └── Custom Lists (`/profile/:username/lists`)
│   ├── Social Feed (`/feed`)
│   ├── Friends & Messages (`/messages`)
│   │   └── Direct / Group Thread (`/messages/:threadId`)
│   ├── Communities (`/communities`)
│   │   └── Community Detail (`/communities/:id`)
│   ├── Reading Clubs (`/clubs`)
│   │   └── Club Detail (`/clubs/:id`)
│   ├── Global Search Modal (`/search`)
│   ├── Notifications Center (`/notifications`)
│   └── Settings & Privacy (`/settings`)
└── Catalog Administration & Moderation
    └── Admin Portal (`/admin`)
```

---

## 8. USER ROLES AND FEATURE PERMISSIONS matrix

### 8.1 Confirmed Requirements Matrix

| Feature Area | Guest / Unauthenticated | Registered Reader | Community Owner | Platform Admin |
| :--- | :--- | :--- | :--- | :--- |
| **Catalog Access & Search** | Public view only | Full search + custom filters | Full search + custom filters | Full search + catalog audit tools |
| **Book Rating & Review** | Read reviews only | Submit rating (1–10, 0.5 steps) & reviews | Submit rating & reviews | Moderate & manage reported content |
| **Personal Library** | Prompted to authenticate | Full tracking across 5 statuses | Full tracking across 5 statuses | N/A |
| **Community Operations** | View public hubs | Join hubs / Create if account eligible | Manage channels & membership | Platform-wide moderation |
| **Muse AI Assistant** | Feature preview card | Interactive chat (explicit permission required) | Interactive chat (explicit permission required) | System prompt & safety management |
| **Catalog Contribution** | View catalog | Submit missing books & metadata edits | Submit missing books & metadata edits | Approve/reject submissions & merge duplicates |

### 8.2 Optional Design Recommendations vs. Confirmed Requirements

* **Confirmed Requirements (Mandatory)**:
  * 10-point rating system supporting 0.5 increments.
  * Reading progress (scroll position / completion %) enabled **only** for legally free books read directly in Vellora's Web Reader.
  * Zero automatic progress tracking for external, physical, or third-party titles.
  * Reading Clubs function strictly at the book level with overall book completion targets.
  * Exactly 2 Community Roles: `Owner` and `Member`.
  * Muse AI requires explicit permissions before accessing user library data or reviews.
  * Mandatory spoiler shields for Muse outputs and discussion threads.
* **Optional Design Recommendations (UI Preferences)**:
  * Ambient dynamic cover illumination (`backdrop-filter: blur(40px)`).
  * Quick-prompt glass tile placement on the Dashboard visual layout.
  * Keyboard shortcut `Cmd + K` trigger for the Global Search drawer.

---

## 9. PAGE-BY-PAGE UI SPECIFICATIONS

---

### 10. AUTHENTICATION & ONBOARDING

#### 10.1 Landing Page (`/`)
* **Purpose**: Introduce Vellora’s core pillars—Discovery, Library, Social, and Muse AI—with high visual impact.
* **Layout**: Full-screen cinematic hero banner with background particle/paper grain effect. Scrollable sections highlighting feature pillars, visual showcase cards, and call-to-action buttons.
* **Components**: Hero Glass CTA Card, Feature Interactive Tabs, Global Reader Testimonial Carousel, Footer with Legal & Social links.
* **Interactions**: CTA triggers modal login/register drawers without full-page redirect.

#### 10.2 Login & Registration (`/login`, `/register`)
* **Purpose**: Seamless user authentication with security and social sign-on options.
* **Layout**: Split-screen design. Left: Ambient full-bleed literary artwork overlay. Right: Centered dark glass panel housing auth forms (`max-width: 440px`).
* **Components**: Tab selector (Login / Register), Google OAuth Button, Email/Password Input Fields, Password Visibility Toggle, "Forgot Password?" trigger.
* **Form Validation**: Inline validation displaying subtle red error messaging (`#D9534F`) below inputs on blur.

#### 10.3 Password Recovery (`/forgot-password`)
* **Purpose**: Secure password reset flow.
* **Layout**: Centered glass card (`max-width: 440px`) with step progress indicator (Request Link $\rightarrow$ Check Email $\rightarrow$ Set New Password).

#### 10.4 Onboarding Flow (`/onboarding`)
* **Purpose**: Capture reading preferences, favorite genres, tropes, and initial profile setup to seed recommendations.
* **Layout**: Stepped wizard layout (3 steps) with progress bar at top header.
  * **Step 1: Reading Formats**: Multi-select pills (E-books, Web Novels, Light Novels, Academic, Non-Fiction, Fanfiction).
  * **Step 2: Genre & Trope Matrix**: Interactive grid of visual cards (High Fantasy, Morally Grey, Cyberpunk, Cozy Mystery, Enemies-to-Lovers).
  * **Step 3: Initial Profile Setup**: Avatar upload, display name, bio snippet, and privacy baseline selection.
* **Interactions**: Smooth slide transition between steps. "Skip for now" option available on profile step.

---

### 11. HOME DASHBOARD (`/dashboard`)

#### 11.1 Purpose
The personal headquarters for the reader, providing an instant view of active reads, overall completion status, streak tracking, recent social updates, and direct Muse access.

#### 11.2 ASCII Layout Wireframe

```
┌──────┬──────────────────────────────────────────────┬─────────────────────────┐
│ NAV  │ WELCOME BACK, {User Display Name}           │ SOCIAL & ACTIVITY FEED  │
│      │ [ Literary Quote Glass Card               ]  │ ┌─────────────────────┐ │
│ [D]  ├──────────────────────────────────────────────┤ │ {User Avatar}       │ │
│ Home │ CURRENTLY READING                            │ │ updated status on   │ │
│      │ ┌──────────┐ Title: {Active Book Title}      │ │ {Book Title}        │ │
│ [E]  │ │ COVER    │ Status: Currently Reading        │ └─────────────────────┘ │
│ Disc │ │ ART      │ Completion: [ Overall % Bar ]    │ ┌─────────────────────┐ │
│      │ └──────────┘ (Enabled ONLY for Legal Reader) │ │ {User Avatar} rated │ │
│ [L]  ├──────────────────────┬───────────────────────┤ │ {Book Title} 8.5/10 │ │
│ Libr │ STATS AT A GLANCE    │ MUSE QUICK PROMPT     │ └─────────────────────┘ │
│      │ ┌──────────────────┐ │ ┌───────────────────┐ │ LEADERBOARD (CLUBS)     │
│ [M]  │ │ {Books Read}     │ │ │ "Recommend a..."  │ │ ┌─────────────────────┐ │
│ Muse │ ├──────────────────┤ │ └───────────────────┘ │ │ 1. {User Name}        │ │
│      │ │ {Reading Streak} │ │ [ Ask Muse Prompt ]   │ │ 2. {User Name}        │ │
│      │ └──────────────────┘ │                       │ └─────────────────────┘ │
└──────┴──────────────────────┴───────────────────────┴─────────────────────────┘
```

#### 11.3 Key Rules & Components
* **Active Book Spotlight Card**: Displays cover artwork, overall reading status, and quick update action. **Progress bar tracking (reading position / completion %) is strictly enabled ONLY for legally free titles read directly through Vellora's Web Reader.** Physical or third-party titles display status tags (`Currently Reading`, `Completed`, etc.) and start/completion dates without numerical progress bars.
* **Metrics Cards**: Display user-specific dynamic reading statistics (Total books completed, active streak count, annual book goal).
* **Muse Quick Prompt Tile**: Input field allowing immediate query submission to Muse.
* **Activity Stream (Right Rail)**: Live feed of friends' public status updates and club activity rankings.

---

### 12. EXPLORE AND DISCOVER (`/discover`)

#### 12.1 Purpose
Visual discovery interface for browsing titles, curated collections, trending books, genres, and community recommendations.

#### 12.2 Layout & Hierarchy
* **Hero Carousel**: Full-width cinematic banner featuring curated spotlights with backdrop lighting, genre badges, dynamic score rating (`{Score}/10`), synopsis overlay, and "Add to Library" dropdown trigger.
* **Category Pill Dock**: Translucent horizontal scrolling bar with options: `[ All ]`, `[ E-Books ]`, `[ Web Novels ]`, `[ Light Novels ]`, `[ Fanfiction ]`, `[ Academic ]`, `[ Non-Fiction ]`.
* **Dynamic Recommendation Rows**:
  * *Trending Literature*: High-engagement titles across the platform.
  * *Popular Tropes & Moods*: Visual card grid for trope-based browsing.
  * *Friends are Reading*: Titles currently in friends' active shelves.
  * *Hidden Gems*: Community-curated high-rated titles with lower visibility metrics.
  * *Curated Collections*: Thematic editorial lists (e.g., "Atmospheric Winter Fantasies").

---

### 13. INDIVIDUAL BOOK PAGE (`/book/:id`)

#### 13.1 Purpose
The definitive canonical page for a book, detailing synopsis, tropes, community ratings, editions/translations, legal purchase/reading availability, user reviews, and access to book discussion rooms.

#### 13.2 ASCII Layout Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ BANNER: Dynamic blur overlay derived from cover color palette                │
│ ┌──────────┐  TITLE: {Book Title}                                            │
│ │ COVER    │  Author: {Author Name} • Published: {Year}                      │
│ │ ART      │  Community Rating: ★ {Score}/10 ({Rating Count} reviews)          │
│ │          │  [ Add to Shelf ▾ ] [ Rate: ★ 8.5/10 ] [ Discussion Room ]       │
│ └──────────┘  Genres: [ Tag 1 ] [ Tag 2 ] [ Tag 3 ]                          │
├──────────────────────────────┬───────────────────────────────────────────────┤
│ SYNOPSIS & METADATA          │ EDITIONS & TRANSLATIONS                       │
│ {Full Synopsis Text}         │ ├── {Edition Title 1} ({Format})              │
│                              │ ├── {Edition Title 2} ({Language})            │
│ Tropes: [ Trope 1 ] [ Trope 2│ └─ [ Suggest Metadata Correction / Missing ]  │
│                              ├───────────────────────────────────────────────┤
│ Legal Availability:          │ COMMUNITY REVIEWS & RATINGS                   │
│ [ Buy Link ] [ Web Reader ]  │ Sort: [ Top ] [ Recent ] [ Filter Ratings ▾ ] │
│                              │ ┌───────────────────────────────────────────┐ │
│ Catalog Action:              │ │ {User Avatar} ★ 8.5/10                    │ │
│ [ Report Issue / Suggest ]   │ │ {Review Body Text}                        │ │
└──────────────────────────────┴───────────────────────────────────────────────┘
```

#### 13.3 Edition & Catalog Management Workflow
* **Editions & Versions Sub-Panel**: Multiple format printings, digital releases, audiobooks, and authorized translations are explicitly consolidated under a single primary book page entity.
* **Catalog Suggestion Trigger**: Users can click `[ Suggest Metadata Edit ]` or `[ Report Missing Edition ]` to open a submission drawer. Submissions are queued for admin review.

---

### 14. PERSONAL LIBRARY AND READING TRACKER (`/library`)

#### 14.1 Purpose
Comprehensive management of the user's reading collections, shelf statuses, private notes, and custom lists.

#### 14.2 Structure & Features
* **Primary Status Shelves**:
  1. `Currently Reading`
  2. `Completed`
  3. `Plan to Read`
  4. `On Hold`
  5. `Dropped`
* **Custom Shelves & Lists**: Users can create tagged collections (e.g., "Favorites of 2026", "Cozy Weekend Reads").
* **Shelf Data Table / Grid View**: Toggle between a visual cover grid (`2:3` ratio) and a dense data table displaying title, author, user rating, start date, completion date, and quick action menus.
* **Private Notes**: Inline expandable text drawer for storing personal, non-public reading notes per book.

---

### 15. WEB-BASED READING INTERFACE (`/read/:bookId`)

#### 15.1 Purpose
Distraction-free, responsive reading interface designed exclusively for legally available free or public-domain books and authorized web novels.

#### 15.2 Controls & Typography Customization
* **Typography Controls Floating Bar**:
  * Font Selection: `Merriweather` (Serif), `Literata` (Editorial Serif), `Inter` (Sans-Serif), `OpenDyslexic` (Accessibility).
  * Font Size Adjuster: `14px` to `26px` dynamic scale.
  * Line Height: `1.4`, `1.6`, `1.8`, `2.0`.
  * Column Width Constraint: `60ch`, `70ch`, `80ch`, or Full Width.
* **Theme Modes**:
  * *Obsidian*: Dark `#0A0C0E` background with `#E5E7EB` text.
  * *Sepia*: Warm `#181512` dark sepia background with `#D1C7BD` text.
  * *Midnight Slate*: `#0F172A` background with `#94A3B8` text.
* **Reading Progress & Annotations**:
  * Real-time overall completion percentage indicator and reading timer.
  * Highlight text to create personal annotations, bookmarks, or saved quote snippets.
  * Distraction-Free Toggle: Hides all UI chrome and navigation overlays.

---

### 16. MUSE — AI READING COMPANION (`/muse`)

#### 16.1 Purpose
Dedicated natural language AI recommendation center and reading assistant with explicit data privacy controls and mandatory spoiler shields.

#### 16.2 ASCII Layout Wireframe

```
┌──────────────────────────────┬───────────────────────────────────────────────┐
│ MUSE AI CONVERSATIONS        │ CONVERSATION SESSION                          │
│ ┌──────────────────────────┐ │ ┌───────────────────────────────────────────┐ │
│ │ + New Prompt Thread      │ │ │ Muse: Greetings. How can I assist your    │ │
│ ├──────────────────────────┤ │ │ literary journey today?                   │ │
│ │ Thread 1                 │ │ └───────────────────────────────────────────┘ │
│ │ Thread 2                 │ │ ┌───────────────────────────────────────────┐ │
│ └──────────────────────────┘ │ │ User: I am looking for a dark mystery...  │ │
│                              │ └───────────────────────────────────────────┘ │
│ ┌──────────────────────────┐ │ ┌───────────────────────────────────────────┐ │
│ │ PERMISSION SCOPE DOCK    │ │ │ Muse: [ Recommended Title Card ]          │ │
│ │ Library Access: [ ON/OFF]│ │ │ [ Spoilers Hidden Block - Click to Reveal]│ │
│ │ Reviews Access: [ ON/OFF]│ │ └───────────────────────────────────────────┘ │
│ └──────────────────────────┘ ├───────────────────────────────────────────────┤
│                              │ [ Enter prompt...                    ] [Send] │
└──────────────────────────────┴───────────────────────────────────────────────┘
```

#### 16.3 Explicit Data Privacy & Spoiler Controls
* **Permission Scope Settings (Mandatory)**:
  * Muse **cannot** access private reading history, ratings, reviews, or shelves without explicit user toggles.
  * Scope Toggles: `[ Allow Library Access ]`, `[ Allow Rating History Access ]`, `[ Allow Private Notes Access ]`. Users can revoke permissions at any time.
* **Spoiler Safeguard Guarantee**:
  * Spoilers are **never** revealed automatically. Any potential plot point generated by Muse is rendered inside a blurred glass shield labeled `[ SPOILER CONTENT — Click to reveal ]`.

---

### 17. SOCIAL PROFILES (`/profile/:username`)

#### 17.1 Purpose
Customizable reader identity hub showcasing reading statistics, favorite books, shelves, reviews, and community involvement.

#### 17.2 Profile Privacy Controls
Users have granular control over section visibility:
* `Reading Activity Visibility`: `[ Public | Friends Only | Private ]`
* `Library Shelves Visibility`: `[ Public | Friends Only | Private ]`
* `Reviews & Ratings Visibility`: `[ Public | Friends Only | Private ]`
* `Stats & Streaks Visibility`: `[ Public | Friends Only | Private ]`

#### 17.3 Components
* Profile Header: Avatar, dynamic ambient blur banner, display name, user handle, bio text, and Friend Request / Follow action buttons.
* Shelf Highlight Showcase: Featured 4 favorite titles.
* Activity Matrix: Historical breakdown of reading trends and activity metrics (if visible).

---

### 18. SOCIAL FEED (`/feed`)

#### 18.1 Purpose
Community-driven activity feed for organic interactions, status updates, physical bookshelf photos, quote shares, and reviews.

#### 18.2 Interaction & Anti-Spam Guidelines
* **Organic Activity Only**: Routine automated system changes are **not** posted to the feed. Only intentional user posts, written reviews, and manual milestone announcements appear.
* **Post Components**: Author header, post body (markdown supported), optional image attachments (bookshelf pictures), inline book preview card, interaction bar (Like, Comment, Share, Quote).
* **Comment & Reply Threading**: Nested comment blocks with inline reply triggers and spoiler tags.

---

### 19. FRIENDS AND MESSAGING (`/messages`)

#### 19.1 Purpose
Social connections management, direct messaging, and group chat channels without complex server clutter.

#### 19.2 Features & Sub-Panels
* **Connection Management**: Separate tabs for `Friend Requests`, `Friends List`, and `Following / Followers`.
* **Direct & Group Messaging**:
  * Dual-pane messaging frame (Thread list on left, conversation on right).
  * Chat types: 1-on-1 Direct Messages, Custom Private Group Chats, Genre Discussion Groups, and Temporary Reading Group Chats.
* **Message Features**: Book attachment cards, inline emoji reactions, message replies, and user blocking/muting controls.

---

### 20. COMMUNITIES (`/communities`)

#### 20.1 Purpose
Interest-based hubs focused on genres, tropes, authors, or literary fandoms.

#### 20.2 Strict Role Architecture
* **Supported Community Roles**: Exactly **two** roles exist at the community level:
  1. **Owner**: Community creator with full control over settings, member management, and channels.
  2. **Member**: Registered participant with access to discussion channels, group posts, and member lists.
* *Constraint*: Additional community roles are strictly excluded.

#### 20.3 Components
* Community Header Banner, Member List Drawer, Discussion Channels Sidebar, Announcements Board, Public/Private Join Trigger.

---

### 21. BOOK DISCUSSION ROOMS (`/book/:id/discussion`)

#### 21.1 Purpose
Dedicated book-level discussion space organized around overarching themes, theories, character analysis, and fan discussions.

#### 21.2 Rules & Features
* **Book-Level Focus**: Discussion is organized around the overall book identity.
* **Discussion Threads & Filters**:
  * Categories: `[ General Discussion ]`, `[ Theories & Predictions ]`, `[ Character Analysis ]`, `[ Fan Discussions & Art ]`, `[ Polls ]`.
* **Spoiler Controls**: Users must flag spoiler posts. Spoiler content is rendered inside a dark blurred container (`backdrop-filter: blur(8px)`) requiring an explicit click to uncover.
* **Interactions**: Upvote/downvote, comment replies, inline polls, emoji reactions.

---

### 22. READING CLUBS (`/clubs`)

#### 22.1 Purpose
Collaborative reading circles where readers select a book and read together at a shared pace.

#### 22.2 Book-Level Execution
* **Book-Level Rules**: Reading clubs operate strictly at the **book level** around target book completion dates.
* **Club Structure**:
  * Active Selection: Featured title card.
  * Start & Target Completion Dates.
  * Club Live Discussion Thread: Group discussion for members reading the selected title.
  * Member Roster: Avatars of all participating readers.
  * Club Polls: Voting for next month's book selection.

---

### 23. REVIEWS AND RATINGS

#### 23.1 Rating System
* **10-Point Scale**: Full 1–10 rating scale supporting half-point increments (e.g., 0.5, 1.0, ..., 8.5, 9.0, 9.5, 10.0).
* **Universal Submission Rule**: Any registered user can submit a rating and review for any catalog item at any time. Ratings are **not restricted** to completed titles.

#### 23.2 Components
* Review Input Form: Star/numeric slider (0.5 steps), text area with markdown formatting, explicit `[ Contains Spoilers ]` checkbox toggle.
* Community Review Card: Rating badge, author info, written body, spoiler shield (if flagged), helpfulness voting (`[ Helpful ({Count}) ]`), inline replies.

---

### 24. SEARCH EXPERIENCE (`/search`)

#### 24.1 Universal Search Command Palette
* Triggered via global header search input or `Cmd + K` / `Ctrl + K`.
* Modal overlay containing real-time search suggestions across categories:
  * `[ All ]`, `[ Books ]`, `[ Authors ]`, `[ Tropes & Genres ]`, `[ Users ]`, `[ Communities ]`, `[ Reading Clubs ]`.
* Filter Drawer: Year range, rating threshold, format type (e-book, web novel, etc.), tag inclusions/exclusions.

---

### 25. NOTIFICATIONS (`/notifications`)

#### 25.1 Center & Rules
* Accessible via top header bell icon with unread counter pill.
* **Supported Notification Triggers**: Direct messages, friend requests, mentions, review comments, community updates, reading club announcements, and administrative notes.
* **Anti-Spam Constraint**: Automatic friend-completion notifications are excluded to prevent feed clutter.

---

### 26. SETTINGS AND PRIVACY (`/settings`)

#### 26.1 Configuration Panes
1. **Account Settings**: Email, password update, username display.
2. **Profile & Visuals**: Banner image, avatar crop, bio, favorite shelf selection.
3. **Privacy Controls**: Granular visibility dropdowns for activity feed, library shelves, reviews, and reading stats.
4. **Muse AI Permissions**: Explicit toggles for library data access, rating access, and spoiler display defaults.
5. **Notifications**: Push & email toggles categorized by activity type.
6. **Safety & Moderation**: Blocked users list and muted accounts drawer.

---

### 27. ADMINISTRATION AND CATALOG WORKFLOW (`/admin`)

#### 27.1 Purpose
Administrative portal for catalog curation, edit approvals, duplicate resolution, and platform-wide moderation.

#### 27.2 Catalog Management Workflow
* **Missing Book Suggestions Queue**: Submissions from users for new catalog entries reviewed by administrators before public listing.
* **Metadata Correction Queue**: Submissions for title, author, synopsis, or cover updates. Admins review visual side-by-side diffs to accept or reject edits.
* **Duplicate Detection & Edition Merger**: Tools allowing admins to merge duplicate listings into a single canonical book item with mapped editions.
* **Reported Content Queue**: Reviews, comments, and community threads flagged by users for policy violations.

---

## 28. COMPLETE DESIGN TOKEN SYSTEM

```json
{
  "color": {
    "background": {
      "primary": "#0A0C0E",
      "secondary": "#111418",
      "tertiary": "#181C22"
    },
    "surface": {
      "glass": "rgba(22, 26, 33, 0.65)",
      "glass-hover": "rgba(30, 35, 45, 0.75)",
      "elevated": "rgba(35, 41, 53, 0.85)"
    },
    "border": {
      "subtle": "rgba(255, 255, 255, 0.07)",
      "medium": "rgba(255, 255, 255, 0.14)",
      "focus": "rgba(224, 168, 46, 0.5)"
    },
    "text": {
      "primary": "#F3F4F6",
      "secondary": "#9CA3AF",
      "muted": "#6B7280"
    },
    "accent": {
      "gold": "#E0A82E",
      "gold-glow": "rgba(224, 168, 46, 0.15)",
      "emerald": "#4E9F70",
      "amethyst": "#8B7BB8",
      "crimson": "#D9534F"
    }
  },
  "blur": {
    "glass": "20px",
    "backdrop": "40px"
  },
  "radius": {
    "sm": "8px",
    "md": "12px",
    "lg": "18px",
    "full": "9999px"
  }
}
```

---

## 29. TYPOGRAPHY SYSTEM

| Role | Font Family | Size | Weight | Line Height |
| :--- | :--- | :--- | :--- | :--- |
| **Display Title** | `Cinzel Decorative`, serif | 40px | 700 | 1.1 |
| **Section Headline** | `Playfair Display`, serif | 28px | 600 | 1.2 |
| **Card Header** | `Plus Jakarta Sans`, sans-serif | 18px | 600 | 1.3 |
| **Body Text** | `Inter`, sans-serif | 15px | 400 | 1.5 |
| **Reading Reader Text** | `Merriweather`, serif | 18px | 400 | 1.7 |
| **UI Caption / Tag** | `Plus Jakarta Sans`, sans-serif | 12px | 500 | 1.4 |

---

## 30. COMPONENT LIBRARY SPECIFICATIONS

### 30.1 Glass Panel Containers

```css
.vellora-glass-panel {
  background: rgba(22, 26, 33, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

### 30.2 Primary Action Button

```css
.vellora-button-primary {
  background: linear-gradient(135deg, #E0A82E 0%, #C58F1B 100%);
  color: #0A0C0E;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  border-radius: 9999px;
  padding: 12px 24px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.vellora-button-primary:hover {
  box-shadow: 0 0 20px rgba(224, 168, 46, 0.4);
  transform: translateY(-1px);
}
```

### 30.3 Spoiler Blur Shield Component

```css
.vellora-spoiler-shield {
  background: rgba(15, 17, 21, 0.85);
  backdrop-filter: blur(12px);
  border: 1px dashed rgba(224, 168, 46, 0.3);
  border-radius: 8px;
  cursor: pointer;
  color: #E0A82E;
  transition: all 0.2s ease;
}
```

---

## 31. INTERACTION AND ANIMATION GUIDELINES

* **Easing**: Micro-interactions use standardized physics-based easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
* **Hover Micro-Interactions**: Book cards scale up (`scale(1.03)`) with dynamic cover ambient glow generation.
* **Modal Transitions**: Fade-in combined with standard vertical scale translation (from `95%` to `100%`).

---

## 32. RESPONSIVE DESIGN RULES

```
Breakpoint Architecture:
- Mobile:       < 768px   (Single column view, collapsible drawer menus, bottom navigation dock)
- Tablet:       768px - 1024px (2-column layout, left sidebar collapses into icon dock)
- Desktop:      1025px - 1440px (Full 3-column asymmetric layout)
- Ultra-Wide:   > 1440px  (Max-width capped container 1600px centered)
```

---

## 33. ACCESSIBILITY GUIDELINES

* **Color Contrast**: Primary text (`#F3F4F6`) over background glass panels achieves WCAG AAA ratings (> 8.5:1).
* **Focus States**: High-visibility double-ring focus indicator (`2px ring offset 2px #E0A82E`).
* **Keyboard Navigation**: Native tab ordering across forms, cards, drawers, and search modals.

---

## 34. EMPTY, LOADING AND ERROR STATES

* **Skeleton Loaders**: Dark glass pulse overlays matching book card ratios (`2:3`) and stat tile geometry.
* **Empty States**: Atmospheric literary illustrations paired with action triggers (e.g., "Your library is empty. Discover your next story").
* **Error Notifications**: Subtle glass toast banners with action retry controls.

---

## 35. DESIGN CONSISTENCY RULES

1. Never use pure white (`#FFFFFF`) for background container surfaces.
2. Every overlay window or floating drawer must incorporate a background backdrop blur.
3. Book cover containers must strictly enforce a standard `2:3` aspect ratio.
4. Accent colors are reserved for status callouts, progress tracking, primary triggers, and active indicators.

---

## 36. OPEN PRODUCT DESIGN QUESTIONS

| ID | Topic | Description & Options | Status |
| :--- | :--- | :--- | :--- |
| **OPQ-01** | **Chapter-Specific Discussion Rooms** | Whether to enable chapter-by-chapter discussion sub-threads inside the Web Reader for authorized web novels, or keep all discussions strictly at the overall book level. | **Unresolved Decision** |
| **OPQ-02** | **Reading Goal Format** | Should annual reading goals be based solely on completed book counts or offer an optional total page count goal for web reader titles? | **Unresolved UI pattern** |
| **OPQ-03** | **Co-Authored Books** | UI display standard for books with more than 3 primary authors/contributors on compact book cards. | **Unresolved UI pattern** |
| **OPQ-04** | **Offline Web Reader** | Design specification for handling offline caching indicators in the Web Reader interface. | **Unresolved UI pattern** |