export default function TrendingTags({ tags, setSearchQuery }) {
  return (
    <section className="bg-gray-800 border border-gray-700 rounded-lg p-4" aria-labelledby="trending-tags-title">
      <h3 className="text-lg font-semibold text-gray-100 mb-4" id="trending-tags-title">Trending Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => setSearchQuery(tag)}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-1 rounded-full text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Search for tag ${tag}`}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  )
} 