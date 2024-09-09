export interface BlogPost {
  path: string;
  title: string;
  date: string;
  description: string;
  image: string;
  alt: string;
  ogImage: string;
  tags: string[];
  published: boolean;
}
