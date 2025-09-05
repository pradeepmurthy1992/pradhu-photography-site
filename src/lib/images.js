// Optional per-category preferred tile cover filenames
export const TILE_COVERS = {
  // Example:
  // "Fashion": "00_cover.jpg",
};

/**
 * Choose a "cover" image for a category tile.
 * Priority: explicit mapping → filename token (cover/tile/hero/thumb) → leading zero → first image.
 */
export function pickCoverForCategory(images = [], label = "") {
  if (!images?.length) return "";

  // Explicit mapping
  const want = TILE_COVERS[label];
  if (want) {
    const wantLc = String(want).toLowerCase().trim();
    const match = images.find((it) => (it.name || "").toLowerCase() === wantLc);
    if (match) return match.url;
  }

  // Token-based
  const byToken = images.find((it) => /(^|[-_])(cover|tile|hero|thumb)([-_]|\.|$)/i.test(it.name || ""));
  if (byToken) return byToken.url;

  // Leading zero hint
  const byLeadingZero = images.find((it) => /^0+/.test(it.name || ""));
  if (byLeadingZero) return byLeadingZero.url;

  // Fallback
  return images[0]?.url || "";
}
