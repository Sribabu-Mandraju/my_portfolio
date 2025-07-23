"use client"

import { useState } from "react"
import { Folder, Calendar, Tag, ExternalLink } from "lucide-react"
import RecentlyUpdated from "../components/RecentlyUpdated"
import TrendingTags from "../components/TrendingTags"
import { Link } from "react-router-dom"
import { writeups } from "../constants/writeups"
import { File } from "lucide-react";
import { ChevronRight,ChevronDown ,FlagTriangleRight} from "lucide-react"

const recentlyUpdated = [
  "Statemind Web3 CTF 2025",
  "BackdoorCTF 2024",
  "Rustlings Tutorial",
  "TsukuCTF 2025 writeups",
  "picoGym Forensics - Easy writeups",
]

const trendingTags = [
  "web3",
  "ctf",
  "cybersecurity",
  "forensics",
  "writeups",
  "cryptography",
  "pwn",
  "osint",
  "reverse-engineering",
  "steganography",
]

export default function CTFs() {
  const [openCategories, setOpenCategories] = useState({})

  const toggleCategory = (categoryName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getUniqueTagsFromWriteups = (ctfs) => {
    const allTags = ctfs.flatMap((ctf) => ctf.tags || [])
    return [...new Set(allTags)]
  }

  return (
    <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto" aria-label="CTFs">
      <div className="mt-8 hidden md:grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">Total Categories</h3>
            <p className="text-2xl font-bold text-blue-400">{writeups.length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">Total Writeups</h3>
            <p className="text-2xl font-bold text-green-400">
              {writeups.reduce((total, category) => total + category.ctfs.length, 0)}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">Latest Update</h3>
            <p className="text-sm text-gray-300">{formatDate(writeups[0]?.date || new Date().toISOString())}</p>
          </div>
        </div>
        {/* Breadcrumb */}
        {/* <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
          <ol className="list-reset flex">
            <li>
              <Link to="/" className="hover:underline text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2">›</span>
            </li>
            <li className="text-gray-100">CTFs</li>
          </ol>
        </nav> */}


          <div className="flex items-center gap-2 ">
          <FlagTriangleRight className="text-blue-400" />
          <h1 className="text-3xl font-bold mb-5  pt-3 text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text  ">CTF Writeups</h1>
          </div>

        

        <div className="space-y-6">
          {writeups.map((category) => (
            <div key={category.name} className="bg-gray-800 rounded-xl border border-gray-700">
              <button
                className="w-full flex items-center justify-between px-6 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-750 transition-colors"
                onClick={() => toggleCategory(category.name)}
                aria-expanded={openCategories[category.name]}
              >
                <div className="flex items-center  space-x-3">
                  <Folder className="w-5 h-5 text-gray-400" />
                  <div className="text-left">
                    <span className="text-lg font-semibold text-gray-100 block">{category.name}</span>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(category.date)}</span>
                      </span>
                      <span>
                        {category.ctfs.length} writeup{category.ctfs.length !== 1 ? "s" : ""}
                      </span>
                      {/* <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">{category.category}</span> */}
                    </div>
                  </div>
                </div>
                <span className="text-gray-400">{openCategories[category.name] ? <ChevronDown /> : <ChevronRight />
                }</span>
              </button>

              {openCategories[category.name] && (
                <div className="px-6 pb-4 border-t border-gray-900 mt-4">
                  <div className="pt-4 ">
                    {category.ctfs.map((ctf) => (
                      <div key={ctf.id} className="bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center text-zinc-400 text-[15px] gap-2">
                            <File className="w-6 h-6 text-gray-600" />
                              <Link
                              to={`/ctfs/${category.name}/${ctf.id}`}
                              className=" font-medium hover:underline "
                            >
                              {ctf.title}
                            </Link></div>
                           
                            {/* {ctf.tags && ctf.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {ctf.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center px-2 py-1 bg-gray-600 text-gray-200 text-xs rounded-full"
                                  >
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )} */}
                          </div>
                          {/* <div className="flex space-x-2 ml-4">
                            <Link
                              to={`/writeup/${ctf.id}`}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
                            >
                              Read Writeup
                            </Link>
                           
                          </div> */}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Category Tags Summary */}
                  {/* <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-gray-400 mr-2">Tags in this category:</span>
                      {getUniqueTagsFromWriteups(category.ctfs).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        
      </main>

      {/* Right Sidebar (hidden on mobile) */}
      <aside className="hidden lg:block lg:w-80 p-4 lg:p-6 space-y-6 overflow-y-auto" aria-label="Sidebar widgets">
        <RecentlyUpdated items={recentlyUpdated} />
        <TrendingTags tags={trendingTags} setSearchQuery={() => {}} />
      </aside>
    </div>
  )
}
