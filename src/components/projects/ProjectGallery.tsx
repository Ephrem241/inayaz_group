import Image from "next/image";

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
        <div key={image.src} className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority={index === 0}
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
          />
        </div>
      ))}
    </div>
  );
}
