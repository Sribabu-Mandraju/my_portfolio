"use client";

import { useState } from "react";
import BlogPostCard from "../components/BlogPostCard";
import RecentlyUpdated from "../components/RecentlyUpdated";
import TrendingTags from "../components/TrendingTags";
import {
  Trophy,
  Shield,
  Code,
  Quote,
  Blocks,
  Database,
  Globe,
  Layers,
  GitBranch,
  User,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

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
];

// Recent achievements data
const achievements = [
  // {
  //   id: 1,
  //   title: "DeFi Protocol Launch",
  //   description:
  //     "Successfully launched a decentralized lending protocol with $2M+ TVL",
  //   date: "July 2025",
  //   icon: Blocks,
  //   color: "text-blue-400",
  //   bgColor: "bg-blue-400/10",
  // },
  // {
  //   id: 2,
  //   title: "Smart Contract Audits",
  //   description:
  //     "Completed security audits for 15+ smart contracts with zero critical vulnerabilities",
  //   date: "June 2025",
  //   icon: Shield,
  //   color: "text-green-400",
  //   bgColor: "bg-green-400/10",
  // },
  // {
  //   id: 3,
  //   title: "Full-Stack Architecture",
  //   description:
  //     "Architected scalable microservices handling 1M+ daily transactions",
  //   date: "May 2025",
  //   icon: Layers,
  //   color: "text-purple-400",
  //   bgColor: "bg-purple-400/10",
  // },
  // {
  //   id: 4,
  //   title: "Open Source Contributor",
  //   description: "Contributed to major Web3 libraries with 500+ GitHub stars",
  //   date: "Apr 2025",
  //   icon: GitBranch,
  //   color: "text-orange-400",
  //   bgColor: "bg-orange-400/10",
  // },
  // {
  //   id: 5,
  //   title: "Database Optimization",
  //   description: "Optimized database queries reducing response time by 75%",
  //   date: "Mar 2025",
  //   icon: Database,
  //   color: "text-cyan-400",
  //   bgColor: "bg-cyan-400/10",
  // },
  // {
  //   id: 6,
  //   title: "API Development",
  //   description: "Built high-performance REST APIs serving 10M+ requests daily",
  //   date: "Feb 2025",
  //   icon: Globe,
  //   color: "text-yellow-400",
  //   bgColor: "bg-yellow-400/10",
  // },
];

const recentlyUpdated = ["Building Scalable DeFi Applications with Solidity"];

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
];

// Personal information for About section
const personalInfo = {
  name: "Sribabu Mandraju",
  title: "Full Stack & Web3 Developer | Smart Contract Engineer",
  email: "sribabumandraju@gmail.com",
  phone: "+91 63037 38847",
  location: "Hyderabad, India",
  github: "https://github.com/Sribabu-Mandraju",
  linkedin: "https://www.linkedin.com/in/sribabu-mandraju-590524233",
  twitter: "https://x.com/5R1B4BU",
  bio:
    "I'm a Full Stack & Web3 Developer and Smart Contract Engineer passionate about crafting decentralized applications (dApps) and scalable web solutions. I merge cutting-edge blockchain technology with modern web development to build secure, transparent, and user-centric applications.",
};

// Work experience (condensed for resume view)
const workExperience = [
  {
    id: 1,
    company: "Mee Buddy",
    location: "Mangalagiri",
    position: "Full Stack Developer and UI/UX Designer",
    duration: "Dec 2024 – Present",
    description:
      "Part of the team that designed and developed the MeeBuddy platform using the MEAN stack, built and maintained cross-platform mobile applications with Ionic.",
    achievements: [
      "Designed intuitive interfaces using Figma, enhancing user engagement",
      "Built cross-platform mobile applications with Ionic framework",
      "Optimized application performance and user satisfaction",
    ],
    technologies: [
      "MongoDB",
      "Express.js",
      "Angular",
      "Node.js",
      "Ionic",
      "Figma",
    ],
    type: "current",
  },
  {
    id: 2,
    company: "Techbuggy",
    location: "Hyderabad",
    position: "Full Stack Developer (Go Backend & React Frontend)",
    duration: "Dec 2023 – Nov 2024",
    description:
      "Developed full-stack web applications using React for frontend and Golang for backend, designed scalable RESTful APIs.",
    achievements: [
      "Built scalable RESTful APIs supporting core functionalities",
      "Developed responsive UI components using modern JavaScript",
      "Implemented authentication and database interactions",
    ],
    technologies: [
      "Go",
      "React.js",
      "JavaScript",
      "TailwindCSS",
      "RESTful APIs",
    ],
    type: "previous",
  },
  {
    id: 3,
    company: "Teckzite",
    location: "Nuzvid",
    position: "Web Manager and Team Lead",
    duration: "Mar 2021 - Present",
    description:
      "Managed official websites for Teckzite events using MERN stack, directed development teams, and developed admin panels for event management.",
    achievements: [
      "Managed Teckzite25, Teckzite24, and Teckzite23 official websites",
      "Led development team in implementing web and mobile features",
      "Developed intuitive admin panel for event management",
    ],
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "AWS"],
    type: "current",
  },
];

// Education
const education = {
  institution: "Rajiv Gandhi University of Knowledge and Technologies",
  location: "Nuzvid",
  degree: "B.Tech. in Computer Science and Engineering",
  duration: "Sep 2023 - Present",
  cgpa: "8.4/10",
};

