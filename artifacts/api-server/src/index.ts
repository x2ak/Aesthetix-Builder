import app from "./app";
import { logger } from "./lib/logger";
import cron from "node-cron";
import { runSeoCrawl } from "./seo-crawler";
import { generateMonthlyBlogPost } from "./blog-generator";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");

  cron.schedule("0 7 * * *", () => {
    logger.info("Daily SEO crawl triggered by cron");
    runSeoCrawl().catch((err) => logger.error({ err }, "SEO crawl failed"));
  }, { timezone: "UTC" });

  logger.info("SEO crawl cron scheduled — runs daily at 07:00 UTC");

  cron.schedule("0 9 1 * *", () => {
    logger.info("Monthly blog generation triggered by cron");
    generateMonthlyBlogPost().catch((err) => logger.error({ err }, "Blog generation failed"));
  }, { timezone: "UTC" });

  logger.info("Blog generator cron scheduled — runs 1st of every month at 09:00 UTC");
});
