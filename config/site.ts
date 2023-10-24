export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Interview Diaries",
  description: "Where Developers Share Their Interview Stories.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Write",
      href: "/write",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/BrijenMakwana/interview-diaries",
  },
};
