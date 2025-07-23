import { Calendar } from "lucide-react"

export default function BlogPostCard({ post }) {
  return (
    <article
      className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors duration-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
      tabIndex={0}
      aria-labelledby={`post-title-${post.id}`}
    >
      <h2
        id={`post-title-${post.id}`}
        className="text-xl font-semibold text-gray-100 mb-3 hover:text-blue-400 cursor-pointer transition-colors duration-200"
      >
        {post.title}
      </h2>
      <p className="text-gray-300 mb-4 leading-relaxed">{post.description}</p>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" aria-hidden="true" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center space-x-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-600 cursor-pointer transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
} 