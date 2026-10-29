import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { getArtigoSlugs } from "@/lib/articles-index";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginasBase = [
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

  const artigos = getArtigoSlugs().map((slug) => `/blog/${slug}`);

  const ultimaMod = new Date();

  return [...paginasBase, ...artigos].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: ultimaMod,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : p.startsWith("/calculadora") ? 0.9 : p.startsWith("/blog") ? 0.7 : 0.5,
  }));
}