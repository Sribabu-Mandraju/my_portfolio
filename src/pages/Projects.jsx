"use client";

import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectFilters from "../components/ProjectFilters";
import ProjectStats from "../components/ProjectStats";
import { Code, Globe, Users, Star, Search } from "lucide-react";

// Import images
import az from "../assets/images/azlogistics.png";
import futurax from "../assets/images/futurax.png";
import karunyasetu from "../assets/images/karunyasetu.png";
import livebreak from "../assets/images/liveBreak.png";
import meebuddy from "../assets/images/meebuddy.png";
import rvsLabs from "../assets/images/rvsLabs.png";
import tz from "../assets/images/tz.png";
import tz_admin from "../assets/images/tz_admin.png";

// Projects data
const projects = [
  {
    id: 1,
    title: "Karunyasetu Dapp",
    description:
      "A blockchain-based disaster relief system offering instant, transparent aid distribution. Features multilingual AI chatbots and decentralized verification.",
    category: "web3",
    tags: ["Solidity", "Smart Contracts", "Web3", "AI Chatbot"],
    image: karunyasetu,
    github: "https://github.com/Sribabu-Mandraju/karunyasetu",
    live: "https://karunyasethu.vercel.app/",
    impact:
      "Restored trust in relief distribution during crises using blockchain.",
    techStack: ["Solidity", "React", "IPFS", "ChatGPT", "Smart Contracts"],
    featured: true,
  },
  {
    id: 2,
    title: "Futurax",
    description:
      "A decentralized prediction platform where users stake crypto on real-world events. Utilizes smart contracts for fair and tamper-proof outcomes.",
    category: "web3",
    tags: ["Solidity", "React", "Blockchain", "Web3"],
    image: futurax,
    github: "https://github.com/Sribabu-Mandraju/futurax",
    live: "https://future-x-ulpg.vercel.app/",
    impact:
      "Enabled transparent prediction markets with secure crypto staking.",
    techStack: ["Solidity", "React", "Ethers.js", "Smart Contracts"],
    featured: true,
  },
  {
    id: 3,
    title: "Decentralized TimeLock Deposit",
    description:
      "An ERC721-based staking system where users lock USDT to mint NFTs representing time-locked deposits with fixed ROI.",
    category: "web3",
    tags: ["Solidity", "React", "Blockchain", "Web3", "base-mainnet"],
    image: rvsLabs,
    github: "https://github.com/Sribabu-Mandraju/rvs_labs",
    live: "https://www.rvrlabs.xyz",
    impact:
      "Enabled transparent prediction markets with secure crypto staking.",
    techStack: ["Solidity", "React", "Node.js", "Ethers.js", "Smart Contracts"],
    featured: false,
  },
  {
    id: 4,
    title: "Teckzite2k25 Official Website",
    description:
      "A dynamic platform for Teckzite, the annual National Techno-management fest at RGUKT Nuzvid. Built with the MERN stack, featuring Google Authentication, Razorpay payment gateway, and a custom admin panel for managing events and participants.",
    category: "web",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "TailwindCSS"],
    image: tz,
    github: {
      frontend: "https://github.com/siddhuthecoder/teckzite24",
      backend: "https://github.com/Sribabu-Mandraju/teckzite-backend",
    },
    live: "https://teckzite.vercel.app",
    impact:
      "Enabled 1,000+ participants to register and manage event activities.",
    techStack: ["MERN Stack", "Razorpay", "Google Auth", "TailwindCSS", "AWS"],
    featured: true,
  },
  {
    id: 5,
    title: "Mee Buddy",
    description:
      "A commercial ad-slot booking portal for Mee24News, allowing users and reporters to buy regional ad spaces across AP and Telangana with real-time pricing and secure payments.",
    category: "web",
    tags: ["React", "Node.js", "MongoDB", "Express.js"],
    image: meebuddy,
    github: {
      frontend: "https://github.com/Sribabu-Mandraju/meenews-frontend",
      backend: "https://github.com/Sribabu-Mandraju/meenews-backend",
    },
    live: "https://meebuddy.com/",
    impact: "Streamlined regional ad-slot purchases for over 100 reporters.",
    techStack: ["MERN Stack", "Payment Gateway", "Role-based Dashboard"],
    featured: true,
  },
  {
    id: 6,
    title: "AZLogic Solutions",
    description:
      "Landing page for a digital solutions company, built with engaging UI/UX and Framer Motion for smooth animations.",
    category: "web",
    tags: ["React", "Framer Motion", "TailwindCSS"],
    image: az,
    github: "https://github.com/Sribabu-Mandraju/azlogic-solutions",
    live: "https://mee-code-x.vercel.app/",
    impact:
      "Improved conversion with a visually appealing and modern interface.",
    techStack: ["React", "TailwindCSS", "Framer Motion"],
    featured: false,
  },
  {
    id: 7,
    title: "Teckzite2k25 Admin Panel",
    description:
      "An admin panel to maintain and send real time updates by the coordinators of teckzite monitoring registrations for the event and analysing statistics and trafic from users",
    category: "web",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "TailwindCSS"],
    image: tz_admin,
    github: {
      frontend: "https://github.com/Sribabu-Mandraju/teckzite-frontend",
      backend: "https://github.com/Sribabu-Mandraju/teckzite-backend",
    },
    live: "https://teckzite.vercel.app",
    impact:
      "Enabled 1,000+ participants to register and manage event activities.",
    techStack: ["MERN Stack", "Razorpay", "Google Auth", "TailwindCSS", "AWS"],
    featured: false,
  },
  {
    id: 8,
    title: "Livebreak App and Website",
    description:
      "A local news app for real time updates and have realtime feedbacks and instaneous news from reporters",
    category: "mobile",
    tags: ["Ionic", "Angular", "Node.js", "MongoDB", "React"],
    image: livebreak,
    live: "https://live-break-kappa.vercel.app/",
    impact: "Empowered rural users with digital news access.",
    techStack: ["Angular", "Ionic", "MongoDB", "TailwindCSS"],
    featured: false,
  },
  {
    id: 9,
    title: "MeeBuddy App and Website",
    description:
      "An eCommerce platform tailored for rural India, featuring cross-platform app functionality with Ionic and Angular. Worked on major UI improvements and backend features.",
    category: "mobile",
    tags: ["Ionic", "Angular", "Node.js", "MongoDB"],
    image: meebuddy,
    live: "https://meebuddy.in",
    impact: "Empowered rural users with digital commerce access.",
    techStack: ["Angular", "Ionic", "MongoDB", "TailwindCSS"],
    featured: false,
  },
];

