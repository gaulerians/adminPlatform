import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const onSubmitDataQuestion = async ({
  setLoading,
  data,
  db,
  dataUrls = [],
  question,
  alternatives,
}) => {
  setLoading({ status: true, title: "Enviando pregunta ... " });
  const uuid = uuidv4();
  const { typeQuestion, urlVideoFacebook, urlVideoYoutube } = data;

  const refQuestionsDb = doc(collection(db, "questions"));
  const refSolutionsDb = doc(collection(db, "solutions"));

  const questionData = {
    idQuestion: uuid,
    SEOQuestion: question.question?.plainText,
    SEOAlternatives: alternatives.map((item) => item.alternative?.plainText),
    typeQuestion,
    keys: alternatives.map((item) => item.alternative?.text),
    latexQuestion: question.question?.text,
    urlOfImage:
      dataUrls.length > 0
        ? dataUrls
            .filter((item) => item.typeImage === "question")
            .map((item) => item.urlImage)
            .shift() ?? null
        : null,
    urlOfImagesAlternatives: [
      dataUrls.length > 0
        ? dataUrls
            ?.filter((item) => item.alternativeId === "1")
            .map((item) => item.urlImage)
            .shift() ?? null
        : null,
      dataUrls.length > 0
        ? dataUrls
            ?.filter((item) => item.alternativeId === "2")
            .map((item) => item.urlImage)
            .shift() ?? null
        : null,
      dataUrls.length > 0
        ? dataUrls
            ?.filter((item) => item.alternativeId === "3")
            .map((item) => item.urlImage)
            .shift() ?? null
        : null,
      dataUrls.length > 0
        ? dataUrls
            ?.filter((item) => item.alternativeId === "4")
            .map((item) => item.urlImage)
            .shift() ?? null
        : null,
      dataUrls.length > 0
        ? dataUrls

            ?.filter((item) => item.alternativeId === "5")
            .map((item) => item.urlImage)
            .shift() ?? null
        : null,
    ],
  };

  const solutionData = {
    idSolution: uuid,
    SEOjustification: question.solution?.plainTextSolution,
    justification: question.solution?.textSolution,
    urlOfImage:
      dataUrls?.length > 0
        ? dataUrls
            ?.filter((item) => item.typeImage === "solution")
            .map((item) => item.urlImage)
            .shift() ?? null
        : null,
    urlOfVideo: {
      facebook: urlVideoFacebook,
      youtube: urlVideoYoutube,
    },
  };

  console.log("solutionData", solutionData);
  console.log("questionData", questionData);

  // await setDoc( refQuestionsDb, questionData);
  // await setDoc( refSolutionsDb, solutionData);
  setLoading({ status: false, title: null });
};
