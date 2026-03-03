export type ArticleFormat = "text" | "image" | "mixed";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string[];
  readTime: string;
  format: ArticleFormat;
}
export interface CreateNewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string[];
  readTime: string;
  format: ArticleFormat;
}
