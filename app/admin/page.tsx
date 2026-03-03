import { getAllArticles } from "@/lib/articles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatSpanishDate } from "@/utils/dates";
import { PlusCircle, Pencil, Trash2, LogOut } from "lucide-react";
import Link from "next/link";
import { deleteArticleAction, logoutAction } from "./actions";

export default async function AdminDashboard() {
  const articles = await getAllArticles();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
          <p className="text-muted-foreground mt-1">Gestiona los artículos y noticias del portal</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link href="/admin/create" className="flex-1 sm:flex-none">
            <Button className="h-9 px-4 w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva Noticia
            </Button>
          </Link>
          <form action={logoutAction} className="flex-1 sm:flex-none">
            <Button variant="outline" className="h-9 px-4 w-full sm:w-auto text-muted-foreground">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </form>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold">TÍTULO</th>
                <th className="px-6 py-4 font-semibold">TIPO</th>
                <th className="px-6 py-4 font-semibold">FECHA</th>
                <th className="px-6 py-4 font-semibold text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-base mb-1">{article.title}</div>
                    <div className="text-muted-foreground truncate max-w-md">{article.excerpt}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="font-normal capitalize shadow-sm">
                      {article.type?.replace(/-/g, " ") ?? "images-and-text"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {formatSpanishDate(article.date)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/edit/${article.slug}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <Pencil className="h-4 w-4 mr-2" /> Editar
                        </Button>
                      </Link>
                      <form action={deleteArticleAction}>
                        <input type="hidden" name="id" value={article.id} />
                        <Button
                          type="submit"
                          variant="destructive"
                          size="sm"
                          className="h-9 hover:bg-red-600 hover:text-white cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Borrar
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}

              {articles.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    No hay noticias publicadas aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
