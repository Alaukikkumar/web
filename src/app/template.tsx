/** Subtle page transition — a short fade/rise on every route change. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
