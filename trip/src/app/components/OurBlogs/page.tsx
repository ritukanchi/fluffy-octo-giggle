"use client";

import { useEffect, useState } from "react";
import { fetchArticles } from "../../lib/firestore";

export default function OurBlogs() {
  const [articles, setArticles] = useState<{ id: string; title: string; content: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = async () => {
    const data = await fetchArticles(searchQuery);
    setArticles(data);
  };

  return (
    <main>
      <h1>Articles</h1>
      
      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles..."
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display Articles */}
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </div>
        ))
      ) : (
        <p>No articles found.</p>
      )}
    </main>
  );
}
