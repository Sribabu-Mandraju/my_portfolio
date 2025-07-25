"use client"

import { useState } from "react"
import BlogPostCard from "../components/BlogPostCard"
import RecentlyUpdated from "../components/RecentlyUpdated"
import TrendingTags from "../components/TrendingTags"
import { Trophy, Shield, Code, Quote, Blocks, Database, Globe, Layers, GitBranch } from "lucide-react"

// Mock data for blog posts
const blogPosts = [
  // {
  //   id: 1,
  //   title: "Building Scalable DeFi Applications with Solidity",
  //   description: 'Complete guide to developing secure and efficient decentralized finance applications',
  //   date: "Jul 23, 2025",
  //   tags: ["Solidity", "DeFi", "Web3"],
  //   category: "Tutorial",
  // },
  // {
  //   id: 2,
  //   title: "Next.js 15 App Router: Advanced Patterns",
  //   description: "Deep dive into advanced patterns and best practices for Next.js App Router development.",
  //   date: "May 8, 2025",
  //   tags: ["Next.js", "React", "Full-Stack"],
  //   category: "Development",
  // },
  // {
  //   id: 3,
  //   title: "Smart Contract Security Audit Checklist",
  //   description: "Comprehensive checklist for auditing smart contracts and identifying vulnerabilities.",
  //   date: "May 4, 2025",
  //   tags: ["Security", "Solidity", "Audit"],
  //   category: "Security",
  // },
  // {
  //   id: 4,
  //   title: "Building Full-Stack dApps with React & Ethereum",
  //   description: "Step-by-step guide to creating decentralized applications with modern web technologies.",
  //   date: "Mar 27, 2025",
  //   tags: ["React", "Ethereum", "dApp"],
  //   category: "Tutorial",
  // },
]

// Recent achievements data
const achievements = [
  {
    id: 1,
    title: "DeFi Protocol Launch",
    description: "Successfully launched a decentralized lending protocol with $2M+ TVL",
    date: "July 2025",
    icon: Blocks,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    id: 2,
    title: "Smart Contract Audits",
    description: "Completed security audits for 15+ smart contracts with zero critical vulnerabilities",
    date: "June 2025",
    icon: Shield,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    id: 3,
    title: "Full-Stack Architecture",
    description: "Architected scalable microservices handling 1M+ daily transactions",
    date: "May 2025",
    icon: Layers,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    id: 4,
    title: "Open Source Contributor",
    description: "Contributed to major Web3 libraries with 500+ GitHub stars",
    date: "Apr 2025",
    icon: GitBranch,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
  {
    id: 5,
    title: "Database Optimization",
    description: "Optimized database queries reducing response time by 75%",
    date: "Mar 2025",
    icon: Database,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
  },
  {
    id: 6,
    title: "API Development",
    description: "Built high-performance REST APIs serving 10M+ requests daily",
    date: "Feb 2025",
    icon: Globe,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
]

const recentlyUpdated = [
  "Building Scalable DeFi Applications with Solidity",
  
]

const trendingTags = [
  "solidity",
  "web3",
  "defi",
  "smart-contracts",
  "react",
  "nextjs",
  "typescript",
  "blockchain",
  "full-stack",
  "ethereum",
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto" aria-label="Main content">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border border-gray-600 rounded-xl p-6 lg:p-8 text-white relative overflow-hidden">
            {/* Subtle accent overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-xl"></div>

            {/* Content */}
            <div className="relative z-10">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Welcome to <span className="title-text md:text-5xl text-[#fff]">D4R3_W0LF</span>'s Portfolio
              </h1>
              <p className="text-lg lg:text-xl text-gray-300 mb-4">
                Full-Stack Developer | Web3 Engineer | Smart Contract Auditor
              </p>
              <p className="text-base text-gray-400">
                Passionate about building scalable web applications and secure blockchain solutions. Specializing in
                modern JavaScript frameworks, smart contract development, and DeFi protocols with a focus on security,
                performance, and user experience.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Achievements Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
            Recent Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/20"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${achievement.bgColor} flex-shrink-0`}>
                      <IconComponent className={`w-5 h-5 ${achievement.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white mb-1 truncate">{achievement.title}</h3>
                      <p className="text-xs text-gray-400 mb-2 line-clamp-2 leading-relaxed">
                        {achievement.description}
                      </p>
                      <span className="text-xs text-gray-500">{achievement.date}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Code className="w-6 h-6 mr-2 text-blue-400" />
            Latest Blog Posts
          </h2>
          <div className="space-y-6">
            {filteredPosts.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No blog posts available yet.</p>
                <p className="text-sm">Check back soon for insights on Web3 development and full-stack engineering!</p>
              </div>
            ) : (
              filteredPosts.map((post) => <BlogPostCard key={post.id} post={post} />)
            )}
          </div>
        </div>

        {/* Inspirational Quote Section */}
        <div className="mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 lg:p-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4">
                <Blocks className="w-8 h-8" />
              </div>
              <div className="absolute top-4 right-4">
                <Code className="w-8 h-8" />
              </div>
              <div className="absolute bottom-4 left-4">
                <Database className="w-8 h-8" />
              </div>
              <div className="absolute bottom-4 right-4">
                <Globe className="w-8 h-8" />
              </div>
            </div>
            <div className="relative z-10 text-center">
              <Quote className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <blockquote className="text-lg lg:text-xl font-medium text-white mb-4 leading-relaxed">
                "Innovation happens at the intersection of creativity and technology.
                <br className="hidden sm:block" />I build not just applications, but experiences that shape the future.
                <br className="hidden sm:block" />
                Every line of code is a step towards a more decentralized and accessible world."
              </blockquote>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                <span className="text-sm font-medium">D4R3_W0LF</span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Full-Stack Developer & Web3 Engineer</p>
            </div>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 rounded-xl"></div>
          </div>
        </div>
      </main>

      {/* Right Sidebar (hidden on mobile) */}
      <aside className="hidden lg:block lg:w-80 p-4 lg:p-6 space-y-6 overflow-y-auto" aria-label="Sidebar widgets">
        <RecentlyUpdated items={recentlyUpdated} />
        <TrendingTags tags={trendingTags} setSearchQuery={setSearchQuery} />
      </aside>
    </div>
  )
}
