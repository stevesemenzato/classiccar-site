import fs from "node:fs";
import path from "node:path";
import Image, { type ImageProps } from "next/image";

/**
 * SafeImage — renders `next/image` only when the referenced file exists
 * in /public on disk at build time. When the file is missing it returns
 * null so the parent slot collapses cleanly — never a gray placeholder
 * box, never a broken-image icon.
 *
 * Use for any optional editorial photography (marque studies, hero
 * variants, future commissioned shots) where the file may not yet have
 * been committed.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");

// Cache existence checks across the build/request cycle.
const existsCache = new Map<string, boolean>();

function srcExists(src: string): boolean {
  if (!src.startsWith("/")) return true; // remote / data URLs — let the loader handle them
  if (existsCache.has(src)) return existsCache.get(src)!;
  const abs = path.join(PUBLIC_DIR, src.replace(/^\/+/, ""));
  const ok = fs.existsSync(abs);
  existsCache.set(src, ok);
  return ok;
}

export type SafeImageProps = ImageProps & {
  /** Optional element rendered in place of the image when the file is
   * absent. Defaults to null (slot collapses). */
  fallback?: React.ReactNode;
};

export default function SafeImage({ fallback = null, ...props }: SafeImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  if (src && !srcExists(src)) {
    return <>{fallback}</>;
  }
  return <Image {...props} />;
}

/** Returns true when a public/-relative path resolves to a real file. Useful
 * for gating entire markup blocks (e.g. an image slot wrapper) from being
 * emitted at all when the file is missing. */
export function hasPublicImage(src: string): boolean {
  return srcExists(src);
}
