"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import styles from "./ArticlePage.module.css";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        console.error("Invalid article ID.");
        setLoading(false);
        return;
      }
  
      try {
        const idStr = Array.isArray(id) ? id[0]: id; 
        const docRef = doc(db, "blogs", idStr);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          setArticle(docSnap.data() as { title: string; content: string });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <main className={styles["article-page"]}>
      <h1 className={styles["article-title"]}>{article.title}</h1>
      <p className={styles["article-content"]}>{article.content}</p>
    </main>
  );
}