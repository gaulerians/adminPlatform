export const handleClickFunction = ({ funcExpression, superiorSelections }) => {
  if (superiorSelections.setInferiorText && superiorSelections.setSelections) {
    superiorSelections.setInferiorText((prev) => {
      return (
        prev.slice(0, superiorSelections.selections.start) +
        funcExpression.replaceAll(" ", "") +
        " " +
        prev.slice(superiorSelections.selections.end)
      );
    });
    superiorSelections.setSelections((prev) => {
      return {
        start: prev.start + funcExpression.length,
        end: prev.end + funcExpression.length,
      };
    });
  }
};
