"use server";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getAllArticles } from "@/lib/articles";
import { NewsArticle } from "@/core/article";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatSpanishDate } from "@/utils/dates";

function FeaturedArticle({ article }: { article: NewsArticle }) {
  const format = article.type ?? "images-and-text";
  if (format === "only-text") {
    return (
      <Card
        className="overflow-hidden border-0 shadow-lg bg-slate-50 dark:bg-slate-900 p-8 cursor-pointer"
        onClick={() => {
          console.log("clikcing");
          redirect(`/news/${article.slug}`);
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Badge>{article.category}</Badge>
          <Badge variant="outline">Solo Texto</Badge>
          <span className="text-sm text-muted-foreground">{formatSpanishDate(article.date)}</span>
        </div>
        <h3 className="text-3xl font-bold mb-4 hover:underline">
          <Link href={`/news/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
        <p className="text-sm leading-relaxed line-clamp-6 mb-6">{article.content}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">By {article.author}</span>
          <Link href={`/news/${article.slug}`}>
            <Button>Leer Artículo</Button>
          </Link>
        </div>
      </Card>
    );
  }

  if (format === "only-images") {
    return (
      <Card className="overflow-hidden border-0 shadow-lg bg-slate-50 dark:bg-slate-900 relative min-h-100">
        {article.imageUrl && (
          <Image
            width={1200}
            height={600}
            src={article.imageUrl}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-white/20 text-white border-white/30">{article.category}</Badge>
            <Badge variant="outline" className="text-white border-white/30">
              Galería
            </Badge>
            <span className="text-sm text-white/80">{formatSpanishDate(article.date)}</span>
          </div>
          <h3 className="text-3xl font-bold mb-3 hover:underline">
            <Link href={`/news/${article.slug}`}>{article.title}</Link>
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white/90">By {article.author}</span>
            <Link href={`/news/${article.slug}`}>
              <Button variant="secondary">Ver Galería</Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col md:flex-row overflow-hidden border-0 shadow-lg bg-slate-50 dark:bg-slate-900">
      <div className="md:w-1/2 relative min-h-75">
        {article.imageUrl && (
          <Image
            width={300}
            height={200}
            src={article.imageUrl}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
      <div className="md:w-1/2 flex flex-col justify-center p-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge>{article.category}</Badge>
          <span className="text-sm text-muted-foreground">{formatSpanishDate(article.date)}</span>
        </div>
        <h3 className="text-3xl font-bold mb-4 hover:underline">
          <Link href={`/news/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="text-muted-foreground mb-6 line-clamp-3">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-medium">By {article.author}</span>
          <Link href={`/news/${article.slug}`}>
            <Button>Leer Artículo</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

function ArticleCard({ article }: { article: NewsArticle }) {
  const format = article.type ?? "images-and-text";

  if (format === "only-text") {
    return (
      <Card className="flex flex-col overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="grow">
          <div className="flex items-center gap-2 mb-2 text-xs">
            <Badge variant="secondary">{article.category}</Badge>
            <Badge variant="outline" className="text-xs">
              Solo Texto
            </Badge>
            <span className="text-muted-foreground">{formatSpanishDate(article.date)}</span>
          </div>
          <h3 className="text-xl font-bold hover:text-blue-600 transition-colors">
            <Link href={`/news/${article.slug}`}>{article.title}</Link>
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.excerpt}</p>
          <p className="text-sm leading-relaxed line-clamp-4">{article.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center text-xs text-muted-foreground border-t bg-slate-50/50 dark:bg-transparent pt-4">
          <span>{article.author}</span>
          <span>{article.readTime} mins de lectura</span>
        </CardFooter>
      </Card>
    );
  }

  if (format === "only-images") {
    return (
      <Card className="flex flex-col overflow-hidden hover:shadow-md transition-shadow relative min-h-70">
        {article.imageUrl && (
          <Image
            width={400}
            height={280}
            src={article.imageUrl}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-2 text-xs">
            <Badge className="bg-white/20 text-white border-white/30">{article.category}</Badge>
            <Badge variant="outline" className="text-xs text-white border-white/30">
              Galería
            </Badge>
          </div>
          <h3 className="text-lg font-bold hover:underline">
            <Link href={`/news/${article.slug}`}>{article.title}</Link>
          </h3>
          <div className="flex justify-between items-center text-xs text-white/80 mt-2">
            <span>{article.author}</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      {article.imageUrl && (
        <div className="relative aspect-video">
          <Image
            width={300}
            height={200}
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="grow">
        <div className="flex items-center gap-2 mb-2 text-xs">
          <Badge variant="secondary">{article.category}</Badge>
          <span className="text-muted-foreground">{formatSpanishDate(article.date)}</span>
        </div>
        <h3 className="text-xl font-bold hover:text-blue-600 transition-colors">
          <Link href={`/news/${article.slug}`}>{article.title}</Link>
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-xs text-muted-foreground border-t bg-slate-50/50 dark:bg-transparent pt-4">
        <span>{article.author}</span>
        <span>{article.readTime}</span>
      </CardFooter>
    </Card>
  );
}

export default async function NewsSections() {
  const mockNews = await getAllArticles();
  const featuredArticle = mockNews[0];
  const otherArticles = mockNews.slice(1);
  return (
    <>
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Última noticia</h2>
        <FeaturedArticle article={featuredArticle} />
      </section>
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Otras Noticias</h2>
          <Button variant="ghost">Ver Todas las Noticias &rarr;</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}
