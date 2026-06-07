export type SocialIconName = "Github" | "Youtube" | "Instagram" | "Linkedin";

export const profileData = {
  name: "Noval",
  username: "nnez17",
  title: "FrontEnd Developer",
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
  logoSrcLight?: string;
  alt: string;
};

/** Logos via SVGL (svgl.app). */
export const techStack: TechItem[] = [
  {
    name: "HTML",
    logoSrc: "https://svgl.app/library/html5.svg",
    alt: "HTML",
  },
  {
    name: "CSS",
    logoSrc: "https://svgl.app/library/css.svg",
    alt: "CSS",
  },
  {
    name: "Tailwind CSS",
    logoSrc: "https://svgl.app/library/tailwindcss.svg",
    alt: "Tailwind CSS",
  },
  {
    name: "JavaScript",
    logoSrc: "https://svgl.app/library/javascript.svg",
    alt: "JavaScript",
  },
  {
    name: "TypeScript",
    logoSrc: "https://svgl.app/library/typescript.svg",
    alt: "TypeScript",
  },
  {
    name: "React",
    logoSrc: "https://svgl.app/library/react_dark.svg",
    logoSrcLight: "https://svgl.app/library/react_light.svg",
    alt: "React",
  },
  {
    name: "Bun",
    logoSrc: "https://svgl.app/library/bun.svg",
    alt: "Bun",
  },
  {
    name: "Node.js",
    logoSrc: "https://svgl.app/library/nodejs.svg",
    alt: "Node.js",
  },
  {
    name: "Next.js",
    logoSrc: "https://svgl.app/library/nextjs_icon_dark.svg",
    alt: "Next.js",
  },
  {
    name: "Svelte",
    logoSrc: "https://svgl.app/library/svelte.svg",
    alt: "Svelte",
  },
  {
    name: "Astro",
    logoSrc: "https://svgl.app/library/astro-icon-dark.svg",
    logoSrcLight: "https://svgl.app/library/astro-icon-light.svg",
    alt: "Astro",
  },
  {
    name: "ESLint",
    logoSrc: "https://svgl.app/library/eslint-icon-dark.svg",
    logoSrcLight: "https://svgl.app/library/eslint-icon-light.svg",
    alt: "ESLint",
  },
  {
    name: "Biome",
    logoSrc: "https://svgl.app/library/biomejs.svg",
    alt: "Biome",
  },
  {
    name: "Git",
    logoSrc: "https://svgl.app/library/git.svg",
    alt: "Git",
  },
  {
    name: "Figma",
    logoSrc: "https://svgl.app/library/figma.svg",
    alt: "Figma",
  },
  {
    name: ".NET",
    logoSrc: "https://svgl.app/library/dotnet.svg",
    alt: ".NET",
  },
  {
    name: "C#",
    logoSrc: "https://svgl.app/library/csharp.svg",
    alt: "C#",
  },
  {
    name: "Radix UI",
    logoSrc: "https://svgl.app/library/radix-ui_dark.svg",
    logoSrcLight: "https://svgl.app/library/radix-ui_light.svg",
    alt: "Radix UI",
  },
  {
    name: "Vite",
    logoSrc: "https://svgl.app/library/vite.svg",
    alt: "Vite",
  },
  {
    name: "Shadcn UI",
    logoSrc: "https://svgl.app/library/shadcn-ui_dark.svg",
    logoSrcLight: "https://svgl.app/library/shadcn-ui.svg",
    alt: "Shadcn UI",
  },
  {
    name: "GitHub",
    logoSrc: "https://svgl.app/library/github_dark.svg",
    logoSrcLight: "https://svgl.app/library/github_light.svg",
    alt: "GitHub",
  },
  {
    name: "Prettier",
    logoSrc: "https://svgl.app/library/prettier-icon-dark.svg",
    logoSrcLight: "https://svgl.app/library/prettier-icon-light.svg",
    alt: "Prettier",
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
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/noval-akbar-5342343a4/",
    icon: "Linkedin",
  },
];

export const navLinks: { name: string; href: string }[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];
