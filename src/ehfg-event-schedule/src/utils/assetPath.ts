// Utility to build an asset URL that respects the GitHub Pages base path.
export function assetPath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}/${clean}`.replace(/\/+/, "/");
}
