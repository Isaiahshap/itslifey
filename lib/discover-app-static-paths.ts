import { readdirSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";

/**
 * Walks `app/` for `page.tsx` files and returns URL paths for static routes only.
 * Skips `api/`, dynamic segments (`[slug]`), and route groups `(name)` in URLs.
 */
export function discoverAppStaticPaths(appDir: string): string[] {
  const pageFiles: string[] = [];

  function walk(dir: string): void {
    let names: string[];
    try {
      names = readdirSync(dir);
    } catch {
      return;
    }
    for (const name of names) {
      if (name === "api") continue;
      const full = join(dir, name);
      let st: ReturnType<typeof statSync>;
      try {
        st = statSync(full);
      } catch {
        continue;
      }
      if (st.isDirectory()) {
        walk(full);
      } else if (name === "page.tsx") {
        pageFiles.push(full);
      }
    }
  }

  walk(appDir);

  const paths: string[] = [];
  for (const file of pageFiles) {
    const url = pageFileToUrlPath(file, appDir);
    if (url !== null) paths.push(url);
  }

  return [...new Set(paths)].sort((a, b) => a.localeCompare(b));
}

function pageFileToUrlPath(pageFile: string, appDir: string): string | null {
  const dir = dirname(pageFile);
  const rel = relative(appDir, dir);
  const normalized = rel.split(sep).join("/");

  if (!normalized || normalized === ".") return "/";

  const segments = normalized.split("/").filter(Boolean);
  const urlSegments: string[] = [];

  for (const segment of segments) {
    if (/^\(.+\)$/.test(segment)) continue;
    if (/^\[.+\]$/.test(segment)) return null;
    urlSegments.push(segment);
  }

  if (urlSegments.length === 0) return "/";
  return `/${urlSegments.join("/")}`;
}
