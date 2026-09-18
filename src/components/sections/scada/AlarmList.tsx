import { cn } from "@/lib/utils";

export interface Alarm {
  id: string;
  time: string;
  tag: string;
  message: string;
  priority: number;
  acked: boolean;
  cleared: boolean;
}

interface AlarmListProps {
  alarms: Alarm[];
  onAcknowledge: (id: string) => void;
}

export function AlarmList({ alarms, onAcknowledge }: AlarmListProps) {
  return (
    <ul className="flex flex-col divide-y divide-line border border-line bg-bg" aria-label="Demo alarm list">
      {alarms.map((alarm) => {
        const active = !alarm.acked;
        return (
          <li key={alarm.id} className={cn("flex flex-col gap-1.5 px-3 py-2.5", active && "bg-alarm/[0.07]")}>
            <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.08em]">
              <span className="flex items-center gap-2 tabular-nums text-muted">
                <span
                  aria-hidden="true"
                  className={cn("size-1.5", active ? "anim-blink bg-alarm" : alarm.cleared ? "border border-dim" : "bg-alarm/60")}
                />
                {alarm.time}
              </span>
              <span className="text-dim">P{alarm.priority}</span>
            </div>
            <p className="font-mono text-[11px] uppercase leading-snug tracking-[0.04em] text-fg">
              <span className={active ? "text-alarm" : "text-muted"}>{alarm.tag}</span> {alarm.message}
            </p>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                {alarm.acked ? (alarm.cleared ? "Cleared · Ack" : "Active · Ack") : "Active · Unack"}
              </span>
              {active && (
                <button
                  type="button"
                  onClick={() => onAcknowledge(alarm.id)}
                  className="border border-alarm/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-alarm transition-colors hover:bg-alarm hover:text-bg"
                >
                  Ack<span className="sr-only"> alarm {alarm.tag}</span>
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
