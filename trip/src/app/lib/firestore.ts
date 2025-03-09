import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export const fetchArticle = async () => {
    try {
        const articleRef = doc(db, "test", "test");  // Reference to document
        console.log('Fetching document:', articleRef.path);

        const articleSnap = await getDoc(articleRef);  // Fetch document

        if (!articleSnap.exists()) {
            throw new Error("Document not found");
        }

        const data = articleSnap.data();

        if (!data?.test) {
            throw new Error("Field 'test' not found in the document");
        }

        console.log('Document data:', data);

        return {
            id: articleSnap.id,
            title: "test",
            content: data.test,
        };
    } catch (error) {
        console.error("Error fetching article:", error);
        return null;  // Return null in case of an error
    }
};
