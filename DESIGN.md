# glog Design System Specification (DESIGN.md)

This document establishes the visual identity, tokens, component invariants, and motion parameters for the glog platform.

---

## 1. Visual Atmosphere & Philosophy

- **Intentionality**: Clean, typography-first editorial style. Avoid generic purple/blue gradients or unnecessary noise.
- **Contrast & Hierarchy**: Crisp contrast ratios complying with WCAG 2.1 AA (minimum 4.5:1 for body text).
- **Spatial Rhythm**: Consistent 8px grid alignment with dynamic fluid spacing.
- **Tactile Feedback**: Subtle micro-interactions on interactive surfaces (scale 0.98 on press, smooth focus rings).

---

## 2. Color System (OKLCH Tokens)

### Theme Palette (Light / Dark Neutral Foundation)

| Token Name | Light Mode Value | Dark Mode Value | Usage |
| :--- | :--- | :--- | :--- |
| `--background` | `oklch(0.99 0.002 240)` | `oklch(0.14 0.005 240)` | Page background |
| `--foreground` | `oklch(0.18 0.010 240)` | `oklch(0.95 0.005 240)` | Primary text |
| `--card` | `oklch(0.98 0.002 240)` | `oklch(0.18 0.005 240)` | Card containers |
| `--card-foreground` | `oklch(0.18 0.010 240)` | `oklch(0.95 0.005 240)` | Text inside cards |
| `--primary` | `oklch(0.35 0.120 250)` | `oklch(0.70 0.140 250)` | Brand actions / Focus |
| `--primary-foreground` | `oklch(0.99 0 0)` | `oklch(0.12 0.01 240)` | Text on primary elements |
| `--muted` | `oklch(0.94 0.005 240)` | `oklch(0.22 0.005 240)` | Background subtle badges/inputs |
| `--muted-foreground` | `oklch(0.48 0.010 240)` | `oklch(0.68 0.010 240)` | Secondary text, meta info |
| `--border` | `oklch(0.90 0.005 240)` | `oklch(0.26 0.005 240)` | Dividers, subtle borders |
| `--ring` | `oklch(0.45 0.140 250)` | `oklch(0.65 0.140 250)` | Accessibility focus rings |

---

## 3. Typography Scale

- **Font Family**: Inter, system-ui, -apple-system, sans-serif
- **Mono Family**: JetBrains Mono, Fira Code, monospace
- **Scale**:
  - `Display / H1`: `clamp(2.25rem, 4vw, 3.25rem)` / Line height: `1.15` / Weight: `700`
  - `H2`: `clamp(1.5rem, 2.5vw, 2.0rem)` / Line height: `1.25` / Weight: `600`
  - `H3`: `1.25rem` / Line height: `1.35` / Weight: `600`
  - `Body`: `1.0rem` / Line height: `1.65` / Weight: `400`
  - `Caption / Meta`: `0.875rem` / Line height: `1.4` / Weight: `400`

---

## 4. Motion & Elevation

- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (Custom smooth elastic spring)
- **Durations**:
  - Micro-states (hover, active): `150ms`
  - Modal / Transitions: `300ms`
  - View Transitions: `400ms`
- **Elevation Shadows**:
  - Low (Cards): `0 1px 3px 0 oklch(0 0 0 / 0.05)`
  - Medium (Popovers): `0 4px 12px -2px oklch(0 0 0 / 0.1)`
  - Floating (Header): `0 8px 24px -4px oklch(0 0 0 / 0.12)`

---

## 5. Component State Requirements

All interactive elements MUST implement the following state machine rules:
1. **Default**: Clear visual visual boundaries with accessible contrast.
2. **Hover**: Smooth background tint shift or subtle elevation rise (`transform: translateY(-1px)`).
3. **Focus-Visible**: Explicit 2px offset focus ring using `--ring` for full keyboard accessibility.
4. **Active (Press)**: Tactile scale reduction (`transform: scale(0.98)`).
5. **Loading**: Pulse animatable skeleton screens preserving bounding dimensions (zero CLS).
