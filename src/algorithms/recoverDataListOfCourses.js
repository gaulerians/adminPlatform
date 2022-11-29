import { doc, getDoc } from "firebase/firestore";

export const recoverDataListOfCourses = async (db, setListOfCourses) => {
  let listOfCourses = [];
  const docRef = doc(db, "classes", "listOfCourses");
  const docSnap = await getDoc(docRef);
  listOfCourses = Object.values(docSnap.data());
  setListOfCourses(listOfCourses[0]);
};
