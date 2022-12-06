import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
export const enviarTopics = async ({ db, dataPrev, dataOfUser, index }) => {
  let uuid = uuidv4();
  const data = {
    authorTopicId: dataOfUser.uid,
    subTopicId: uuid,
    dateCreation: serverTimestamp(),
    ...dataPrev,
  };
  try {
    const refSubTopicsDb = doc(collection(db, "subTopics"), uuid);
    console.log(`data para ${index}`, data);
    await setDoc(refSubTopicsDb, data, { merge: true });
    console.log(`data  ${index} enviado correctamente`);
  } catch (error) {
    console.log("Error ", error);
  }
};
