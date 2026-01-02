"use client";

import { useState } from "react";
import { Folder, ChevronRight, ChevronDown } from "lucide-react";
import RecentlyUpdated from "../components/RecentlyUpdated";
import TrendingTags from "../components/TrendingTags";
import { Link } from "react-router-dom";
import { writeups } from "../constants/writeups";

const recentlyUpdated = [
  // "Statemind Web3 CTF 2025",
  // "BackdoorCTF 2024",
  // "Rustlings Tutorial",
  // "TsukuCTF 2025 writeups",
  // "picoGym Forensics - Easy writeups",
];

const trendingTags = [
  "web3",
  "ctf",
  "cybersecurity",
  "writeups",
  "cryptography",
];

export default function CTFs() {
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (categoryName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getUniqueTagsFromWriteups = (ctfs) => {
    const allTags = ctfs.flatMap((ctf) => ctf.tags || []);
    return [...new Set(allTags)];
  };

  const getTotalWriteups = () => {
    return writeups.reduce(
      (total, category) => total + category.ctfs.length,
      0
    );
  };

  const getCategoryStats = (category) => {
    const subcategories = category.ctfs.length;
    const posts = category.ctfs.length;
    return `${subcategories} categories, ${posts} posts`;
  };

  return (
    <div className="flex flex-1 overflow-hidden flex-col lg:flex-row bg-black min-h-screen">
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto" aria-label="CTFs">
        {/* Stats Cards - Hidden on mobile, shown on larger screens */}
        <div className="mt-8 hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-900">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Total Categories
            </h3>
            <p className="text-2xl font-bold text-blue-400">
              {writeups.length}
            </p>
          </div>
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-900">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Total Writeups
            </h3>
            <p className="text-2xl font-bold text-green-400">
              {getTotalWriteups()}
            </p>
          </div>
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-900">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Latest Update
            </h3>
            <p className="text-sm text-gray-300">
              {formatDate(writeups[0]?.date || new Date().toISOString())}
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            CTFs
          </h1>
        </div>

        {/* Tree Structure */}
        <div className="bg-zinc-950 rounded-lg border border-zinc-900 overflow-hidden">
          {writeups.map((category, index) => (
            <div
              key={category.name}
              className={`${
                index !== writeups.length - 1 ? "border-b border-zinc-900" : ""
              }`}
            >
              {/* Main Category */}
              <button
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-900 transition-colors text-left"
                onClick={() => toggleCategory(category.name)}
                aria-expanded={openCategories[category.name]}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-gray-400">
                    {openCategories[category.name] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                  <Folder className="w-5 h-5 text-blue-400" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                    <span className="text-blue-400 font-medium text-sm sm:text-base">
                      {category.name}
                    </span>
                    <span className="text-gray-500 text-xs sm:text-sm">
                      {getCategoryStats(category)}
                    </span>
                  </div>
                </div>
              </button>

              {/* Subcategories */}
              {openCategories[category.name] && (
                <div className="bg-black">
                  {category.ctfs.map((ctf, ctfIndex) => (
                    <div
                      key={ctf.id}
                      className={`flex items-center space-x-3 px-4 py-2 hover:bg-zinc-900 bg-black transition-colors ${
                        ctfIndex !== category.ctfs.length - 1
                          ? "border-b border-zinc-900"
                          : ""
                      }`}
                    >
                      <div className="w-4 flex justify-center">
                        {/* Connector line */}
                        <div className="w-px h-full bg-zinc-800"></div>
                      </div>
                      <div className="w-4 flex justify-center">
                        <ChevronRight className="w-3 h-3 text-gray-500" />
                      </div>
                      <Folder className="w-4 h-4 text-gray-500" />
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 flex-1 min-w-0">
                        <Link
                          to={`/ctfs/${category.name}/${ctf.id}`}
                          className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base font-medium truncate"
                        >
                          {ctf.title}
                        </Link>
                        <span className="text-gray-500 text-xs flex-shrink-0">
                          1 post
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Right Sidebar (hidden on mobile and tablet) */}
      <aside
        className="hidden xl:block xl:w-80 p-4 lg:p-6 space-y-6 overflow-y-auto bg-black"
        aria-label="Sidebar widgets"
      >
        <RecentlyUpdated items={recentlyUpdated} />
        <TrendingTags tags={trendingTags} setSearchQuery={() => {}} />
      </aside>
    </div>
  );
}
