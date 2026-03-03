import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getArticleBySlug } from "@/lib/articles";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const paramsResolved = await params;
  const article = await getArticleBySlug(paramsResolved.slug);

  if (!article) {
    notFound();
  }

  const format = article.format ?? "mixed";

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="mb-8 space-y-4">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            &larr; Volver a Noticias
          </Button>
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary">{article.category}</Badge>
          <Badge variant="outline">
            {format === "text" ? "Solo Texto" : format === "image" ? "Galería" : "Artículo"}
          </Badge>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight lg:leading-tight">{article.title}</h1>
        <p className="text-xl text-muted-foreground">{article.excerpt}</p>
        <div className="flex items-center gap-3 pt-4">
          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
            {article.author.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{article.author}</span>
            <span className="text-xs text-muted-foreground">Periodista</span>
          </div>
        </div>
      </div>

      {/* Content based on format */}
      {format === "text" && (
        <div className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-img:mx-auto">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      )}

      {format === "image" && (
        <div className="space-y-6">
          {article.imageUrl && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100">
              <img src={article.imageUrl} alt={article.title} className="object-cover w-full h-full" />
            </div>
          )}
          <Card className="p-6 bg-slate-50 dark:bg-slate-900 text-center">
            <p className="text-muted-foreground italic">
              Esta noticia es de tipo galería fotográfica. Las imágenes cuentan la historia.
            </p>
          </Card>
        </div>
      )}

      {format === "mixed" && (
        <>
          {article.imageUrl && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-12 bg-slate-100">
              <img src={article.imageUrl} alt={article.title} className="object-cover w-full h-full" />
            </div>
          )}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-img:mx-auto">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </>
      )}

      <Separator className="my-12" />

      <footer className="flex justify-between items-center pb-12">
        <p className="text-sm text-muted-foreground">© 2026 News CMS Built with Shadcn</p>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">
            Compartir
          </Button>
          <Button variant="outline" size="sm">
            Guardar
          </Button>
        </div>
      </footer>
    </article>
  );
}
