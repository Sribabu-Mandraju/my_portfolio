"use client"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import TopNav from "./components/TopNav"
import Home from "./pages/Home"
import CTFs from "./pages/CTFs"
import WriteupDetail from "./pages/WriteupDetail"
import Timeline from "./pages/Timeline"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Blogs from "./pages/Blogs"
import { Shield, Lock, Code, Terminal } from "lucide-react"

// Preloader Component
const HackingPreloader = ({ isLoading, progress }) => {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const loadingMessages = [
    "Initializing security protocols...",
    "Scanning for vulnerabilities...",
    "Encrypting data streams...",
    "Establishing secure connection...",
    "Loading ethical hacking tools...",
    "Preparing digital fortress...",
    "Activating defense systems...",
    "Welcome to CYB3R_B01's domain...",
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
  }, [currentMessage, isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 text-xs font-mono animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo/Icon Section */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            {/* Rotating Icons */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center animate-spin">
              <Lock className="w-3 h-3 text-green-400" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center animate-bounce">
              <Code className="w-3 h-3 text-purple-400" />
            </div>
            <div className="absolute top-1/2 -right-4 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center animate-pulse">
              <Terminal className="w-3 h-3 text-yellow-400" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">CYB3R_B01</h1>
          <p className="text-gray-400 text-sm">Digital Fortress Loading...</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs text-blue-400 font-mono">{Math.round(progress)}%</span>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div className="relative h-full bg-gray-700 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
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

        {/* Security Status Indicators */}
        <div className="flex justify-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${progress > 20 ? "bg-green-400" : "bg-gray-600"} ${progress > 20 ? "animate-pulse" : ""}`}
            ></div>
            <span className="text-gray-400">Firewall</span>
          </div>
          <div className="flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${progress > 50 ? "bg-green-400" : "bg-gray-600"} ${progress > 50 ? "animate-pulse" : ""}`}
            ></div>
            <span className="text-gray-400">Encryption</span>
          </div>
          <div className="flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${progress > 80 ? "bg-green-400" : "bg-gray-600"} ${progress > 80 ? "animate-pulse" : ""}`}
            ></div>
            <span className="text-gray-400">Secure</span>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Component to handle preloader logic based on route
const PreloaderHandler = ({ children }) => {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Only show preloader when user is on root directory ("/")
    if (location.pathname === "/") {
      setIsLoading(true)
      setProgress(0)

      // Simulate loading progress
      const duration = 2000 // 4 seconds
      const interval = 50 // Update every 50ms
      const increment = 100 / (duration / interval)

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + increment

          if (newProgress >= 100) {
            clearInterval(progressInterval)

            // Add a small delay before hiding preloader
            setTimeout(() => {
              setIsLoading(false)
            }, 500)

            return 100
          }

          return newProgress
        })
      }, interval)

      return () => clearInterval(progressInterval)
    } else {
      // If not on root, don't show preloader
      setIsLoading(false)
    }
  }, [])

  return (
    <>
      <HackingPreloader isLoading={isLoading} progress={progress} />
      {children}
    </>
  )
}

const App = () => {
  // Sidebar state for mobile
  const [activeSection, setActiveSection] = useState("HOME")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <Router>
      <PreloaderHandler>
        <div className="h-screen bg-gray-900 text-gray-100 flex flex-col">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="sidebar-navigation"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`bg-gray-100 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                }`}
              ></span>
              <span
                className={`bg-gray-100 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`bg-gray-100 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                }`}
              ></span>
            </div>
          </button>

          <div className="flex flex-1 h-0">
            {/* Sidebar */}
            <Sidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              ></div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden lg:ml-0">
              {/* Top Navigation */}
              <TopNav />

              <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
                <main className="flex-1 p-4 lg:p-6 overflow-y-auto" aria-label="Main content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ctfs" element={<CTFs />} />
                    <Route path="/ctfs/:ctfName/:id" element={<WriteupDetail />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/blogs" element={<Blogs />} />
                  </Routes>
                </main>
              </div>
            </div>
          </div>
        </div>
      </PreloaderHandler>
    </Router>
  )
}

export default App
