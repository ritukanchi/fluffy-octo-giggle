"use client";

import { useEffect, useState } from "react";
import { fetchArticle } from "../../lib/firestore";

export default function OurBlogs() {
  const [article, setArticle] = useState<{ id: string; title: string; content: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArticle();
      setArticle(data);
    };
    fetchData();
  }, []);

  return (
    <main>
      <h1>Article</h1>
      {article ? (
        <div>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ) : (
        <p>Loading or no article found.</p>
      )}
    </main>
  );
}

