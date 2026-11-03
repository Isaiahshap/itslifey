import Link from "next/link";
import type { ReactNode } from "react";

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders FAQ copy with markdown-style links: `[label](/path)` or `[label](https://…)`. */
export function FaqAnswer({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of text.matchAll(LINK_RE)) {
    const index = match.index;
    if (index > last) {
      nodes.push(text.slice(last, index));
    }
    const label = match[1];
    const href = match[2];
    const external = /^https?:\/\//i.test(href);
    if (external) {
      nodes.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="ed-faq__link"
        >
          {label}
        </a>,
      );
    } else {
      nodes.push(
        <Link key={key++} href={href} className="ed-faq__link">
          {label}
        </Link>,
      );
    }
    last = index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return <p className="ed-faq__a">{nodes}</p>;
}
