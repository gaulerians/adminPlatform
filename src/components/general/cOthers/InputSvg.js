import React, { useEffect, useState, useRef } from "react";

import { InputContainer } from "../../../styles/inputGeneral";
import { ReactComponent as ImageFilesSVG } from "./../../../icons/image-files.svg";
import { InputSvgContainer } from "./styles/sInputSvg";
import { handleChangeTextLatex } from "../../examns/writeQuestion/algorithms/handleChangeTextLatex";
import { writingFunctionInAlternative } from "../../examns/writeQuestion/algorithms/handleChangeTextLatex";

export default function InputSvg({
  heightTextArea,
  type,
  number,
  label,
  setQuestion,
  id,
  isQuestion = false,
  alternatives,
  setAlternatives,
  setSuperiorSelections,
}) {
  const [selections, setSelections] = useState({
    start: 0,
    end: 0,
  });

  const [localText, setLocalText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.selectionStart = selections.start;
    inputRef.current.selectionEnd = selections.end;
    setSuperiorSelections &&
      setSuperiorSelections({
        selections: selections,
        setInferiorText: setLocalText,
        setSelections: setSelections,
      });
  }, [selections]);

  useEffect(() => {
    isQuestion && setQuestion(localText);
    !isQuestion &&
      id &&
      setAlternatives(
        Object.values({
          ...alternatives,
          [id - 1]: { id, alternative: localText },
        })
      );
  }, [localText]);

  return (
    <InputContainer noMargin heightTextArea={heightTextArea}>
      {type === "textArea" ? (
        <>
          <label>{label}</label>
          <InputSvgContainer type={type}>
            {number && <p>{number}</p>}
            <textarea
              id="questionInput"
              value={localText}
              ref={inputRef}
              placeholder={
                isQuestion
                  ? "Escribe aquí tu pregunta"
                  : "Escribe aquí tu alternativa"
              }
              onChange={(e) =>
                handleChangeTextLatex({
                  e,
                  latexString: localText,
                  setLatexString: setLocalText,
                  selections,
                  setSelections,
                  inputRef,
                })
              }
              onSelect={(e) =>
                handleChangeTextLatex({
                  e,
                  latexString: localText,
                  setLatexString: setLocalText,
                  selections,
                  setSelections,
                  inputRef,
                })
              }
            ></textarea>
            <ImageFilesSVG />
          </InputSvgContainer>
        </>
      ) : (
        <InputSvgContainer type={type}>
          <p>{number}</p>
          <input />
          <ImageFilesSVG />
        </InputSvgContainer>
      )}
    </InputContainer>
  );
}
