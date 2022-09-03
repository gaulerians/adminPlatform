import React, { useEffect, useState, useRef } from "react";

import { InputContainer } from "../../../styles/inputGeneral";
import { ReactComponent as ImageFilesSVG } from "./../../../icons/image-files.svg";
import { InputSvgContainer } from "./styles/sInputSvg";
import { handleChangeQuestion } from "../../examns/writeQuestion/algorithms/handleChangeQuestion";

export default function InputSvg({
  heightTextArea,
  type,
  number,
  label,
  setQuestion,
  question,
}) {
  const [selections, setSelections] = useState({
    start: 0,
    end: 0,
  });
  const textAreaRef = useRef(null);

  useEffect(() => {}, [question, selections]);

  return (
    <InputContainer noMargin heightTextArea={heightTextArea}>
      {type == "textArea" ? (
        <>
          <label>{label}</label>
          <InputSvgContainer type={type}>
            <textarea
              id="questionInput"
              value={question}
              ref={textAreaRef}
              placeholder="Escribe aquí tu pregunta"
              onChange={(e) =>
                handleChangeQuestion(
                  e,
                  question,
                  setQuestion,
                  selections,
                  setSelections,
                  textAreaRef
                )
              }
              onSelect={(e) =>
                handleChangeQuestion(
                  e,
                  question,
                  setQuestion,
                  selections,
                  setSelections,
                  textAreaRef
                )
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
