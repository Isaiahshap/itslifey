import DOMPurify from "isomorphic-dompurify";
import { normalizeWpHtml } from "@/lib/wp-url";

const purify = (html: string) =>
  DOMPurify.sanitize(normalizeWpHtml(html), {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel", "class", "id", "style"],
  });

type Props = {
  html: string;
  className?: string;
  /** If true, wrap in prose-like spacing for article body */
  asArticle?: boolean;
};

/**
 * Sanitized WordPress HTML with brand-friendly defaults.
 */
export function WpHtml({ html, className = "", asArticle }: Props) {
  const safe = purify(html);
  if (!safe.trim()) return null;

  const shell =
    asArticle
      ? [
          "max-w-none text-[#2a2928]",
          "[&_a]:font-semibold [&_a]:text-[#e76fab] [&_a]:underline [&_a]:decoration-[#e76fab]/40 [&_a]:underline-offset-2",
          "[&_p]:mb-4 [&_p]:leading-[1.78] last:[&_p]:mb-0",
          "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[#141413]",
          "[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#141413]",
          "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:leading-[1.75]",
          "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6",
          "[&_li]:mb-2 [&_li]:pl-1",
          "[&_blockquote]:border-l-2 [&_blockquote]:border-[#e76fab]/50 [&_blockquote]:pl-4 [&_blockquote]:italic",
          "[&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl",
        ].join(" ")
      : [
          "max-w-none text-inherit",
          "[&_a]:font-semibold [&_a]:text-[#e76fab] [&_a]:underline",
          "[&_p]:mb-3 last:[&_p]:mb-0",
          "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5",
          "[&_li]:mb-1",
        ].join(" ");

  return (
    <div
      className={`${shell} ${className}`}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
