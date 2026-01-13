import React from "react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Header */}
      <div
        className="flex flex-col md:flex-row md:items-center md:justify-between"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Projects
        </h2>

        <p
          className="mt-2 md:mt-0 text-gray-600 dark:text-gray-400"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          A selection of recent work
        </p>
      </div>

      {/* Projects Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, index) => (
          <div
            key={p.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}


