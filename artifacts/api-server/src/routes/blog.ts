import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { listBlogPosts, getBlogPost, generateMonthlyBlogPost } from "../blog-generator";

const router: IRouter = Router();

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const key = req.headers["x-admin-key"];
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    res.status(503).json({ error: "Admin not configured — set ADMIN_PASSWORD env var" });
    return;
  }
  if (key !== expected) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.get("/blog/posts", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query["limit"] ?? 20), 50);
    const offset = Number(req.query["offset"] ?? 0);
    const posts = await listBlogPosts(limit, offset);
    res.json({ posts });
  } catch (err) {
    req.log.error({ err }, "Failed to list blog posts");
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/blog/posts/:slug", async (req, res) => {
  try {
    const post = await getBlogPost(req.params["slug"]!);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json({ post });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch blog post");
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

router.post("/blog/generate", requireAdmin, async (req, res) => {
  try {
    req.log.info("Manual blog generation triggered by admin");
    const postId = await generateMonthlyBlogPost();
    if (postId === null) {
      res.json({ message: "No new topics available — all published." });
      return;
    }
    res.json({ message: "Blog post generated", postId });
  } catch (err) {
    req.log.error({ err }, "Blog generation failed");
    res.status(500).json({ error: "Generation failed" });
  }
});

export default router;
