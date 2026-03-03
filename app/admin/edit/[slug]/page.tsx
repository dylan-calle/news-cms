import { getArticleBySlug } from "@/lib/articles";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MarkdownEditor } from "@/components/markdown-editor";
import { updateArticleAction } from "./actions";

export default async function AdminEditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Editar Noticia</CardTitle>
          <CardDescription>Modificando: {article.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateArticleAction} className="space-y-8">
            <input type="hidden" name="id" value={article.id} />
            <input type="hidden" name="originalSlug" value={article.slug} />
            <input type="hidden" name="currentImageUrl" value={article.imageUrl || ""} />

            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Título
              </Label>
              <Input id="title" name="title" defaultValue={article.title} required className="text-lg py-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="author">Autor</Label>
                <Input id="author" name="author" defaultValue={article.author} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Input id="category" name="category" defaultValue={article.category} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Noticia</Label>
                <select
                  id="type"
                  name="type"
                  defaultValue={article.type || "images-and-text"}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="images-and-text">Imágenes y Texto</option>
                  <option value="only-text">Solo Texto</option>
                  <option value="only-images">Solo Imágenes</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">Tiempo de lectura estimado</Label>
                <Input id="readTime" name="readTime" defaultValue={article.readTime} required />
              </div>
            </div>

            <div className="space-y-2 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900 border-dashed">
              <Label htmlFor="image" className="font-semibold">
                Imagen Principal (Reemplazar)
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                Sube una nueva portada solo si deseas reemplazar la actual.
              </p>
              <Input id="image" name="image" type="file" accept="image/*" className="cursor-pointer" />
              {article.imageUrl && (
                <p className="text-xs text-muted-foreground mt-2">Actual: {article.imageUrl.split("/").pop()}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-base font-semibold">
                Resumen / Descripción corta
              </Label>
              <textarea
                id="excerpt"
                name="excerpt"
                defaultValue={article.excerpt}
                required
                rows={2}
                className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2 mt-8">
              <Label htmlFor="content" className="text-base font-semibold">
                Contenido de la noticia
              </Label>
              <MarkdownEditor id="content" name="content" />
            </div>

            <Button type="submit" size="lg" className="w-full text-lg">
              Guardar Cambios
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
