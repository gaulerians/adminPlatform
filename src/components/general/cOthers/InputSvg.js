import React, { useEffect, useState, useRef } from "react";

import { InputContainer } from "../../../styles/inputGeneral";
import { ReactComponent as ImageFilesSVG } from "./../../../icons/image-files.svg";
import { ReactComponent as CloseImage } from "./../../../icons/close.svg";
import { InputSvgContainer } from "./styles/sInputSvg";
import {
  handleChangeTextLatex,
  transformTextLatexInPlain,
} from "../../examns/writeQuestion/algorithms";

export default function InputSvg({
  heightTextArea,
  type,
  number,
  label,
  question,
  setQuestion,
  alternativeId = null,
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
  const [localImage, setLocalImage] = useState(null);
  const inputRef = useRef(null);
  const refImageFile = useRef(null);
  const refCloseImage = useRef(null);

  const uploadImageFile = (e) => {
    e.preventDefault();
    refImageFile.current.click();
    refImageFile.current.addEventListener("change", (ev) => {
      setLocalImage(ev.target.files[0]);
    });
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
    isQuestion &&
      setQuestion({
        ...question,
        question: {
          image: localImage,
          text: localText,
          plainText: transformTextLatexInPlain(localText),
        },
      });
    !isQuestion &&
      alternativeId &&
      setAlternatives(
        Object.values({
          ...alternatives,
          [alternativeId - 1]: {
            alternativeId,
            alternative: {
              image: localImage,
              text: localText,
              plainText: transformTextLatexInPlain(localText),
            },
          },
        })
      );
    !isQuestion &&
      !alternativeId &&
      setQuestion({
        ...question,
        solution: {
          imageSolution: localImage,
          textSolution: localText,
          plainTextSolution: transformTextLatexInPlain(localText),
        },
      });
  }, [localText, localImage]);

  return (
    <InputContainer noMargin heightTextArea={heightTextArea}>
      {type === "textArea" ? (
        <>
          <label>{label}</label>
          <InputSvgContainer type={type}>
            {number && <p>{number}</p>}
            <textarea
              // required={isQuestion || alternativeId ? true : false}
              id={
                isQuestion
                  ? "questionInput"
                  : alternativeId
                  ? `alternativeInput${alternativeId}`
                  : "solutionInput"
              }
              value={localText}
              ref={inputRef}
              placeholder={
                isQuestion
                  ? "Escribe aquí tu pregunta"
                  : alternativeId
                  ? alternativeId === 1
                    ? "Escribe aquí la alternativa correcta"
                    : "Escribe aquí la alternativa Incorrecta"
                  : "Escribe aquí tu solución"
              }
              style={
                alternativeId
                  ? alternativeId === 1
                    ? { color: "green" }
                    : { color: "red" }
                  : {}
              }
              onChange={(e) =>
                handleChangeTextLatex({
                  e,
                  latexString: localText,
                  setLatexString: setLocalText,
                  selections,
                  setSelections,
                  inputRef,
                  alternatives,
                  setAlternatives,
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
                  alternatives,
                  setAlternatives,
                })
              }
            ></textarea>
            <ImageFilesSVG onClick={uploadImageFile} />
            <input
              ref={refImageFile}
              type={"file"}
              accept="image/*"
              style={{ display: "none" }}
            />
            <CloseImage
              ref={refCloseImage}
              style={{
                display: localImage ? "block" : "none",
              }}
              onClick={() => setLocalImage(null)}
            />
          </InputSvgContainer>
        </>
      ) : (
        <InputSvgContainer type={type}>
          <p>{number}</p>
          <input />
        </InputSvgContainer>
      )}
    </InputContainer>
  );
}