// Key Skills (condensed)
const keySkills = {
  blockchain: [
    "Solidity",
    "Ethereum",
    "Hardhat",
    "Foundry",
    "Ethers.js",
    "Web3.js",
    "IPFS",
    "DeFi",
  ],
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "TailwindCSS",
    "Angular",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "Go",
    "Python",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
  ],
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
      {/* Main Content */}
      <main
        className="flex-1 p-4 lg:p-6 overflow-y-auto"
        aria-label="Main content"
      >
        {/* Hero Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-zinc-950 via-black to-zinc-950 border border-zinc-900 rounded-xl p-6 lg:p-8 text-white relative overflow-hidden">
            {/* Subtle accent overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-xl"></div>

            {/* Content */}
            <div className="relative z-10">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Welcome to{" "}
                <span className="title-text md:text-5xl text-[#fff]">
                  ᴀᴠɢ ꜱᴘɪᴅᴇʏ࿐
                </span>
                's Portfolio
              </h1>
              <p className="text-lg lg:text-xl text-gray-300 mb-4">
                Full-Stack Developer | Web3 Engineer | Smart Contract Developer
              </p>
              <p className="text-base text-gray-400">
                Passionate about building scalable web applications and secure
                blockchain solutions. Specializing in modern JavaScript
                frameworks,Scalable backend development smart contract
                development, and DeFi protocols with a focus on security,
                performance, and user experience.
              </p>
            </div>
          </div>
        </div>

        {/* About / Resume Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <User className="w-6 h-6 mr-2 text-blue-400" />
            About Me
          </h2>

          {/* Bio Card */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 lg:p-8 mb-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              {personalInfo.bio}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                <span>Hire Me</span>
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Key Skills */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 lg:p-8 mb-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2 text-green-400" />
              Technical Skills
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-3">
                  Blockchain & Web3
                </h4>
                <div className="flex flex-wrap gap-2">
                  {keySkills.blockchain.map((skill) => (
                    <span
                      key={skill}
                      className="bg-zinc-900 text-gray-300 text-xs px-3 py-1 rounded-full border border-zinc-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-purple-400 mb-3">
                  Frontend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {keySkills.frontend.map((skill) => (
                    <span
                      key={skill}
                      className="bg-zinc-900 text-gray-300 text-xs px-3 py-1 rounded-full border border-zinc-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-cyan-400 mb-3">
                  Backend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {keySkills.backend.map((skill) => (
                    <span
                      key={skill}
                      className="bg-zinc-900 text-gray-300 text-xs px-3 py-1 rounded-full border border-zinc-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 lg:p-8 mb-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-yellow-400" />
              Work Experience
            </h3>
            <div className="space-y-6">
              {workExperience.map((job, index) => (
                <div
                  key={job.id}
                  className="relative pl-6 border-l-2 border-zinc-800"
                >
                  {index !== workExperience.length - 1 && (
                    <div className="absolute left-[-2px] top-8 bottom-[-24px] w-0.5 bg-zinc-800"></div>
                  )}
                  <div className="absolute left-[-8px] top-2 w-4 h-4 rounded-full bg-blue-500 border-2 border-black"></div>

                  <div className="ml-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          {job.position}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mt-1">
                          <span className="font-semibold text-blue-400">
                            {job.company}
                          </span>
                          <span>•</span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{job.duration}</span>
                        {job.type === "current" && (
                          <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                      {job.description}
                    </p>
                    <div className="mb-3">
                      <ul className="space-y-1">
                        {job.achievements
                          .slice(0, 2)
                          .map((achievement, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-400"
                            >
                              <CheckCircle className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="bg-zinc-900 text-gray-400 text-xs px-2 py-1 rounded border border-zinc-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 lg:p-8 mb-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-purple-400" />
              Education
            </h3>
            <div className="pl-6 border-l-2 border-zinc-800">
              <div className="ml-4">
                <h4 className="text-lg font-bold text-white">
                  {education.degree}
                </h4>
                <p className="text-blue-400 font-semibold mt-1">
                  {education.institution}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mt-2">
                  <span>{education.location}</span>
                  <span>•</span>
                  <span>{education.duration}</span>
                  <span>•</span>
                  <span className="text-green-400 font-semibold">
                    CGPA: {education.cgpa}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6 lg:p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Let's Work Together
            </h3>
            <p className="text-gray-300 mb-6">
              I'm available for full-time opportunities, freelance projects, and
              consulting work.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-semibold"
              >
                <Mail className="w-5 h-5" />
                <span>Get In Touch</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-colors duration-200 border border-zinc-800"
              >
                <Linkedin className="w-5 h-5" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
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
                <p className="text-sm">
                  Check back soon for insights on Web3 development and
                  full-stack engineering!
                </p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>

        {/* Inspirational Quote Section */}
        <div className="mb-8">
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 lg:p-8 relative overflow-hidden">
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
                You have the right to perform your duties, but not to the fruits
                of your actions. Do not let the fruits be your motive, nor let
                your attachment be to inaction.
              </blockquote>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                <span className="text-sm font-medium">ᴀᴠɢ ꜱᴘɪᴅᴇʏ࿐</span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Full-Stack Developer & Web3 Engineer
              </p>
            </div>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 rounded-xl"></div>
          </div>
        </div>
      </main>

      {/* Right Sidebar (hidden on mobile) */}
      <aside
        className="hidden lg:block lg:w-80 p-4 lg:p-6 space-y-6 overflow-y-auto"
        aria-label="Sidebar widgets"
      >
        <RecentlyUpdated items={recentlyUpdated} />
        <TrendingTags tags={trendingTags} setSearchQuery={setSearchQuery} />
      </aside>
    </div>
  );
}
