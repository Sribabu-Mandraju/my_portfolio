"use client";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, ExternalLink, FileText } from "lucide-react";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { getBlogById } from "../constants/blogs";

export default function BlogDetail() {
  const { blogName, id } = useParams();
  const blog = getBlogById(id);

  if (!blog) {
    return (
      <div className="flex flex-1 overflow-hidden flex-col">
        <main className="flex-1 p-4 lg:p-6 h-auto">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              to="/blogs"
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blogs</span>
            </Link>

            <div className="bg-red-900 border border-red-700 rounded-xl p-8 text-center">
              <h1 className="text-2xl font-bold text-red-100 mb-4">
                Blog Not Found
              </h1>
              <p className="text-red-200 mb-6">
                The blog with ID "{id}" could not be found.
              </p>
              <Link
                to="/blogs"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Blogs
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 lg:p-6">
        <div className="max-w-7xl p-2 mx-auto">
          {/* Navigation */}

          {/* Back Button */}
          <Link
            to="/blogs"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>

          {/* Header */}
          <div className="bg-zinc-950 rounded-xl border border-zinc-900 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-100 mb-4">
                  {blog.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blog.date)}</span>
                  </span>
                  {blog.categoryName && (
                    <span className="px-3 py-1 bg-zinc-900 rounded-full text-xs">
                      {blog.categoryName}
                    </span>
                  )}
                </div>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 bg-zinc-900 text-gray-200 text-sm rounded-full"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Markdown Content */}
          <div className="mb-8 ">
            <MarkdownRenderer url={blog.url} />
          </div>

          {/* Footer Navigation */}
        </div>
      </main>
    </div>
  );
}
