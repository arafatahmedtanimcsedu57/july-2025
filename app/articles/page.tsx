"use client";

import ArticlesContainer from "@/features/articles/articles-container";

export default function Home() {
  return (
    <>
      <div className="flex-1 h-full overflow-auto">
        <ArticlesContainer />{" "}
      </div>
    </>
  );
}
