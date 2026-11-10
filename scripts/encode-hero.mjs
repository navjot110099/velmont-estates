// ============================================================
// VELMONT ESTATES — Hero film encoder
// ------------------------------------------------------------
// Regenerates every optimized variant of the mansion film from a
// single high-quality master. The master is intentionally NOT
// committed (it is ~58 MB); keep it out of the repo and point this
// script at it:
//
//   HERO_MASTER=/path/to/mansion-master.mp4 node scripts/encode-hero.mjs
//   # or
//   node scripts/encode-hero.mjs /path/to/mansion-master.mp4
//
// ffmpeg is resolved from, in order: $FFMPEG_PATH, the optional
// `ffmpeg-static` dev dependency, then `ffmpeg` on your PATH. To use
// the bundled static build without installing ffmpeg system-wide:
//
//   npm i -D ffmpeg-static && node scripts/encode-hero.mjs <master>
//
// Outputs (public/videos): desktop + mobile, each as MP4 (H.264) and
// WebM (VP9), plus a poster still and a social/OG image.
//
// Why these settings:
//  • GOP of 12 frames (~0.5 s at 24 fps) keeps scroll-scrub seeks fast
//    and accurate — the browser only decodes a few frames from the
//    nearest keyframe, which is what makes the hero feel buttery.
//  • -movflags +faststart moves the moov atom to the front so
//    preload="metadata" resolves immediately and range-seeks work.
//  • Audio is dropped (-an): the hero is always muted.
// ============================================================

import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { existsSync, mkdirSync, statSync } from "node:fs";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = join(ROOT, "public", "videos");

const GOP = 12; // keyframe every ~0.5s @ 24fps — fast, accurate scrub seeks

function resolveFfmpeg() {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  try {
    const p = require("ffmpeg-static");
    if (p && existsSync(p)) return p;
  } catch {
    /* not installed — fall through */
  }
  return "ffmpeg"; // assume on PATH
}

const FFMPEG = resolveFfmpeg();

const master =
  process.argv[2] ||
  process.env.HERO_MASTER ||
  join(OUT, "mansion-tour.mp4"); // fallback: original committed master, if present

if (!existsSync(master)) {
  console.error(
    `\n✖ Master film not found: ${master}\n` +
      `  Pass it explicitly:  node scripts/encode-hero.mjs /path/to/master.mp4\n` +
      `  (The ~58 MB master is deliberately not committed to the repo.)\n`
  );
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });

function run(label, args) {
  process.stdout.write(`\n▶ ${label}\n`);
  const res = spawnSync(FFMPEG, ["-y", "-hide_banner", "-loglevel", "error", ...args], {
    stdio: "inherit",
  });
  if (res.status !== 0) {
    console.error(`✖ ffmpeg failed on: ${label}`);
    process.exit(res.status ?? 1);
  }
}

function mb(p) {
  return (statSync(p).size / 1024 / 1024).toFixed(1) + " MB";
}

// Shared x264 args for scrub-friendly, web-optimized H.264.
const x264 = (crf, preset) => [
  "-c:v", "libx264",
  "-profile:v", "high",
  "-pix_fmt", "yuv420p",
  "-preset", preset,
  "-crf", String(crf),
  "-g", String(GOP),
  "-keyint_min", String(GOP),
  "-sc_threshold", "0",
  "-movflags", "+faststart",
  "-an",
];

// Shared VP9 args (constant-quality, row multithreading).
const vp9 = (crf, cpu) => [
  "-c:v", "libvpx-vp9",
  "-pix_fmt", "yuv420p",
  "-b:v", "0",
  "-crf", String(crf),
  "-g", String(GOP),
  "-keyint_min", String(GOP),
  "-deadline", "good",
  "-cpu-used", String(cpu),
  "-row-mt", "1",
  "-an",
];

const DESKTOP = "scale=1280:720:force_original_aspect_ratio=decrease";
const MOBILE = "scale=720:-2"; // ~720x404, preserves 16:9

// ---- Desktop ----
run("Desktop MP4 (H.264, 720p)", [
  "-i", master, "-vf", DESKTOP, ...x264(26, "slow"),
  join(OUT, "mansion-desktop.mp4"),
]);
run("Desktop WebM (VP9, 720p)", [
  "-i", master, "-vf", DESKTOP, ...vp9(40, 4),
  join(OUT, "mansion-desktop.webm"),
]);

// ---- Mobile ----
run("Mobile MP4 (H.264, 720w)", [
  "-i", master, "-vf", MOBILE, ...x264(28, "medium"),
  join(OUT, "mansion-mobile.mp4"),
]);
run("Mobile WebM (VP9, 720w)", [
  "-i", master, "-vf", MOBILE, ...vp9(44, 5),
  join(OUT, "mansion-mobile.webm"),
]);

// ---- Poster (first strong frame, held behind the title) ----
run("Poster still (1280x720 JPEG)", [
  "-ss", "1.5", "-i", master, "-frames:v", "1",
  "-vf", DESKTOP, "-q:v", "3",
  join(OUT, "mansion-poster.jpg"),
]);

// ---- Social / OpenGraph image (1200x630, center-cropped) ----
run("OG image (1200x630 JPEG)", [
  "-ss", "1.5", "-i", master, "-frames:v", "1",
  "-vf", "scale=1200:675:force_original_aspect_ratio=increase,crop=1200:630",
  "-q:v", "3",
  join(ROOT, "public", "og.jpg"),
]);

console.log("\n✓ Encode complete:\n");
for (const f of [
  "mansion-desktop.mp4",
  "mansion-desktop.webm",
  "mansion-mobile.mp4",
  "mansion-mobile.webm",
  "mansion-poster.jpg",
]) {
  const p = join(OUT, f);
  if (existsSync(p)) console.log(`   ${f.padEnd(24)} ${mb(p)}`);
}
const og = join(ROOT, "public", "og.jpg");
if (existsSync(og)) console.log(`   ${"og.jpg".padEnd(24)} ${mb(og)}`);
console.log("");
