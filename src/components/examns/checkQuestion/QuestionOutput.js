import React from "react";
import {
  QuestionInputContainer,
  TextQuestionStyled,
} from "./styles/sQuestionInput";
// import Latex from "react-latex-next";

import { Latex } from "../../latex/Latex";
import { Text } from "../../../styles/textGeneral";

export default function QuestionOutput({
  question,
  keys = [],
  UrlOfImage = "",
}) {
  return (
    <QuestionInputContainer>
      <TextQuestionStyled>
        {question ? (
          <Latex>{question}</Latex>
        ) : (
          <Text>{"No hay pregunta"}</Text>
        )}
      </TextQuestionStyled>
      {UrlOfImage && (
        <img
          loading="lazy"
          className="questionImage"
          src={UrlOfImage}
          alt={"imagen de la pregunta"}
        />
      )}
      {keys?.map((item, index) => {
        let keyLetter = null;
        switch (index) {
          case 0:
            keyLetter = "a";
            break;
          case 1:
            keyLetter = "b";
            break;
          case 2:
            keyLetter = "c";
            break;
          case 3:
            keyLetter = "d";
            break;
          case 4:
            keyLetter = "e";
            break;
          default:
            keyLetter = null;
        }
        if (keyLetter !== null) {
          return (
            <div className="questionContainer" key={item.concat(index)}>
              <label htmlFor={item.concat(question)}>
                <span className="keyLetterQuestion">{keyLetter}</span>
                <div className="question">
                  {item.startsWith("https") ? (
                    <img loading="lazy" src={item} alt={item} />
                  ) : (
                    <>
                      {index === 0 ? (
                        <Latex>{`\\textcolor{green}{${item}}`}</Latex>
                      ) : (
                        <Latex>{`\\textcolor{red}{${item}}`}</Latex>
                      )}
                    </>
                  )}
                </div>
              </label>
            </div>
          );
        }
        return false;
      })}
    </QuestionInputContainer>
  );
}
