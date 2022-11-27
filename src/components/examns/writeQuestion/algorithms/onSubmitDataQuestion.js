import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { onSubmitImage } from "./onSubmitImage";
import { v4 as uuidv4 } from "uuid";

export const onSubmitDataQuestion = async ({
  setLoading,
  data,
  db,
  imagesArr,
  question,
  alternatives,
}) => {
  // setLoading({ status: true, title: "Enviando pregunta ... " });
  const uuid = uuidv4();
  const { typeQuestion, urlVideoFacebook, urlVideoYoutube } = data;

  const refQuestionsDb = doc(collection(db, "questions"));
  const refSolutionsDb = doc(collection(db, "solutions"));

  const dataUrls =
    imagesArr.length > 0 ? await onSubmitImage({ imagesArr }) : [];

  const questionData = alternatives.reduce(
    (acc, curr) => {
      acc.urlOfImage.typeImage && delete acc.urlOfImage.typeImage;
      const urlsObject = dataUrls.filter(
        (url) => parseInt(url.alternativeId) === curr.alternativeId
      );
      acc.SEOAlternatives.push({ key: curr.alternative.plainText });
      const urlKey = {
        ...(urlsObject.length === 1
          ? urlsObject[0]
          : { path: null, urlImage: null }),
      };
      delete urlKey.alternativeId;
      delete urlKey.typeImage;
      acc.keys.push({ key: curr.alternative.text, ...urlKey });
      return acc;
    },
    {
      uqid: uuid,
      latexQuestion: question.question?.text,
      SEOQuestion: question.question.plainText,
      typeQuestion: typeQuestion,
      urlOfImage: {
        ...(dataUrls.length > 0
          ? dataUrls.filter((obj) => obj.typeImage === "question")[0]
          : { path: null, urlImage: null }),
      },
      keys: [],
      SEOAlternatives: [],
    }
  );

  // console.log("Question data",questionData);

  const solutionData = {
    uqid: uuid,
    SEOjustification: question.solution.plainTextSolution,
    justification: question.solution.textSolution,
    urlOfImage: {
      ...(dataUrls.length > 0
        ? dataUrls.filter((obj) => obj.typeImage === "solution")[0]
        : { path: null, urlImage: null }),
    },
    urlOfVideo: {
      facebook: urlVideoFacebook,
      youtube: urlVideoYoutube,
    },
  };

  console.log("solutionData", solutionData);
  // console.log("questionData", questionData);

  // await setDoc( refQuestionsDb, questionData);
  // await setDoc( refSolutionsDb, solutionData);
  // setLoading({ status: false, title: null });
};
