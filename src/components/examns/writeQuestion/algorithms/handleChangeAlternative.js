export const handleChangeAlternative = (
    e,
    question,
    setQuestion,
    selections,
    setSelections,
    textAreaRef
  ) => {
    if (e.type === "change") {
      let copiedText = Array.from(question);
      if (e.nativeEvent.inputType === "insertLineBreak") {
        copiedText.splice(selections.start, 0, " \\newline ");
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
          copiedText.splice(selections.start, 0, " \\space ");
        } else {
          copiedText.splice(selections.start, 0, e.nativeEvent.data);
        }
      } else if (e.nativeEvent.inputType === "deleteContentForward") {
        copiedText.splice(selections.start, 1, "");
      }
      setQuestion(copiedText.join(""));
      setSelections({
        start: textAreaRef.current.selectionStart,
        end: textAreaRef.current.selectionEnd,
      });
    } else if (e.type === "select") {
      setSelections({
        start: textAreaRef.current.selectionStart,
        end: textAreaRef.current.selectionEnd,
      });
    }
  };
  