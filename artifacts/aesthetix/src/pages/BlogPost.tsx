import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSEO, usePageSchema, useBreadcrumb } from "@/hooks/useSEO";

const cream = "#F7F4EE";
const charcoal = "#1A1A1C";
const inkSoft = "#4A4A4E";
const inkMute = "#8A8A8E";
const gold = "#C4A882";
const surface = "#FDFAF5";
const line = "#E5DFD3";
const BODY = "'Inter Tight', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

interface BlogPostData {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  readingMinutes: number;
  publishedAt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  insights: "Insights",
  guides: "Guides",
  seo: "SEO",
  technology: "Technology",
};

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

function parseMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 style="font-family: \'Instrument Serif\', serif; font-style: italic; font-size: clamp(18px,2.5vw,22px); color: #1A1A1C; margin: 32px 0 12px; line-height: 1.3;">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-family: \'Instrument Serif\', serif; font-style: italic; font-size: clamp(22px,3vw,28px); color: #1A1A1C; margin: 40px 0 16px; line-height: 1.3;">$1</h2>')
    .replace(/^# (.+)$/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight: 700; color: #1A1A1C;">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color: #C4A882; text-decoration: underline;">$1</a>')
    .replace(/^- (.+)$/gm, '<li style="margin-bottom: 6px; padding-left: 4px;">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul style="margin: 20px 0; padding-left: 20px; color: #4A4A4E; line-height: 1.7;">$&</ul>')
    .replace(/\n\n/g, '</p><p style="font-size: 16px; line-height: 1.8; color: #4A4A4E; margin-bottom: 20px;">')
    .replace(/^(?!<[hul])(.+)$/gm, (m) => m.trim() ? m : '')
    .replace(/^([^<\n].*)$/gm, '<p style="font-size: 16px; line-height: 1.8; color: #4A4A4E; margin-bottom: 20px;">$1</p>')
    .replace(/<p[^>]*><\/p>/g, '')
    .replace(/<p[^>]*>(<h[23])/g, '$1')
    .replace(/(<\/h[23]>)<\/p>/g, '$1');
}

export default function BlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`/api/blog/posts/${slug}`)
      .then(r => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then(d => { if (d) setPost(d.post); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  useSEO({
    title: post?.metaTitle ?? post?.title ?? "Blog | Aesthetix Systems",
    description: post?.metaDescription ?? post?.excerpt ?? "Expert insights for UK aesthetics clinic owners.",
    canonical: `/blog/${slug}`,
  });

  usePageSchema(post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.publishedAt,
    "author": { "@type": "Organization", "name": "Aesthetix Systems" },
    "publisher": { "@type": "Organization", "name": "Aesthetix Systems", "url": "https://aesthetix-systems.co.uk" },
    "keywords": post.tags.join(", "),
  } : {});

  useBreadcrumb(post ? [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${slug}` },
  ] : [{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }]);

  if (loading) {
    return (
      <div style={{ background: cream, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: BODY }}>
        <p style={{ color: inkMute, fontSize: 15 }}>Loading…</p>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div style={{ background: cream, minHeight: "100vh", fontFamily: BODY }}>
        <nav style={{ borderBottom: `1px solid ${line}`, padding: "0 24px", height: 64, display: "flex", alignItems: "center" }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: SERIF, fontSize: 20, color: charcoal, fontStyle: "italic" }}>
            Aesthetix
          </button>
        </nav>
        <div style={{ maxWidth: 600, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
          <h1 style={{ fontFamily: SERIF, fontSize: 32, fontStyle: "italic", color: charcoal, marginBottom: 16 }}>Post not found</h1>
          <button onClick={() => navigate("/blog")} style={{ color: gold, background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>← Back to blog</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: cream, minHeight: "100vh", fontFamily: BODY }}>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(247,244,238,0.96)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: SERIF, fontSize: 20, color: charcoal, fontStyle: "italic" }}>
            Aesthetix
          </button>
          <a href="https://wa.me/447495963388" target="_blank" rel="noopener noreferrer"
            style={{ background: charcoal, color: cream, padding: "8px 20px", borderRadius: 4, fontSize: 13, fontWeight: 600, textDecoration: "none", letterSpacing: "0.04em" }}>
            GET IN TOUCH
          </a>
        </div>
      </nav>

      {/* Article header */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 48px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <button onClick={() => navigate("/blog")} style={{ background: "none", border: "none", cursor: "pointer", color: gold, fontSize: 13, fontWeight: 600, marginBottom: 32, padding: 0, letterSpacing: "0.04em" }}>
            ← BACK TO BLOG
          </button>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.1em", color: gold, fontWeight: 600, textTransform: "uppercase" }}>
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
            <span style={{ color: line }}>·</span>
            <span style={{ fontSize: 12, color: inkMute }}>
              {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span style={{ color: line }}>·</span>
            <span style={{ fontSize: 12, color: inkMute }}>{post.readingMinutes} min read</span>
          </div>

          <h1 style={{ fontFamily: SERIF, fontSize: "clamp(28px, 5vw, 44px)", color: charcoal, fontStyle: "italic", lineHeight: 1.2, marginBottom: 24 }}>
            {post.title}
          </h1>

          <p style={{ fontSize: 18, color: inkSoft, lineHeight: 1.7, borderLeft: `3px solid ${gold}`, paddingLeft: 20, marginBottom: 0 }}>
            {post.excerpt}
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ height: 1, background: line }} />
      </div>

      {/* Article body */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
        style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 80px" }}>
        <div dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }} />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${line}` }}>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", color: inkMute, marginBottom: 12, fontWeight: 600, textTransform: "uppercase" }}>Keywords</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {post.tags.map(tag => (
                <span key={tag} style={{ fontSize: 12, color: inkSoft, background: surface, border: `1px solid ${line}`, borderRadius: 100, padding: "4px 12px" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author card */}
        <div style={{ marginTop: 48, background: surface, border: `1px solid ${line}`, borderRadius: 12, padding: 28, display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: charcoal, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: SERIF, color: gold, fontSize: 20, fontStyle: "italic" }}>A</span>
          </div>
          <div>
            <p style={{ fontWeight: 700, color: charcoal, fontSize: 14, marginBottom: 4 }}>Aesthetix Systems</p>
            <p style={{ fontSize: 13, color: inkMute, lineHeight: 1.6 }}>
              We build bespoke websites, booking systems, and AI receptionists for UK aesthetics and beauty clinics. Based in London, working across the UK.
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <div style={{ background: charcoal, padding: "80px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(24px, 4vw, 36px)", color: cream, fontStyle: "italic", lineHeight: 1.3, marginBottom: 24 }}>
            Want a website that works as hard as you do?
          </p>
          <a href="https://wa.me/447495963388" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", background: gold, color: charcoal, padding: "14px 32px", borderRadius: 4, fontWeight: 700, fontSize: 14, textDecoration: "none", letterSpacing: "0.06em" }}>
            SPEAK WITH US ON WHATSAPP
          </a>
        </div>
      </div>
    </div>
  );
}
