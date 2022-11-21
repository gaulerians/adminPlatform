import React, { useContext, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../App";
// import {insertarFuncion } from '../functionsLatex/functionsLatex'
import "katex/dist/katex.min.css";
import { Latex } from "../../latex/Latex";
import { Title4, Title5, Title6 } from "./../../../styles/textGeneral";
import { Button } from "./../../../styles/buttonGeneral";
import { WrapperAdmin } from "./../../../styles/generalStyles";
import { InputContainer, FormContainer } from "./../../../styles/inputGeneral";
import { WrapperDuplex } from "./../../../styles/boxesGeneral";
import { ButtonLatex } from "./styles/sButtonLatex";
import Tag from "../../general/cOthers/Tag";
import InputSvg from "./../../general/cOthers/InputSvg";
import { functionLatex } from "../functionsLatex/functionsLatex";

export default function MainWriteQuestion() {
  const { universities } = useContext(AppContext);
  const { register, handleSubmit, errors } = useForm();
  const [universitiesSelected, setUniversitiesSelected] = useState([]);
  const [selectionCategory, setSelectionCategory] = useState("");
  const [superiorSelections, setSuperiorSelections] = useState({
    selections: { start: 0, end: 0 },
    setSelections: null,
    setInferiorText: null,
  });

  const [question, setQuestion] = useState({
    image: null,
    text: null,
    plainText: null,
    imageSolution: null,
    textSolution: null,
    plainTextSolution: null,
    urlVideoYoutube: null,
    urlVideoFacebook: null,
  });

  

  const [alternatives, setAlternatives] = useState([
    {
      alternativeId: 1,
      alternative: { image: null, text: null, plainText: null },
    },
    {
      alternativeId: 2,
      alternative: { image: null, text: null, plainText: null },
    },
    {
      alternativeId: 3,
      alternative: { image: null, text: null, plainText: null },
    },
    {
      alternativeId: 4,
      alternative: { image: null, text: null, plainText: null },
    },
    {
      alternativeId: 5,
      alternative: { image: null, text: null, plainText: null },
    },
  ]);

  const listOfCourses = [
    "Selecione curso",
    "Matemáticas",
    "Física",
    "Química",
    "Biología",
    "Historia",
  ];

  const handleClickFunction = (func) => {
    if (
      superiorSelections.setInferiorText &&
      superiorSelections.setSelections
    ) {
      superiorSelections.setInferiorText((prev) => {
        return (
          prev.slice(0, superiorSelections.selections.start) +
          func +
          prev.slice(superiorSelections.selections.end)
        );
      });
      superiorSelections.setSelections((prev) => {
        return {
          start: prev.start + func.length,
          end: prev.end + func.length,
        };
      });
    }
  };

  const onTagDeleteU = (tagName) => {
    setUniversitiesSelected(
      [...universitiesSelected].filter((u) => u !== tagName)
    );
  };

  const onSubmit = (data) => {
    const { theme, subtheme, typeQuestion, urlVideoFacebook, urlVideoYoutube } =
      data;

    const questionData = {
      universities: universitiesSelected,
      theme,
      subtheme,
      typeQuestion,
      latexQuestion: question,
      alternatives,
      solution: {
        
        urlVideoFacebook: urlVideoFacebook.length > 5 ? urlVideoFacebook : null,
        urlVideoYoutube: urlVideoYoutube.length > 5 ? urlVideoYoutube : null,
      },
    };
    // console.log(questionData);
  };

  useEffect(() => {
    console.log(question);
  }, [alternatives, question]);

  return (
    <main>
      <WrapperAdmin>
        <div>
          <Title4>Redacción de preguntas</Title4>
        </div>
        <div>
          <Title5>Metadatos</Title5>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <div className="inputContainerChip">
              <InputContainer margin10B>
                <label>Universidad</label>
                <div className="select">
                  <select
                    id="standard-select"
                    onChange={(e) =>
                      e.target.selectedIndex !== 0
                        ? setUniversitiesSelected([
                            ...new Set([
                              ...universitiesSelected,
                              e.target.value,
                            ]),
                          ])
                        : undefined
                    }
                    onClick={(e) => console.log(e.target.value)}
                  >
                    <option>Seleccione</option>
                    {universities.map((u) => (
                      <option value={u.acronym}>
                        {u.acronym} - {u.universityName}
                      </option>
                    ))}
                  </select>
                  <span className="focus"></span>
                </div>
              </InputContainer>
              {universitiesSelected.map((chip) => (
                <Tag name={chip} type="university" onDelete={onTagDeleteU} />
              ))}
            </div>
            <div className="inputContainerQuad">
              <InputContainer margin10B>
                <label>Curso</label>
                <div className="select">
                  <select
                    id="standard-select"
                    {...register("course", { required: true })}
                  >
                    {listOfCourses.map((courses, index) => (
                      <option key={index} value={courses}>
                        {courses}
                      </option>
                    ))}
                  </select>
                  <span className="focus"></span>
                </div>
              </InputContainer>
              <InputContainer noMargin>
                <label>Tema</label>
                <div className="select">
                  <select
                    id="standard-select"
                    {...register("theme", { required: true })}
                  >
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                  </select>
                  <span className="focus"></span>
                </div>
              </InputContainer>
              <InputContainer noMargin>
                <label>Subtema</label>
                <div className="select">
                  <select
                    id="standard-select"
                    {...register("subtheme", { required: true })}
                  >
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                  </select>
                  <span className="focus"></span>
                </div>
              </InputContainer>
            </div>
            <div className="inputContainerDuplo">
              <InputContainer noMargin>
                <label>Pregunta para</label>
                <div className="inputsRadioContainer">
                  <label className="inputRadioContainer inputType">
                    <input
                      value="simuluacro"
                      name="typeOfQuestion"
                      type="checkbox"
                      {...register("typeQuestion", { required: true })}
                    />
                    Simulacros
                  </label>
                  <label className="inputRadioContainer inputType">
                    <input
                      value="cuestionario"
                      name="typeOfQuestion"
                      type="checkbox"
                      {...register("typeQuestion", { required: true })}
                    />
                    Questionario
                  </label>
                  <label className="inputRadioContainer inputType">
                    <input
                      value={"deco"}
                      name="typeOfQuestion"
                      type="checkbox"
                      {...register("typeQuestion", { required: true })}
                    />
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
                      question={question}
                      setQuestion={setQuestion}
                      isQuestion={true}
                      setSuperiorSelections={setSuperiorSelections}
                    />
                  </div>
                  <Title6>Insertar funciones LATEX</Title6>
                  <InputContainer noMargin>
                    <div className="select">
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
                        <span className="focus"></span>
                      </select>
                    </div>
                  </InputContainer>
                </div>
                <div>
                  {functionLatex
                    .filter((lat) =>
                      selectionCategory.split("-")?.length > 1
                        ? lat.category === selectionCategory.split("-")[0] &&
                          lat.subCategory === selectionCategory.split("-")[1]
                        : lat.category === selectionCategory
                    )
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
                          onClick={() =>
                            handleClickFunction(func.expressionLatex)
                          }
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
                        type="textArea"
                        isQuestion={false}
                        number={`${index + 1}.`}
                        setAlternatives={setAlternatives}
                        alternatives={alternatives}
                        setSuperiorSelections={setSuperiorSelections}
                        alternativeId={key.alternativeId}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <Title5>Vista previa</Title5>
                <div>
                  <Latex>{question?.text ?? ""}</Latex>
                  {question.image && (
                    <img
                      src={URL.createObjectURL(question.image)}
                      style={{ width: "300px", marginTop: "10px" }}
                    />
                  )}
                </div>
                <br />
                <div>
                  {/* {console.log(alternatives)} */}
                  {alternatives.map((alt, index) => (
                    <div key={index}>
                      <Latex>{`${index + 1}) \\space ${
                        alt.alternative?.text ?? ""
                      }`}</Latex>
                    </div>
                  ))}
                </div>
                <div>
                  <Title5>Solución: </Title5>
                  <Latex>{question?.textSolution ?? ""}</Latex>
                  {question.imageSolution && (
                    <img
                      src={URL.createObjectURL(question.imageSolution)}
                      style={{ width: "300px", marginTop: "10px" }}
                    />
                  )}
                </div>
              </div>
            </WrapperDuplex>
            <div>
              <Title5>Resolución</Title5>
              <WrapperDuplex>
                <InputContainer margin="0 0 10px 0">
                  <label>URL del video de Youtube</label>
                  <input
                    type="url"
                    {...register("urlVideoYoutube")}
                    onChange={(e) => {
                      setQuestion({
                        ...question,
                        urlVideoYoutube: e.target.value,
                      });
                    }}
                  />
                </InputContainer>
                <InputContainer margin="0 0 10px 0">
                  <label>URL del video de Facebook</label>
                  <input
                    type="url"
                    {...register("urlVideoFacebook")}
                    onChange={(e) => {
                      setQuestion({
                        ...question,
                        urlVideoFacebook: e.target.value,
                      });
                    }}
                  />
                </InputContainer>
              </WrapperDuplex>
              <div>
                <InputSvg
                  heightTextArea="140px"
                  type="textArea"
                  label="Texto e imagen"
                  isQuestion={false}
                  question={question}
                  setQuestion={setQuestion}
                />
              </div>
            </div>
            <WrapperDuplex>
              <Button primary formEnd type="submit">
                Enviar a revisión
              </Button>
            </WrapperDuplex>
          </FormContainer>
        </div>
      </WrapperAdmin>
    </main>
  );
}
