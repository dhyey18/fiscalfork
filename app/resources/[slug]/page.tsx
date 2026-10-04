import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES, FEATURED, findArticle, relatedArticles } from "../articles";
import Content from "./content";

export function generateStaticParams() {
  return [...ARTICLES, FEATURED].map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Fiscal Fork`,
    description: article.desc,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();
  return <Content article={article} related={relatedArticles(article)} />;
}
