import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OnTime",
    short_name: "OT",
    description: "Acompanha os transportes públicos em Portugal.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1f7f8",
    theme_color: "#075b7d",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
