import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { onSubmitImage } from './onSubmitImage';
import { v4 as uuidv4 } from 'uuid';

export const onSubmitDataQuestion = async ({
  setLoading,
  data,
  db,
  imagesArr,
  question,
  alternatives,
  subTopicSelected,
  uqid = null,
  dataOfUser,
  courseSelectedName,
}) => {
  setLoading({ status: true, title: 'Enviando pregunta ... ' });
  let uuid = uqid;
  if (!uqid) {
    uuid = uuidv4();
  }
  if (!subTopicSelected)
    return {
      status: 400,
      message: 'Falta definir el subtema de la pregunta',
      errorCode: 'SUBTOPIC_NOT_DEFINED',
    };
  try {
    const {
      university,
      year,
      typeQuestion,
      urlVideoFacebook,
      urlVideoYoutube,
      isPreUniversityCheck,
    } = data;
    const refQuestionsDb = doc(collection(db, 'questions'), uuid);
    const refSolutionsDb = doc(collection(db, 'solutions'), uuid);

    const dataUrls =
      imagesArr.length > 0
        ? await onSubmitImage({
            imagesArr,
            setLoading,
            uuid,
            course: courseSelectedName,
          })
        : [];
    if (!Array.isArray(dataUrls))
      return {
        status: 400,
        message: 'Error al subir las imagenes',
        errorCode: 'ERROR_UPLOAD_IMAGES',
      };

    const questionData = alternatives.reduce(
      (acc, curr) => {
        acc.urlOfImage.typeImage && delete acc.urlOfImage.typeImage;
        const urlsObject = dataUrls.filter(
          (url) => parseInt(url.alternativeId) === curr.alternativeId,
        );
        acc.SEOAlternatives.push({ key: curr.alternative.plainText });
        const urlKey = {
          ...(urlsObject.length === 1 ? urlsObject[0] : { path: null, urlImage: null }),
        };
        delete urlKey.alternativeId;
        delete urlKey.typeImage;
        acc.keys.push({
          key: curr.alternative?.text.replaceAll(' ', '\\space '),
          ...urlKey,
        });
        return acc;
      },
      {
        uqid: uuid,
        revisedQuestion: false,
        authorId: dataOfUser?.uid,
        dateUpload: serverTimestamp(),
        university: university, //TODO: cabiar el envio de datos en modo array
        yearOfQuestion: year ?? null,
        course: courseSelectedName ?? null,
        isQuestionOfPreuniversity: isPreUniversityCheck === 'true' ? true : false,
        subTopicID: subTopicSelected,
        latexQuestion: question.question?.text.replaceAll(' ', '\\space '),
        SEOQuestion: question.question.plainText,
        typeQuestion: typeQuestion,
        week: parseInt(data.week),
        urlOfImage: {
          ...(dataUrls.length > 0
            ? dataUrls.filter((obj) => obj.typeImage === 'question')[0]
            : { path: null, urlImage: null }),
        },
        keys: [],
        SEOAlternatives: [],
      },
    );

    const solutionData = {
      uqid: uuid,
      SEOjustification: question.solution.plainTextSolution,
      justification: question.solution.textSolution.replaceAll(' ', '\\space '),
      urlOfImage: {
        ...(dataUrls.length > 0
          ? dataUrls.filter((obj) => obj.typeImage === 'solution')[0]
          : { path: null, urlImage: null }),
      },
      urlOfVideo: {
        facebook: urlVideoFacebook,
        youtube: urlVideoYoutube,
      },
    };

    setDoc(refQuestionsDb, questionData, { merge: true });
    setDoc(refSolutionsDb, solutionData, { merge: true });

    return {
      status: 200,
      message: 'Pregunta enviada correctamente',
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: 'Error al enviar la pregunta',
      errorCode: 'ERROR_SENDING_QUESTION',
    };
  }
};
