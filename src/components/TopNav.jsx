import { Search, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function TopNav({ searchQuery, setSearchQuery }) {
  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/Sribabu-Mandraju",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/sribabu-mandraju-590524233",
      label: "LinkedIn",
    },
    {
      icon: FaXTwitter,
      href: "https://x.com/5R1B4BU",
      label: "Twitter",
    },
    {
      icon: Mail,
      href: "mailto:sribabumandraju@gmail.com",
      label: "Email",
    },
  ];

  return (
    <header
      className="px-4 lg:px-6 py-3 lg:py-4 border-b border-zinc-900 bg-black relative z-20"
      role="banner"
    >
      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between pl-12 h-10">
        <div className="flex items-center h-full">
          <h1 className="text-lg font-bold text-white title-text leading-none">
            ᴀᴠɢ ꜱᴘɪᴅᴇʏ࿐
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                social.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="text-gray-400 hover:text-white transition-colors duration-200 p-1.5 rounded-md hover:bg-zinc-900"
              aria-label={social.label}
              tabIndex={0}
            >
              <social.icon className="w-5 h-5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* Desktop Navbar (minimal) */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* <span className="text-gray-300 ml-12 lg:ml-0">Home</span> */}
        </div>
        {/* <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-md pl-10 pr-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            aria-label="Search blog posts"
          />
        </div> */}
      </div>
    </header>
  );
}
