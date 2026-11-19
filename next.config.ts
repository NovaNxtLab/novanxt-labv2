import type { NextConfig } from "next";
import { courses } from "./src/lib/brand";

const nextConfig: NextConfig = {
  // Permanent (308) redirects from every earlier course URL so search rankings carry over.
  // Next strips trailing slashes before matching (/tally-course/ → /tally-course), so sources are stored without one.
  async redirects() {
    return courses.flatMap((c) =>
      c.legacyPaths.map((path) => ({
        source: path.replace(/\/+$/, ""),
        destination: `/courses/${c.slug}`,
        permanent: true,
      })),
    );
  },
  // Brochure PDFs sit outside /public and are only ever emailed (attached by the brochure server action,
  // which runs from any page), so bundle them with every server route.
  outputFileTracingIncludes: {
    "/*": ["./private/brochures/*.pdf"],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
