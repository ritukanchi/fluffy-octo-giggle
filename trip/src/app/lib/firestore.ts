import { collection, query, where, orderBy, startAt, endAt, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export const fetchArticles = async (searchQuery: string) => {
    try {
        if (!searchQuery.trim()) {
            throw new Error("Search query is empty");
        }

        const articlesRef = collection(db, "test");

        // Prefix matching query for Firestore
        const q = query(
            articlesRef,
            orderBy("title"),
            startAt(searchQuery),
            endAt(searchQuery + "\uf8ff")  // Firestore trick for prefix match
        );

        console.log(`Fetching articles with query: ${searchQuery}`);

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.warn("No matching documents found");
            return [];
        }

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
