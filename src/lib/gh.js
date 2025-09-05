import { MEDIA_MANIFEST_URL } from "@/app/config";

/* GitHub helpers */
export const GH_API = "https://api.github.com";
export const GH_CACHE_TTL_MS = 5 * 60 * 1000;

export const IMG_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];
export const isImageName = (n = "") => IMG_EXTS.some((e) => n.toLowerCase().endsWith(e));

/**
 * List a "folder" (path) from a GitHub repo and return image file objects.
 * Prefers a media manifest if available (manifest-first loading).
 *
 * @param {string} owner
 * @param {string} repo
 * @param {string} path  - category path (e.g., "Fashion")
 * @param {string} ref   - branch or sha (e.g., "main")
 * @returns {Promise<Array<{name:string,url:string,sha:string,size:number,caption?:string}>>}
 */
export async function ghListFolder(owner, repo, path, ref) {
  const key = `pradhu:gh:${owner}/${repo}@${ref}/${path}`;
  const tkey = key + ":ts";
  const now = Date.now();
  const nocache = new URLSearchParams(window.location.search).get("refresh") === "1";

  // Session cache
  try {
    const ts = Number(sessionStorage.getItem(tkey) || 0);
    if (!nocache && ts && now - ts < GH_CACHE_TTL_MS) {
      const cached = JSON.parse(sessionStorage.getItem(key) || "[]");
      return cached;
    }
  } catch {}

  // Manifest-first path
  try {
    if (MEDIA_MANIFEST_URL) {
      const r = await fetch(MEDIA_MANIFEST_URL, { cache: "no-store" });
      if (r.ok) {
        const manifest = await r.json();
        const list = (manifest[path] || [])
          .filter(Boolean)
          .map((fullPath) => ({
            name: fullPath.split("/").pop(),
            url: `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${fullPath}`,
            sha: fullPath,
            size: 0,
            // optionally: width/height/caption if present in manifest
          }));
        if (list.length) {
          sessionStorage.setItem(key, JSON.stringify(list));
          sessionStorage.setItem(tkey, String(now));
          return list;
        }
      }
    }
  } catch {}

  // Fallback: GitHub Contents API
  const url = `${GH_API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodeURIComponent(
    path
  )}?ref=${encodeURIComponent(ref)}`;

  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!res.ok) return [];

  const json = await res.json();
  const files = Array.isArray(json) ? json.filter((it) => it.type === "file") : [];
  const imgs = files
    .filter((f) => isImageName(f.name))
    .map((f) => ({ name: f.name, url: f.download_url, sha: f.sha, size: f.size }));

  try {
    sessionStorage.setItem(key, JSON.stringify(imgs));
    sessionStorage.setItem(tkey, String(now));
  } catch {}

  return imgs;
}
