import path from "node:path";
import type { NextConfig } from "next";

// Applied to every route except /studio — Sanity Studio is a large,
// separately-maintained SPA (web workers, blob: URLs for image previews,
// its own API calls to *.sanity.io) that needs a materially more permissive
// policy than the marketing site; scoping this strict CSP away from it
// avoids silently breaking the admin tool INAYAZ's editors depend on.
const marketingCsp = [
  "default-src 'self'",
  // 'unsafe-inline' covers Next.js's own hydration bootstrap script and
  // this app's JSON-LD <script type="application/ld+json"> tags (Organization/
  // Article/BreadcrumbList structured data) — a pragmatic middle ground
  // short of nonce-based CSP, which would need middleware.ts wiring.
  "script-src 'self' 'unsafe-inline'",
  // 'unsafe-inline' covers React's inline style attributes (clipPath,
  // aspectRatio, etc. set directly by the GSAP/motion components).
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https://cdn.sanity.io data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Low-risk, universally-safe headers — applied everywhere,
        // including /studio and /api.
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
      {
        source: "/((?!studio).*)",
        headers: [{ key: "Content-Security-Policy", value: marketingCsp }],
      },
    ];
  },
};

export default nextConfig;
