"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { handleLogin } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(handleLogin, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white dark:bg-slate-900">
        <CardHeader className="space-y-1 text-center pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight">Sansi News</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Ingresa tus credenciales para administrar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Usuario
              </Label>
              <Input id="username" name="username" type="text" required className="h-11" placeholder="admin" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
              </div>
              <Input id="password" name="password" type="password" required className="h-11" placeholder="••••••••" />
            </div>

            {state?.error && (
              <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20 text-center">
                {state.error}
              </div>
            )}

            <Button type="submit" className="w-full h-11 text-base font-medium" disabled={pending}>
              {pending ? "Iniciando sesión..." : "Ingresar al Panel"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
