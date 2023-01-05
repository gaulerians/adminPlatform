import { collection, query, where, getDocs } from "firebase/firestore";
import { roles } from "../constants/roles";

export const recoverDataOfAuthor = async (
  firestoreInstance,
  setDataOfAuthors
) => {
  let dataOfAuthor = await getDocs(
    query(
      collection(firestoreInstance, "users"),
      where("typeOfUser", "array-contains", roles.DATA_ADMIN)
    )
  );
  let authors = [];
  dataOfAuthor.docs.map((doc) => {
    authors.push(doc.data());
  });
  setDataOfAuthors(authors);
};
