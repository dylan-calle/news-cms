"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bold, ImageIcon, Italic, Link2, List } from "lucide-react";

interface MarkdownEditorProps {
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  rows?: number;
}

export function MarkdownEditor({ id, name, placeholder, className, rows = 15 }: MarkdownEditorProps) {
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);

    setContent(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleFormat = (type: string) => {
    switch (type) {
      case "h1":
        insertText("# ", "");
        break;
      case "h2":
        insertText("## ", "");
        break;
      case "h3":
        insertText("### ", "");
        break;
      case "bold":
        insertText("**", "**");
        break;
      case "italic":
        insertText("*", "*");
        break;
      case "link":
        insertText("[", "](url)");
        break;
      case "list":
        insertText("- ", "");
        break;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      insertText(`![${file.name}](${data.url})`, "");
    } catch (error) {
      console.error(error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={`border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${className}`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b bg-muted/50 p-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("h1")}
          title="Heading 1"
          className="h-8 px-2 font-bold font-serif"
        >
          H1
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("h2")}
          title="Heading 2"
          className="h-8 px-2 font-bold font-serif text-sm"
        >
          H2
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("h3")}
          title="Heading 3"
          className="h-8 px-2 font-bold font-serif text-xs"
        >
          H3
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleFormat("bold")}
          title="Bold"
          className="h-8 w-8"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleFormat("italic")}
          title="Italic"
          className="h-8 w-8"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleFormat("list")}
          title="Bullet List"
          className="h-8 w-8"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleFormat("link")}
          title="Link"
          className="h-8 w-8"
        >
          <Link2 className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Hidden file input for images */}
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          title="Upload Image"
          className="h-8"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          {isUploading ? "Uploading..." : "Insert Image"}
        </Button>
      </div>

      {/* Editor */}
      <Textarea
        id={id}
        name={name}
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="border-0 rounded-none focus-visible:ring-0 resize-y p-4 font-mono text-sm leading-relaxed min-h-[300px]"
        required
      />
    </div>
  );
}
