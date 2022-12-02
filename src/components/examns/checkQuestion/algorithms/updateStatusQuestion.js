import {
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";

export const UploadStatusRevisedQuestion = async ({
  db,
  uqid,
  navigate,
  setLoading,
  setUnreviewedQuestionData,
  dataOfUser,
  uqidSubTopic,
}) => {
  setLoading({ status: true, title: "Actualizando ..." });
  try {
    const subTopicRef = doc(collection(db, "subTopics"), uqidSubTopic);

    setDoc(
      subTopicRef,
      {
        listOfQuestions: arrayUnion(subTopicRef),
      },
      { merge: true }
    );

    const batch = await writeBatch(db);
    const thisQuestionRef = doc(db, "questions", uqid);

    batch.update(
      thisQuestionRef,
      {
        revisedQuestion: true,
        dateRevisedQuestion: serverTimestamp(),
        reviewerId: dataOfUser?.uid,
      },
      { merge: true }
    );

    await batch.commit().then(() => {
      console.log("Update status question");
      setUnreviewedQuestionData(null);
      navigate("/home", { replace: true });
      setLoading({ status: false, title: null });
    });
  } catch (err) {
    console.error(err.message);
  }
};
