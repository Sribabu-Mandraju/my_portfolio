"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { DevelopmentPreloader } from "./DevelopmentPreloader"
// Component to handle preloader logic based on route
export const PreloaderHandler = ({ children }) => {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Only show preloader when user is on root directory ("/")
    if (location.pathname === "/") {
      setIsLoading(true)
      setProgress(0)

      // Simulate loading progress
      const duration = 2000 // 2 seconds
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
  }, [location.pathname])

  return (
    <>
      <DevelopmentPreloader isLoading={isLoading} progress={progress} />
      {children}
    </>
  )
}
