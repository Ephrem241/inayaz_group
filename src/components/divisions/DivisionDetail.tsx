import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { Division } from "@/constants/divisions";
import type { Project } from "@/constants/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

type DivisionDetailProps = {
  division: Division;
  relatedProjects?: Project[];
  index: number;
};

export function DivisionDetail({ division, relatedProjects, index }: DivisionDetailProps) {
  const imageOnRight = index % 2 === 1;

  return (
    <div
      data-division={division.id}
      className="grid grid-cols-1 items-start gap-10 border-t border-construction-gold/20 py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-16 lg:py-16"
    >
      <div
        className={cn(
          "relative aspect-[4/3] w-full overflow-hidden lg:col-span-5",
          imageOnRight ? "lg:order-2" : "lg:order-1",
        )}
      >
        <Image
          src={division.image.src}
          alt={division.image.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
          placeholder={division.image.blurDataURL ? "blur" : "empty"}
          blurDataURL={division.image.blurDataURL}
        />
      </div>

      <div className={cn("lg:col-span-7", imageOnRight ? "lg:order-1" : "lg:order-2")}>
        <div className="flex items-center gap-3">
          <division.icon className="h-5 w-5 shrink-0 text-construction-gold" aria-hidden="true" />
          <h3 className="text-2xl font-medium md:text-3xl">{division.name}</h3>
        </div>
        <p className="mt-4 max-w-xl text-base text-muted-foreground">{division.description}</p>

        <p className="mt-6 text-sm font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
          {division.listLabel}
        </p>
        <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
          {division.items.map((item) => (
            <li key={item} className="text-sm text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>

        {relatedProjects && relatedProjects.length > 0 && (
          <div data-related-projects className="mt-8 rounded-sm bg-muted/40 p-6">
            <p className="text-sm font-medium tracking-[0.2em] text-construction-gold-accessible uppercase">
              Related Projects
            </p>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        )}

        <Link
          href="/contact"
          className="mt-6 inline-flex text-sm font-medium text-foreground underline decoration-construction-gold underline-offset-4 transition-colors hover:text-construction-gold-accessible"
        >
          Discuss a {division.name} Project
        </Link>
      </div>
    </div>
  );
}
