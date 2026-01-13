

import React from "react";
import type { Project } from "../types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-glass p-5 rounded-xl border border-white/6 shadow-neon-lg hover:scale-[1.012] transition-transform duration-200">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-xl font-semibold heading-accent">{project.title}</h3>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{project.description}</p>
          {project.tags && (
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 rounded bg-white/6">{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-2 rounded bg-white/8 hover:bg-white/12"
            >
              View GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-2 rounded bg-primary/90 text-white"
            >
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

