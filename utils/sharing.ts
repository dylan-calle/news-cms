import { toast } from "sonner";
export function handleShare(url: string, title: string, text: string) {
  if (navigator.share) {
    navigator
      .share({
        title,
        text,
        url,
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Error sharing:", error));
  } else {
    navigator.clipboard.writeText(url);
    toast.success("Enlace copiado");
  }
}
export function generateWhatsAppShareUrl(text: string, url: string) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, "_blank");
}
