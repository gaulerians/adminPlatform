import { collection, query, where, getDocs } from 'firebase/firestore';

export const searchSolutionQuestion = async ({ setLoading, db, uqid, setResultOfQuestion }) => {
  let solutionDocs = await getDocs(query(collection(db, 'solutions'), where('uqid', '==', uqid)));
  let solutions = [];
  solutionDocs.docs.map((doc) => {
    solutions.push(doc.data());
  });
  setResultOfQuestion(solutions);
};
