

import React from "react";
import type { Project } from "../types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-glass rounded-xl border border-white/6 shadow-neon-lg hover:scale-[1.012] transition-transform duration-200 overflow-hidden">
      
      {/* Image Preview */}
      {project.image && (
        <div className="h-44 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-xl font-semibold heading-accent">
              {project.title}
            </h3>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {project.description}
            </p>

            {project.tags && (
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag) => (
                  <span
  key={tag}
  className="
    text-xs px-2.5 py-1 rounded-full
    bg-purple-500/10
    text-purple-400
    border border-purple-500/20
    hover:bg-purple-500/20
    transition
  "
>
  {tag}
</span>

                ))}
              </div>
            )}
          </div>
    <div className="flex items-center gap-2 shrink-0">
            {project.live && (
    <a
      href={project.live}
      target="_blank"
      rel="noreferrer"
      className="text-xs px-3 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white"
    >
      Live Demo
    </a>
  )}


           

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-2 rounded bg-white/8 hover:bg-white/12 shrink-0"
            >
              View GitHub
            </a>
          )}



</div>


        </div>
      </div>
    </article>
  );
}


