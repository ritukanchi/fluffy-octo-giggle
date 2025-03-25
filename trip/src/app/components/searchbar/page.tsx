"use client";
import { useState } from "react";
import { fetchArticles } from "../../lib/firestore";  // Import the function
export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState<{ id: string; title: string; content: string }[]>([]);
  
    const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchQuery.trim()) return;
  
      const articles = await fetchArticles(searchQuery);  // Fetch results
      setResults(articles);  // Update state with search results
    };
  
    return (
      <div className="search-container">
        <form onSubmit={handleSearch} style={{ display: "flex", width: "100%" }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
          />
        </form>
  
        {/* Display Search Results */}
        {results.length > 0 && (
          <ul className="search-results">
            {results.map((result) => (
              <li key={result.id}>
                <strong>{result.title}</strong> - {result.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }