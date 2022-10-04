import { collection, query, where, getDocs } from "firebase/firestore";

export const recoverUniversities = async (db, setUniversities) => {
    let universitiesDocs = await getDocs(
      query(collection(db, "universities"), where("countryAcronym", "==", "PE"))
    )
    let universities = []
    universitiesDocs.docs.map((doc) => {
        universities.push(doc.data())
    })
    setUniversities(universities);
};
