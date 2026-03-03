"use server";
import { revalidatePath } from "next/cache";
import { deleteArticle } from "@/lib/articles";

export async function deleteArticleAction(formData: FormData) {
  const id = formData.get("id") as string;
  if (id) {
    await deleteArticle(id);
    revalidatePath("/admin");
    revalidatePath("/");
  }
}

import { logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}
