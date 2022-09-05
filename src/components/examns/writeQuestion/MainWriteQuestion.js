import React, { useEffect, useState, useRef } from "react";
// import {insertarFuncion } from '../functionsLatex/functionsLatex'
import "katex/dist/katex.min.css";
import { Latex } from "../../latex/Latex";
import { Title4, Title5, Title6 } from "./../../../styles/textGeneral";
import { Button } from "./../../../styles/buttonGeneral";
import { WrapperAdmin } from "./../../../styles/generalStyles";
import { InputContainer, FormContainer } from "./../../../styles/inputGeneral";
import { WrapperDuplex } from "./../../../styles/boxesGeneral";
import { ButtonLatex } from "./styles/sButtonLatex";
import InputSvg from "./../../general/cOthers/InputSvg";
import { functionLatex } from "../functionsLatex/functionsLatex";
import { writingFunctionInQuestion } from "./algorithms/handleChangeQuestion";

export default function MainWriteQuestion() {
  const [question, setQuestion] = useState("");
  const [selectionCategory, setSelectionCategory] = useState("");
  //crear estadopara referencias
  //subir de nivel del estado

  const [alternatives, setAlternatives] = useState([
    { id: 1, alternative: "" },
    { id: 2, alternative: "" },
    { id: 3, alternative: "" },
    { id: 4, alternative: "" },
    { id: 5, alternative: "" },
  ]);

  const inputRef = useRef(null);
  const [selections, setSelections] = useState({
    start: 0,
    end: 0,
  });


  useEffect(() => {
    inputRef.current.selectionStart = selections.start;
    inputRef.current.selectionEnd = selections.end;
  }, [question, selections]);

  return (
    <main>
      <WrapperAdmin>
        <div>
          <Title4>Redacción de preguntas</Title4>
        </div>
        <div>
          <Title5>Metadatos</Title5>
          <FormContainer>
            <div className="inputContainerQuad">
              <InputContainer margin10B>
                <label>Universidad</label>
                <div class="select">
                  <select id="standard-select">
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                  </select>
                  <span class="focus"></span>
                </div>
              </InputContainer>
            </div>
            <div className="inputContainerQuad">
              <InputContainer margin10B>
                <label>Curso</label>
                <div class="select">
                  <select id="standard-select">
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                  </select>
                  <span class="focus"></span>
                </div>
              </InputContainer>
              <InputContainer noMargin>
                <label>Tema</label>
                <div class="select">
                  <select id="standard-select">
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                  </select>
                  <span class="focus"></span>
                </div>
              </InputContainer>
              <InputContainer noMargin>
                <label>Subtema</label>
                <div class="select">
                  <select id="standard-select">
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                  </select>
                  <span class="focus"></span>
                </div>
              </InputContainer>
              <InputContainer noMargin>
                <label>Nivel</label>
                <div class="select">
                  <select id="standard-select">
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                  </select>
                  <span class="focus"></span>
                </div>
              </InputContainer>
            </div>
            <div className="inputContainerDuplo">
              <InputContainer noMargin>
                <label>Pregunta para</label>
                <div className="inputsRadioContainer">
                  <label className="inputRadioContainer inputType">
                    <input type="checkbox" />
                    Simulacros
                  </label>
                  <label className="inputRadioContainer inputType">
                    <input type="checkbox" />
                    Questionario
                  </label>
                  <label className="inputRadioContainer inputType">
                    <input type="checkbox" />
                    DECO
                  </label>
                </div>
              </InputContainer>
            </div>
            <WrapperDuplex>
              <div>
                <Title5>Contenido</Title5>
                <div>
                  <Title6>Pregunta</Title6>
                  <div>
                    <InputSvg
                      heightTextArea="140px"
                      type="textArea"
                      setQuestion={setQuestion}
                      question={question}
                      isQuestion={true}
                      inputRef={inputRef}
                      selections={selections}
                      setSelections={setSelections}
                    />
                  </div>
                  <Title6>Insertar funciones LATEX</Title6>
                  <InputContainer noMargin>
                    <div class="select">
                      <select
                        id="standard-select-category"
                        defaultValue={selectionCategory}
                        onChange={(e) => setSelectionCategory(e.target.value)}
                      >
                        {functionLatex.map((lat, index) => {
                          return (
                            <option
                              key={index}
                              value={`${lat.category}${
                                lat.subCategory ? "-" + lat.subCategory : ""
                              }`}
                            >{`${lat.category}${
                              lat.subCategory ? "-" + lat.subCategory : ""
                            }`}</option>
                          );
                        })}
                        <span class="focus"></span>
                      </select>
                    </div>
                  </InputContainer>
                </div>
                <div>
                  {functionLatex
                    .filter((lat) => {
                      if (selectionCategory.split("-")?.length > 1) {
                        return (
                          lat.category === selectionCategory.split("-")[0] &&
                          lat.subCategory === selectionCategory.split("-")[1]
                        );
                      } else if (selectionCategory.split("-")?.length === 1) {
                        return lat.category === selectionCategory;
                      }
                    })
                    .map((lat) =>
                      lat.functions.map((func, index) => (
                        <ButtonLatex
                          type="button"
                          primary
                          secundary
                          inForm
                          className={func.styleButton}
                          key={index}
                          value={func.expressionLatex}
                          id={index}
                          onClick={() => {
                            writingFunctionInQuestion(
                              func.expressionLatex,
                              question,
                              setQuestion,
                              selections,
                              setSelections,
                              inputRef
                            );
                          }}
                        >
                          <Latex>{func.expressionLatex}</Latex>
                        </ButtonLatex>
                      ))
                    )}
                </div>
                <div>
                  <Title6>Alternativas</Title6>
                  <div>
                    {alternatives.map((key, index) => (
                      <InputSvg
                        key={index}
                        number={`${index + 1}.`}
                        setAlternatives={setAlternatives}
                        alternatives={alternatives}
                        id={key.id}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <Title5>Vista previa</Title5>
                <div>
                  <Latex>{question}</Latex>
                </div>
              </div>
            </WrapperDuplex>
            <div>
              <Title5>Resolución</Title5>
              <WrapperDuplex>
                <InputContainer margin="0 0 10px 0">
                  <label>URL del video</label>
                  <input />
                </InputContainer>
              </WrapperDuplex>
              <div>
                <InputSvg
                  heightTextArea="140px"
                  type="textArea"
                  label="Texto e imagen"
                />
              </div>
            </div>
            <WrapperDuplex>
              <Button primary formEnd>
                Enviar a revisión
              </Button>
            </WrapperDuplex>
          </FormContainer>
        </div>
      </WrapperAdmin>
    </main>
  );
}
