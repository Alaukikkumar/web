import type { IconName } from "@/components/diagrams/IndustrialIcon";

export interface Principle {
  title: string;
  icon: IconName;
  lines: string[];
}

export const principles: Principle[] = [
  {
    title: "Reliability",
    icon: "shield",
    lines: ["Data should not disappear.", "Control systems should behave predictably."],
  },
  {
    title: "Traceability",
    icon: "history",
    lines: ["Every important process should be measurable and historically available."],
  },
  {
    title: "Simplicity",
    icon: "simplicity",
    lines: ["Operators should understand the system quickly."],
  },
  {
    title: "Diagnostics",
    icon: "diagnostics",
    lines: ["A good automation system should help identify why something failed."],
  },
  {
    title: "Scalability",
    icon: "scale",
    lines: ["The architecture should allow future machines, sensors and data sources."],
  },
];
