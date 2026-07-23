"use client";

import { useMemo, useState } from "react";
import { PROJECTS, LEVEL_LEGEND, type Project } from "@/constants/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

const PROPERTY_TYPES: Project["propertyType"][] = ["Residential", "Commercial", "Mixed-Use"];

const LOCATIONS = Array.from(
  new Set(
    PROJECTS.map((project) => project.location).filter(
      (location): location is string => location !== null,
    ),
  ),
);

type SortOrder = "featured" | "az";

const selectClassName =
  "w-full rounded border border-steel-gray/30 bg-off-white px-3 py-2 text-sm md:w-56";

export function ProjectsListing() {
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");

  const visibleProjects = useMemo(() => {
    const filtered = PROJECTS.filter((project) => {
      if (propertyTypeFilter && project.propertyType !== propertyTypeFilter) return false;
      if (locationFilter && project.location !== locationFilter) return false;
      return true;
    });

    if (sortOrder === "az") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    return [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [propertyTypeFilter, locationFilter, sortOrder]);

  const resetFilters = () => {
    setPropertyTypeFilter("");
    setLocationFilter("");
  };

  return (
    <section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-wide">
        <div
          data-projects-filters
          className="flex flex-col gap-4 border-b border-construction-gold/20 pb-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <label className="text-sm">
              <span className="block font-medium">Property Type</span>
              <select
                className={`mt-1.5 ${selectClassName}`}
                value={propertyTypeFilter}
                onChange={(event) => setPropertyTypeFilter(event.target.value)}
              >
                <option value="">All Types</option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm">
              <span className="block font-medium">Location</span>
              <select
                className={`mt-1.5 ${selectClassName}`}
                value={locationFilter}
                onChange={(event) => setLocationFilter(event.target.value)}
              >
                <option value="">All Locations</option>
                {LOCATIONS.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="text-sm">
            <span className="block font-medium">Sort By</span>
            <select
              className={`mt-1.5 ${selectClassName}`}
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as SortOrder)}
            >
              <option value="featured">Featured</option>
              <option value="az">A–Z</option>
            </select>
          </label>
        </div>

        {visibleProjects.length === 0 ? (
          <div data-projects-empty-state className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No projects match the selected filters.
            </p>
            <button type="button" onClick={resetFilters} className="btn btn-outline mt-6">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} showDetails />
            ))}
          </div>
        )}

        <p className="mt-16 text-xs text-muted-foreground">{LEVEL_LEGEND}</p>
      </div>
    </section>
  );
}
