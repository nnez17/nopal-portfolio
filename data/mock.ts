export type SocialIconName = "Github" | "Youtube" | "Instagram" | "Music2";

export const profileData = {
  name: "Noval",
  username: "nnez17",
  title: "Software Developer",
  tagline: "Just someone who wants to try something new",
  bio: "Hi, I'm Noval — a student who's passionate about technology, creativity, and storytelling. I love discovering how imagination and logic can work together through coding, design, and writing.",
  location: "Indonesia",
  avatar: "https://avatars.githubusercontent.com/u/105137360?v=4",
  email: "novala1710@gmail.com",
  resumeUrl: "#",
  githubProfile: "https://github.com/nnez17",
};

export type TechItem = {
  name: string;
  logoSrc: string;
  alt: string;
};

/** Logos via jsDelivr (devicons) and Simple Icons (Bun). */
export const techStack: TechItem[] = [
  {
    name: "HTML",
    logoSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    alt: "HTML",
  },
  {
    name: "CSS",
    logoSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    alt: "CSS",
  },
  {
    name: "Tailwind CSS",
    logoSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    alt: "Tailwind CSS",
  },
  {
    name: "JavaScript",
    logoSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    alt: "JavaScript",
  },
  {
    name: "TypeScript",
    logoSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    alt: "TypeScript",
  },
  {
    name: "React",
    logoSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    alt: "React",
  },
  {
    name: "Bun",
    logoSrc: "https://bun.sh/logo.svg",
    alt: "Bun",
  },
  {
    name: "C#",
    logoSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    alt: "C#",
  },
  {
    name: "Node.js",
    logoSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    alt: "Node.js",
  },
  {
    name: "Next.js",
    logoSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    alt: "Next.js",
  },
  {
    name: "Svelte",
    logoSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
    alt: "Svelte",
  },
];

export const socialLinks: {
  id: number;
  name: string;
  url: string;
  icon: SocialIconName;
}[] = [
  {
    id: 1,
    name: "GitHub",
    url: "https://github.com/nnez17",
    icon: "Github",
  },
  {
    id: 2,
    name: "YouTube",
    url: "https://youtube.com/@avalgaloz",
    icon: "Youtube",
  },
  {
    id: 3,
    name: "Instagram",
    url: "https://instagram.com/avalgaloz",
    icon: "Instagram",
  },
  {
    id: 4,
    name: "TikTok",
    url: "https://tiktok.com/@nopalloz",
    icon: "Music2",
  },
];

export const navLinks: { name: string; href: string }[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];
