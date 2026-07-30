"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/constants/projects";
import { RealEstateCard } from "@/components/real-estate/RealEstateCard";

const PROPERTY_TYPES: Project["propertyType"][] = ["Residential", "Commercial", "Mixed-Use"];

type SortOrder = "featured" | "az";

const selectClassName =
  "w-full rounded border border-steel-gray/30 bg-off-white px-3 py-2 text-sm md:w-56";

type RealEstateListingProps = { projects: Project[] };

export function RealEstateListing({ projects }: RealEstateListingProps) {
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");

  const locations = useMemo(
    () =>
      Array.from(
        new Set(
          projects.map((project) => project.location).filter((location): location is string => location !== null),
        ),
      ),
    [projects],
  );

  // Derived from real data rather than a hardcoded list (unlike Property
  // Type) — no current development has a confirmed status yet, so this
  // filter has no options to show until one is entered in Sanity, rather
  // than offering choices that would always return zero results.
  const statuses = useMemo(
    () =>
      Array.from(
        new Set(
          projects
            .map((project) => project.status)
            .filter((status): status is NonNullable<Project["status"]> => status !== null),
        ),
      ),
    [projects],
  );

  const visibleProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      if (propertyTypeFilter && project.propertyType !== propertyTypeFilter) return false;
      if (locationFilter && project.location !== locationFilter) return false;
      if (statusFilter && project.status !== statusFilter) return false;
      return true;
    });
    if (sortOrder === "az") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [projects, propertyTypeFilter, locationFilter, statusFilter, sortOrder]);

  const resetFilters = () => {
    setPropertyTypeFilter("");
    setLocationFilter("");
    setStatusFilter("");
  };

  return (
    <section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-wide">
        <div
          data-real-estate-filters
          className="flex flex-col gap-4 border-b border-construction-gold/20 pb-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
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
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </label>

            {statuses.length > 0 && (
              <label className="text-sm">
                <span className="block font-medium">Status</span>
                <select
                  className={`mt-1.5 ${selectClassName}`}
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  <option value="">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            )}
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
          <div data-real-estate-empty-state className="py-16 text-center">
            <p className="text-lg text-muted-foreground">No developments match the selected filters.</p>
            <button type="button" onClick={resetFilters} className="btn btn-outline mt-6">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <RealEstateCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
