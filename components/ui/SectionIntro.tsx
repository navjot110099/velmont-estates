"use client";

import RevealText from "./RevealText";
import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  titleClass?: string;
};

/**
 * Shared editorial intro block: tracked eyebrow, serif headline, optional lead.
 */
export default function SectionIntro({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  titleClass,
}: Props) {
  const center = align === "center";
  return (
    <div
      className={[
        center ? "flex flex-col items-center text-center" : "",
        className ?? "",
      ].join(" ")}
    >
      <Reveal className={center ? "flex items-center gap-4" : "flex items-center gap-4"}>
        <span className="h-px w-10 bg-bronze/60" />
        <span className="eyebrow bronze-text">{eyebrow}</span>
      </Reveal>

      <RevealText
        as="h2"
        text={title}
        center={center}
        delay={0.05}
        className={
          "display t-h2 mt-8 max-w-[16ch] " +
          (center ? "mx-auto " : "") +
          (titleClass ?? "")
        }
      />

      {lead && (
        <Reveal
          as="p"
          delay={0.15}
          className={
            "body-lux mt-8 max-w-xl text-base opacity-70 md:text-lg " +
            (center ? "mx-auto" : "")
          }
        >
          {lead}
        </Reveal>
      )}
    </div>
  );
}
