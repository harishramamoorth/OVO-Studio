import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import CategoryDetailClient from "@/components/sections/CategoryDetailClient";

interface PageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = SERVICE_CATEGORIES.find((cat) => cat.slug === params.category);
  if (!category) return { title: "Category Not Found | OVO Signature" };

  return {
    title: `${category.title} | OVO Signature Dubai`,
    description: category.description,
  };
}

export default function ServiceCategoryPage({ params }: PageProps) {
  const category = SERVICE_CATEGORIES.find((cat) => cat.slug === params.category);

  if (!category) {
    notFound();
  }

  const otherCategories = SERVICE_CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 3);

  return <CategoryDetailClient category={category} otherCategories={otherCategories} />;
}
