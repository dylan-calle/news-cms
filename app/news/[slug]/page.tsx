import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getArticleBySlug } from "@/lib/articles";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { formatSpanishDate } from "@/utils/dates";
import FooterButtons from "./components/buttons";

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const paramsResolved = await params;
  const article = await getArticleBySlug(paramsResolved.slug);

  if (!article) {
    notFound();
  }

  const articleType = article.type ?? "images-and-text";

  return (
    <article className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-8 space-y-4">
        <Link href="/">
          <Button variant="ghost" className="mb-4 text-base cursor-pointer px-0">
            <ArrowLeft className="size-5" /> Volver a Noticias
          </Button>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center gap-y-3 sm:gap-x-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{article.category}</Badge>
            <Badge variant="outline">
              {articleType === "only-text" ? "Texto" : articleType === "only-images" ? "Galería" : "Artículo"}
            </Badge>
          </div>
        </div>
        <Image
          src={article.imageUrl ?? ""}
          alt={article.title}
          width={300}
          height={1000}
          className="w-screen h-28 sm:h-65 object-cover left-0 absolute"
        />
        <div className="h-28 sm:h-65"></div>
        <div className="hidden sm:flex items-center gap-2 text-base sm:text-sm">
          <span className="hidden sm:inline">•</span>
          <span className="text-sm sm:text-base">{article.readTime} mins de lectura</span>
          <span>•</span>
          <span className="text-sm sm:text-base">{formatSpanishDate(article.date)}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight lg:leading-tight">{article.title}</h1>
        <p className="text-xl text-muted-foreground">{article.excerpt}</p>
        <div className="flex items-center gap-3 pt-3">
          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
            {article.author.charAt(0)}
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-sm">{article.author}</span>
            <span className="text-xs text-muted-foreground">Periodista</span>
          </div>
        </div>
      </div>
      <div className="sm:hidden flex items-center gap-2 text-base sm:text-sm mb-5 ">
        <span className="hidden sm:inline">•</span>
        <span className="text-sm sm:text-base">{article.readTime} mins de lectura</span>
        <span>•</span>
        <span className="text-sm sm:text-base">{formatSpanishDate(article.date)}</span>
      </div>

      {articleType === "only-text" && (
        <div className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-img:mx-auto">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      )}

      {articleType === "only-images" && (
        <div className="space-y-6">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-img:mx-auto">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
          <Card className="p-6 bg-slate-50 dark:bg-slate-900 text-center">
            <p className="text-muted-foreground italic">
              Esta noticia es de tipo galería fotográfica. Las imágenes cuentan la historia.
            </p>
          </Card>
        </div>
      )}

      {articleType === "images-and-text" && (
        <>
          <div className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-img:mx-auto">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </>
      )}

      <Separator className="my-12" />
      <FooterButtons />
    </article>
  );
}
