---
name: Tactile Productivity
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#684000'
  on-tertiary: '#ffffff'
  tertiary-container: '#885500'
  on-tertiary-container: '#ffd4a4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Inter
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system embodies a calm, precise, and tactile productivity workspace. It balances the quiet discipline of classic desktop stationery with the swift responsiveness of modern mobile interactions. Designed to feel lightweight yet durable, the interface removes cognitive friction while providing physical satisfaction through micro-interactions, subtle surface depths, and purposeful color signals.

The aesthetic fuses modern Scandinavian minimalism with Apple-grade tactile restraint. Interfaces rely on expansive warm-neutral canvases, balanced typographic rhythm, and physical depth cues—such as hairline inner borders, soft contact shadows, and distinct card groupings. It respects bi-directional ergonomics (supporting LTR Latin scripts like English and Dutch alongside RTL Arabic) with equal balance, ensuring no visual or semantic hierarchy is lost across locales.

## Colors

The palette establishes an uncluttered, high-legibility foundation using warm paper-like whites and deep slate text, punctuated by functional semantic accents:

- **Canvas & Surfaces:**
  - Base Background: `#F8F9FA` (Warm crisp neutral slate-50).
  - Card & Container Surface: `#FFFFFF` (Pure white for raised cards, sheets, and active states).
  - Subtle Dividing Border: `#E5E7EB` (Muted border outline for cards, dividers, and task separators).
  - Selected / Pressed Surface: `#F1F5F9` (Slate-100 micro-interactions).

- **Typography & Content Hierarchy:**
  - Primary Text: `#0F172A` (Deep slate for titles, active tasks, and primary headers).
  - Secondary Text: `#64748B` (Muted slate for subheadings, timestamps, and secondary metadata).
  - Disabled / Placeholder Text: `#94A3B8` (Soft neutral for empty states and disabled inputs).

- **Semantic & Domain Accents:**
  - Primary Action / Electric Indigo: `#4F46E5` (Interactive buttons, focused borders, active tabs, priority highlights). Deep variant `#4338CA` for active pressed states.
  - Completion Emerald: `#10B981` (Completed task checkboxes, success toast notifications, resolution tags).
  - Notes Amber: `#F59E0B` (Note cards, pinned memo markers, highlighted annotations).
  - Links Sky Blue: `#0EA5E9` (Bookmark badges, external preview cards, hyperlinked resources).

## Typography

The typography scale relies on `Inter` for Latin scripts (English and Dutch) paired seamlessly with `Noto Sans Arabic` for Arabic localized views. Both fonts share neutral neo-grotesque proportions, solid baseline geometry, and balanced x-heights, ensuring layout metric parity across language swaps.

### Multi-Language Rules & Vertical Metrics
- **English & Dutch (Inter):** Tight tracking (-0.01em to -0.02em) on headlines produces high-density, editorial polish. Dutch compound nouns require generous soft wrapping without forced hyphenation breaks.
- **Arabic (Noto Sans Arabic):** Switch font-family dynamically based on runtime locale. Scale font sizes upward by +1px for micro-labels (`label-sm` and `label-md`) and increase line-height by 15-20% across all body and headline tiers to prevent diacritical and ascender/descender clipping.
- **Numerical Alignment:** Monospaced figures (`tabular-nums` OpenType feature) must be enabled on all date, counter, time, and checkbox lists.

## Layout & Spacing

The layout model is driven by an 8pt spatial grid with dynamic safe-area compliance for mobile devices.

### Margins and Gutters
- **Mobile (<640px):** Single-column stack with `1rem` (16px) outer horizontal margins and `0.75rem` (12px) card gutters. Screen edges preserve dedicated bottom margin allowances for floating controls and tab bars (minimum 88px clearance).
- **Tablet (640px–1024px):** Split-view master-detail layout (320px sidebar for folders/lists, fluid central container for notes/tasks) with `1.5rem` (24px) gutters.
- **Desktop / Web Preview (>1024px):** Fixed maximum content width of 1140px centered, utilizing three balanced columns (Navigation, Master List, Detail Pane).

### RTL Fluidity
All horizontal spacing tokens, margins, and directional gutters reverse systematically when the Arabic locale is active:
- `margin-left` becomes `margin-right`.
- Row swipe actions mirror automatically (leading swipe completes in both directions; trailing swipe displays destructive options).

