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
  alternativeId = null,
  isQuestion = false,
  alternatives,
  setAlternatives,
  setSuperiorSelections,
  setDataImageUpload,
}) {
  const [selections, setSelections] = useState({
    start: 0,
    end: 0,
  });

  const [localText, setLocalText] = useState("");
  const inputRef = useRef(null);
  const refImageFile = useRef(null);

  const uploadImageFile = (e) => {
    e.preventDefault();
    refImageFile.current.click();
    refImageFile.current.addEventListener("change", (ev) => {
      // setDataImageUpload((prev) => ({
      //   ...prev,
      //   [ev.target.name]: ev.target.files[0],
      // }));
      console.log(ev);
    });
    console.log(refImageFile.current.name);
  };

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
      alternativeId &&
      setAlternatives(
        Object.values({
          ...alternatives,
          [alternativeId - 1]: { alternativeId, alternative: localText },
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
            <ImageFilesSVG onClick={uploadImageFile} />
            <input
              name={
                isQuestion
                  ? "question"
                  : alternativeId
                  ? `alternative${alternativeId}`
                  : "solution"
              }
              ref={refImageFile}
              type={"file"}
              accept="image/*"
              style={{ display: "none" }}
            />
          </InputSvgContainer>
        </>
      ) : (
        <InputSvgContainer type={type}>
          <p>{number}</p>
          <input />
          {/* <ImageFilesSVG /> */}
        </InputSvgContainer>
      )}
    </InputContainer>
  );
}
