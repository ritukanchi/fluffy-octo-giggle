"use client";

import { useEffect, useState } from "react";
import { fetchArticles } from "../../lib/firestore";
import "./OurBlogs.css"; // Import the CSS file for styling
import { useRouter } from "next/navigation"; // For client-side navigation

export default function OurBlogs() {
  const [articles, setArticles] = useState<{ id: string; title: string; content: string; link: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // For navigation to article pages

  const handleSearch = async () => {
    console.log("Search query:", searchQuery);

    setLoading(true);
    setError(null);
    try {
      const data = await fetchArticles(searchQuery); // Ensure `fetchArticles` returns `link` for each blog
      setArticles(data);
    } catch (err) {
      setError("Failed to fetch articles. Please try again.");
    } finally {
      setLoading(false);
    }
    console.log("Fetched articles:", articles);
  };

  useEffect(() => {
    // Fetch all articles on initial load
    handleSearch();
  }, []);

  return (
    <main className="blog-container">
      <h1 className="blog-title">Our Blogs</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for articles..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {/* Loading and Error Messages */}
      {loading && <p className="loading-message">Loading articles...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Display Articles */}
      {!loading && !error && (
        <div className="articles-container">
          {articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.id} className="article-card">
                <h2 className="article-title">{article.title}</h2>
                <p className="article-content">{article.content}</p>
                <button
                  className="article-link-button"
                  onClick={() => router.push(`/articles/${article.id}`)} // Navigate to the article page
                >
                  Read More
                </button>
              </div>
            ))
          ) : (
            <p className="no-articles-message">No articles found.</p>
          )}
        </div>
      )}
    </main>
  );
}