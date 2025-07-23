  "use client"

  import React from "react"
  import ReactMarkdown from "react-markdown"
  import remarkGfm from "remark-gfm"
  import CodeBlock from "./CodeBlock"
  import { BookOpen, Clock, Eye, ChevronUp, List, ExternalLink } from "lucide-react"
  import "github-markdown-css/github-markdown.css"

  // Table of Contents Component
  function TableOfContents({ headings, activeId }) {
    if (!headings.length) return null

    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <List className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-300">Table of Contents</h3>
        </div>
        <nav className="space-y-1">
          {headings.map((heading, index) => (
            <a
              key={index}
              href={`#${heading.id}`}
              className={`block text-sm transition-colors duration-200 hover:text-blue-400 ${
                activeId === heading.id ? "text-blue-400 font-medium" : "text-gray-400"
              }`}
              style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    )
  }

  // Reading Progress Bar
  function ReadingProgress() {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
      const updateProgress = () => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = (scrollTop / docHeight) * 100
        setProgress(Math.min(100, Math.max(0, progress)))
      }

      window.addEventListener("scroll", updateProgress)
      return () => window.removeEventListener("scroll", updateProgress)
    }, [])

    return (
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    )
  }

  // Back to Top Button
  function BackToTop() {
    const [isVisible, setIsVisible] = React.useState(false)

    React.useEffect(() => {
      const toggleVisibility = () => {
        setIsVisible(window.scrollY > 300)
      }

      window.addEventListener("scroll", toggleVisibility)
      return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }

    if (!isVisible) return null

    return (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 z-40"
        title="Back to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    )
  }

  // Reading time estimator
  function estimateReadingTime(text) {
    const wordsPerMinute = 200
    const words = text.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return minutes
  }

  // Extract headings for TOC
  function extractHeadings(content) {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const headings = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
      headings.push({ level, text, id })
    }

    return headings
  }

  function rewriteImageUrls(markdown) {
    let result = markdown.replace(/src=["']public[\\/]([^"'>]+)["']/g, 'src="/$1"')
    result = result.replace(/src=["']\.\.\/images[\\/]([^"'>]+)["']/g, 'src="/images/$1"')
    result = result.replace(/src=["']\.\/images[\\/]([^"'>]+)["']/g, 'src="/images/$1"')
    result = result.replace(/src=["']images[\\/]([^"'>]+)["']/g, 'src="/images/$1"')
    return result
  }

  function MarkdownRenderer({ url }) {
    const [content, setContent] = React.useState("")
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [headings, setHeadings] = React.useState([])
    const [activeHeading, setActiveHeading] = React.useState("")
    const [readingTime, setReadingTime] = React.useState(0)

    React.useEffect(() => {
      if (!url) {
        setError("No URL provided")
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
          return res.text()
        })
        .then((raw) => {
          const processedContent = rewriteImageUrls(raw)
          setContent(processedContent)
          setHeadings(extractHeadings(processedContent))
          setReadingTime(estimateReadingTime(processedContent))
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }, [url])

    // Track active heading for TOC
    React.useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHeading(entry.target.id)
            }
          })
        },
        { rootMargin: "-20% 0% -35% 0%" },
      )

      const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      headingElements.forEach((el) => observer.observe(el))

      return () => observer.disconnect()
    }, [content])

    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-800 rounded-xl border border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="text-gray-400 text-lg">Loading Markdown...</span>
          </div>
          <div className="w-64 bg-gray-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="p-8 text-center bg-red-900/20 border border-red-700 rounded-xl">
          <div className="text-red-400 text-xl font-semibold mb-3">Failed to Load Content</div>
          <div className="text-red-300 mb-4">Error: {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      )
    }

    function resolveImageUrl(src) {
      if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src
      try {
        const mdUrl = new URL(url)
        mdUrl.pathname = mdUrl.pathname.replace(/\/[^/]*$/, "/" + src.replace(/^\.?\/?/, ""))
        return mdUrl.toString()
      } catch {
        return src
      }
    }

    return (
      <div className="max-w-none">
        <ReadingProgress />

        {/* Article Meta Info */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Article</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>{content.split(" ").length} words</span>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Source</span>
            </a>
          </div>
        </div>

        {/* Table of Contents */}
        <TableOfContents headings={headings} activeId={activeHeading} />

        {/* Complete GitHub Dark Theme CSS */}
        <style>{`
          .animate-fade-in {
            animation: fadeIn 0.3s ease-in-out forwards;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .markdown-body {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            margin: 0;
            color: #e6edf3;
            background-color: #0d1117;
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
            font-size: 16px;
            line-height: 1.5;
            word-wrap: break-word;
          }

          /* GitHub CSS continues... (keeping the same as before) */
          .markdown-body h1,
          .markdown-body h2,
          .markdown-body h3,
          .markdown-body h4,
          .markdown-body h5,
          .markdown-body h6 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
            color: #f0f6fc;
            scroll-margin-top: 2rem;
          }

          .markdown-body h1 {
            margin: .67em 0;
            font-weight: 600;
            padding-bottom: .3em;
            font-size: 2em;
            border-bottom: 1px solid #21262d;
          }

          .markdown-body h2 {
            font-weight: 600;
            padding-bottom: .3em;
            font-size: 1.5em;
            border-bottom: 1px solid #21262d;
          }

          .markdown-body p {
            margin-top: 0;
            margin-bottom: 16px;
          }

          .markdown-body a {
            color: #58a6ff;
            text-decoration: none;
          }

          .markdown-body a:hover {
            text-decoration: underline;
          }

       

          .markdown-body blockquote {
            margin: 0;
            padding: 0 1em;
            border-left: .25em solid #30363d;
          }

          .markdown-body table {
            border-spacing: 0;
            border-collapse: collapse;
            display: block;
            width: max-content;
            max-width: 100%;
            overflow: auto;
          }

          .markdown-body table th,
          .markdown-body table td {
            padding: 6px 13px;
            border: 1px solid #30363d;
          }

          .markdown-body table tr {
            background-color: #0d1117;
            border-top: 1px solid #21262d;
          }

          .markdown-body table tr:nth-child(2n) {
            background-color: #161b22;
          }

          .markdown-body ul,
          .markdown-body ol {
            margin-top: 0;
            margin-bottom: 16px;
            padding-left: 2em;
          }

          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }

          /* Selection styling */
          .markdown-body ::selection {
            background-color: rgba(88, 166, 255, 0.3);
          }
        `}</style>

        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 lg:p-8 shadow-lg">
          <div className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  if (inline) {
                    return <code {...props}>{children}</code>
                  }
                  return <CodeBlock className={className}>{children}</CodeBlock>
                },

                img({ src, alt, ...props }) {
                  const resolvedSrc = resolveImageUrl(src)
                  return (
                    <div className="my-6 text-center">
                      <img
                        src={resolvedSrc || "/placeholder.svg"}
                        alt={alt}
                        className="max-w-full h-auto rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105"
                        onClick={() => window.open(resolvedSrc, "_blank")}
                        title="Click to view full size"
                        {...props}
                      />
                      {alt && <p className="text-sm text-gray-500 mt-2 italic">{alt}</p>}
                    </div>
                  )
                },

                // Add IDs to headings for TOC navigation
                h1({ children, ...props }) {
                  const text = children.toString()
                  const id = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h1 id={id} {...props}>
                      {children}
                    </h1>
                  )
                },
                h2({ children, ...props }) {
                  const text = children.toString()
                  const id = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h2 id={id} {...props}>
                      {children}
                    </h2>
                  )
                },
                h3({ children, ...props }) {
                  const text = children.toString()
                  const id = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h3 id={id} {...props}>
                      {children}
                    </h3>
                  )
                },
                h4({ children, ...props }) {
                  const text = children.toString()
                  const id = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h4 id={id} {...props}>
                      {children}
                    </h4>
                  )
                },
                h5({ children, ...props }) {
                  const text = children.toString()
                  const id = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h5 id={id} {...props}>
                      {children}
                    </h5>
                  )
                },
                h6({ children, ...props }) {
                  const text = children.toString()
                  const id = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h6 id={id} {...props}>
                      {children}
                    </h6>
                  )
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>

        <BackToTop />
      </div>
    )
  }

  export default MarkdownRenderer
