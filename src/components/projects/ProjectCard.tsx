import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/constants/projects";

type ProjectCardProps = {
  project: Project;
  showDetails?: boolean;
};

export function ProjectCard({ project, showDetails = false }: ProjectCardProps) {
  return (
    <div data-project={project.slug}>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          placeholder={project.image.blurDataURL ? "blur" : "empty"}
          blurDataURL={project.image.blurDataURL}
        />
      </div>

      <p className="mt-4 text-xs font-medium tracking-[0.2em] text-primary uppercase">
        {project.category}
      </p>
      <h3 className="mt-2 text-xl">{project.name}</h3>

      {showDetails && (
        <>
          {project.location && (
            <p className="mt-2 text-sm text-muted-foreground">{project.location}</p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
          <p data-pending-note className="mt-2 text-xs text-muted-foreground italic">
            Status: Pending confirmation
          </p>
        </>
      )}

      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.name} project`}
        className="mt-3 inline-flex text-sm font-medium text-foreground underline decoration-construction-gold underline-offset-4 transition-colors hover:text-primary"
      >
        View Project
      </Link>
    </div>
  );
}
