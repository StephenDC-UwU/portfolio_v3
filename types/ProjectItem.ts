export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  year: string;
  description: string;
  tags: string[];
  videoPath?: string;
  githubUrl?: string;
  githubFrontend?: string;
  githubBackend?: string;
  demoUrl?: string;
}
