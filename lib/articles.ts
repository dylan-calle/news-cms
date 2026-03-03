import fs from "fs/promises";
import path from "path";
import { NewsArticle, CreateNewsArticle } from "@/core/article";
const contentPath = path.join(process.cwd(), "content");

export async function getAllArticles() {
  const files = await fs.readdir(contentPath);

  const articles = await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const filePath = path.join(contentPath, file);
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
      }),
  );

  return articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getArticleById(id: string) {
  const filePath = path.join(contentPath, `${id}.json`);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function getArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const articles = await getAllArticles();
  return articles.find((article) => article.slug === slug) || null;
}

export async function createArticle(article: CreateNewsArticle): Promise<NewsArticle> {
  const id = Date.now().toString();

  const newArticle = {
    id,
    ...article,
    createdAt: new Date().toISOString(),
  };

  const filePath = path.join(contentPath, `${id}.json`);

  await fs.writeFile(filePath, JSON.stringify(newArticle, null, 2));

  return newArticle;
}

export async function updateArticle(id: string, updatedData: Partial<NewsArticle>): Promise<NewsArticle> {
  const filePath = path.join(contentPath, `${id}.json`);

  // Read existing
  const data = await fs.readFile(filePath, "utf-8");
  const existingArticle = JSON.parse(data);

  // Merge and enforce ID stays identical
  const newArticle = {
    ...existingArticle,
    ...updatedData,
    id: existingArticle.id,
  };

  await fs.writeFile(filePath, JSON.stringify(newArticle, null, 2));

  return newArticle;
}

export async function deleteArticle(id: string) {
  const filePath = path.join(contentPath, `${id}.json`);
  await fs.unlink(filePath);
}
