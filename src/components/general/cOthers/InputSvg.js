import React, { useEffect, useState, useRef } from "react";

import { InputContainer } from "../../../styles/inputGeneral";
import { ReactComponent as ImageFilesSVG } from "./../../../icons/image-files.svg";
import { InputSvgContainer } from "./styles/sInputSvg";
import { handleChangeTextLatex, transformTextLatexInPlain} from "../../examns/writeQuestion/algorithms";
import { writingFunctionInAlternative } from "../../examns/writeQuestion/algorithms/handleChangeTextLatex";
import { connectStorageEmulator } from "firebase/storage";

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
        image: localImage,
        text: localText,
        plainText: transformTextLatexInPlain(localText),
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
        imageSolution: localImage,
        textSolution: localText,
        plainTextSolution: transformTextLatexInPlain(localText),
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
              required={isQuestion || alternativeId ? true : false}
              id={
                isQuestion
                  ? "questionInput"
                  : `alternativeInput${alternativeId}`
              }
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
