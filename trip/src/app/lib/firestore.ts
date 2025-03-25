import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export const fetchArticles = async (searchQuery: string) => {
    try {
        if (!searchQuery.trim()) {
            throw new Error("Search query is empty");
        }

        const articlesRef = collection(db, "test");  // Reference to the collection
        const q = query(articlesRef, where("test", ">=", searchQuery));  // Search in the "test" field

        console.log(`Fetching articles with query: ${searchQuery}`);

        const querySnapshot = await getDocs(q);  // Fetch matching documents

        if (querySnapshot.empty) {
            console.warn("No matching documents found");
            return [];  // Return empty array if no results
        }

        const articles = querySnapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title || "Untitled",
            content: doc.data().test,  // Assuming 'test' field contains the content
        }));

        console.log("Fetched articles:", articles);
        return articles;
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
};
