import NewsSections from "./news-sections";
export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-12 border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight">Sansi News</h1>
        <p className="text-muted-foreground text-lg mt-2">Las noticias de último momento más importante</p>
      </header>

      <NewsSections />
    </main>
  );
}
