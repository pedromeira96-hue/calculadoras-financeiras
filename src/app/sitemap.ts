import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = [
    "",
    "/calculadora/rotativo-do-cartao",
    "/calculadora/custo-de-atrasar",
    "/calculadora/parcelado-ou-a-vista",
    "/calculadora/bola-de-neve-ou-cascata",
    "/calculadora/reserva-de-emergencia",
    "/blog",
    "/sobre",
    "/autor",
    "/metodologia",
    "/politica-de-privacidade",
    "/termos",
  ];

  const ultimaMod = new Date();

  return paginas.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: ultimaMod,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : p.startsWith("/calculadora") ? 0.9 : 0.5,
  }));
}
