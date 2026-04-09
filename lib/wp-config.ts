/** Headless WordPress (REST) — staging host serves API + media. */
export const WP_HEADLESS_ORIGIN = "https://px8.792.myftpupload.com" as const;

export const WP_REST_POSTS = `${WP_HEADLESS_ORIGIN}/wp-json/wp/v2/posts` as const;
export const WP_REST_EVENTS = `${WP_HEADLESS_ORIGIN}/wp-json/tribe/events/v1/events` as const;

/** ISR / fetch revalidation (seconds). */
export const WP_REVALIDATE_SECONDS = 120;
