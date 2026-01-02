"use client"

import { useState, useEffect } from "react"
import { Code, GitBranch, Package, Cloud } from "lucide-react"

// Development Preloader Component
export const DevelopmentPreloader = ({ isLoading, progress }) => {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const loadingMessages = [
    "Compiling modules...",
    "Bundling assets...",
    "Optimizing code...",
    "Deploying application...",
    "Setting up development environment...",
    "Building user interface...",
    "Launching services...",
  ]

  // Typewriter effect
  useEffect(() => {
    if (!isLoading) return

    const message = loadingMessages[currentMessage]
    let index = 0
    setDisplayText("")
    setIsTyping(true)

    const typeInterval = setInterval(() => {
      if (index < message.length) {
        setDisplayText(message.substring(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
        // Move to next message after a short delay
        setTimeout(() => {
          setCurrentMessage((prev) => (prev + 1) % loadingMessages.length)
        }, 800)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [currentMessage, isLoading, loadingMessages])

  if (!isLoading) return null

  const codeCharacters = [
    "{}",
    "[]",
    ";",
    "//",
    "<>",
    "()",
    "=>",
    "const",
    "let",
    "var",
    "function",
    "class",
    "import",
    "export",
  ]

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Background Code Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-purple-400 text-xs font-mono animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              {codeCharacters[Math.floor(Math.random() * codeCharacters.length)]}
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo/Icon Section */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                <Code className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            {/* Rotating Icons */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-950 rounded-full flex items-center justify-center animate-spin">
              <GitBranch className="w-3 h-3 text-cyan-400" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-zinc-950 rounded-full flex items-center justify-center animate-bounce">
              <Package className="w-3 h-3 text-orange-400" />
            </div>
            <div className="absolute top-1/2 -right-4 w-6 h-6 bg-zinc-950 rounded-full flex items-center justify-center animate-pulse">
              <Cloud className="w-3 h-3 text-pink-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">ᴀᴠɢ ꜱᴘɪᴅᴇʏ࿐</h1>
          <p className="text-gray-400 text-sm">Portfolio Loading...</p>
        </div>
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs text-blue-400 font-mono">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden">
            <div className="relative h-full bg-zinc-900 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Loading Message with Typewriter Effect */}
        <div className="h-6 mb-4">
          <p className="text-sm text-gray-300 font-mono">
            {displayText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
        </div>
        {/* Development Status Indicators */}
        <div className="flex justify-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${progress > 20 ? "bg-green-400" : "bg-gray-600"} ${progress > 20 ? "animate-pulse" : ""}`}
            ></div>
            <span className="text-gray-400">Dependencies</span>
          </div>
          <div className="flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${progress > 50 ? "bg-green-400" : "bg-gray-600"} ${progress > 50 ? "animate-pulse" : ""}`}
            ></div>
            <span className="text-gray-400">Build</span>
          </div>
          <div className="flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${progress > 80 ? "bg-green-400" : "bg-gray-600"} ${progress > 80 ? "animate-pulse" : ""}`}
            ></div>
            <span className="text-gray-400">Deployment</span>
          </div>
        </div>
        {/* Bottom decorative elements */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
