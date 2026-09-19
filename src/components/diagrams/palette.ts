/**
 * Theme-aware colours for inline SVG drawings (SCADA mimics, SLD, P&ID).
 * Values are CSS variables, so the same markup renders correctly in dark and light themes.
 */
const mix = (token: string, percent: number) => `color-mix(in srgb, var(--color-${token}) ${percent}%, transparent)`;

export const C = {
  fg: "var(--color-fg)",
  muted: "var(--color-muted)",
  dim: "var(--color-dim)",
  accent: "var(--color-accent)",
  alarm: "var(--color-alarm)",
  bg: "var(--color-bg)",
  surface: "var(--color-surface)",
  /** Foreground at a given opacity (0–100) — lines, pipes, grid. */
  fgA: (percent: number) => mix("fg", percent),
  accentA: (percent: number) => mix("accent", percent),
  alarmA: (percent: number) => mix("alarm", percent),
} as const;
