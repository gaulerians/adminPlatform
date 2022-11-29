export const handleClickFunction = ({ funcExpresion, superiorSelections }) => {
  if (superiorSelections.setInferiorText && superiorSelections.setSelections) {
    superiorSelections.setInferiorText((prev) => {
      return (
        prev.slice(0, superiorSelections.selections.start) +
        funcExpresion +
        prev.slice(superiorSelections.selections.end)
      );
    });
    superiorSelections.setSelections((prev) => {
      return {
        start: prev.start + funcExpresion.length,
        end: prev.end + funcExpresion.length,
      };
    });
  }
};
