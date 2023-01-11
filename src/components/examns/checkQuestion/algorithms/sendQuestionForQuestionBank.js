import { collection, doc, setDoc, arrayUnion } from 'firebase/firestore';

export const sendQuestionForQuestionBank = ({ db, dataForQuestionBank, setLoading }) => {
  setLoading({ status: true, title: 'Enviando pregunta ... ' });
  const { uqid, course, week } = dataForQuestionBank;
  const refQuestionsBankDb = doc(collection(db, 'questionsBank'), uqid);
  console.log('dataForQuestionBank', dataForQuestionBank);

  setDoc(refQuestionsBankDb, { ...dataForQuestionBank }, { merge: true });
  setDoc(
    doc(db, 'indices', 'questionsPerWeek'),
    {
      [course]: {
        [`week${week}`]: arrayUnion(refQuestionsBankDb),
      },
    },
    { merge: true },
  );
};
