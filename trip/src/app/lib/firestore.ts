import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export const fetchArticles = async (searchQuery: string) => {
  try {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const articlesRef = collection(db, "blogs");

    const q = query(
      articlesRef,
      where("lowercaseTitle", "==", normalizedQuery) // exact match on normalized title
    );

    const querySnapshot = await getDocs(q);

    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title || "Untitled",
      content: doc.data().content || "No content available",
      link: `/articles/${doc.id}`, // Generate the link dynamically
    }));

    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};
