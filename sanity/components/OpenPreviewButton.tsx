import { useCallback, useState } from "react";
import { Button, Card, Stack, Text } from "@sanity/ui";
import type { UserViewComponent } from "sanity/structure";

// Studio document view (wired in sanity/lib/structure.ts for project and
// article types) — fetches a ready-to-use enable link from
// /api/preview-url (which holds the real SANITY_PREVIEW_SECRET server-side)
// and opens it in a new tab, rather than baking the secret into this
// client-bundled component directly.
export const OpenPreviewButton: UserViewComponent = ({ document, schemaType }) => {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const slug = (document.displayed as { slug?: { current?: string } }).slug?.current;

  const openPreview = useCallback(async () => {
    if (!slug) return;
    setStatus("loading");
    try {
      const response = await fetch(
        `/api/preview-url?type=${encodeURIComponent(schemaType.name)}&slug=${encodeURIComponent(slug)}`,
      );
      if (!response.ok) throw new Error(`Request failed with ${response.status}`);
      const { url } = (await response.json()) as { url: string };
      window.open(url, "_blank", "noopener,noreferrer");
      setStatus("idle");
    } catch (error) {
      console.error("[studio] failed to open preview:", error);
      setStatus("error");
    }
  }, [slug, schemaType.name]);

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Text size={1} muted>
          Opens this document&apos;s live page in a new tab, showing your unpublished
          draft if one exists.
        </Text>
        {!slug ? (
          <Text size={1} muted>
            Save a slug for this document before previewing it.
          </Text>
        ) : (
          <Button
            text={status === "loading" ? "Opening…" : "Open Preview"}
            tone="primary"
            disabled={status === "loading"}
            onClick={openPreview}
          />
        )}
        {status === "error" && (
          <Text size={1} style={{ color: "var(--card-critical-fg-color, #c0152f)" }}>
            Couldn&apos;t open the preview. Check that SANITY_PREVIEW_SECRET is configured.
          </Text>
        )}
      </Stack>
    </Card>
  );
};
