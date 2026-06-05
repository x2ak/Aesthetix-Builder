import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSEO, useBreadcrumb } from "@/hooks/useSEO";

const cream = "#F7F4EE";
const charcoal = "#1A1A1C";
const inkSoft = "#4A4A4E";
const inkMute = "#8A8A8E";
const gold = "#C4A882";
const surface = "#FDFAF5";
const line = "#E5DFD3";
const BODY = "'Inter Tight', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

interface PostSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
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

export default function Blog() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useSEO({
    title: "Aesthetics Clinic Website Insights | Aesthetix Systems Blog",
    description: "Expert guides, SEO tips, and practical advice for UK aesthetics and beauty clinic owners. Learn how to grow your clinic online.",
    canonical: "/blog",
  });
  useBreadcrumb([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/api/blog/posts?limit=20")
      .then(r => r.json())
      .then(d => setPosts(d.posts ?? []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["all", ...Array.from(new Set(posts.map(p => p.category)))];
  const filtered = filter === "all" ? posts : posts.filter(p => p.category === filter);

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

      {/* Hero */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px 48px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.12em", color: gold, fontWeight: 600, textTransform: "uppercase", marginBottom: 16 }}>
            FROM THE TEAM
          </p>
          <h1 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 5vw, 52px)", color: charcoal, fontStyle: "italic", lineHeight: 1.15, marginBottom: 20 }}>
            Insights for <em style={{ color: gold }}>aesthetics</em> clinic owners
          </h1>
          <p style={{ fontSize: 17, color: inkSoft, lineHeight: 1.7, maxWidth: 560 }}>
            Practical guides on websites, SEO, booking systems, and growing your clinic online — written by the team at Aesthetix Systems.
          </p>
        </motion.div>
      </div>

      {/* Filter tabs */}
      {categories.length > 1 && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 40px" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{
                  background: filter === cat ? charcoal : "transparent",
                  color: filter === cat ? cream : inkSoft,
                  border: `1px solid ${filter === cat ? charcoal : line}`,
                  borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 500,
                  cursor: "pointer", letterSpacing: "0.02em", transition: "all 0.2s",
                }}>
                {cat === "all" ? "All" : CATEGORY_LABELS[cat] ?? cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Posts */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 80px" }}>
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ background: surface, borderRadius: 12, height: 160, border: `1px solid ${line}`, opacity: 0.5 }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: inkMute }}>
            <p style={{ fontSize: 16 }}>No posts yet — check back soon.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {filtered.map((post, i) => (
              <motion.article key={post.id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{ borderBottom: `1px solid ${line}`, padding: "36px 0", cursor: "pointer" }}
                onClick={() => navigate(`/blog/${post.slug}`)}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
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
                <h2 style={{ fontFamily: SERIF, fontSize: "clamp(20px, 3vw, 26px)", color: charcoal, fontStyle: "italic", lineHeight: 1.3, marginBottom: 12 }}>
                  {post.title}
                </h2>
                <p style={{ fontSize: 15, color: inkSoft, lineHeight: 1.65, marginBottom: 16, maxWidth: 580 }}>
                  {post.excerpt}
                </p>
                <span style={{ fontSize: 13, color: gold, fontWeight: 600, letterSpacing: "0.04em" }}>
                  READ MORE →
                </span>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ background: charcoal, padding: "80px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(24px, 4vw, 36px)", color: cream, fontStyle: "italic", lineHeight: 1.3, marginBottom: 24 }}>
            Ready to transform your clinic's online presence?
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
