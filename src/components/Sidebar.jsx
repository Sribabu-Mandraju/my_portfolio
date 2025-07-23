import { NavLink } from "react-router-dom"
import { Home, Tag,FlagTriangleRight ,Clock, User, Github, Twitter, Mail, Rss, Linkedin, TwitterIcon } from "lucide-react"
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub,FaLinkedin } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";



const navItems = [
  { name: "HOME", icon: Home, to: "/" },
  { name: "CTFS", icon: FlagTriangleRight , to: "/ctfs" },
  { name: "BLOGS", icon: FaCode, to: "/blogs" },
  { name: "PROJECTS", icon: FaCode, to: "/projects" },
  { name: "TIMELINE", icon: Clock, to: "/timeline" },
  { name: "ABOUT", icon: User, to: "/about" },
]

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  return (
    <nav
      className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-800 border-r border-gray-700 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      aria-label="Sidebar Navigation"
    >
      <div className="flex flex-col h-full">
        {/* Profile Section */}
        <div className="p-6 text-center border-b border-gray-700">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-700">
            <img
              src="/placeholder.svg?height=96&width=96"
              alt="CYB3R_B01 Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-100 mb-1">CYB3R_B01</h2>
          <p className="text-gray-400 text-sm italic">No Quirk. Just skill.</p>
        </div>
        {/* Navigation Menu */}
        <ul className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ` +
                  (isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white")
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
                tabIndex={0}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" aria-hidden="true" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Social Links */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex justify-center space-x-4">
            {[
              { icon: FaGithub, href: "#", label: "GitHub" },
              { icon: FaXTwitter, href: "#", label: "Twitter" },
              { icon: Mail, href: "#", label: "Email" },
              // { icon: Rss, href: "#", label: "RSS" },
              { icon: FaLinkedin, href: "#", label: "LinkedIn" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label={social.label}
                tabIndex={0}
              >
                <social.icon className="w-5 h-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
} 