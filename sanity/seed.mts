// One-off, idempotent seed script — transforms this project's already-
// verified content (src/constants/*.ts) into real Sanity documents, rather
// than re-authoring content a second time (zero risk of drift/typos between
// the two). Every document uses a deterministic _id, so re-running this
// script updates existing documents instead of duplicating them.
//
// Run with: node sanity/seed.mts
// Requires SANITY_API_WRITE_TOKEN (Editor role) in .env.local.

import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;

import { DIVISIONS } from "../src/constants/divisions.ts";
import { SERVICES } from "../src/constants/services.ts";
import { PROJECTS } from "../src/constants/projects.ts";
import { ARTICLES } from "../src/constants/articles.ts";
import { METRICS } from "../src/constants/metrics.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
loadEnvConfig(projectRoot);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === "placeholder-project-id") {
  console.error("[seed] NEXT_PUBLIC_SANITY_PROJECT_ID is not set to a real project — aborting.");
  process.exit(1);
}
if (!token) {
  console.error("[seed] SANITY_API_WRITE_TOKEN is not set — aborting.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

// Icon names, index-aligned with each array's declared order (confirmed via
// grep against the source files, not re-derived by guesswork).
const DIVISION_ICON_NAMES = ["Building2", "Wheat", "Container", "Factory", "Compass", "Wrench"];
const SERVICE_ICON_NAMES = [
  "HardHat", "PencilRuler", "Landmark", "Route", "ClipboardCheck",
  "DraftingCompass", "PaintRoller", "Settings2", "Wrench", "Container",
];

const assetCache = new Map<string, string>(); // relative image src -> asset _id

async function uploadImage(relativeSrc: string, altBase: string): Promise<string> {
  const cached = assetCache.get(relativeSrc);
  if (cached) return cached;

  const filePath = path.join(projectRoot, "public", relativeSrc);
  const buffer = readFileSync(filePath);
  const filename = path.basename(relativeSrc);
  console.log(`[seed]   uploading image: ${relativeSrc}`);
  const asset = await client.assets.upload("image", buffer, { filename });
  assetCache.set(relativeSrc, asset._id);
  void altBase;
  return asset._id;
}

function imageField(assetId: string, alt: string) {
  // _type must be "imageWithAlt" (the schema's custom type name), not the
  // base "image" primitive — Sanity resolves field validation/rendering by
  // matching this to the named type definition in imageWithAlt.ts.
  return {
    _type: "imageWithAlt" as const,
    asset: { _type: "reference" as const, _ref: assetId },
    alt,
  };
}

function paragraphBlock(text: string, style: "normal" | "h2" | "h3" = "normal") {
  return {
    _type: "block" as const,
    _key: randomUUID().slice(0, 12),
    style,
    markDefs: [],
    children: [{ _type: "span" as const, _key: randomUUID().slice(0, 12), text, marks: [] }],
  };
}

async function seedDivisions() {
  console.log("[seed] Divisions...");
  for (const [index, division] of DIVISIONS.entries()) {
    const assetId = await uploadImage(division.image.src, division.image.alt);
    const _id = `division-${division.id}`;
    await client.createOrReplace({
      _id,
      _type: "division",
      title: division.name,
      slug: { _type: "slug", current: division.id },
      description: [paragraphBlock(division.description)],
      listLabel: division.listLabel,
      items: division.items,
      icon: DIVISION_ICON_NAMES[index],
      image: imageField(assetId, division.image.alt),
      featured: false,
    });
    console.log(`[seed]   ${_id}`);
  }
}

async function seedServices() {
  console.log("[seed] Services...");
  for (const [index, service] of SERVICES.entries()) {
    const assetId = await uploadImage(service.image.src, service.image.alt);
    const _id = `service-${service.id}`;
    await client.createOrReplace({
      _id,
      _type: "service",
      title: service.name,
      slug: { _type: "slug", current: service.id },
      description: service.description,
      image: imageField(assetId, service.image.alt),
      icon: SERVICE_ICON_NAMES[index],
      featured: false,
    });
    console.log(`[seed]   ${_id}`);
  }
}

async function seedProjects(): Promise<Map<string, string>> {
  console.log("[seed] Projects...");
  const idBySlug = new Map<string, string>();
  for (const [index, project] of PROJECTS.entries()) {
    const assetId = await uploadImage(project.image.src, project.image.alt);
    const _id = `project-${project.slug}`;
    await client.createOrReplace({
      _id,
      _type: "project",
      title: project.name,
      slug: { _type: "slug", current: project.slug },
      client: project.client,
      contractor: "INAYAZ Construction and Material Import Export",
      consultant: project.consultant ?? undefined,
      structureType: project.structure,
      category: project.category,
      propertyType: project.propertyType,
      location: project.location ?? undefined,
      description: [paragraphBlock(project.description)],
      heroImage: imageField(assetId, project.image.alt),
      featured: project.featured,
      orderRank: index,
    });
    idBySlug.set(project.slug, _id);
    console.log(`[seed]   ${_id}`);
  }
  return idBySlug;
}

async function seedArticles() {
  console.log("[seed] Articles...");
  for (const article of ARTICLES) {
    const content = article.body.map((block) =>
      block.type === "heading" ? paragraphBlock(block.text, "h2") : paragraphBlock(block.text),
    );
    const _id = `article-${article.slug}`;
    await client.createOrReplace({
      _id,
      _type: "article",
      title: article.title,
      slug: { _type: "slug", current: article.slug },
      excerpt: article.excerpt,
      content,
      category: article.category,
      author: article.author,
      publishedAt: new Date(article.publishedAt).toISOString(),
      featured: article.featured,
    });
    console.log(`[seed]   ${_id}`);
  }
}

async function seedSiteSettings(projectIdBySlug: Map<string, string>) {
  console.log("[seed] Site settings...");
  const featuredSlugs = PROJECTS.filter((p) => p.featured).map((p) => p.slug);
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    contactEmail: "info@inayazgroup.com",
    contactPhones: ["+251 973 223 312", "+251 968 666 664"],
    address: "ZULYEKA Building\n6th Floor, Office 603\nAddis Ababa, Ethiopia",
    socialLinks: [],
    homepageMetrics: METRICS.map((metric) => ({
      _type: "metric",
      _key: metric.id,
      id: metric.id,
      label: metric.label,
      confirmed: metric.status === "confirmed",
      ...(metric.status === "confirmed" ? { value: metric.value, suffix: metric.suffix } : {}),
    })),
    footerTagline: "Building What's Next",
    footerDescription:
      "A diversified Ethiopian business group delivering construction, real estate, manufacturing, import, export, travel, and equipment solutions.",
    featuredProjects: featuredSlugs.map((slug) => ({
      _type: "reference",
      _key: slug,
      _ref: projectIdBySlug.get(slug),
    })),
  });
  console.log("[seed]   siteSettings");
}

async function main() {
  console.log(`[seed] Target: project ${projectId}, dataset ${dataset}`);
  await seedDivisions();
  await seedServices();
  const projectIdBySlug = await seedProjects();
  await seedArticles();
  await seedSiteSettings(projectIdBySlug);
  console.log("[seed] Done.");
}

main().catch((error) => {
  console.error("[seed] Failed:", error);
  process.exit(1);
});
