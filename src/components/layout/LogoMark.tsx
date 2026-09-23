/**
 * ALAUKIK mark — "Signal Node": a device, a signal path, and a live destination.
 * Identical geometry to design/logo-options/option-01 (used on the business card).
 */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="3" />
      <path d="M20 12H36V28" stroke="currentColor" strokeWidth="3" />
      <rect x="28" y="28" width="16" height="16" style={{ fill: "var(--color-accent)" }} />
      <path d="M4 38H20" stroke="currentColor" strokeOpacity="0.45" strokeWidth="3" />
    </svg>
  );
}
