const CACHE_KEY = "aesthetix_seo_overrides";
const CACHE_TTL_MS = 60 * 60 * 1000;

interface SeoOverrides {
  [path: string]: { title: string; metaDescription: string };
}

interface CacheEntry {
  data: SeoOverrides;
  expires: number;
}

let memoryCache: SeoOverrides | null = null;

function readCache(): SeoOverrides | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() > entry.expires) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache(data: SeoOverrides) {
  try {
    const entry: CacheEntry = { data, expires: Date.now() + CACHE_TTL_MS };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // localStorage unavailable
  }
}

let fetchPromise: Promise<SeoOverrides> | null = null;

async function fetchOverrides(): Promise<SeoOverrides> {
  if (memoryCache) return memoryCache;

  const cached = readCache();
  if (cached) {
    memoryCache = cached;
    return cached;
  }

  if (!fetchPromise) {
    fetchPromise = fetch("/api/seo/overrides")
      .then(r => r.ok ? r.json() as Promise<SeoOverrides> : {} as SeoOverrides)
      .catch(() => ({} as SeoOverrides))
      .then(data => {
        memoryCache = data;
        writeCache(data);
        fetchPromise = null;
        return data;
      });
  }

  return fetchPromise;
}

fetchOverrides();

export function getOverrideForPath(path: string): { title: string; metaDescription: string } | null {
  return memoryCache?.[path] ?? null;
}

export { fetchOverrides };
