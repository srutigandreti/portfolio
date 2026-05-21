export const ROUTES = {
  home: "/",
  work: "/work",
  caseStudy: (slug: string) => `/work/${slug}`,
  about: "/about",
  contact: "/contact",
} as const;
