"use client"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Calendar, Tag, ExternalLink, FileText } from "lucide-react"
import MarkdownRenderer from "../components/MarkdownRenderer"
import { getWriteupById } from "../constants/writeups"

export default function WriteupDetail() {
  const { ctfName,id } = useParams()
  const writeup = getWriteupById(id)

  if (!writeup) {
    return (
      <div className="flex flex-1 overflow-hidden flex-col">
        <main className="flex-1 p-4 lg:p-6 h-auto">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/ctfs" className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-6">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to CTFs</span>
            </Link>

            <div className="bg-red-900 border border-red-700 rounded-xl p-8 text-center">
              <h1 className="text-2xl font-bold text-red-100 mb-4">Writeup Not Found</h1>
              <p className="text-red-200 mb-6">The writeup with ID "{id}" could not be found.</p>
              <Link
                to="/ctfs"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to CTFs
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex flex-1 overflow-hidden flex-col">
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Navigation */}
          
          {/* Back Button */}
          <Link
            to="/ctfs"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>

          {/* Header */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-100 mb-4">{writeup.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(writeup.date)}</span>
                  </span>
                  {/* <span className="flex items-center space-x-1">
                    <FileText className="w-4 h-4" />
                    <span>{writeup.file}</span>
                  </span> */}
                  {writeup.categoryName && (
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs">{writeup.categoryName}</span>
                  )}
                </div>

                {writeup.tags && writeup.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {writeup.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 bg-gray-700 text-gray-200 text-sm rounded-full"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
                {writeup.url && (
                  <a
                    href={writeup.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Source
                  </a>
                )}
              </div> */}
            </div>
          </div>

          {/* Markdown Content */}
          <div className="mb-8 ">
            <MarkdownRenderer url={writeup.url} />
          </div>

          {/* Footer Navigation */}
          <div className=" rounded-xl  p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <Link
                to="/ctfs"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors mb-4 sm:mb-0"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back 
              </Link>

              
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
