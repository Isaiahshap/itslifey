import { WP_REVALIDATE_SECONDS } from "@/lib/wp-config";

export async function wpFetchJson<T>(
  url: string,
  init?: RequestInit,
): Promise<T | null> {
  try {
    const res = await fetch(url, {
      ...init,
      next: { revalidate: WP_REVALIDATE_SECONDS },
      headers: {
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
    });
    if (!res.ok) {
      console.error(`WP fetch failed ${res.status}: ${url}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.error("WP fetch error:", url, e);
    return null;
  }
}
