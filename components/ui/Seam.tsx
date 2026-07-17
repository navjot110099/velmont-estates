/**
 * A gradient threshold between two rooms of different tone —
 * dissolves the boundary so the journey reads as continuous.
 */
export default function Seam({
  from,
  to,
  className,
}: {
  from: string;
  to: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={"relative h-[12vh] w-full " + (className ?? "")}
      style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
    />
  );
}
