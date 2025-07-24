export const writeups = [
    {
      name: "statemindctf25",
      // url: "/ctfs/statemindctf25",
      date: "2025-01-14",
      title: "Statemind Web3 CTF 2025",
      category: "Web3",
      ctfs: [
        {
          id: "challengeOne",
          file: "statemindctf25.md",
          title: "Statemind Web3 CTF 2023 - Main Writeup",
          tags: ["web3", "ctf", "2025"],
          url: "https://raw.githubusercontent.com/Maheshkarri4444/GarudaTeam-HackathonIIITM/refs/heads/website/README.md",
          date: "2025-01-14",
        },
        {
            id: "statemindctf24",
            file: "statemindctf25.md",
            title: "Statemind Web3 CTF  - Main Writeup",
            tags: ["web3", "ctf", "2025"],
            url: "https://raw.githubusercontent.com/TheMj0ln1r/novel-cryptography-project/refs/heads/main/README.md",
            date: "2025-01-14",
          },
          {
            id: "statemindctf25",
            file: "statemindctf25.md",
            title: "Statemind Web3 CTF 2025 - Main Writeup",
            tags: ["web3", "ctf", "2025"],
            url: "https://raw.githubusercontent.com/0xC1ph3r-08/my-blog/refs/heads/main/docs/PICOCTF/Cryptography/Medium/Basic-mod1.md",
            date: "2025-01-14",
          },
      ],
    },
    {
      name: "BackdoorCTF 2024",
      url: "/ctfs/backdoorctf24",
      date: "2024-12-15",
      title: "BackdoorCTF 2024",
      category: "General",
      ctfs: [
        {
          id: "backdoorctf24",
          file: "backdoorctf24.md",
          title: "BackdoorCTF 2024 - Complete Writeup",
          tags: ["ctf", "2024", "pwn", "crypto"],
          url: "https://raw.githubusercontent.com/TheMj0ln1r/novel-cryptography-project/refs/heads/main/README.md",
          date: "2024-12-15",
        },
      ],
    },
    {
      name: "Learning Resources",
      url: "/ctfs/learning",
      date: "2024-11-20",
      title: "Learning Resources",
      category: "Tutorial",
      ctfs: [
        {
          id: "rustlings",
          file: "rustlings.md",
          title: "Rustlings - Learning Rust Programming",
          tags: ["rust", "learning", "tutorial"],
          url: "https://raw.githubusercontent.com/TheMj0ln1r/novel-cryptography-project/refs/heads/main/README.md",
          date: "2024-11-20",
        },
      ],
    },
  ]
  
  // Helper function to get all individual writeups
  export const getAllWriteups = () => {
    return writeups.flatMap((category) =>
      category.ctfs.map((ctf) => ({
        ...ctf,
        categoryName: category.name,
        categoryUrl: category.url,
      })),
    )
  }
  
  // Helper function to get writeup by ID
  export const getWriteupById = (id) => {
    const allWriteups = getAllWriteups()
    return allWriteups.find((writeup) => writeup.id === id)
  }
  
  // Helper function to get writeups by category
  export const getWriteupsByCategory = (categoryName) => {
    const category = writeups.find((cat) => cat.name === categoryName)
    return category ? category.ctfs : []
  }
  