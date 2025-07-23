"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Autopsy - Tutorial for N00bs",
    date: "Jul 23, 2025",
    url: "#",
    category: "forensics",
    description: "Complete tutorial on digital forensics using Autopsy tool",
  },
  {
    id: 2,
    title: "picoGym Forensics - Easy writeups",
    date: "May 8, 2025",
    url: "#",
    category: "ctf",
    description: "Writeups for beginner-friendly forensics challenges",
  },
  {
    id: 3,
    title: "TsukuCTF 2025 writeups",
    date: "May 4, 2025",
    url: "#",
    category: "ctf",
    description: "Solutions and explanations for TsukuCTF 2025 challenges",
  },
  
  {
    id: 4,
    title: "WolvCTF 2025 writeups",
    date: "Mar 27, 2025",
    url: "#",
    category: "ctf",
    description: "Comprehensive writeups from WolvCTF 2025 competition",
  },
  {
    id: 5,
    title: "Welcome to My Blog 👋",
    date: "Mar 14, 2025",
    url: "#",
    category: "welcome",
    description: "Introduction to my cybersecurity journey and blog",
  },
]

function parseDate(dateStr) {
  const date = new Date(dateStr)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return {
    day: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
    fullDate: date,
    monthNum: date.getMonth() + 1,
    dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
  }
}

function getCategoryColor(category) {
  const colors = {
    forensics: "bg-purple-500",
    ctf: "bg-blue-500",
    welcome: "bg-green-500",
    default: "bg-gray-500",
  }
  return colors[category] || colors.default
}

function getRelativeTime(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  if (diffDays === 1) return "1 day ago"
  if (diffDays < 30) return `${diffDays} days ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

export default function Timeline() {
  const [visiblePosts, setVisiblePosts] = useState([])
  const selectedYear = 2025

  const postsByYear = blogPosts.reduce((acc, post) => {
    const parsedPost = { ...post, ...parseDate(post.date) }
    const year = parsedPost.year
    if (!acc[year]) acc[year] = []
    acc[year].push(parsedPost)
    return acc
  }, {})

  Object.keys(postsByYear).forEach((year) => {
    postsByYear[year].sort((a, b) => b.fullDate - a.fullDate)
  })

  useEffect(() => {
    setVisiblePosts([])
    const posts = postsByYear[selectedYear] || []
    posts.forEach((_, index) => {
      setTimeout(() => {
        setVisiblePosts((prev) => [...prev, index])
      }, index * 100)
    })
  }, [selectedYear])

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-6">
      <main className="flex-1 w-full max-w-7xl ">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text mb-8">
          My Activity Timeline
        </h1>

        <div className="relative">
          <div className="absolute left-6 sm:left-1/2 transform sm:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-transparent"></div>

          <div className="space-y-6">
            {postsByYear[selectedYear].map((post, idx) => (
              <div
                key={post.id}
                className={`relative flex flex-col sm:flex-row sm:items-start transition-all duration-700 transform ${
                  visiblePosts.includes(idx) ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Date Tag - Desktop */}
                <div className="hidden sm:flex sm:w-1/2 sm:justify-end sm:pr-6">
                  <div className="flex items-center gap-2 bg-gray-700/30 rounded-lg px-3 py-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300 font-mono">
                      {post.dayName}, {post.month} {post.day}, {post.year}
                    </span>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-6 w-4 h-4 rounded-full border-2 border-gray-700 bg-gray-900 flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${getCategoryColor(post.category)} animate-pulse`}></div>
                </div>

                {/* Card */}
                <div className="sm:w-1/2 sm:pl-6  sm:text-left">
                  <div className="ml-12 sm:ml-0 group">
                    <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/70 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-700/50 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition duration-300 hover:scale-[1.02] hover:border-blue-500/30">
                      {/* Date - Mobile */}
                      <div className="flex items-center gap-3 mb-4 sm:hidden">
                        <div className="flex items-center gap-2 bg-gray-700/50 rounded-lg px-3 py-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-300 font-mono">
                            {post.month} {post.day}, {post.year}
                          </span>
                        </div>
                        {/* <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{getRelativeTime(post.date)}</span>
                        </div> */}
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-2 group-hover:text-blue-300 transition-colors">
                        <a
                          href={post.url}
                          className="hover:underline decoration-blue-400 decoration-2 underline-offset-4"
                        >
                          {post.title}
                        </a>
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
