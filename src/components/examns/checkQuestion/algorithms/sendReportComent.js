import { doc, serverTimestamp, writeBatch } from "firebase/firestore";

export const sendReportComent = async ({
  db,
  uqid,
  navigate,
  setLoading,
  setUnreviewedQuestionData,
  dataOfUser,
  comentOnQuestion,
}) => {
  setLoading({ status: true, title: "Enviando comentario ..." });
  try {
    const batch = await writeBatch(db);
    const thisQuestionRef = doc(db, "questions", uqid);
    const data = {
      revisedQuestion: true,
      isRedported: true,
      dataReported: {
        dateReported: serverTimestamp(),
        reporterId: dataOfUser?.uid,
        comentOnQuestion,
      },
    };
    batch.update(thisQuestionRef, data, { merge: true });

    await batch.commit().then(() => {
      console.log("Update reported question");
      setUnreviewedQuestionData(null);
      navigate("/home", { replace: true });
      // setLoading({ status: false, title: null });
    });
  } catch (err) {
    console.error(err.message);
  }
};
