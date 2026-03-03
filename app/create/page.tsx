import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MarkdownEditor } from "@/components/markdown-editor";
import { createArticleAction } from "./actions";

export default function CreateArticlePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Create News Article</CardTitle>
          <CardDescription>
            Write a new article for the CMS. Use the helpful toolbar formatting buttons to easily structure your content
            or add images.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createArticleAction} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="The Future of Open Source..."
                className="text-lg py-6"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" required placeholder="Linus Torvalds" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" required placeholder="Technology" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Article Type</Label>
                <select
                  id="type"
                  name="type"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="images-and-text"
                >
                  <option value="images-and-text">Images and Text</option>
                  <option value="only-text">Only Text</option>
                  <option value="only-images">Only Images</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time</Label>
                <Input id="readTime" name="readTime" required placeholder="5 min read" />
              </div>
            </div>

            <div className="space-y-2 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900 border-dashed">
              <Label htmlFor="image" className="font-semibold">
                Preview Image (Cover/Thumbnail)
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                This image is used as the article header and preview tile.
              </p>
              <Input id="image" name="image" type="file" accept="image/*" className="cursor-pointer" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-base font-semibold">
                Excerpt / Description
              </Label>
              <textarea
                id="excerpt"
                name="excerpt"
                required
                rows={2}
                placeholder="A short description of the article..."
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2 mt-8">
              <Label htmlFor="content" className="text-base font-semibold">
                Content
              </Label>
              <MarkdownEditor id="content" name="content" placeholder="Start writing your article..." />
            </div>

            <Button type="submit" size="lg" className="w-full text-lg">
              Publish Article
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
