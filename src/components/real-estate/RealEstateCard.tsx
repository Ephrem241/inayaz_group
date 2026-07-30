import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/constants/projects";

type RealEstateCardProps = {
  project: Project;
};

export function RealEstateCard({ project }: RealEstateCardProps) {
  return (
    <div data-real-estate-card={project.slug}>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          placeholder={project.image.blurDataURL ? "blur" : "empty"}
          blurDataURL={project.image.blurDataURL}
        />
      </div>

      <p className="mt-4 text-xs font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
        {project.propertyType}
      </p>
      <h3 className="mt-2 text-xl">{project.name}</h3>

      {project.location && (
        <p className="mt-2 text-sm text-muted-foreground">{project.location}</p>
      )}
      {/* Hidden entirely (not a placeholder) until a status is
          client-confirmed for this development. */}
      {project.status && (
        <p data-field="status" className="mt-2 text-sm text-muted-foreground">
          {project.status}
        </p>
      )}

      <Link
        href={`/real-estate/${project.slug}`}
        aria-label={`Explore ${project.name}`}
        className="mt-3 inline-flex text-sm font-medium text-foreground underline decoration-construction-gold underline-offset-4 transition-colors hover:text-construction-gold-accessible"
      >
        Explore Development
      </Link>
    </div>
  );
}
