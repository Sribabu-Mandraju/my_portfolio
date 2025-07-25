"use client"

import { ExternalLink, Github, TrendingUp, Star } from "lucide-react"

const categoryColors = {
  web3: "bg-purple-400/10 text-purple-400 border-purple-400/20",
  web: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  mobile: "bg-green-400/10 text-green-400 border-green-400/20",
}

const categoryIcons = {
  web3: "🔗",
  web: "🌐",
  mobile: "📱",
}

export default function ProjectCard({ project }) {
  const hasMultipleRepos = typeof project.github === "object" && project.github.frontend

  return (
    <div className="group bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-1">
      {/* Project Image */}
      <div className="relative h-64 bg-gray-700 overflow-hidden">
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
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border backdrop-blur-sm ${categoryColors[project.category]}`}
          >
            <span>{categoryIcons[project.category]}</span>
            {project.category === "web3" ? "Web3" : project.category === "web" ? "Web" : "Mobile"}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 bg-yellow-400/20 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-yellow-400/30 backdrop-blur-sm">
              <Star className="w-3 h-3" />
              Featured
            </span>
          </div>
        )}

        {/* Quick Actions (shown on hover) */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {hasMultipleRepos ? (
            <>
              <a
                href={project.github.frontend}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-900/90 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200 backdrop-blur-sm"
                title="Frontend Code"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={project.github.backend}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-900/90 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200 backdrop-blur-sm"
                title="Backend Code"
              >
                <Github className="w-4 h-4" />
              </a>
            </>
          ) : (
            project.github && (
              <a
                href={typeof project.github === "string" ? project.github : project.github.frontend}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-900/90 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200 backdrop-blur-sm"
                title="View Code"
              >
                <Github className="w-4 h-4" />
              </a>
            )
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-blue-600/90 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 backdrop-blur-sm"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-200 leading-tight">
            {project.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 min-h-[60px]">{project.description}</p>
        </div>

        {/* Impact */}
        <div className="mb-5 p-4 bg-gradient-to-r from-gray-700/30 to-gray-600/20 rounded-lg border border-gray-600/50">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-semibold text-green-400">Impact:</span> {project.impact}
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="bg-gray-700/80 hover:bg-gray-600 text-gray-200 text-xs px-3 py-1.5 rounded-md font-medium transition-colors duration-200 border border-gray-600/50"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="bg-gray-700/50 text-gray-400 text-xs px-3 py-1.5 rounded-md border border-gray-600/30">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {hasMultipleRepos ? (
            <div className="flex gap-2 flex-1">
              <a
                href={project.github.frontend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-all duration-200 flex-1 border border-gray-600/50 hover:border-gray-500"
              >
                <Github className="w-4 h-4" />
                Frontend
              </a>
              <a
                href={project.github.backend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-all duration-200 flex-1 border border-gray-600/50 hover:border-gray-500"
              >
                <Github className="w-4 h-4" />
                Backend
              </a>
            </div>
          ) : (
            project.github && (
              <a
                href={typeof project.github === "string" ? project.github : project.github.frontend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-all duration-200 flex-1 justify-center border border-gray-600/50 hover:border-gray-500"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 flex-1 justify-center shadow-lg hover:shadow-blue-600/25"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
