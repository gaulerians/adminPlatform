import { collection, query, where, getDocs } from "firebase/firestore";

export const recoverDataUnreviewedQuestions = async ({
  firestoreInstance,
  setUnreviewedQuestionData,
  setLoading,
}) => {
  setLoading({ status: true, title: "Cargando datos ..." });
  let questionDocs = await getDocs(
    query(collection(firestoreInstance, "questions"), where("revisedQuestion", "==", false))
  );
  let questions = [];
  questionDocs.docs.map((doc) => {
    questions.push(doc.data());
  });
  setUnreviewedQuestionData(questions);
  setLoading({ status: false, title: null });
};
