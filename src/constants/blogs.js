import proxyBlog from "../blogs_mds/Proxy.md";

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
        date: "2026-01-06",
        url:
          "https://raw.githubusercontent.com/Sribabu-Mandraju/my_portfolio/refs/heads/main/src/blogs_mds/Proxy.md",
      },
      {
        id: "openCoverInsuredVault_audit_Insights",
        file: "",
        title: "Open Cover Insured Vault - Audit Insights",
        tags: ["blockchain", "solidity", "vaults"],
        date:"2026-01-24",
        url:
          "https://raw.githubusercontent.com/Sribabu-Mandraju/my_portfolio/refs/heads/main/src/blogs_mds/coverVaultAuditInsights.md",
      },
      {
        id: "CREATE2_Uniswapv2",
        file: "",
        title: "Precomputing contract address using CREATE2",
        tags: ["blockchain", "solidity", "vaults"],
        date:"2026-01-25",
        url:
          "https://raw.githubusercontent.com/Sribabu-Mandraju/my_portfolio/refs/heads/main/src/blogs_mds/CREATE2.md",
      },
      {
        id: "ERC20_Permit",
        file: "",
        title: "Gasless Transaction using ERC20 Permit",
        tags: ["blockchain", "solidity", "ERC20"],
        date:"2026-01-25",
        url:
          "https://raw.githubusercontent.com/Sribabu-Mandraju/my_portfolio/refs/heads/main/src/blogs_mds/ERC20Permit.md",
      },
    ],
    
  },
  // {
  //   name: "Tutorials",
  //   url: "/blogs/tutorials",
  //   date: "2024-11-20",
  //   title: "Tutorials",
  //   category: "Tutorial",
  //   blogs: [
  //     {
  //       id: "tutorial1",
  //       file: "tutorial1.md",
  //       title: "Learning Web Development",
  //       tags: ["tutorial", "web", "learning"],
  //       url:
  //         "https://raw.githubusercontent.com/TheMj0ln1r/novel-cryptography-project/refs/heads/main/README.md",
  //       date: "2024-11-20",
  //     },
  //   ],
  // },
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
