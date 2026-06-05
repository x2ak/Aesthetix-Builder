import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

const BASE = "https://aesthetix-systems.co.uk";

export function useSEO({ title, description, canonical, ogImage = "/opengraph.jpg", noindex = false }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const set = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    const imageUrl = ogImage.startsWith("http") ? ogImage : `${BASE}${ogImage}`;
    const canonicalHref = canonical ? `${BASE}${canonical}` : BASE;

    set('meta[name="description"]', "content", description);
    set('meta[name="robots"]', "content", noindex ? "noindex, nofollow" : "index, follow");
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", description);
    set('meta[property="og:image"]', "content", imageUrl);
    set('meta[property="og:url"]', "content", canonicalHref);
    set('meta[name="twitter:title"]', "content", title);
    set('meta[name="twitter:description"]', "content", description);
    set('meta[name="twitter:image"]', "content", imageUrl);

    let linkEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkEl) {
      linkEl = document.createElement("link");
      linkEl.rel = "canonical";
      document.head.appendChild(linkEl);
    }
    linkEl.href = canonicalHref;
  }, [title, description, canonical, ogImage, noindex]);
}

export function usePageSchema(schema: object) {
  useEffect(() => {
    const id = "page-ld-json";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    (el as HTMLScriptElement).text = JSON.stringify(schema);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

export function useBreadcrumb(items: { name: string; url: string }[]) {
  useEffect(() => {
    const id = "breadcrumb-ld-json";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": item.name,
        "item": `https://aesthetix-systems.co.uk${item.url}`,
      })),
    });
    return () => {
      document.getElementById(id)?.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
