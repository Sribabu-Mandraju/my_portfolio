"use client"
import { useState } from "react"
import BlogPostCard from "../components/BlogPostCard"
import RecentlyUpdated from "../components/RecentlyUpdated"
import TrendingTags from "../components/TrendingTags"
import { Award, Trophy, Shield, Code, Target, Zap, Quote } from "lucide-react"

// Mock data for blog posts
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

// Recent achievements data
const achievements = [
  {
    id: 1,
    title: "TsukuCTF 2025 - Top 50",
    description: "Secured top 50 position in TsukuCTF 2025 competition",
    date: "May 2025",
    icon: Trophy,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    id: 2,
    title: "PicoCTF Forensics Master",
    description: "Completed all easy-level forensics challenges in picoGym",
    date: "May 2025",
    icon: Award,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    id: 3,
    title: "WolvCTF 2025 Participant",
    description: "Successfully participated and solved multiple challenges",
    date: "Mar 2025",
    icon: Shield,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    id: 4,
    title: "Autopsy Forensics Expert",
    description: "Created comprehensive tutorial for digital forensics beginners",
    date: "Jul 2025",
    icon: Target,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    id: 5,
    title: "Ethical Hacking Journey",
    description: "Continuously learning and practicing ethical hacking techniques",
    date: "Ongoing",
    icon: Code,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
  },
  {
    id: 6,
    title: "Cybersecurity Advocate",
    description: "Promoting cybersecurity awareness through writeups and tutorials",
    date: "2025",
    icon: Zap,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
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
      <h1 className="text-3xl  lg:text-4xl  font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
        Welcome to <span className="title-text md:text-5xl text-[#fff]">D4R3_W0LF</span>'s Digital Fortress
      </h1>
      <p className="text-lg lg:text-xl text-gray-300 mb-4">
        Ethical Hacker | CTF Player | Cybersecurity Enthusiast
      </p>
      <p className="text-base text-gray-400">
        Breaking code to build stronger defenses. Exploring the depths of cybersecurity through CTFs, forensics,
        and ethical hacking.
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
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${achievement.bgColor}`}>
                      <IconComponent className={`w-5 h-5 ${achievement.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white mb-1 truncate">{achievement.title}</h3>
                      <p className="text-xs text-gray-400 mb-2 line-clamp-2">{achievement.description}</p>
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
                <p>No blog posts found.</p>
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
                <Code className="w-8 h-8" />
              </div>
              <div className="absolute top-4 right-4">
                <Shield className="w-8 h-8" />
              </div>
              <div className="absolute bottom-4 left-4">
                <Target className="w-8 h-8" />
              </div>
              <div className="absolute bottom-4 right-4">
                <Zap className="w-8 h-8" />
              </div>
            </div>

            <div className="relative z-10 text-center">
              <Quote className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <blockquote className="text-lg lg:text-xl font-medium text-white mb-4 leading-relaxed">
                "We can achieve anything with determination and discipline.
                <br className="hidden sm:block" />I break code not to destroy, but to build stronger defenses.
                <br className="hidden sm:block" />
                Every vulnerability discovered is a step towards a more secure digital world."
              </blockquote>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                <span className="text-sm font-medium">CYB3R_B01</span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Ethical Hacker & Cybersecurity Enthusiast</p>
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
