// Edit this file to customize your resource hub.
// Add, remove, or modify categories and resources to make it yours.

import {
  Film, Music, BookOpen, Gamepad2, Code, Wrench,
  GraduationCap, Image as ImageIcon, Shield, Cloud,
  Newspaper, Cpu, type LucideIcon,
} from "lucide-react";

export interface Resource {
  name: string;
  url: string;
  description?: string;
  tags?: string[];
  starred?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  resources: Resource[];
}

export const siteConfig = {
  name: "DL",
  tagline: "Your personal download vault",
  description: "Games, software, and resources — curated, searchable, and yours to customize.",
  github: "https://github.com/yourusername/dl",
};

export const categories: Category[] = [
  {
    id: "games",
    name: "Games",
    description: "Game downloads",
    icon: Gamepad2,
    resources: [
      { name: "GTA V", url: "https://www.mediafire.com/file/example1", description: "Open World Game", starred: true, tags: ["download"] },
      { name: "Minecraft", url: "https://www.mediafire.com/file/example2", description: "Sandbox Game", tags: ["download"] },
    ],
  },
  {
    id: "software",
    name: "Software",
    description: "Apps & tools",
    icon: Wrench,
    resources: [
      { name: "WinRAR", url: "https://www.mediafire.com/file/example3", description: "File Extractor", starred: true, tags: ["download"] },
    ],
  },
  {
    id: "streaming",
    name: "Streaming & Video",
    description: "Watch movies, shows, and live TV",
    icon: Film,
    resources: [
      { name: "FMHY", url: "https://fmhy.net", description: "The original free media hub", starred: true, tags: ["wiki"] },
      { name: "Cineby", url: "https://www.cineby.app", description: "Slick movie & TV streaming UI" },
      { name: "Hydrahd", url: "https://hydrahd.cc", description: "Massive library of films & shows" },
    ],
  },
  {
    id: "music",
    name: "Music & Audio",
    description: "Streaming, downloads, and discovery",
    icon: Music,
    resources: [
      { name: "Spotify Web", url: "https://open.spotify.com" },
      { name: "Cobalt", url: "https://cobalt.tools", description: "Download from any platform", starred: true },
      { name: "Last.fm", url: "https://last.fm", description: "Music scrobbling & discovery" },
    ],
  },
  {
    id: "books",
    name: "Books & Reading",
    description: "Ebooks, audiobooks, and PDFs",
    icon: BookOpen,
    resources: [
      { name: "Anna's Archive", url: "https://annas-archive.org", description: "Largest open library", starred: true },
      { name: "Z-Library", url: "https://z-library.sk" },
      { name: "LibGen", url: "https://libgen.is" },
    ],
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Games, emulators, and mods",
    icon: Gamepad2,
    resources: [
      { name: "Steam", url: "https://store.steampowered.com" },
      { name: "itch.io", url: "https://itch.io", description: "Indie games heaven", starred: true },
      { name: "Emulation General", url: "https://emulation.gametechwiki.com" },
    ],
  },
  {
    id: "dev",
    name: "Developer Tools",
    description: "Code, deploy, and ship",
    icon: Code,
    resources: [
      { name: "GitHub", url: "https://github.com", starred: true },
      { name: "Cloudflare", url: "https://cloudflare.com" },
      { name: "Vercel", url: "https://vercel.com" },
      { name: "DevDocs", url: "https://devdocs.io", description: "All your API docs in one place" },
    ],
  },
  {
    id: "ai",
    name: "AI & ML",
    description: "Models, chats, and creative AI",
    icon: Cpu,
    resources: [
      { name: "ChatGPT", url: "https://chat.openai.com" },
      { name: "Claude", url: "https://claude.ai", starred: true },
      { name: "Hugging Face", url: "https://huggingface.co" },
      { name: "Perplexity", url: "https://perplexity.ai" },
    ],
  },
  {
    id: "tools",
    name: "Utility Tools",
    description: "Converters, editors, and helpers",
    icon: Wrench,
    resources: [
      { name: "CyberChef", url: "https://gchq.github.io/CyberChef", description: "Cyber swiss army knife", starred: true },
      { name: "Regex101", url: "https://regex101.com" },
      { name: "JSON Crack", url: "https://jsoncrack.com" },
    ],
  },
  {
    id: "learning",
    name: "Learning",
    description: "Courses, tutorials, and docs",
    icon: GraduationCap,
    resources: [
      { name: "freeCodeCamp", url: "https://freecodecamp.org" },
      { name: "MIT OCW", url: "https://ocw.mit.edu" },
      { name: "The Odin Project", url: "https://theodinproject.com" },
    ],
  },
  {
    id: "design",
    name: "Design & Assets",
    description: "Stock, icons, fonts, mockups",
    icon: ImageIcon,
    resources: [
      { name: "Unsplash", url: "https://unsplash.com" },
      { name: "Figma", url: "https://figma.com", starred: true },
      { name: "Google Fonts", url: "https://fonts.google.com" },
    ],
  },
  {
    id: "privacy",
    name: "Privacy & Security",
    description: "VPNs, encryption, and OPSEC",
    icon: Shield,
    resources: [
      { name: "PrivacyGuides", url: "https://privacyguides.org", starred: true },
      { name: "Proton", url: "https://proton.me" },
      { name: "Bitwarden", url: "https://bitwarden.com" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & Storage",
    description: "Sync, backup, and share",
    icon: Cloud,
    resources: [
      { name: "Mega", url: "https://mega.nz" },
      { name: "Internxt", url: "https://internxt.com" },
    ],
  },
  {
    id: "news",
    name: "News & Reading",
    description: "Stay informed",
    icon: Newspaper,
    resources: [
      { name: "Hacker News", url: "https://news.ycombinator.com", starred: true },
      { name: "Lobste.rs", url: "https://lobste.rs" },
    ],
  },
];
