"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Copy,
  Check,
  Terminal,
  Code,
  BookOpen,
  Clock,
  Eye,
  ChevronUp,
  List,
  ExternalLink,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Volume2,
} from "lucide-react";
import "github-markdown-css/github-markdown.css";
import "katex/dist/katex.min.css";

// Table of Contents Component
function TableOfContents({ headings, activeId }) {
  if (!headings.length) return null;
  return (
    <div className="bg-zinc-950/50 border border-zinc-900 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <List className="w-4 h-4 text-gray-400" />
        <h3 className="text-sm font-semibold text-gray-300">
          Table of Contents
        </h3>
      </div>
      <nav className="space-y-1">
        {headings.map((heading, index) => (
          <a
            key={index}
            href={`#${heading.id}`}
            className={`block text-sm transition-colors duration-200 hover:text-blue-400 ${
              activeId === heading.id
                ? "text-blue-400 font-medium"
                : "text-gray-400"
            }`}
            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

// Reading Progress Bar
function ReadingProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Find the actual scrollable container
    const findScrollableContainer = () => {
      // First try to find the main content area with overflow-y-auto
      const mainElement = document.querySelector(
        'main[aria-label="Main content"]',
      );
      if (mainElement && mainElement.scrollHeight > mainElement.clientHeight) {
        return mainElement;
      }

      // Fallback to document scrolling
      return window;
    };

    const updateProgress = () => {
      const scrollContainer = findScrollableContainer();

      let scrollTop, scrollHeight, clientHeight;

      if (scrollContainer === window) {
        scrollTop = window.scrollY;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight;
      } else {
        scrollTop = scrollContainer.scrollTop;
        scrollHeight = scrollContainer.scrollHeight;
        clientHeight = scrollContainer.clientHeight;
      }

      const docHeight = scrollHeight - clientHeight;
      // Ensure docHeight is positive to prevent division by zero
      const validDocHeight = Math.max(docHeight, 1);
      const progress = (scrollTop / validDocHeight) * 100;
      setProgress(Math.min(100, Math.max(0, progress)));
    };

    // Initial calculation with delay for content to load
    setTimeout(updateProgress, 100);

    // Set up event listeners
    const scrollContainer = findScrollableContainer();

    if (scrollContainer === window) {
      window.addEventListener("scroll", updateProgress);
      window.addEventListener("resize", updateProgress);
    } else {
      scrollContainer.addEventListener("scroll", updateProgress);
      window.addEventListener("resize", updateProgress);
    }

    // Use MutationObserver to detect when KaTeX equations are rendered
    const observer = new MutationObserver(() => {
      // Debounce the height recalculation
      setTimeout(updateProgress, 150);
    });

    // Observe changes to the document body
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    // Additional timeouts for KaTeX rendering
    const timeouts = [
      setTimeout(updateProgress, 300),
      setTimeout(updateProgress, 800),
      setTimeout(updateProgress, 1500),
    ];

    return () => {
      if (scrollContainer === window) {
        window.removeEventListener("scroll", updateProgress);
      } else {
        scrollContainer.removeEventListener("scroll", updateProgress);
      }
      window.removeEventListener("resize", updateProgress);
      observer.disconnect();
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-zinc-950 z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// Back to Top Button
function BackToTop() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 z-40"
      title="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

// Enhanced Code Block with line numbers and better UX
function CodeBlock({ className, children }) {
  const [copied, setCopied] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const language = className ? className.replace("language-", "") : "";
  const isShell = /^(shell|bash|zsh|sh|console|terminal|cmd|powershell)$/i.test(
    language,
  );
  const codeString = String(children).replace(/\n$/, "");
  const lineCount = codeString.split("\n").length;
  const shouldCollapse = lineCount > 20;

  // If it's a single line and short (less than 80 chars), render as inline code
  const isShortSingleLine = lineCount === 1 && codeString.length < 80;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  // Render short single-line code as inline style
  if (isShortSingleLine && !isShell) {
    return (
      <code className="px-1.5 py-0.5 bg-zinc-900 text-gray-300 rounded text-sm font-mono border border-zinc-800">
        {codeString}
      </code>
    );
  }

  if (isShell) {
    return (
      <div className="relative my-6 rounded-xl overflow-hidden border border-zinc-900 bg-black shadow-lg">
        {/* Terminal header */}
        <div className="flex items-center justify-between bg-zinc-950 border-b border-zinc-900 px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Terminal className="w-4 h-4" />
              <span className="text-sm font-medium">Terminal</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {shouldCollapse && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-1 px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-gray-300 hover:text-white rounded text-xs transition-all duration-200"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? (
                  <Minimize2 className="w-3 h-3" />
                ) : (
                  <Maximize2 className="w-3 h-3" />
                )}
                <span>{lineCount} lines</span>
              </button>
            )}
            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-gray-300 hover:text-white rounded-md transition-all duration-200 text-sm"
              title={copied ? "Copied!" : "Copy to clipboard"}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>
        <div
          className={` bg-black transition-all duration-300 ${
            shouldCollapse && !isExpanded ? "max-h-64 overflow-hidden" : ""
          }`}
        >
          <pre
            style={{ backgroundColor: "transparent" }}
            className="text-green-400 bg-none font-mono text-sm leading-relaxed overflow-x-auto"
          >
            <code>{codeString}</code>
          </pre>
          {shouldCollapse && !isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent flex items-end justify-center pb-2">
              <button
                onClick={() => setIsExpanded(true)}
                className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-gray-300 hover:text-white rounded text-sm transition-all duration-200"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-zinc-900 bg-black shadow-lg">
      {/* Code header */}
      <div className="flex items-center justify-between bg-zinc-950 border-b border-zinc-900 px-4 py-1">
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-gray-400" />
          {language && (
            <span className="text-sm font-medium text-gray-300 capitalize bg-gray-700 px-2 py-1 rounded">
              {language}
            </span>
          )}
          <span className="text-xs text-gray-500">{lineCount} lines</span>
        </div>
        <div className="flex items-center space-x-2">
          {shouldCollapse && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-1 px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-gray-300 hover:text-white rounded text-xs transition-all duration-200"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? (
                <Minimize2 className="w-3 h-3" />
              ) : (
                <Maximize2 className="w-3 h-3" />
              )}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-gray-300 hover:text-white rounded-md transition-all duration-200 text-sm"
            title={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>
      <div
        className={`bg-black overflow-x-auto transition-all duration-300 ${
          shouldCollapse && !isExpanded ? "max-h-64 overflow-hidden" : ""
        }`}
      >
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          PreTag="div"
          showLineNumbers={lineCount > 5}
          customStyle={{
            background: "none",
            margin: 0,
            padding: "1rem",
            fontSize: "14px",
            fontFamily:
              'Fira Code, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
          codeTagProps={{
            style: {
              background: "none",
            },
          }}
          lineNumberStyle={{
            color: "#6b7280",
            fontSize: "12px",
            paddingRight: "1rem",
            userSelect: "none",
          }}
        >
          {codeString}
        </SyntaxHighlighter>
        {shouldCollapse && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent flex items-end justify-center pb-2">
            <button
              onClick={() => setIsExpanded(true)}
              className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-gray-300 hover:text-white rounded text-sm transition-all duration-200"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Video Component
function VideoPlayer({ src, alt, ...props }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const videoRef = React.useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="my-6 relative group">
      <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-auto"
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          {...props}
        >
          Your browser does not support the video tag.
        </video>
        {/* Custom controls overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={togglePlay}
              className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
              title={isMuted ? "Unmute" : "Mute"}
            >
              <Volume2 className={`w-4 h-4 ${isMuted ? "opacity-50" : ""}`} />
            </button>
          </div>
        </div>
      </div>
      {alt && (
        <p className="text-sm text-gray-500 mt-2 italic text-center">{alt}</p>
      )}
    </div>
  );
}

// Reading time estimator
function estimateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

// Extract headings for TOC
function extractHeadings(content) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ level, text, id });
  }
  return headings;
}

function rewriteImageUrls(markdown) {
  // Handle various image path formats
  let result = markdown.replace(
    /src=["']public[\\/]([^"'>]+)["']/g,
    'src="/$1"',
  );
  result = result.replace(
    /src=["']\.\.\/images[\\/]([^"'>]+)["']/g,
    'src="/images/$1"',
  );
  result = result.replace(
    /src=["']\.\/images[\\/]([^"'>]+)["']/g,
    'src="/images/$1"',
  );
  result = result.replace(
    /src=["']images[\\/]([^"'>]+)["']/g,
    'src="/images/$1"',
  );
  // Handle markdown image syntax
  result = result.replace(/!\[([^\]]*)\]$$public\/([^)]+)$$/g, "![$1](/$2)");
  result = result.replace(
    /!\[([^\]]*)\]$$\.\.\/images\/([^)]+)$$/g,
    "![$1](/images/$2)",
  );
  result = result.replace(
    /!\[([^\]]*)\]$$\.\/images\/([^)]+)$$/g,
    "![$1](/images/$2)",
  );
  result = result.replace(
    /!\[([^\]]*)\]$$images\/([^)]+)$$/g,
    "![$1](/images/$2)",
  );
  return result;
}

function MarkdownRenderer({ url }) {
  const [content, setContent] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [headings, setHeadings] = React.useState([]);
  const [activeHeading, setActiveHeading] = React.useState("");
  const [readingTime, setReadingTime] = React.useState(0);

  React.useEffect(() => {
    if (!url) {
      setError("No URL provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then((raw) => {
        const processedContent = rewriteImageUrls(raw);
        setContent(processedContent);
        setHeadings(extractHeadings(processedContent));
        setReadingTime(estimateReadingTime(processedContent));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  // Track active heading for TOC
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" },
    );

    const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [content]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-zinc-950 rounded-xl border border-zinc-900">
        <div className="flex items-center space-x-3 mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-gray-400 text-lg">Loading Markdown...</span>
        </div>
        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full animate-pulse"
            style={{ width: "60%" }}
          ></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-900/20 border border-red-700 rounded-xl">
        <div className="text-red-400 text-xl font-semibold mb-3">
          Failed to Load Content
        </div>
        <div className="text-red-300 mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  function resolveImageUrl(src) {
    // If it's already a full URL or data URL, return as is
    if (
      /^(https?:)?\/\//.test(src) ||
      src.startsWith("data:") ||
      src.startsWith("blob:")
    ) {
      return src;
    }
    // If it starts with /, it's already an absolute path
    if (src.startsWith("/")) {
      return src;
    }

    try {
      const mdUrl = new URL(url);
      const basePath = mdUrl.pathname.replace(/\/[^/]*$/, "/");
      // Handle relative paths
      if (src.startsWith("./")) {
        return new URL(basePath + src.substring(2), mdUrl.origin).toString();
      } else if (src.startsWith("../")) {
        const pathParts = basePath.split("/").filter(Boolean);
        let relativePath = src;
        while (relativePath.startsWith("../")) {
          pathParts.pop();
          relativePath = relativePath.substring(3);
        }
        return new URL(
          "/" + pathParts.join("/") + "/" + relativePath,
          mdUrl.origin,
        ).toString();
      } else {
        // Relative to current directory
        return new URL(basePath + src, mdUrl.origin).toString();
      }
    } catch (e) {
      console.warn("Failed to resolve image URL:", src, e);
      return src;
    }
  }

  function isVideoFile(src) {
    const videoExtensions = /\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)$/i;
    return videoExtensions.test(src);
  }

  return (
    <div className="max-w-none">
      <ReadingProgress />

      {/* Mobile Article Meta Info - Top positioned */}
      <div className="lg:hidden bg-zinc-950/50 border border-zinc-900 rounded-lg p-4 mb-6">
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

      {/* Desktop Layout with Left Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - Desktop Article Meta Info */}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile Table of Contents */}

          {/* GitHub CSS Dark Theme Override */}
          <style>{`
            .markdown-body {
              --color-canvas-default: #000000;
              --color-canvas-subtle: #0a0a0a;
              --color-border-default: #1a1a1a;
              --color-border-muted: #2a2a2a;
              --color-neutral-muted: rgba(42, 42, 42, 0.4);
              --color-accent-fg: #58a6ff;
              --color-accent-emphasis: #1f6feb;
              --color-attention-subtle: rgba(187, 128, 9, 0.15);
              --color-danger-fg: #f85149;
              --color-fg-default: #e6edf3;
              --color-fg-muted: #7d8590;
              --color-fg-subtle: #6e7681;
              --color-canvas-inset: #000000;
              background-color: var(--color-canvas-default);
              color: var(--color-fg-default);
              font-size: 16px;
              line-height: 1.6;
            }
            .markdown-body h1,
            .markdown-body h2,
            .markdown-body h3,
            .markdown-body h4,
            .markdown-body h5,
            .markdown-body h6 {
              color: var(--color-fg-default);
              border-bottom-color: var(--color-border-muted);
              scroll-margin-top: 2rem;
            }
            .markdown-body blockquote {
              color: var(--color-fg-muted);
              border-left-color: var(--color-border-default);
              background-color: rgba(110, 118, 129, 0.1);
            }
            .markdown-body table th,
            .markdown-body table td {
              border-color: var(--color-border-muted);
            }
            .markdown-body table th {
              background-color: var(--color-canvas-subtle);
            }
            .markdown-body table tr:nth-child(2n) {
              background-color: rgba(110, 118, 129, 0.05);
            }
            .markdown-body code:not(pre code) {
              color: #e6edf3;
              padding: 0.2em 0.4em;
              border-radius: 4px;
              background-color: #181818;
              border: 1px solid #2a2a2a;
              font-size: 0.9em;
              font-family: 'Fira Code', 'Menlo', 'Monaco', 'Consolas', monospace;
            }
            .markdown-body a {
              color: var(--color-accent-fg);
            }
            .markdown-body a:hover {
              text-decoration: underline;
            }
            .markdown-body hr {
              background-color: var(--color-border-muted);
            }
            .markdown-body img {
              background-color: var(--color-canvas-default);
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            .markdown-body p {
              margin-bottom: 1rem;
            }
            .markdown-body ul, .markdown-body ol {
              margin-bottom: 1rem;
            }
            .markdown-body li {
              margin-bottom: 0.25rem;
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

          <div className=" rounded-xl border border-zinc-900  lg:p-8 shadow-lg w-full">
            <div className="markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    if (inline) {
                      return (
                        <code
                          className="px-1.5 py-0.5 bg-zinc-900 text-gray-300 rounded text-sm font-mono border border-zinc-800"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    return (
                      <CodeBlock className={className}>{children}</CodeBlock>
                    );
                  },
                  img({ src, alt, ...props }) {
                    const resolvedSrc = resolveImageUrl(src);
                    // Check if it's a video file
                    if (isVideoFile(resolvedSrc)) {
                      return (
                        <VideoPlayer src={resolvedSrc} alt={alt} {...props} />
                      );
                    }
                    return (
                      <div className="my-6 text-center">
                        <img
                          src={resolvedSrc || "/placeholder.svg"}
                          alt={alt || ""}
                          className="max-w-full h-auto rounded-lg border border-gray-600 shadow-lg mx-auto cursor-pointer transition-transform duration-200 hover:scale-105"
                          onClick={() => window.open(resolvedSrc, "_blank")}
                          title="Click to view full size"
                          onError={(e) => {
                            console.error("Failed to load image:", resolvedSrc);
                            e.target.src =
                              "/placeholder.svg?height=400&width=600&text=Image+Not+Found";
                          }}
                          loading="lazy"
                          {...props}
                        />
                        {alt && (
                          <p className="text-sm text-gray-500 mt-2 italic">
                            {alt}
                          </p>
                        )}
                      </div>
                    );
                  },
                  // Handle HTML video tags
                  video({ src, ...props }) {
                    const resolvedSrc = resolveImageUrl(src);
                    return <VideoPlayer src={resolvedSrc} {...props} />;
                  },
                  // Handle HTML img tags
                  // eslint-disable-next-line jsx-a11y/alt-text
                  img: ({ src, alt, ...props }) => {
                    const resolvedSrc = resolveImageUrl(src);
                    if (isVideoFile(resolvedSrc)) {
                      return (
                        <VideoPlayer src={resolvedSrc} alt={alt} {...props} />
                      );
                    }
                    return (
                      <div className="my-6 text-center">
                        <img
                          src={resolvedSrc || "/placeholder.svg"}
                          alt={alt || ""}
                          className="max-w-full h-auto rounded-lg border border-gray-600 shadow-lg mx-auto cursor-pointer transition-transform duration-200 hover:scale-105"
                          onClick={() => window.open(resolvedSrc, "_blank")}
                          title="Click to view full size"
                          onError={(e) => {
                            console.error("Failed to load image:", resolvedSrc);
                            e.target.src =
                              "/placeholder.svg?height=400&width=600&text=Image+Not+Found";
                          }}
                          loading="lazy"
                          {...props}
                        />
                        {alt && (
                          <p className="text-sm text-gray-500 mt-2 italic">
                            {alt}
                          </p>
                        )}
                      </div>
                    );
                  },
                  // Add IDs to headings for TOC navigation
                  h1({ children, ...props }) {
                    const text = children.toString();
                    const id = text
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-");
                    return (
                      <h1 id={id} {...props}>
                        {children}
                      </h1>
                    );
                  },
                  h2({ children, ...props }) {
                    const text = children.toString();
                    const id = text
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-");
                    return (
                      <h2 id={id} {...props}>
                        {children}
                      </h2>
                    );
                  },
                  h3({ children, ...props }) {
                    const text = children.toString();
                    const id = text
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-");
                    return (
                      <h3 id={id} {...props}>
                        {children}
                      </h3>
                    );
                  },
                  h4({ children, ...props }) {
                    const text = children.toString();
                    const id = text
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-");
                    return (
                      <h4 id={id} {...props}>
                        {children}
                      </h4>
                    );
                  },
                  h5({ children, ...props }) {
                    const text = children.toString();
                    const id = text
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-");
                    return (
                      <h5 id={id} {...props}>
                        {children}
                      </h5>
                    );
                  },
                  h6({ children, ...props }) {
                    const text = children.toString();
                    const id = text
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-");
                    return (
                      <h6 id={id} {...props}>
                        {children}
                      </h6>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
export default MarkdownRenderer;
