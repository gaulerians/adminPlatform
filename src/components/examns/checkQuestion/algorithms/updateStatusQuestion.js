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
  unreviewedQuestionData,
  dataOfUser,
  subTopicId,
}) => {
  setLoading({ status: true, title: "Actualizando ..." });
  const thisQuestion = unreviewedQuestionData.filter(
    (item) => item.uqid === uqid
  )[0];

  try {
    const batch = await writeBatch(db);
    const subTopicRef = doc(collection(db, "subTopics"), subTopicId);
    const thisQuestionRef = doc(db, "questions", uqid);

    setDoc(
      subTopicRef,
      {
        listOfQuestions: arrayUnion(thisQuestionRef),
        ...(thisQuestion?.typeQuestion?.includes("simulacro")
          ? { listOfSimulacrumQuestions: arrayUnion(thisQuestionRef) }
          : {}),
        ...(thisQuestion?.typeQuestion?.includes("deco")
          ? { listOfDECOQuestions: arrayUnion(thisQuestionRef) }
          : {}),
      },
      { merge: true }
    );

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
      setUnreviewedQuestionData(null);
      navigate("/home", { replace: true });
      // setLoading({ status: false, title: null });
    });
  } catch (err) {
    console.error(err.message);
  }
};
