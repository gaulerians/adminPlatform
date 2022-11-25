import React, { useContext, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../App";
import { FirestoreSdkContext } from "reactfire";
import "katex/dist/katex.min.css";
import { recoveryDataSubTopics } from "./algorithms";
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
import { onSubmitImage } from "./algorithms/onSubmitImage";
import { onSubmitDataQuestion } from "./algorithms/onSubmitDataQuestion";

export default function MainWriteQuestion() {
  const { universities, dataSubTopics, setDataSubTopics, setLoading } =
    useContext(AppContext);
  const db = useContext(FirestoreSdkContext);
  const { register, handleSubmit } = useForm();
  const [universitiesSelected, setUniversitiesSelected] = useState([]);
  const [courseSelected, setCourseSelected] = useState(null);
  const [themesFilters, setThemesFilters] = useState([]);
  // const [subThemesFilters, setSubThemesFilters] = useState([]);
  const [themeSelected, setThemeSelected] = useState(null);
  const [subThemeSelected, setSubThemeSelected] = useState(null);
  const [selectionCategory, setSelectionCategory] = useState("");
  const [superiorSelections, setSuperiorSelections] = useState({
    selections: { start: 0, end: 0 },
    setSelections: null,
    setInferiorText: null,
  });

  const [question, setQuestion] = useState({
    question: {
      //Dejar como key 0
      image: null,
      text: null,
      plainText: null,
      urlImage: null,
    },
    solution: {
      //Dejar como key 1
      imageSolution: null,
      urlImageSolution: null,
      textSolution: null,
      plainTextSolution: null,
      urlVideoYoutube: null,
      urlVideoFacebook: null,
    },
  });

  const [alternatives, setAlternatives] = useState([
    {
      alternativeId: 1,
      alternative: { image: null, text: null, plainText: null, urlImage: null },
    },
    {
      alternativeId: 2,
      alternative: { image: null, text: null, plainText: null, urlImage: null },
    },
    {
      alternativeId: 3,
      alternative: { image: null, text: null, plainText: null, urlImage: null },
    },
    {
      alternativeId: 4,
      alternative: { image: null, text: null, plainText: null, urlImage: null },
    },
    {
      alternativeId: 5,
      alternative: { image: null, text: null, plainText: null, urlImage: null },
    },
  ]);

  const listOfCourses = [
    "Selecione curso",
    "chemistry",
    "biology",
    "physics",
    "mathematics",
    "geography",
    "history",
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

  const onSubmit = async (data) => {
    const alternativesImage = alternatives.filter(
      (a) => a.alternative.image !== null
    );

    const imagesArr = Object.values({
      ...(question.question.image
        ? {
            question: {
              image: question?.question.image,
              typeImage: Object.keys(question)[0],
            },
          }
        : {}),
      ...(question.solution?.imageSolution
        ? {
            solution: {
              image: question.solution?.imageSolution,
              typeImage: Object.keys(question)[1],
            },
          }
        : {}),
      ...(alternativesImage.length > 0
        ? alternativesImage.map((a) => ({
            image: a.alternative.image,
            typeImage: `alternative-${a.alternativeId}`,
          }))
        : {}),
    });
    await onSubmitImage({
      data,
      db,
      imagesArr,
      alternatives,
      setAlternatives,
      question,
      setQuestion,
      setLoading,
    });
    // console.log(question);
    // await onSubmitDataQuestion({ question, alternatives });
  };

  const filterThemes = ({
    courseSelected = "",
    dataSubTopics = [],
    setThemesFilters,
  }) => {
    setThemesFilters(
      dataSubTopics
        ?.map(
          (st) =>
            st?.topics &&
            Object.keys(st?.topics).includes(courseSelected) &&
            st.topics[courseSelected]
        )
        .filter(
          (st) => st !== undefined && st !== false && st !== true && st !== null
        )
    );
  };

  useEffect(() => {
    console.log("courseSelected", courseSelected);
  console.log("themeSelected", themeSelected);
  console.log("subThemesFilters", subThemeSelected);
  }, [courseSelected, themeSelected, subThemeSelected]);

  useEffect(() => {
    filterThemes({ courseSelected, dataSubTopics, setThemesFilters });
  }, [courseSelected, dataSubTopics, setThemesFilters]);

  useEffect(() => {
    recoveryDataSubTopics({
      db,
      dataSubTopics,
      setDataSubTopics,
      courseSelected,
    });
  }, [courseSelected]);

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
                    onChange={(e) =>
                      setCourseSelected(e.target?.value ? e.target?.value : [])
                    }
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
                    {...register("theme", { required: false })}
                    onChange={(e) => setThemeSelected(e.target.value)}
                  >
                    {themesFilters?.map((theme, index) => (
                      <option key={index} value={theme}>
                        {theme}
                      </option>
                    ))}
                  </select>
                  <span className="focus"></span>
                </div>
              </InputContainer>
              <InputContainer noMargin>
                <label>Subtema</label>
                <div className="select">
                  <select
                    id="standard-select"
                    defaultValue={dataSubTopics.length > 0 ? dataSubTopics :""}
                    onChange={(e) => setSubThemeSelected(e.target.value)}
                  >
                    {dataSubTopics
                      ?.filter(
                        (st) =>
                          st.courses?.includes(courseSelected) &&
                          Object.values(st.topics).includes(themeSelected) &&
                          st.title
                      )
                      .map((subtheme, index) => {
                        return (
                          <option key={index} value={subtheme.title}>
                            {subtheme.title}
                          </option>
                        );
                      })}
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
                      {...register("typeQuestion", { required: false })}
                    />
                    Simulacros
                  </label>
                  <label className="inputRadioContainer inputType">
                    <input
                      value="cuestionario"
                      name="typeOfQuestion"
                      type="checkbox"
                      {...register("typeQuestion", { required: false })}
                    />
                    Questionario
                  </label>
                  <label className="inputRadioContainer inputType">
                    <input
                      value={"deco"}
                      name="typeOfQuestion"
                      type="checkbox"
                      {...register("typeQuestion", { required: false })}
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
                  <Latex>{question.question?.text ?? ""}</Latex>
                  {question.question.image && (
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <img
                      src={URL.createObjectURL(question.question.image)}
                      style={{ width: "300px", marginTop: "10px" }}
                    />
                  )}
                </div>
                <br />
                <div>
                  {/* {console.log(alternatives)} */}
                  {alternatives.map((alt, index) => (
                    <div key={index}>
                      <Latex>{`
                      ${
                        index + 1 === 1
                          ? `\\textcolor{green}{${index + 1})}`
                          : `\\textcolor{red}{${index + 1})}`
                      } \\space 
                      ${
                        alt.alternative?.text
                          ? index + 1 === 1
                            ? `\\textcolor{green}{${alt.alternative?.text}}`
                            : `\\textcolor{red}{${alt.alternative?.text}}`
                          : ""
                      }
                      `}</Latex>
                    </div>
                  ))}
                </div>
                <div>
                  <Title5>Solución: </Title5>
                  <Latex>{question.solution?.textSolution ?? ""}</Latex>
                  {question.solution.imageSolution && (
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <img
                      src={URL.createObjectURL(question.solution.imageSolution)}
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
                        solution: {
                          ...question.solution,
                          urlVideoYoutube: e.target.value,
                        },
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
                        solution: {
                          ...question.solution,
                          urlVideoFacebook: e.target.value,
                        },
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
                  setSuperiorSelections={setSuperiorSelections}
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
