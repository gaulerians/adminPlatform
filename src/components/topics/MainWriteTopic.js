import React, { useContext, useState, useEffect } from "react";
import { Text, Title4, Title5, Title6 } from "../../styles/textGeneral";
import { WrapperAdmin } from "../../styles/generalStyles";
import { FormContainer, InputContainer } from "../../styles/inputGeneral";
import { useForm } from "react-hook-form";
import { AppContext } from "../../App";
import { FirestoreSdkContext } from "reactfire";
import Tag from "../general/cOthers/Tag";
import { InputTextTopic } from "./InputTextTopic";
import { WrapperDuplex } from "../../styles/boxesGeneral";
import { Button } from "../../styles/buttonGeneral";
// import {
//   textValidator,
//   urlVideoFacebookValidatorR,
//   urlVideoYoutubeValidatorR,
// } from '../examns/writeQuestion/validators/formValidators';
import {
  // addDataSubVideos,
  // deleteDataSubVideos,
  resetStates as resetStatesOfAdd,
  resetStates as resetStatesOfEdit,
  // updateTitleOfURLVideos,
} from "./algorithms/generalFunctionsWriteTopic";
import { sendDataOfSubTopic } from "./algorithms/sendDataToCreateSubTopic";
import {
  filterTopics,
  onChangeStateModal,
} from "../examns/writeQuestion/functions";
import { MainModalUpload } from "../modal/MainModalUpload";
// import { enviarTopics } from "./algorithms/enviarTopics";
// import { ErrorText } from '../examns/writeQuestion/styles/sErrorText';
import { v4 as uuidv4 } from "uuid";
import { ToggleSwitch } from "../general/cOthers/ToggleSwitch";
import { recoveryDataSubTopics } from "../examns/writeQuestion/algorithms/recoveryDataSubtopics";
import { serverTimestamp } from "firebase/firestore";
import { updateDataSubTopic } from "./algorithms/updateDataSubTopic";