const categories = [
  { id: "all", label: "All Projects", count: projects.length },
  {
    id: "web3",
    label: "Web3 & Blockchain",
    count: projects.filter((p) => p.category === "web3").length,
  },
  {
    id: "web",
    label: "Web Development",
    count: projects.filter((p) => p.category === "web").length,
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    count: projects.filter((p) => p.category === "mobile").length,
  },
];

const projectStats = [
  {
    label: "Total Projects",
    value: projects.length.toString(),
    icon: Code,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    label: "Live Applications",
    value: projects.filter((p) => p.live).length.toString(),
    icon: Globe,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    label: "Featured Projects",
    value: projects.filter((p) => p.featured).length.toString(),
    icon: Star,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    label: "Total Impact",
    value: "2K+",
    icon: Users,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
];

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesFeatured = !showFeaturedOnly || project.featured;

    return matchesCategory && matchesSearch && matchesFeatured;
  });

  return (
    <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
      {/* Main Content */}
      <main
        className="flex-1 p-4 lg:p-6 overflow-y-auto"
        aria-label="Projects content"
      >
        {/* Hero Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border border-gray-600 rounded-xl p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-xl"></div>
            <div className="relative z-10">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                My Projects Portfolio
              </h1>
              <p className="text-lg lg:text-xl text-gray-300 mb-4">
                Showcasing innovative Web3 solutions, full-stack applications,
                and mobile experiences
              </p>
              <p className="text-base text-gray-400">
                From decentralized applications and smart contracts to
                enterprise web platforms and mobile apps, each project
                demonstrates expertise in cutting-edge technologies and
                real-world problem solving.
              </p>
            </div>
          </div>
        </div>

        {/* Project Stats */}
        <div className="mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {projectStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center hover:border-gray-600 transition-colors duration-200"
                >
                  <div
                    className={`inline-flex p-2 rounded-lg ${stat.bgColor} mb-2`}
                  >
                    <IconComponent className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
                }`}
              >
                <span>{category.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCategory === category.id
                      ? "bg-blue-500/30 text-blue-100"
                      : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search and Options */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm">Featured only</span>
              </label>
              <div className="text-sm text-gray-400">
                {filteredProjects.length} of {projects.length} projects
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No projects found.</p>
              <p className="text-sm">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar (hidden on mobile) */}
      {/* <aside
        className="hidden lg:block lg:w-80 p-4 lg:p-6 space-y-6 overflow-y-auto"
        aria-label="Project filters"
      >
        <ProjectFilters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <ProjectStats stats={projectStats} />
      </aside> */}
    </div>
  );
}

export default Projects;
