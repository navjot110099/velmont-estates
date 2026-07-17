"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { stagger, wordChild, VIEWPORT } from "@/lib/anim";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

type Props = {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stepper?: number;
  /** center each line */
  center?: boolean;
};

const emptyVariant = { hidden: {}, show: {} };

/**
 * Headline reveal: each word lifts up from behind a mask, staggered.
 * Wrap words in *asterisks* to render them as italic serif emphasis.
 * Preserves real, selectable text for accessibility.
 */
export default function RevealText({
  text,
  as = "h2",
  className,
  delay = 0,
  stepper = 0.05,
  center = false,
}: Props) {
  const lines = text.split("\n");
  const Comp = motion[as] as typeof motion.h2;

  return (
    <Comp
      className={[
        "flex flex-wrap",
        center ? "justify-center text-center" : "",
        className ?? "",
      ].join(" ")}
      variants={stagger(stepper, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      aria-label={text.replace(/\n/g, " ").replace(/\*/g, "")}
    >
      {lines.map((line, li) => (
        <Fragment key={li}>
          {line.split(" ").map((raw, wi) => {
            const italic = raw.startsWith("*") && raw.endsWith("*");
            const word = italic ? raw.slice(1, -1) : raw;
            return (
              <motion.span
                key={`${li}-${wi}`}
                variants={emptyVariant}
                className="inline-flex overflow-hidden pb-[0.14em] pr-[0.26em]"
                aria-hidden
              >
                <motion.span
                  variants={wordChild}
                  className={
                    // framer-motion sets/clears will-change itself for the
                    // duration of the reveal — no permanent layer promotion.
                    "inline-block " +
                    (italic ? "font-serif italic font-normal" : "")
                  }
                >
                  {word}
                </motion.span>
              </motion.span>
            );
          })}
          {li < lines.length - 1 && (
            <span className="basis-full h-0" aria-hidden />
          )}
        </Fragment>
      ))}
    </Comp>
  );
}