export default function MainWriteTopic() {
  const {
    listOfCourses,
    dataOfUser,
    setLoading,
    dataSubTopics,
    setDataSubTopics,
  } = useContext(AppContext);
  // const uuid = uuidv4();
  const db = useContext(FirestoreSdkContext);
  //Estados de creacion de subtopicos
  const [coursesSelected, setCoursesSelected] = useState([]);
  const [urlsSuTopic, setUrlsSuTopic] = useState({
    urlFacebook: "",
    urlYoutube: "",
  });
  const [textSubTopic, setTextSubTopic] = useState("");
  const [localTopics, setLocalTopics] = useState({});
  const [modalState, setModalState] = useState(false);
  const [toggleSwitchStatus, setToggleSwitchStatus] = useState(true);
  const [dataSubVideos, setDataSubVideos] = useState([]);

  //Estados de edicion de subtopicos
  const [courseSelected, setCourseSelected] = useState(null);
  const [topicSelected, setTopicSelected] = useState(null);
  const [topicsFilters, setTopicsFilters] = useState([]);
  const [subTopicSelected, setSubTopicSelected] = useState(null);
  const [dataSubTopicSelected, setDataSubTopicSelected] = useState(null);
  const [dataText, setDataText] = useState({
    textTopic: "",
    textSubTopic: "",
  });
  //estados de doble uso
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultVaules: {
      urlYoutubeSubTopic: dataSubTopicSelected?.urlOfVideo?.youtube ?? "",
      urlFacebookSubTopic: dataSubTopicSelected?.urlOfVideo?.facebook ?? "",
    },
  });

  const onTagDeleteU = (tagName) => {
    setCoursesSelected([...coursesSelected].filter((u) => u !== tagName));
    const listedTopics = { ...localTopics };
    delete listedTopics[tagName];
    setLocalTopics(listedTopics);
  };

  const listOfCoursesNames = listOfCourses
    ?.map((course) => course.value)
    .sort((a, b) => a.localeCompare(b));

  const courseSelectedName = listOfCourses?.find(
    (c) => c.value === courseSelected
  )?.name;

  const onSubmit = (data) => {
    const dataSubVideosWithoutId = dataSubVideos.map((obj) => {
      const { id, ...rest } = obj;
      return rest;
    });
    // TODO: Uncomment when need url social video
    // const { urlFacebookSubTopic, urlYoutubeSubTopic } = data;

    const dataToCreate = {
      subTopicId: "",
      dataOfTheCreator: {
        uid: dataOfUser.uid,
        date: serverTimestamp(),
      },
      courses: coursesSelected,
      title: textSubTopic,
      topics: localTopics,
      // urlOfVideo: {
      //   youtube: urlYoutubeSubTopic,
      //   facebook: urlFacebookSubTopic,
      // },
      subVideos: dataSubVideosWithoutId,
    };

    const dataForUpdate = {
      publishersData: {
        idAuthor: dataOfUser?.uid,
        date: serverTimestamp(),
      },
      // urlOfVideo: {
      //   youtube: urlsSuTopic?.urlYoutube,
      //   facebook: urlsSuTopic?.urlFacebook,
      // },
      subVideos: dataSubVideosWithoutId,
      title: dataText?.textSubTopic,
      topics: {
        ...dataSubTopicSelected?.topics,
        [courseSelectedName]: dataText?.textTopic,
      },
    };
    if (subTopicSelected) {
      //se envia siempre que se este editando un subtopic
      console.log(dataForUpdate);
      updateDataSubTopic({
        db,
        dataForUpdate,
        subTopicId: subTopicSelected,
        setLoading,
      });
    } else {
      //se envia siempre que se este creando un subtopic
      console.log(dataToCreate);
      sendDataOfSubTopic({
        db,
        setLoading,
        dataToCreate,
      });
    }
  };

  //LLAMADA DE FUNCION PARA SUBIR CON JSON

  // const dataJson = require("../../utils/topics.json");
  // const enviandoData = () => {
  //   dataJson.map((topic, index) => {
  //     const dataPrev = {
  //       subVideos: {
  //         youtube: [""],
  //         facebook: [""],
  //       },
  //       courses: ["physics"],
  //       title: topic.suTopic,
  //       topics: { physics: topic.topic },
  //     };
  //     enviarTopics({
  //       db,
  //       dataPrev,
  //       dataOfUser,
  //       index,
  //     });
  //   });
  // };

  useEffect(() => {
    if (subTopicSelected) {
      let subVideos = [];
      dataSubTopics.map((obj) => {
        if (obj.subTopicId === subTopicSelected) {
          obj.subVideos.map((subVideo) => {
            const id = uuidv4();
            subVideos.push({ ...subVideo, id });
          });
          setDataSubTopicSelected(obj);
          setDataText({
            textTopic: obj.topics[courseSelectedName],
            textSubTopic: obj.title,
          });
          setUrlsSuTopic({
            urlFacebook: obj.urlOfVideo.facebook,
            urlYoutube: obj.urlOfVideo.youtube,
          });
        }
      });
      setDataSubVideos(subVideos);
    }
  }, [subTopicSelected]);

  useEffect(() => {
    resetStatesOfEdit({
      setUrlsSuTopic,
      setTopicSelected,
      setTopicsFilters,
      setSubTopicSelected,
      setDataSubTopicSelected,
      setDataSubVideos,
      setTextSubTopic,
      setLocalTopics,
      setCoursesSelected,
      setDataText,
    });
  }, [toggleSwitchStatus]);

  useEffect(() => {
    filterTopics({
      courseSelectedName,
      dataSubTopics,
      setTopicsFilters,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSelected, dataSubTopics, setTopicsFilters]);

  useEffect(() => {
    if (coursesSelected.length === 0) {
      resetStatesOfAdd({
        setUrlsSuTopic,
        setTextSubTopic,
        setLocalTopics,
      });
    }
  }, [coursesSelected]);

  useEffect(() => {
    resetStatesOfEdit({
      setUrlsSuTopic,
      setTopicSelected,
      setTopicsFilters,
      setSubTopicSelected,
      setDataSubTopicSelected,
      setDataSubVideos,
      setDataText,
    });
    recoveryDataSubTopics({
      db,
      dataSubTopics,
      setDataSubTopics,
      courseSelectedName,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSelected]);
  return (
    <main>
      <WrapperAdmin>
        <div>
          <Title4>{`Hola  ${dataOfUser?.username}`}</Title4>
        </div>
        <Title5>Selecciona una opción</Title5>
        <InputContainer>
          <ToggleSwitch
            textLeft={"Crear un nuevo tema"}
            textRight={"Editar un tema"}
            toggleSwitchStatus={toggleSwitchStatus}
            setToggleSwitchStatus={setToggleSwitchStatus}
          />
        </InputContainer>
        <FormContainer
          onSubmit={(e) => [
            e.preventDefault(),
            onChangeStateModal({ setModalState, modalState }),
          ]}
        >
          <div>
            {toggleSwitchStatus ? (
              <>
                <Title5>Agregar temas o sub-temas a los cursos</Title5>
                <div className="inputContainerChip">
                  <InputContainer margin10B>
                    <label>Curso *</label>
                    <div className="select">
                      <select
                        name="courses"
                        id="standard-select"
                        {...register("courses")}
                        onChange={(e) =>
                          e.target.selectedIndex !== 0
                            ? setCoursesSelected([
                                ...new Set([
                                  ...coursesSelected,
                                  listOfCourses?.find(
                                    (c) => c.value === e.target.value
                                  )?.name,
                                ]),
                              ])
                            : undefined
                        }
                      >
                        <option>Seleccione el curso</option>
                        {listOfCoursesNames?.map((courses, index) => (
                          <option key={index} value={courses}>
                            {courses}
                          </option>
                        ))}
                      </select>
                      <span className="focus"></span>
                    </div>
                  </InputContainer>
                  {coursesSelected.map((chip, index) => (
                    <Tag
                      key={index}
                      name={chip}
                      type="course"
                      onDelete={onTagDeleteU}
                    />
                  ))}
                </div>

                <InputContainer>
                  <label>Temas *</label>
                  <div>
                    {coursesSelected.length > 0 ? (
                      coursesSelected?.map((course, index) => (
                        <InputTextTopic
                          type="topic"
                          key={index}
                          defaultValue={localTopics[course]}
                          nameCurse={course}
                          localTopic={localTopics?.[course]}
                          setLocalTopics={setLocalTopics}
                        />
                      ))
                    ) : (
                      <Text>Seleccione algun curso</Text>
                    )}
                  </div>
                </InputContainer>
                <InputContainer>
                  <label>Sub - Tema *</label>
                  {coursesSelected.length > 0 ? (
                    <InputTextTopic
                      textSubTopic={textSubTopic}
                      setTextSubTopic={setTextSubTopic}
                    />
                  ) : (
                    <Text>Seleccione algun curso</Text>
                  )}
                </InputContainer>
              </>
            ) : null}
          </div>
          <div>
            {!toggleSwitchStatus ? (
              <>
                <Title5>Seleccionar curso, tema y sub tema a editar:</Title5>
                <div className="inputContainerQuad">
                  <InputContainer margin10B>
                    <label>Curso: </label>
                    <div className="select">
                      <select
                        name="course"
                        id="standard-select"
                        defaultValue={courseSelected ?? ""}
                        onChange={(e) =>
                          setCourseSelected(
                            e.target?.value ? e.target?.value : []
                          )
                        }
                      >
                        <option>Seleccione curso</option>
                        {listOfCoursesNames?.map((courses, index) => (
                          <option key={index} value={courses}>
                            {courses}
                          </option>
                        ))}
                      </select>
                      <span className="focus"></span>
                    </div>
                  </InputContainer>
                  <InputContainer noMargin>
                    <label>Tema *</label>
                    <div className="select">
                      <select
                        name="topic"
                        id="standard-select"
                        defaultValue={topicSelected ?? ""}
                        onChange={(e) => setTopicSelected(e.target.value)}
                      >
                        <option>Seleccione tema</option>
                        {topicsFilters
                          ?.reduce((acc, topic) => {
                            if (!acc.includes(topic)) {
                              acc.push(topic);
                            }
                            return acc;
                          }, [])
                          .map((topic, index) => (
                            <option key={index} value={topic}>
                              {topic}
                            </option>
                          ))}
                      </select>
                      <span className="focus"></span>
                    </div>
                  </InputContainer>
                  <InputContainer noMargin>
                    <label>Sub - tema * </label>
                    <div className="select">
                      <select
                        name="subTopic"
                        id="standard-select"
                        onChange={(e) =>
                          setSubTopicSelected(e.target.selectedOptions[0].id)
                        }
                      >
                        <option>Seleccione Subtema</option>
                        {dataSubTopics
                          ?.filter(
                            (st) =>
                              st.courses?.includes(courseSelectedName) &&
                              Object.values(st.topics).includes(
                                topicSelected
                              ) &&
                              st.title
                          )
                          .map((subtopic, index) => {
                            return (
                              <option
                                key={index}
                                value={subtopic.title}
                                id={subtopic.subTopicId}
                              >
                                {subtopic.title}
                              </option>
                            );
                          })}
                      </select>
                      <span className="focus"></span>
                    </div>
                  </InputContainer>
                </div>
                <InputContainer margin10B>
                  <label>Tema: </label>
                  <input
                    type={"text"}
                    required={true}
                    name="topicTextEdit"
                    value={dataText?.textTopic ?? ""}
                    onChange={(e) =>
                      setDataText((prev) => ({
                        ...prev,
                        textTopic: e.target.value,
                      }))
                    }
                  />
                </InputContainer>
                <InputContainer margin10B>
                  <label>Sub tema: </label>
                  <input
                    type={"text"}
                    required={true}
                    name="subTopicTextEdit"
                    value={dataText?.textSubTopic ?? ""}
                    onChange={(e) =>
                      setDataText((prev) => ({
                        ...prev,
                        textSubTopic: e.target.value,
                      }))
                    }
                  />
                </InputContainer>
              </>
            ) : null}
          </div>
          <div>
            <WrapperDuplex>
              {/* <InputContainer margin10B>
                <label>URL de facebook:</label>
                <input
                  type={'text'}
                  name="urlFacebookSubTopic"
                  required={true}
                  value={urlsSuTopic?.urlFacebook ?? ''}
                  {...register(
                    'urlFacebookSubTopic',
                    //TODO: agregar validacion
                    // urlVideoFacebookValidatorR
                  )}
                  onChange={(e) => {
                    setUrlsSuTopic({
                      ...urlsSuTopic,
                      urlFacebook: e.target.value,
                    });
                  }}
                />
                {errors.urlFacebookSubTopic && (
                  <ErrorText>{errors.urlFacebookSubTopic.message}</ErrorText>
                )}
              </InputContainer> */}
              {/* <InputContainer margin10B>
                <label>URL de youtube:</label>
                <input
                  type={'text'}
                  required={true}
                  name="urlYoutubeSubTopic"
                  value={urlsSuTopic?.urlYoutube ?? ''}
                  {...register(
                    'urlYoutubeSubTopic',
                    //TODO: agregar validacion
                    // urlVideoYoutubeValidatorR
                  )}
                  onChange={(e) => {
                    setUrlsSuTopic({
                      ...urlsSuTopic,
                      urlYoutube: e.target.value,
                    });
                  }}
                />
                {errors.urlYoutubeSubTopic && (
                  <ErrorText>{errors.urlYoutubeSubTopic.message}</ErrorText>
                )}
              </InputContainer> */}
            </WrapperDuplex>
          </div>
          <div>{/* <Title6>Sub - videos:</Title6> */}</div>
          <WrapperDuplex>
            {/* <InputContainer margin10B>
              {dataSubVideos.length > 0 ? (
                dataSubVideos?.map((obj, index) => (
                  <>
                    <InputContainer>
                      <label>Titulo:</label>
                      <input
                        placeholder="Escribe el titulo"
                        defaultValue={obj.title}
                        name={`title${obj.id}`}
                        {...register(`title${obj.id}`, textValidator)}
                        onChange={(event) =>
                          updateTitleOfURLVideos({
                            dataSubVideos,
                            setDataSubVideos,
                            event,
                            id: obj.id,
                            type: 'title',
                          })
                        }
                      />
                      {errors[`title${obj.id}`] && (
                        <ErrorText>{errors[`title${obj.id}`].message}</ErrorText>
                      )}
                    </InputContainer>
                    <InputContainer className="containerInputsURL">
                      <label>URL de Facebook:</label>
                      <input
                        placeholder="URL de facebook"
                        name={`facebook${obj.id}`}
                        value={obj.facebook}
                        {...register(`facebook${obj.id}`, urlVideoFacebookValidatorR)}
                        onChange={(event) =>
                          updateTitleOfURLVideos({
                            dataSubVideos,
                            setDataSubVideos,
                            event,
                            id: obj.id,
                            type: 'urlFacebook',
                          })
                        }
                      />
                      {errors[`facebook${obj.id}`] && (
                        <ErrorText>{errors[`facebook${obj.id}`].message}</ErrorText>
                      )}
                    </InputContainer>
                    <InputContainer className="containerInputsURL">
                      <label>URL de Youtube:</label>
                      <input
                        placeholder="URL de youtube"
                        value={obj.youtube}
                        name={`youtube${obj.id}`}
                        {...register(`youtube${obj.id}`, urlVideoYoutubeValidatorR)}
                        onChange={(event) =>
                          updateTitleOfURLVideos({
                            dataSubVideos,
                            setDataSubVideos,
                            event,
                            id: obj.id,
                            type: 'urlYoutube',
                          })
                        }
                      />
                      {errors[`youtube${obj.id}`] && (
                        <ErrorText>{errors[`youtube${obj.id}`].message}</ErrorText>
                      )}
                    </InputContainer>
                    <Button
                      key={index}
                      small
                      iris
                      onClick={(event) =>
                        deleteDataSubVideos({
                          event,
                          dataSubVideos,
                          setDataSubVideos,
                          uuidObj: obj.id,
                        })
                      }
                    >
                      Borrar
                    </Button>
                  </>
                ))
              ) : (
                <Text>Click en el boton agregar para insertar sub-video</Text>
              )}
            </InputContainer> */}
            <InputContainer>
              <div className="containerBottons">
                {/* <Button
                  small
                  iris
                  onClick={(event) =>
                    addDataSubVideos({
                      event,
                      dataSubVideos,
                      setDataSubVideos,
                      uuidObj: uuid,
                    })
                  }
                >
                  Agregar
                </Button> */}
              </div>
            </InputContainer>
          </WrapperDuplex>
          <WrapperDuplex>
            {coursesSelected.length > 0 || subTopicSelected ? (
              <Button primary formEnd type="submit">
                Guardar
              </Button>
            ) : null}
          </WrapperDuplex>
        </FormContainer>
        {/* Boton para agregar subtema con json */}
        {/* <button style={{
          position: "absolute",
          top: "0",
          right: "0",
          padding: "10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          cursor: "pointer"

        }} onClick={()=> enviandoData()}>Subir datos de subtemas</button> */}
        <MainModalUpload
          db={db}
          modalState={modalState}
          setModalState={setModalState}
          title="¿Está seguro que desea guardar?"
          functionUpload={handleSubmit(onSubmit)}
        />
      </WrapperAdmin>
    </main>
  );
}
