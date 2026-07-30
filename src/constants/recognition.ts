// Sanity-backed since Phase B (production fix pass) — see the `recognition`
// document schema and sanity/lib/adapters.ts's adaptRecognition(). This file
// now holds only the frontend type; there is no hardcoded data here.
export type Recognition = {
  id: string;
  eyebrow: string;
  name: string;
  description: string;
  logo?: { src: string; alt: string; blurDataURL?: string };
};
