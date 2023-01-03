export const handleChangeTextLatex = ({
  e,
  setLatexString,
  selections,
  setSelections,
  inputRef,
  setTextRecords,
  textRecords,
}) => {
  let lengthAdded = 0;
  let valueAdded = null;
  if (e.type === "change" || e.type === "paste" || e.type === "select") {
    if (e.type === "change") {
      setTextRecords((prev) => [...prev, inputRef.current.value]);
    }

    if (e.nativeEvent.inputType === "insertLineBreak") {
      let latexFunction = "\\\\\n";
      setLatexString(
        (prev) =>
          prev.slice(0, selections.start) +
          latexFunction +
          prev.slice(selections.end)
      );
      lengthAdded = null;
      inputRef.current.setSelectionRange(selections.start, selections.end);
    } else if (e.nativeEvent.inputType === "deleteContentBackward") {
      setLatexString((prev) => {
        if (selections.start === selections.end) {
          return (
            prev.slice(0, selections.start - 1) + prev.slice(selections.end)
          );
        } else {
          return prev.slice(0, selections.start) + prev.slice(selections.end);
        }
      });
    } else if (e.nativeEvent.inputType === "deleteContentForward") {
      setLatexString((prev) => {
        if (selections.start === selections.end) {
          return (
            prev.slice(0, selections.start) + prev.slice(selections.end + 1)
          );
        } else {
          return prev.slice(0, selections.start) + prev.slice(selections.end);
        }
      });
    } else if (e.nativeEvent.inputType === "deleteByCut") {
      setLatexString(
        (prev) => prev.slice(0, selections.start) + prev.slice(selections.end)
      );
    } else if (e.nativeEvent.inputType === "insertText") {
      valueAdded = e.nativeEvent.data;
    } else if (e.nativeEvent.type === "paste") {
      valueAdded =
        e.clipboardData.getData("text/plain").replaceAll(" ", "") + " ";
    }

    lengthAdded !== null &&
      setSelections({
        start: inputRef.current.selectionStart + lengthAdded,
        end: inputRef.current.selectionEnd + lengthAdded,
      });
    valueAdded &&
      setLatexString(
        (prev) =>
          prev.slice(0, selections.start) +
          valueAdded +
          prev.slice(selections.end)
      );
  }

  if (e.type === "keydown") {
    if (e.ctrlKey) {
      if (e.code === "KeyZ" && textRecords.length > 1) {
        setLatexString((prev) => {
          let index = textRecords.indexOf(prev);
          if (index - 1 > 0) {
            return textRecords[index - 1];
          } else {
            return prev;
          }
        });
      }
      if (e.shiftKey && e.code === "KeyZ" && textRecords.length > 2) {
        setLatexString((prev) => {
          let index = textRecords.indexOf(prev);
          if (index + 2 < textRecords.length - 1) {
            return textRecords[index + 2];
          } else {
            return prev;
          }
        });
      }
    }
  }
};
