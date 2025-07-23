import { Search } from "lucide-react"

export default function TopNav({ searchQuery, setSearchQuery }) {
  return (
    <header className="px-4 lg:px-6 py-4" role="banner">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* <span className="text-gray-300 ml-12 lg:ml-0">Home</span> */}
        </div>
        {/* <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            aria-label="Search blog posts"
          />
        </div> */}
      </div>
    </header>
  )
} 