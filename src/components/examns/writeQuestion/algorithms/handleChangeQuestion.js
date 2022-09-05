export const handleChangeQuestion = (
  e,
  question,
  setQuestion,
  selections,
  setSelections,
  inputRef
) => {
  if (e.type === "change") {
    let copiedText = Array.from(question);
    let lengthAdded = 0;
    if (e.nativeEvent.inputType === "insertLineBreak") {
      let latexFunction = " \\newline ";
      copiedText.splice(selections.end, 0, latexFunction);
      lengthAdded = latexFunction.length - 1;
    } else if (e.nativeEvent.inputType === "deleteContentBackward") {
      copiedText.splice(
        selections.start === selections.end
          ? selections.start - 1
          : selections.start,
        selections.start === selections.end
          ? selections.end - selections.start + 1
          : selections.end - selections.start,
        ""
      );
    } else if (e.nativeEvent.inputType === "insertText") {
      if (e.nativeEvent.data === " ") {
        let latexFunction = " \\space ";
        copiedText.splice(selections.end, 0, latexFunction);
        lengthAdded = latexFunction.length - 1;
      } else {
        copiedText.splice(selections.start, 0, e.nativeEvent.data);
      }
    } else if (e.nativeEvent.inputType === "deleteContentForward") {
      copiedText.splice(selections.start, 1, "");
    }
    setSelections({
      start: inputRef.current.selectionStart + lengthAdded,
      end: inputRef.current.selectionEnd + lengthAdded,
    });
    setQuestion(copiedText.join(""));
  } else if (e.type === "select") {
    setSelections({
      start: inputRef.current.selectionStart,
      end: inputRef.current.selectionEnd,
    });
  }
};


export const writingFunctionInQuestion = (
  expressionLatex,
  question,
  setQuestion,
  selections,
  setSelections,
  inputRef
) => {
  let copiedText = Array.from(question);
  let lengthAdded = 0;
  let latexFunction = expressionLatex;
  copiedText.splice(selections.end, 0, latexFunction);
  lengthAdded = latexFunction.length - 1;
  setSelections({
    start: inputRef.current.selectionStart + lengthAdded,
    end: inputRef.current.selectionEnd + lengthAdded,
  });
  setQuestion(copiedText.join(""));
  
};
