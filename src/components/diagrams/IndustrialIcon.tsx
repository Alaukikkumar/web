import type { ReactNode, SVGProps } from "react";

/**
 * Line-based industrial glyphs drawn on a 24×24 engineering grid.
 * Stroke-only so they inherit colour and read like technical drawings.
 */
const glyphs = {
  sensor: (
    <>
      <circle cx="12" cy="8" r="5" />
      <path d="M9.5 8h5M12 13v8M8 21h8" />
      <path d="M12 5.5v1" />
    </>
  ),
  plc: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M8 4v16M13 4v16M3 8h18" />
      <path d="M5 11h1M5 14h1M10 11h1M10 14h1M15.5 11h3M15.5 14h3M15.5 17h3" />
    </>
  ),
  network: (
    <>
      <rect x="9" y="3" width="6" height="5" rx="0.5" />
      <rect x="2.5" y="16" width="6" height="5" rx="0.5" />
      <rect x="15.5" y="16" width="6" height="5" rx="0.5" />
      <path d="M12 8v4M5.5 16v-4h13v4" />
    </>
  ),
  scada: (
    <>
      <rect x="2.5" y="3.5" width="19" height="13" rx="1" />
      <path d="M8 21h8M12 16.5V21" />
      <path d="M5.5 13l3-3.5 3 2 3.5-4.5 3.5 3" />
    </>
  ),
  hmi: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <rect x="6" y="6" width="12" height="7" />
      <circle cx="8.5" cy="17" r="1.2" />
      <path d="M12.5 17h5" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
      <path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13" />
      <path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5" />
    </>
  ),
  report: (
    <>
      <path d="M6 2.5h8.5L19 7v14.5H6z" />
      <path d="M14 2.5V7h5" />
      <path d="M9 12h7M9 15h7M9 18h4" />
    </>
  ),
  notify: (
    <>
      <path d="M21.5 3 2.5 10.5l7 2.5 2.5 7z" />
      <path d="M21.5 3 9.5 13" />
    </>
  ),
  decision: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  meter: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="1" />
      <rect x="7" y="5.5" width="10" height="5" />
      <path d="M9 8h1M12 8h1M15 8h.01" />
      <path d="M8 17a4 4 0 0 1 8 0M12 17l2-2.5" />
    </>
  ),
  vfd: (
    <>
      <rect x="5" y="2.5" width="14" height="19" rx="1" />
      <path d="M8 8c1-2 2-2 3 0s2 2 3 0" />
      <path d="M8 13.5h8M8 16.5h3M14.5 16.5h1.5" />
    </>
  ),
  motor: (
    <>
      <circle cx="11" cy="12" r="7" />
      <path d="M8 15V9l3 4 3-4v6" />
      <path d="M18 12h4" />
    </>
  ),
  tank: (
    <>
      <path d="M5 5c0-1.4 3.1-2.5 7-2.5S19 3.6 19 5v14c0 1.4-3.1 2.5-7 2.5S5 20.4 5 19z" />
      <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" strokeDasharray="2 2" />
    </>
  ),
  valve: (
    <>
      <path d="M3 8v8l9-4zM21 8v8l-9-4z" />
      <path d="M12 12V5M9 5h6" />
    </>
  ),
  panel: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="0.5" />
      <path d="M4 8h16M7 5.25h2M15 5.25h2" />
      <path d="M7 11v2M10 11v2M13 11v2M16 11v2M7 16h10M7 18.5h10" />
    </>
  ),
  gateway: (
    <>
      <rect x="3" y="9" width="18" height="8" rx="1" />
      <path d="M7 13h.01M10 13h.01M13 13h4" />
      <path d="M7 9V5M17 9V5M5 5h4M15 5h4" />
    </>
  ),
  rectifier: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M7 12h3M14 12h3M10 8.5v7l4-3.5zM14 8.5v7" />
    </>
  ),
  thermometer: (
    <>
      <path d="M10 14.5V4a2 2 0 0 1 4 0v10.5a4 4 0 1 1-4 0z" />
      <path d="M12 9v7" />
      <path d="M16.5 6h2M16.5 9h2" />
    </>
  ),
  flow: (
    <>
      <path d="M2 9h14M2 15h14" />
      <path d="M13 5.5 17 9l-4 3.5M20 11.5l2 3.5-2 3.5" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18.5h10.5a4 4 0 0 0 .5-8 6 6 0 0 0-11.6 1.2A3.5 3.5 0 0 0 7 18.5z" />
      <path d="M12 12v4M10 14l2 2 2-2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4 5.5v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10v-6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  history: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6" />
      <path d="M3 3v4h4" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  simplicity: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M7 12h10" />
    </>
  ),
  diagnostics: (
    <>
      <path d="M2 12h4l2-5 4 10 2.5-7 1.5 2H22" />
    </>
  ),
  scale: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" strokeDasharray="2 2" />
      <rect x="3" y="14" width="7" height="7" strokeDasharray="2 2" />
      <rect x="14" y="14" width="7" height="7" strokeDasharray="2 2" />
    </>
  ),
  factory: (
    <>
      <path d="M2.5 21V11l5 3V11l5 3V11l5 3V4h4v17z" />
      <path d="M6 18h2M11 18h2M16 18h2" />
    </>
  ),
  blower: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 12c0-3 1.5-5 4-5M12 12c2.6 1.5 3.4 3.8 2.2 6M12 12c-2.6 1.5-5 1.2-6.4-.8" />
    </>
  ),
  code: (
    <>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof glyphs;

interface IndustrialIconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  title?: string;
}

export function IndustrialIcon({ name, size = 24, title, strokeWidth = 1.4, ...rest }: IndustrialIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...rest}
    >
      {glyphs[name]}
    </svg>
  );
}
