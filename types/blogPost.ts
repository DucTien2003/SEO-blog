export interface BlogPost {
  pubDatetime?: string;
  title?: string;
  slug?: string;
  featured?: boolean;
  draft?: boolean;
  tags?: string[];
  description?: string;
}
