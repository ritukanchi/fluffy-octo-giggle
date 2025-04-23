"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig"
import "./addArticle.css"; // Import the CSS file for styling

export default function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        lowercaseTitle: title.trim().toLowerCase(),
      });
      setMessage("Article added successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding document:", error); // Log the error
      setMessage("Failed to add article.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="blog-container">
      <h1 className="blog-title">Add New Article</h1>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article Title"
          className="search-input"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Article Content"
          className="search-input"
          style={{ minHeight: 100, marginTop: 10 }}
          required
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Adding..." : "Add Article"}
        </button>
      </form>
      {message && <p style={{ textAlign: "center" }}>{message}</p>}
    </main>
  );
}