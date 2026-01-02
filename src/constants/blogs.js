export const blogs = [
  {
    name: "Web Development",
    date: "2025-01-14",
    title: "Web Development",
    category: "Development",
    blogs: [
      {
        id: "React Navite Guide For Beginners",
        file: "React_native_guide.md",
        title: "Getting Started with React Native",
        tags: ["react", "javascript", "react native"],
        url:
          // "https://raw.githubusercontent.com/Sribabu-Mandraju/my_portfolio/refs/heads/main/src/blogs_mds/TransaparentUpgradableProxy.md",
          "https://raw.githubusercontent.com/Sribabu-Mandraju/my_portfolio/refs/heads/main/src/blogs_mds/React_native_guide.md",
        date: "2025-01-14",
      },
    ],
  },
  {
    name: "Blockchain",
    date: "2024-12-15",
    title: "Cybersecurity",
    category: "Security",
    blogs: [
      {
        id: "Proxies",
        file: "proxies.md",
        title: "Introduction to proxies",
        tags: ["blockchain", "solidity", "proxies"],
        url:
          "https://raw.githubusercontent.com/Sribabu-Mandraju/my_portfolio/refs/heads/main/src/blogs_mds/Proxy.md",
      },
    ],
  },
  {
    name: "Tutorials",
    url: "/blogs/tutorials",
    date: "2024-11-20",
    title: "Tutorials",
    category: "Tutorial",
    blogs: [
      {
        id: "tutorial1",
        file: "tutorial1.md",
        title: "Learning Web Development",
        tags: ["tutorial", "web", "learning"],
        url:
          "https://raw.githubusercontent.com/TheMj0ln1r/novel-cryptography-project/refs/heads/main/README.md",
        date: "2024-11-20",
      },
    ],
  },
];

// Helper function to get all individual blogs
export const getAllBlogs = () => {
  return blogs.flatMap((category) =>
    category.blogs.map((blog) => ({
      ...blog,
      categoryName: category.name,
      categoryUrl: category.url,
    }))
  );
};

// Helper function to get blog by ID
export const getBlogById = (id) => {
  const allBlogs = getAllBlogs();
  return allBlogs.find((blog) => blog.id === id);
};

// Helper function to get blogs by category
export const getBlogsByCategory = (categoryName) => {
  const category = blogs.find((cat) => cat.name === categoryName);
  return category ? category.blogs : [];
};
