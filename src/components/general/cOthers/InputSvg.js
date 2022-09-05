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
  alternatives,
  setAlternatives,
  selections,
  setSelections,
  inputRef
}) {


  // useEffect(() => {
  //   // inputRef.current.selectionStart = selections.start;
  //   // inputRef.current.selectionEnd = selections.end;
  // }, [question, selections]);

  return (
    <InputContainer noMargin heightTextArea={heightTextArea}>
      {type == "textArea" ? (
        <>
          <label>{label}</label>
          <InputSvgContainer type={type}>
            <textarea
              id="questionInput"
              value={question}
              ref={inputRef}
              placeholder="Escribe aquí tu pregunta"
              onChange={(e) =>
                handleChangeQuestion(
                  e,
                  question,
                  setQuestion,
                  selections,
                  setSelections,
                  inputRef
                )
              }
              onSelect={(e) =>
                handleChangeQuestion(
                  e,
                  question,
                  setQuestion,
                  selections,
                  setSelections,
                  inputRef
                )
              }
            ></textarea>
            <ImageFilesSVG />
          </InputSvgContainer>
        </>
      ) : (
        <InputSvgContainer type={type}>
          <p>{number}</p>
          <input ref={inputRef} />
          <ImageFilesSVG />
        </InputSvgContainer>
      )}
    </InputContainer>
  );
}
