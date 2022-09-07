export const handleChangeAlternative = (
  e,
  alternatives,
  setAlternatives,
  selectionsAlternative,
  setSelectionsAlternative,
  inputRef
) => {
    let newAlternatives = alternatives.map((alternative, index) => {
      if (index === Number(e.target.id - 1)) {
        return {
          ...alternative,
          alternative: e.target.value,
        };
      } else {
        return alternative;
      }
    });
    setAlternatives(newAlternatives);
};
