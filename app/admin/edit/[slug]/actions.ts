"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateArticle } from "@/lib/articles";
import { ArticleType } from "@/core/article";

export async function updateArticleAction(formData: FormData) {
  const id = formData.get("id") as string;
  const originalSlug = formData.get("originalSlug") as string;

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  const category = formData.get("category") as string;
  const type = formData.get("type") as ArticleType;
  const readTime = formData.get("readTime") as string;
  const currentImageUrl = formData.get("currentImageUrl") as string;

  const imageFile = formData.get("image") as File | null;
  let imageUrl = currentImageUrl || undefined;

  // Process new image ONLY if user uploaded one
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const ext = path.extname(imageFile.name) || ".jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;

    const imagesDir = path.join(process.cwd(), "content", "images");
    await fs.mkdir(imagesDir, { recursive: true });

    await fs.writeFile(path.join(imagesDir, filename), buffer);
    imageUrl = `/content/images/${filename}`;
  }

  // Regen slug based on new title
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  await updateArticle(id, {
    slug,
    title,
    excerpt,
    content,
    author,
    category,
    imageUrl,
    readTime,
    type,
    // Note: Date explicitly omitted to keep original publish date
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/news/${slug}`);
  if (slug !== originalSlug) {
    revalidatePath(`/news/${originalSlug}`);
  }

  redirect("/admin");
}
