"use client";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import Home from "./pages/Home";
import CTFs from "./pages/CTFs";
import WriteupDetail from "./pages/WriteupDetail";
import Timeline from "./pages/Timeline";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import { PreloaderHandler } from "./components/PreloaderHandler";
const App = () => {
  // Sidebar state for mobile
  const [activeSection, setActiveSection] = useState("HOME");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      {/* <PreloaderHandler> */}
        <div className="h-screen bg-black text-gray-100 flex flex-col">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-950 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="sidebar-navigation"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`bg-gray-100 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-1"
                    : "-translate-y-0.5"
                }`}
              ></span>
              <span
                className={`bg-gray-100 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`bg-gray-100 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-1"
                    : "translate-y-0.5"
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
                <main
                  className="flex-1 p-4 lg:p-6 overflow-y-auto"
                  aria-label="Main content"
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ctfs" element={<CTFs />} />
                    <Route
                      path="/ctfs/:ctfName/:id"
                      element={<WriteupDetail />}
                    />
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
      {/* </PreloaderHandler> */}
    </Router>
  );
};

export default App;
