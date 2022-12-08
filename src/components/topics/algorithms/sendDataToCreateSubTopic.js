import { collection, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const sendDataOfSubTopic = async ({
  dataToCreate,
  setLoading,
  db,
}) => {
    setLoading({ status: true, title: "Estamos enviando tu cambio... " });
  let uuid = uuidv4();
  try {
    const refSubTopicsDb = doc(collection(db, "subTopics"), uuid);
    const data = {
      ...dataToCreate,
      subTopicId: uuid,
    };
      console.log(data);
    await setDoc(refSubTopicsDb, data, { merge: true });
    console.log("SubTopic created successfully!");
    setLoading({ status: false, title: null });
  } catch (error) {
    console.log("Error ", error);
    alert("Error ", error);
    setLoading({ status: false, title: null });
  }
};
