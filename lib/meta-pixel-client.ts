/** Brief pause so Meta Pixel track calls can dispatch before navigation. */
export const META_PIXEL_REDIRECT_DELAY_MS = 250;

export function redirectAfterMetaPixel(url: string): void {
  window.setTimeout(() => {
    window.location.href = url;
  }, META_PIXEL_REDIRECT_DELAY_MS);
}
