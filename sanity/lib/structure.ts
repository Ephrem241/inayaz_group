import type { StructureResolver } from "sanity/structure";
import { OpenPreviewButton } from "../components/OpenPreviewButton";

// Replaces the default auto-generated "one list item per schema type" desk
// with the grouping CLAUDE.md Step 26 asks for (Projects / Divisions /
// Services / News / Leads / Site Settings), and adds three behaviors the
// default desk can't express on its own: an "Open Preview" tab for the two
// types with a real public detail page, Leads filtered by status, and Site
// Settings pinned to its one real document instead of a create-new list.
const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Closed", "Spam"] as const;

// Adds a "Preview" tab alongside the normal edit form for a single document
// — used only for types with a real per-item public URL (project, article).
function withPreviewTab(S: Parameters<StructureResolver>[0], schemaType: string) {
  return (documentId: string) =>
    S.document()
      .documentId(documentId)
      .schemaType(schemaType)
      .views([S.view.form(), S.view.component(OpenPreviewButton).title("Preview")]);
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Projects")
        .schemaType("project")
        .child(
          S.documentList()
            .id("projects-all")
            .title("Projects")
            .schemaType("project")
            .filter('_type == "project"')
            .defaultOrdering([
              { field: "orderRank", direction: "asc" },
              { field: "_createdAt", direction: "desc" },
            ])
            .child(withPreviewTab(S, "project")),
        ),
      S.listItem()
        .title("Divisions")
        .schemaType("division")
        .child(S.documentTypeList("division").title("Divisions")),
      S.listItem()
        .title("Services")
        .schemaType("service")
        .child(S.documentTypeList("service").title("Services")),
      S.listItem()
        .title("News")
        .schemaType("article")
        .child(
          S.documentTypeList("article")
            .title("News")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
            .child(withPreviewTab(S, "article")),
        ),
      S.divider(),
      S.listItem()
        .title("Leads")
        .schemaType("contactSubmission")
        .child(
          S.list()
            .title("Leads")
            .items([
              S.listItem()
                .id("leads-all")
                .title("All Leads")
                .child(
                  S.documentList()
                    .id("leads-all-list")
                    .title("All Leads")
                    .schemaType("contactSubmission")
                    .filter('_type == "contactSubmission"')
                    .defaultOrdering([{ field: "submittedAt", direction: "desc" }]),
                ),
              S.divider(),
              ...LEAD_STATUSES.map((status) =>
                S.listItem()
                  .id(`leads-${status.toLowerCase()}`)
                  .title(status)
                  .schemaType("contactSubmission")
                  .child(
                    S.documentList()
                      .id(`leads-${status.toLowerCase()}-list`)
                      .title(`${status} Leads`)
                      .schemaType("contactSubmission")
                      .filter('_type == "contactSubmission" && status == $status')
                      .params({ status })
                      .defaultOrdering([{ field: "submittedAt", direction: "desc" }]),
                  ),
              ),
            ]),
        ),
      S.divider(),
      // Singleton — always opens the one real siteSettings document (the
      // deterministic "siteSettings" _id the seed script uses) instead of a
      // list an editor could "create another" from.
      S.listItem()
        .title("Site Settings")
        .schemaType("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
