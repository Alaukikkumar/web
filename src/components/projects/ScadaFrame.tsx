import type { ReactNode } from "react";
import { DemoBadge } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";

interface ScadaFrameProps {
  screen: string;
  status: string;
  badge?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}

/** Window chrome shared by all SCADA-style demo visuals. */
export function ScadaFrame({ screen, status, badge = "Demo system", children, className, footer }: ScadaFrameProps) {
  return (
    <div className={cn("panel corner-marks flex h-full flex-col overflow-hidden", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-3 py-2.5 sm:px-4">
        <span className="label truncate text-muted">{screen}</span>
        <span className="label hidden items-center gap-2 text-accent sm:flex">
          <span className="status-dot" aria-hidden="true" />
          {status}
        </span>
      </div>
      <div className="grid-bg relative flex-1">{children}</div>
      <div className="flex items-center justify-between gap-3 border-t border-line px-3 py-2.5 sm:px-4">
        <span className="label truncate">{footer ?? "Simulated values"}</span>
        <DemoBadge>{badge}</DemoBadge>
      </div>
    </div>
  );
}
