import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const BASE = "https://aesthetixsystems.co.uk";

export function useSEO({ title, description, canonical, ogImage = "/opengraph.jpg" }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const set = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    set('meta[name="description"]', "content", description);
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", description);
    set('meta[property="og:image"]', "content", ogImage);

    const canonicalHref = canonical ? `${BASE}${canonical}` : BASE;
    set('meta[property="og:url"]', "content", canonicalHref);

    let linkEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkEl) {
      linkEl = document.createElement("link");
      linkEl.rel = "canonical";
      document.head.appendChild(linkEl);
    }
    linkEl.href = canonicalHref;
  }, [title, description, canonical, ogImage]);
}
