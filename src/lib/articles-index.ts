import type { Artigo } from "./articles";
import { ARTIGOS } from "./articles";
import { ARTIGOS_2 } from "./articles-2";

export type { Artigo };

export const ALL_ARTICLES: Artigo[] = [...ARTIGOS, ...ARTIGOS_2];

export function getArtigo(slug: string): Artigo | undefined {
  return ALL_ARTICLES.find((a) => a.slug === slug);
}

export function getArtigoSlugs(): string[] {
  return ALL_ARTICLES.map((a) => a.slug);
}