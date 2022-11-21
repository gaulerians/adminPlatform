export const transformTextLatexInPlain = (localText) => {
    const questionInTextPlain = localText
      .replace(/\\[a-zA-Z]+/g, "")
      .replace(/\s+/g, " ");
    return questionInTextPlain;
  };