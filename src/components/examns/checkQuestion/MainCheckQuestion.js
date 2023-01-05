/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useEffect, useState, CSSProperties } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
import { Text, Title4, Title5 } from "./../../../styles/textGeneral";
import { WrapperAdmin } from "./../../../styles/generalStyles";
import Tag from "./../../general/cOthers/Tag";
import { TagsUnlist } from "./../../../styles/boxesGeneral";
import { FirestoreSdkContext } from "reactfire";
import { AppContext } from "../../../App";
import { useNavigate } from "react-router";
import QuestionOutput from "./QuestionOutput";
import { searchSolutionQuestion } from "./algorithms/searchSolutionQuestion";
import { QuestionInputContainer } from "./styles/sQuestionInput";
import { Latex } from "../../latex/Latex";
import TagCheck from "./TagCheck";
import { TagContainer } from "./styles/sTagCheck";
import { MainModalCheck } from "../../modal/MainModalCheck";
import { MainModalComents } from "../../modal/MainModalComents";
import { useParams } from "react-router-dom";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function MainCheckQuestion() {
  const db = useContext(FirestoreSdkContext);
  const {
    setLoading,
    listOfCourses,
    dataOfQuestionToReview,
    unreviewedQuestionData,
    setDataOfQuestionToReview,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { idQuestion } = useParams();

  const [resultOfQuestion, setResultOfQuestion] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [modalStateTextArea, setModalStateTextArea] = useState(false);
  // const [loadingSpinner, setLoadingSpinner] = useState(true);
  const [imgsLoaded, setImgsLoaded] = useState(true);

  const courseSelectedName = listOfCourses?.find(
    (c) => c.value === dataOfQuestionToReview?.course
  )?.name;

  const onRecoverDataOfQuestionSelected = (idQuestion) => {
    // eslint-disable-next-line array-callback-return
    unreviewedQuestionData.filter((question) => {
      if (question.uqid === idQuestion) {
        setDataOfQuestionToReview(question);
      }
    });
  };

  // let urls = [];
  // const recoveryURLS = async ({ dataOfQuestionToReview, resultOfQuestion }) => {
  // 	dataOfQuestionToReview?.urlOfImage &&
  // 		urls.push({ url: dataOfQuestionToReview?.urlOfImage.urlImage });
  // 	resultOfQuestion &&
  // 		resultOfQuestion[0]?.urlOfImage &&
  // 		resultOfQuestion[0]?.urlOfImage.urlImage !== null &&
  // 		urls.push({ url: resultOfQuestion[0]?.urlOfImage.urlImage });
  // 	console.log("urls", urls);
  // 	return urls;
  // };

  // const spaced = async ({ urls }) => {
  // 	if (urls.length !== 0) {
  // 		const loadImage = (image) => {
  // 			console.log("loadImg");
  // 			return new Promise((resolve, reject) => {
  // 				const loadImg = new Image();
  // 				loadImg.src = image.url;
  // 				// wait 2 seconds to simulate loading time
  // 				loadImg.onload = () =>
  // 					setTimeout(() => {
  // 						resolve(image.url);
  // 					}, 1000);

  // 				loadImg.onerror = (err) => reject(err);
  // 			});
  // 		};

  // 		Promise.all(urls.map((image) => loadImage(image)))
  // 			.then((e) => {
  // 				setImgsLoaded(!imgsLoaded);
  // 				// console.log("Images loaded", e);
  // 			})
  // 			.finally((e) => {
  // 				setLoadingSpinner(false);
  // 				console.log("Images loaded", e);
  // 			})

  // 			.catch((err) => {
  // 				console.log("Failed to load images", err);
  // 				setImgsLoaded(!imgsLoaded);
  // 			});
  // 	}
  // };

  const recoverAllDataOfQuestion = async ({ idQuestion }) => {
    if (!idQuestion && localStorage.getItem("idQuestion")) {
      navigate(`/question/${localStorage.getItem("idQuestion")}`);
    }
    idQuestion && localStorage.setItem("idQuestion", idQuestion);
    await onRecoverDataOfQuestionSelected(idQuestion);
    dataOfQuestionToReview &&
      (await searchSolutionQuestion({
        setLoading,
        db,
        uqid: dataOfQuestionToReview?.uqid,
        setResultOfQuestion,
      }));
    // await recoveryURLS({ dataOfQuestionToReview, resultOfQuestion });
    // await spaced({ urls });
  };

  useEffect(() => {
    recoverAllDataOfQuestion({ idQuestion });
  }, [idQuestion]);

  // useEffect(() => {}, [urls]);

  // setLoading({ state: true, text: "Cargando pergunta..." });
  return (
    <>
      <main>
        <WrapperAdmin>
          <div>
            <Title4>Revisión de preguntas</Title4>
          </div>
          <div>
            <Title5>Detalles de la pregunta</Title5>
            <div>
              <Title5>Metadatos</Title5>
              <TagsUnlist>
                <div>
                  {
                    //AGREGAR ESTA DE ERPORTADO
                    dataOfQuestionToReview?.isReported ? (
                      <Tag name="Reportado" type="report" />
                    ) : null
                  }
                </div>
                <div>
                  {dataOfQuestionToReview?.course ? (
                    <Tag name={courseSelectedName} type="course" />
                  ) : null}
                </div>
                <div>
                  {dataOfQuestionToReview?.university ? (
                    <Tag
                      name={dataOfQuestionToReview?.university}
                      type="university"
                    />
                  ) : null}
                </div>
              </TagsUnlist>
            </div>
            <div>
              <Title5>Pregunta</Title5>
            </div>
            <QuestionOutput
              question={dataOfQuestionToReview?.latexQuestion}
              keys={dataOfQuestionToReview?.keys.map((item) => item.key)}
              UrlOfImage={dataOfQuestionToReview?.urlOfImage.urlImage}
            />
            <div>
              <Title5>Resolución</Title5>
            </div>
            <QuestionInputContainer className="questionContainer">
              {resultOfQuestion?.length > 0 &&
              resultOfQuestion[0]?.justification ? (
                <Latex>{resultOfQuestion[0]?.justification}</Latex>
              ) : (
                <Text>No hay resolución</Text>
              )}
              <div>
                {console.log(resultOfQuestion)}
                {resultOfQuestion?.length > 0 &&
                resultOfQuestion[0]?.urlOfImage?.urlImage ? (
                  <img
                    className="questionImage"
                    src={resultOfQuestion[0]?.urlOfImage?.urlImage}
                    alt={"Image of solution"}
                  />
                ) : null}
              </div>
            </QuestionInputContainer>
            {dataOfQuestionToReview && (
              <TagContainer>
                <TagsUnlist>
                  <TagCheck
                    setModalState={setModalState}
                    modalState={modalState}
                    name={"ok"}
                    type={"ok"}
                  />
                  <TagCheck
                    setModalState={setModalState}
                    modalState={modalState}
                    type={"no"}
                    setModalStateTextArea={setModalStateTextArea}
                    modalStateTextArea={modalStateTextArea}
                  />
                </TagsUnlist>
              </TagContainer>
            )}
            <MainModalCheck
              title="¿Estas seguro que la pregunta es correcta?"
              subTopicId={dataOfQuestionToReview?.subTopicID}
              modalState={modalState}
              setModalState={setModalState}
              db={db}
              uqid={dataOfQuestionToReview?.uqid}
              navigate={navigate}
              setResultOfQuestion={setResultOfQuestion}
            />
            <MainModalComents
              modalStateTextArea={modalStateTextArea}
              setModalStateTextArea={setModalStateTextArea}
              title="Escriba su comentario sobre la pregunta"
              uqid={dataOfQuestionToReview?.uqid}
            />
          </div>
        </WrapperAdmin>
      </main>
      {/* <ClipLoader
				color={"#123abc"}
				loading={imgsLoaded}
				cssOverride={override}
				size={150}
				aria-label='Loading Spinner'
				data-testid='loader'
			/> */}
    </>
  );
}
