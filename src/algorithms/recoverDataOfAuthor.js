import { collection, query, where, getDocs } from "firebase/firestore";

export const recoverDataOfAuthor = async (
  firestoreInstance,
  setDataOfAuthors
) => {
  let dataOfAuthor = await getDocs(
    query(
      collection(firestoreInstance, "users"),
      where("typeOfUser", "array-contains", "teacher")
    )
  );
  let authors = [];
  dataOfAuthor.docs.map((doc) => {
    authors.push(doc.data());
  });
  setDataOfAuthors(authors);
};
