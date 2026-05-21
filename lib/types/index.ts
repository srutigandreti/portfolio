export type MediaItem = {
  src: string;
  alt: string;
  type: "image" | "video";
  width?: number;
  height?: number;
  caption?: string;
};

export type ProjectMetadata = {
  tags: string[];
  categories: string[];
  date: string;
};

export type CaseStudy = {
  title: string;
  slug: string;
  description: string;
  role: string;
  timeline: string;
  tools: string[];
  metadata: ProjectMetadata;
  cover?: MediaItem;
};
