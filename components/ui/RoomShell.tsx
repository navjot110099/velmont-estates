"use client";

import { forwardRef } from "react";

type Theme = "dark" | "ink-soft" | "light";

type Props = {
  id: string;
  floor: string;
  name: string;
  theme?: Theme;
  children: React.ReactNode;
  className?: string;
  /** remove default vertical padding (for full-bleed rooms) */
  flush?: boolean;
  /** show the subtle room threshold marker */
  marker?: boolean;
};

const themeClass: Record<Theme, string> = {
  dark: "theme-dark",
  "ink-soft": "theme-ink-soft",
  light: "theme-light",
};

/**
 * A "room" — one section of the architectural journey.
 * Provides the scroll anchor, theme, rhythm, and a whisper-quiet
 * threshold marker so the room reads without a hard page break.
 */
const RoomShell = forwardRef<HTMLElement, Props>(function RoomShell(
  { id, floor, name, theme = "dark", children, className, flush, marker = true },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      data-room
      data-floor={floor}
      data-name={name}
      className={[
        "relative w-full",
        themeClass[theme],
        flush ? "" : "py-[clamp(6rem,14vh,12rem)]",
        className ?? "",
      ].join(" ")}
    >
      {marker && (
        <div className="pointer-events-none absolute left-[clamp(1.25rem,6vw,8rem)] top-10 z-10 flex items-center gap-3 opacity-40">
          <span className="eyebrow text-[0.6rem]">{floor}</span>
          <span className="h-px w-8 bg-current opacity-40" />
          <span className="eyebrow text-[0.6rem]">{name}</span>
        </div>
      )}
      {children}
    </section>
  );
});

export default RoomShell;
