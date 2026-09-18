export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="27" height="27" stroke="currentColor" strokeOpacity="0.28" />
      <rect x="5" y="5" width="6" height="6" stroke="currentColor" />
      <rect x="17" y="17" width="6" height="6" style={{ fill: "var(--color-accent)" }} />
      <path d="M11 8h6v9" stroke="currentColor" />
      <path d="M5 20h6" stroke="currentColor" strokeOpacity="0.5" />
    </svg>
  );
}
