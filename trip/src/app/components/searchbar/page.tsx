"use client";
import { useState } from "react";
import { fetchArticles } from "../../lib/firestore";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<{ id: string; title: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter(); // ✅ useRouter must be inside the component

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const articles = await fetchArticles(searchQuery);

      if (articles.length > 0) {
        const firstTitle = articles[0].title.toLowerCase().replace(/\s+/g, "-");
        router.push(`/articles/${firstTitle}`); // 🔀 redirect to article page
      } else {
        setResults([]);
      }
    } catch (err) {
      setError("Failed to fetch content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} style={{ display: "flex", width: "100%" }}>
        <input
          type="text"
          className="search-input"
          placeholder="Search content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e);
            }
          }}
        />
      </form>

      {loading && <div className="loading-spinner">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {/* Optional: Keep showing results if you want a list instead of redirect */}
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((result) => (
            <li key={result.id}>
              <strong>{result.title}</strong> - {result.content}
            </li>
          ))}
        </ul>
      )}

      {results.length === 0 && !loading && !error && searchQuery && (
        <p>No content found.</p>
      )}
    </div>
  );
}


