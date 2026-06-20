import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aasiana Aerotech",
    short_name: "Aasiana",
    description: "Aviation airworthiness, regulatory liaison and permission-clearance consultancy.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#311f6e",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
