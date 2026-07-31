"use client";

import { Image3D } from "@/components/motion/Image3D";

type ProjectGalleryProps = {
  images: { src: string; alt: string; blurDataURL?: string }[];
};

// Fed exactly one real image per project today — multi-image sourcing is a
// future Image Sourcing Strategy task (CLAUDE.md Step 29/29b), not fabricated
// here. The component itself is already multi-image-ready.
export function ProjectGallery({ images }: ProjectGalleryProps) {
  return (
    <div data-project-gallery className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {images.map((image, index) => (
        <Image3D
          key={image.src}
          src={image.src}
          alt={image.alt}
          aspectRatio="4 / 3"
          sizes="(min-width: 640px) 50vw, 100vw"
          priority={index === 0}
          blurDataURL={image.blurDataURL}
          delay={(index % 2) * 0.1}
        />
      ))}
    </div>
  );
}
