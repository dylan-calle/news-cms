import NewsSections from "./news-sections";
import Image from "next/image";
export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-12 border-b pb-6 flex items-center gap-4">
        <Image width={70} height={70} src="/umss.png" alt="Logo Universidad Mayor de San Simón" />
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Sansi News</h1>
          <p className="text-muted-foreground text-lg mt-2">
            Las noticias más importantes para la comunidad universitaria del momento
          </p>
        </div>
      </header>

      <NewsSections />
    </main>
  );
}
