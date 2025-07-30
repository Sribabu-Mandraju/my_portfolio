"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "KarunyaSetu: Decentralized Disaster Relief",
    date: "Jun 2025",
    url: "https://github.com/Sribabu-Mandraju", // Replace with actual project link if different
    category: "blockchain",
    description:
      "A tamper-proof decentralized aid system ensuring instant, private, and transparent disaster relief with multilingual AI chatbot support.",
  },
  {
    id: 2,
    title: "FuturaX: Blockchain Prediction Market",
    date: "May 2025",
    url: "https://github.com/Sribabu-Mandraju", // Replace with actual project link
    category: "web3",
    description:
      "A decentralized platform for predicting outcomes in sports, crypto, stocks, and more — built with Solidity, React, and OpenAI.",
  },
  {
    id: 3,
    title: "FreightEG: Transport Bidding Platform",
    date: "Apr 2025",
    url: "https://freighteg.in",
    category: "mern",
    description:
      "A transport service system with real-time bidding, branch/staff management, and company-wide logistics optimization.",
  },
  {
    id: 4,
    title: "Teckzite 2k24: National Tech Fest Website",
    date: "Mar 2024",
    url: "https://teckzite.vercel.app", // Update with the actual website or GitHub repo
    category: "mern",
    description:
      "Built with MERN stack and Figma. Includes Google OAuth, Razorpay payments, and admin panel for managing national-level fest.",
  },
  {
    id: 5,
    title: "Full-Stack Engineering @ MeeBuddy",
    date: "Dec 2024",
    url: "#",
    category: "experience",
    description:
      "Contributed to the Ionic-based mobile platform and UI/UX designs for MeeBuddy. Led frontend efforts with Angular and Figma.",
  },
  {
    id: 6,
    title: "Backend Developer @ Techbuggy",
    date: "Dec 2023",
    url: "#",
    category: "experience",
    description:
      "Developed RESTful APIs with Golang and built React.js frontend. Handled data flow, auth, and performance optimization.",
  },
  {
    id: 7,
    title: "E-Crush Web Platform for RGUKT",
    date: "Aug 2023",
    url: "#",
    category: "education",
    description:
      "Built interactive language-learning tools and multiple event websites (Explore, E-Jubilant) for RGUKT with React and Node.js.",
  },
  {
    id: 8,
    title: "Teckzite 2k23: Event Management Website",
    date: "Feb 2023",
    url: "#",
    category: "lamp",
    description: "Developed Teckzite23 website using LAMP stack with Google OAuth and payment gateway integration.",
  },
  
]

function parseDate(dateStr) {
  // Handle different date formats
  let date
  if (dateStr.includes(" ")) {
    // Format like "Jun 2025" or "Dec 2024"
    const [month, year] = dateStr.split(" ")
    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    }
    date = new Date(Number.parseInt(year), monthMap[month], 1)
  } else {
    date = new Date(dateStr)
  }

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

function getCategoryClasses(category) {
  const classes = {
    blockchain: "bg-purple-400/10 text-purple-400 border-purple-400/20",
    web3: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    mern: "bg-green-400/10 text-green-400 border-green-400/20",
    experience: "bg-orange-400/10 text-orange-400 border-orange-400/20",
    education: "bg-cyan-400/10 text-cyan-400 border-cyan-400/20",
    lamp: "bg-red-400/10 text-red-400 border-red-400/20",
    welcome: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    default: "bg-gray-600/10 text-gray-400 border-gray-600/20",
  }
  return classes[category] || classes.default
}

function getCategoryLabel(category) {
  const labels = {
    blockchain: "Blockchain",
    web3: "Web3",
    mern: "MERN Stack",
    experience: "Experience",
    education: "Education",
    lamp: "LAMP Stack",
    welcome: "Welcome",
    default: "General",
  }
  return labels[category] || labels.default
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
  const [selectedYear, setSelectedYear] = useState("all")

  // Parse all posts and sort by date (newest first)
  const allParsedPosts = blogPosts
    .map((post) => ({ ...post, ...parseDate(post.date) }))
    .sort((a, b) => b.fullDate - a.fullDate)

  // Group posts by year
  const postsByYear = allParsedPosts.reduce((acc, post) => {
    const year = post.year
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {})

  // Get available years for filter
  const availableYears = Object.keys(postsByYear).sort((a, b) => b - a)

  // Get posts to display based on selected year
  const postsToDisplay = selectedYear === "all" ? allParsedPosts : postsByYear[selectedYear] || []

  useEffect(() => {
    setVisiblePosts([])
    postsToDisplay.forEach((_, index) => {
      setTimeout(() => {
        setVisiblePosts((prev) => [...prev, index])
      }, index * 100)
    })
  }, [selectedYear, postsToDisplay.length])

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-6">
      <main className="flex-1 w-full max-w-7xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text mb-8">
          My Activity Timeline
        </h1>

        {/* Year Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedYear("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedYear === "all"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
            }`}
          >
            All Years ({allParsedPosts.length})
          </button>
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedYear === year
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
              }`}
            >
              {year} ({postsByYear[year].length})
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-6 sm:left-1/2 transform sm:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-transparent"></div>

          <div className="space-y-6">
            {postsToDisplay.map((post, idx) => (
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
                    <span className="text-sm text-nowrap text-gray-300 font-mono">
                      {post.dayName}, {post.month} {post.day}, {post.year}
                    </span>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-6 w-4 h-4 rounded-full border-2 border-gray-700 bg-gray-900 flex items-center justify-center">
                  <div
                    className={`w-2 h-2 rounded-full ${getCategoryClasses(post.category).split(" ")[0]} animate-pulse`}
                  ></div>
                </div>

                {/* Card */}
                <div className="sm:w-1/2 sm:pl-6 sm:text-left">
                  <div className="ml-12 sm:ml-0 group">
                    <div className="px-4 py-3 ">
                      {/* Date and Category - Mobile */}
                      <div className="flex items-center gap-3 mb-4 sm:hidden">
                        <div className="flex items-center gap-2 bg-gray-700/50 rounded-lg px-3 py-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-300 font-mono">
                            {post.month} {post.day}, {post.year}
                          </span>
                        </div>
                        <div
                          className={`px-2 py-1 text-nowrap rounded-full text-xs font-medium border ${getCategoryClasses(post.category)}`}
                        >
                          {getCategoryLabel(post.category)}
                        </div>
                      </div>

                      {/* Category Badge - Desktop */}
                      <div className="hidden sm:flex items-center gap-2 mb-3">
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryClasses(post.category)}`}
                        >
                          {getCategoryLabel(post.category)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{getRelativeTime(post.date)}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-2 group-hover:text-blue-300 transition-colors">
                        <a
                          href={post.url}
                          className="hover:underline decoration-blue-400 decoration-2 underline-offset-4"
                          target={post.url.startsWith("http") ? "_blank" : "_self"}
                          rel={post.url.startsWith("http") ? "noopener noreferrer" : ""}
                        >
                          {post.title}
                        </a>
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-400 leading-relaxed">{post.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {postsToDisplay.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No activities found for {selectedYear}</p>
                <p className="text-sm">Try selecting a different year or view all activities.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