## Elevation & Depth

Visual hierarchy uses tactile physical layering rather than heavy drop shadows:

1. **Base Layer (Level 0 - Ground):** The `#F8F9FA` canvas background, flat and resting.
2. **Elevated Cards (Level 1 - Items & Lists):** Pure white (`#FFFFFF`) surfaces featuring a crisp 1px perimeter border (`#E5E7EB`) coupled with a low-opacity, diffused contact shadow: `0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)`.
3. **Interactive Overlays (Level 2 - Swiped Actions & Popovers):** Raised cards during active drag or hover state adopt: `0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)`.
4. **Modals & Bottom Sheets (Level 3 - Viewport Modals):** Pure white background with a subtle inner border highlight, resting above a 35% `#0F172A` dimmed backdrop. Box shadow: `0 -8px 30px rgba(15, 23, 42, 0.12)`.
5. **Floating Navigation & Quick Action (Level 4):** Frosted glass effect applied to the bottom navigation bar (`rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(16px)` and top border `1px solid rgba(229, 231, 235, 0.8)`).

## Shapes

The design system standardizes on a rounded, soft structural geometry:

- **Cards & Sheets (`rounded-2xl` / 16px):** Primary task cards, note preview modules, bottom sheet upper boundaries, and modal dialogues use a 16px radius for an organic, friendly form.
- **Controls & Input Shells (`rounded-lg` / 8px):** Search inputs, list chips, filter popovers, and dialog buttons use an 8px radius to retain precision.
- **Indicator Elements (`rounded-full` / 9999px):** Completion checkboxes, status pills, link badges, avatar caps, and the floating quick-add task trigger utilize true pill roundedness.

## Components

### Buttons & Interactive Controls
- **Primary Action Button:** Electric Indigo background (`#4F46E5`), white text (`#FFFFFF`), `label-lg` typography, 48px height for touch targets, with an active state of `#4338CA`.
- **Secondary / Ghost Button:** Transparent background, slate border (`#E5E7EB`), text `#0F172A`. On press, fills with `#F1F5F9`.

### Tasks & List Rows
- **Task Item Row:** White card with 1px `#E5E7EB` outline, `rounded-xl` corners. Contains a 22px circular checkbox, a task title, optional tag badges, and trailing metadata.
- **Checkbox:** Custom circular radio-style toggle. Default: 1.5px border `#CBD5E1`. When checked: fills with Emerald (`#10B981`), displays a crisp white check icon, and initiates an immediate smooth strike-through animation with a text color shift to `#94A3B8`.
- **Swipeable Cell:** Trailing swipe reveals an Indigo `#4F46E5` edit action or a Crimson `#EF4444` delete action with clean iconography. Leading swipe instantly toggles completion.

### Badges & Pill Chips
- **Link Attachment Badge:** Pill badge (`rounded-full`) with `#0EA5E9` text on a `#F0F9FF` background, preceded by an 8px link glyph.
- **Note Indicator Badge:** Warm amber tint (`#FEF3C7` background, `#B45309` text) showing note presence.
- **Tag Filter Chips:** Horizontal scrolling pill tags with 32px height. Selected state uses `#0F172A` fill with white text; unselected state uses white fill with 1px `#E5E7EB` border and `#64748B` text.

### Inputs & Search Bars
- **Search Shell:** 44px height, `#F1F5F9` background, 0px border (expands to 1px `#4F46E5` focus ring), leading slate magnifying icon, clear button at trailing edge. In RTL mode, search icon mirrors to the right.
- **Note Editor Textarea:** Borderless, distraction-free markdown canvas directly on `#FFFFFF` with customizable typography metrics and dynamic auto-growing viewport.

### Bottom Sheet & Navigation
- **Bottom Navigation Bar:** Height of 64px + safe area padding. Frosted glass (`rgba(255, 255, 255, 0.88)`), containing 3 primary section tabs (Tasks, Notes, Links) and a centered raised Floating Action Button (`#4F46E5`, 52px diameter circle) with a crisp plus icon.
- **Interactive Bottom Sheet:** Pull handle indicator (36px wide, 4px high, `#CBD5E1`, rounded-full) centered at top. Upper corners curved at 20px (`rounded-t-2xl`). Content scrolls smoothly beneath fixed header actions.