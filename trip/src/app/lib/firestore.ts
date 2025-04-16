import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export const fetchArticles = async (searchQuery: string) => {
  try {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      throw new Error("Search query is empty");
    }

    const articlesRef = collection(db, "test");

    const q = query(
      articlesRef,
      where("lowercaseTitle", "==", normalizedQuery) // exact match on normalized title
    );

    console.log(`Searching for: ${normalizedQuery}`);

    const querySnapshot = await getDocs(q);

    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title || "Untitled",
      content: doc.data().content || "No content available",
    }));

    console.log("Fetched articles:", articles);
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};
