/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "pratishhizme",  // used to fetch your GitHub repos

  // Where the contact form delivers (via formsubmit.co relay)
  // TODO: replace with your real email
  contactEmail: "vprateek291@gmail.com",

  // ---- Background music ----
  // Drop your own royalty-free / Creative Commons / original mp3s into
  // assets/music/ and list the filenames below. Leave it empty and the
  // music toggle button just stays hidden — nothing plays, nothing breaks.
  music: {
    tracks: [
    "assets/music/1.mp3",
    "assets/music/2.mp3",
    "assets/music/3.mp3",
    "assets/music/4.mp3"
    ],
    volume: 0.18,      // 0.0–1.0, kept low on purpose
    shuffle: true,      // random order each pass through the playlist
    autoplay: true,     // start once the user's first interacts with the page
  },

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "Phantom AI",
      tag: "AI · Web App", color: "#e60012",
      url: "https://github.com/pratishhizme/new-webpage-for-new-starting",  cta: "View on GitHub →",
      img: "assets/projects/phantomai.png",
      desc: "An AI chatbot / web app built with React, TypeScript and Vite, using AI APIs on the backend via Netlify Functions. As much focus on the interface as on the AI itself.",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: ["phantom-ai"],

  // Shown if the GitHub API can't be reached (no real repo data hardcoded —
  // the live GitHub feed for pratishhizme will populate this screen instead)
  fallbackRepos: [],

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {
    // "DownloadGuard": "assets/projects/downloadguard.png",
  },

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen ----
  // Self-rated by Pradhnesh — not exaggerated.
  skills: [
    { group: "Building", items: [
      ["Python", 40], ["C / C++", 30], ["JavaScript", 25],
      ["React", 25], ["TypeScript", 10],
    ]},
    { group: "Creative", items: [
      ["Art", 75], ["Image Editing", 70], ["Video Editing", 70],
    ]},
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
