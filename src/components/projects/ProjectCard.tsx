import Link from "next/link";
import type { Project } from "@/constants/projects";
import { MotionCard } from "@/components/motion/MotionCard";
import { Image3D } from "@/components/motion/Image3D";

type ProjectCardProps = {
  project: Project;
  showDetails?: boolean;
  delay?: number;
};

export function ProjectCard({ project, showDetails = false, delay = 0 }: ProjectCardProps) {
  return (
    <MotionCard delay={delay}>
      <div data-project={project.slug}>
        <Image3D
          src={project.image.src}
          alt={project.image.alt}
          aspectRatio="4 / 3"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          blurDataURL={project.image.blurDataURL}
        />

        <p className="mt-4 text-xs font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
          {project.category}
        </p>
        <h3 className="mt-2 text-xl">{project.name}</h3>

        {showDetails && (
          <>
            {project.location && (
              <p className="mt-2 text-sm text-muted-foreground">{project.location}</p>
            )}
            <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
            {project.status && (
              <p data-field="status" className="mt-2 text-xs text-muted-foreground">
                Status: {project.status}
              </p>
            )}
          </>
        )}

        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View ${project.name} project`}
          className="mt-3 inline-flex text-sm font-medium text-foreground underline decoration-construction-gold underline-offset-4 transition-colors hover:text-construction-gold-accessible"
        >
          View Project
        </Link>
      </div>
    </MotionCard>
  );
}
