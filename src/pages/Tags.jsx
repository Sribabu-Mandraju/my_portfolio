import { useMemo } from "react"
import RecentlyUpdated from "../components/RecentlyUpdated"
import TrendingTags from "../components/TrendingTags"
import { Link } from "react-router-dom"

// Mock data for blog posts (same as Home)
const blogPosts = [
  {
    id: 1,
    title: "Autopsy - Tutorial for N00bs",
    description: 'This post consists of an article "Autopsy - Tutorial for N00bs"',
    date: "Jul 23, 2025",
    tags: ["Tutorial"],
    category: "Tutorial",
  },
  {
    id: 2,
    title: "picoGym Forensics - Easy writeups",
    description: "This post consists of writeups of the challenges CYB3R_B01 had solved in PicoCTF practice.",
    date: "May 8, 2025",
    tags: ["CTF", "PicoCTF"],
    category: "CTF",
  },
  {
    id: 3,
    title: "TsukuCTF 2025 writeups",
    description: "This post consists of writeups of the challenges CYB3R_B01 had solved in TsukuCTF 2025.",
    date: "May 4, 2025",
    tags: ["CTF", "TsukuCTF"],
    category: "CTF",
  },
  {
    id: 4,
    title: "WolvCTF 2025 writeups",
    description: "This post consists of writeups of the challenges CYB3R_B01 had solved in WolvCTF 2025.",
    date: "Mar 27, 2025",
    tags: ["CTF", "WolvCTF"],
    category: "CTF",
  },
]

const recentlyUpdated = [
  "Autopsy - Tutorial for N00bs",
  "TsukuCTF 2025 writeups",
  "picoGym Forensics - Easy writeups",
  "WolvCTF 2025 writeups",
  "Welcome to My Blog 👋",
]

const trendingTags = [
  "cybersecurity",
  "ctf",
  "forensics",
  "writeups",
  "cryptography",
  "pwn",
  "osint",
  "reverse-engineering",
  "steganography",
  "welcome",
]x

function getAllTags(posts) {
  const tagMap = {}
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagMap[tag] = (tagMap[tag] || 0) + 1
    })
  })
  return Object.entries(tagMap).map(([tag, count]) => ({ tag, count }))
}

export default function Tags() {
  const tags = useMemo(() => getAllTags(blogPosts), [])

  return (
    <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto" aria-label="Tags">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
          <ol className="list-reset flex">
            <li><Link to="/" className="hover:underline text-gray-300">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-gray-100">Tags</li>
          </ol>
        </nav>
        <h1 className="text-3xl font-bold mb-8 text-gray-100">Tags</h1>
        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <button
              key={tag}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-700 bg-gray-800 text-blue-300 font-medium shadow-sm hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 text-base"
              style={{ boxShadow: "0 2px 8px 0 rgba(30,64,175,0.08)" }}
            >
              <span className="capitalize">{tag}</span>
              <span className="ml-1 text-xs bg-blue-700 text-white rounded-full px-2 py-0.5">{count}</span>
            </button>
          ))}
        </div>
      </main>
      {/* Right Sidebar (hidden on mobile) */}
      <aside className="hidden lg:block lg:w-80 p-4 lg:p-6 space-y-6 overflow-y-auto" aria-label="Sidebar widgets">
        <RecentlyUpdated items={recentlyUpdated} />
        <TrendingTags tags={trendingTags} setSearchQuery={() => {}} />
      </aside>
    </div>
  )
} 