"use server";
import { redirect } from "next/navigation";
import { login } from "@/lib/auth";

export async function handleLogin(prevState: { error?: string } | null, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const validUsername = process.env.CMS_USERNAME || "admin";
  const validPassword = process.env.CMS_PASS || "password";
  console.log(validUsername, validPassword);

  if (username === validUsername && password === validPassword) {
    await login(username);
    redirect("/admin");
  } else {
    return { error: "Credenciales inválidas. Verifica tu usuario y contraseña." };
  }
}
