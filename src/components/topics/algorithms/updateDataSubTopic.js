import { doc, writeBatch } from "firebase/firestore";

export const updateDataSubTopic = async ({
  dataForUpdate,
  setLoading,
  db,
  subTopicId,
}) => {
  setLoading({ status: true, title: "Actualizando... " });
  try {
    const batch = await writeBatch(db);
    const refSubTopic = doc(db, "subTopics", subTopicId);

    batch.update(refSubTopic, dataForUpdate, { merge: true });

    await batch.commit().then(() => {
      console.log("Update subTopic success");
      setLoading({ status: false, title: null });
    });
    setLoading({ status: false, title: null });
  } catch (error) {
      console.log("Error ", error.message);
      alert("Error ", error.message);
    setLoading({ status: false, title: null });
  }
};
