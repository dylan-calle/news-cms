import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MarkdownEditor } from "@/components/markdown-editor";
import { createArticleAction } from "./actions";

export default function AdminCreateArticlePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Publicar Noticia</CardTitle>
          <CardDescription>
            Escribe una nueva noticia. Usa los botones de formato para estructurar el contenido de manera sencilla.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createArticleAction} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Título
              </Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="El futuro del software de código abierto..."
                className="text-lg py-6"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="author">Autor</Label>
                <Input id="author" name="author" required placeholder="Linus Torvalds" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Input id="category" name="category" required placeholder="Tecnología" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Noticia</Label>
                <select
                  id="type"
                  name="type"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="images-and-text"
                >
                  <option value="images-and-text">Imágenes y Texto</option>
                  <option value="only-text">Solo Texto</option>
                  <option value="only-images">Solo Imágenes</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">Tiempo de lectura estimado</Label>
                <Input id="readTime" name="readTime" required placeholder="5" />
              </div>
            </div>

            <div className="space-y-2 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900 border-dashed">
              <Label htmlFor="image" className="font-semibold">
                Imagen Principal (Portada)
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                Esta imagen se usará como cabecera y miniatura de la noticia.
              </p>
              <Input id="image" name="image" type="file" accept="image/*" className="cursor-pointer" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-base font-semibold">
                Resumen / Descripción corta
              </Label>
              <textarea
                id="excerpt"
                name="excerpt"
                required
                rows={2}
                placeholder="Escribe un párrafo resumiendo..."
                className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2 mt-8">
              <Label htmlFor="content" className="text-base font-semibold">
                Contenido de la noticia
              </Label>
              <MarkdownEditor id="content" name="content" placeholder="Empieza a escribir la noticia aquí..." />
            </div>

            <Button type="submit" size="lg" className="w-full text-lg">
              Publicar Artículo
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
