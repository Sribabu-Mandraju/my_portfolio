"use client";

import { ExternalLink, Github, TrendingUp, Star } from "lucide-react";

const categoryColors = {
  web3: "bg-purple-400/10 text-purple-400 border-purple-400/20",
  web: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  mobile: "bg-green-400/10 text-green-400 border-green-400/20",
};

const categoryIcons = {
  web3: "🔗",
  web: "🌐",
  mobile: "📱",
};

export default function ProjectCard({ project }) {
  const hasMultipleRepos =
    typeof project.github === "object" && project.github.frontend;

  return (
    <div className="group bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 hover:-translate-y-1">
      {/* Project Image */}
      <div className="relative h-32 sm:h-36 bg-gray-700 overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          style={{
            imageRendering: "crisp-edges",
            objectFit: "cover",
            objectPosition: "top center",
          }}
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border backdrop-blur-sm ${
              categoryColors[project.category]
            }`}
          >
            <span className="text-xs">{categoryIcons[project.category]}</span>
            {project.category === "web3"
              ? "Web3"
              : project.category === "web"
              ? "Web"
              : "Mobile"}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 bg-yellow-400/20 text-yellow-400 text-xs font-medium px-2 py-1 rounded-full border border-yellow-400/30 backdrop-blur-sm">
              <Star className="w-3 h-3" />
              Featured
            </span>
          </div>
        )}

        {/* Quick Actions (shown on hover) */}
        <div className="absolute bottom-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {hasMultipleRepos ? (
            <>
              <a
                href={project.github.frontend}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-900/90 hover:bg-gray-800 text-white rounded-md transition-colors duration-200 backdrop-blur-sm"
                title="Frontend Code"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href={project.github.backend}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-900/90 hover:bg-gray-800 text-white rounded-md transition-colors duration-200 backdrop-blur-sm"
                title="Backend Code"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </>
          ) : (
            project.github && (
              <a
                href={
                  typeof project.github === "string"
                    ? project.github
                    : project.github.frontend
                }
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-900/90 hover:bg-gray-800 text-white rounded-md transition-colors duration-200 backdrop-blur-sm"
                title="View Code"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-600/90 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 backdrop-blur-sm"
              title="Live Demo"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-3">
        {/* Header */}
        <div className="mb-2">
          <h3 className="text-base font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-200 leading-tight line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="bg-gray-700/80 hover:bg-gray-600 text-gray-200 text-xs px-2 py-0.5 rounded font-medium transition-colors duration-200 border border-gray-600/50"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="bg-gray-700/50 text-gray-400 text-xs px-2 py-0.5 rounded border border-gray-600/30">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1.5">
          {hasMultipleRepos ? (
            <div className="flex gap-2 flex-1">
              <a
                href={project.github.frontend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 px-2 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium rounded transition-all duration-200 flex-1 border border-gray-600/50 hover:border-gray-500"
              >
                <Github className="w-3 h-3" />
                <span className="hidden sm:inline">Frontend</span>
                <span className="sm:hidden">FE</span>
              </a>
              <a
                href={project.github.backend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 px-2 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium rounded transition-all duration-200 flex-1 border border-gray-600/50 hover:border-gray-500"
              >
                <Github className="w-3 h-3" />
                <span className="hidden sm:inline">Backend</span>
                <span className="sm:hidden">BE</span>
              </a>
            </div>
          ) : (
            project.github && (
              <a
                href={
                  typeof project.github === "string"
                    ? project.github
                    : project.github.frontend
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium rounded transition-all duration-200 flex-1 justify-center border border-gray-600/50 hover:border-gray-500"
              >
                <Github className="w-3 h-3" />
                Code
              </a>
            )
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-all duration-200 flex-1 justify-center shadow-lg hover:shadow-blue-600/25"
            >
              <ExternalLink className="w-3 h-3" />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
