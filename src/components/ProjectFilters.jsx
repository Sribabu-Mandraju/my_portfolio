"use client"

import { Filter, Layers, Star } from "lucide-react"

export default function ProjectFilters({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Filter className="w-5 h-5 mr-2 text-blue-400" />
        Project Categories
      </h3>

      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              {category.label}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === category.id ? "bg-blue-500/30 text-blue-100" : "bg-gray-600 text-gray-300"
              }`}
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Featured Projects Info */}
      <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-semibold text-yellow-400">Featured Projects</span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          Highlighted projects showcase exceptional innovation, impact, and technical excellence.
        </p>
      </div>
    </div>
  )
}
