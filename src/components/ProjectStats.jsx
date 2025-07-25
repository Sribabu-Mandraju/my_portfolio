"use client"

import { BarChart3 } from "lucide-react"

export default function ProjectStats({ stats }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
        Portfolio Overview
      </h3>
      <div className="space-y-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div key={index} className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <IconComponent className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Technology Distribution */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <h4 className="text-sm font-semibold text-white mb-3">Tech Focus</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Web3 & Blockchain</span>
            <span className="text-purple-400">33%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Web Development</span>
            <span className="text-blue-400">44%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Mobile Apps</span>
            <span className="text-green-400">23%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
