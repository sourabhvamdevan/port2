

export interface Project {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  github?: string;
  live?: string;
  image?: string; // optional path for project image
}


