export const resetValues = ({ setQuestion, setAlternatives }) => {
  setQuestion({
    question: {
      image: null,
      text: null,
      plainText: null,
      urlImage: null,
    },
    solution: {
      imageSolution: null,
      urlImageSolution: null,
      textSolution: null,
      plainTextSolution: null,
      urlVideoYoutube: null,
      urlVideoFacebook: null,
    },
  });
  setAlternatives([
    {
      alternativeId: 1,
      alternative: { image: null, text: null, plainText: null },
    },
    {
      alternativeId: 2,
      alternative: { image: null, text: null, plainText: null },
    },
    {
      alternativeId: 3,
      alternative: { image: null, text: null, plainText: null },
    },
    {
      alternativeId: 4,
      alternative: { image: null, text: null, plainText: null },
    },
    {
      alternativeId: 5,
      alternative: { image: null, text: null, plainText: null },
    },
  ]);
};
