import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../App";
import { useForm } from "react-hook-form";
import { Title4, Title5, Title6 } from "./../../styles/textGeneral";
import { Button } from "./../../styles/buttonGeneral";
import { ReactComponent as ImageFilesSVG } from "./../../icons/image-files.svg";
import { ReactComponent as VideoFilesSVG } from "./../../icons/play.svg";
import { ReactComponent as CloseImage } from "./../../icons/close.svg";
import { WrapperAdmin } from "./../../styles/generalStyles";
import { InputContainer, FormContainer } from "./../../styles/inputGeneral";
import { WrapperDuplex } from "./../../styles/boxesGeneral";
import { filterTopics } from "../examns/writeQuestion/functions";
import { recoveryDataSubTopics } from "../examns/writeQuestion/algorithms/recoveryDataSubtopics";
import { FirestoreSdkContext } from "reactfire";
import { ErrorText } from "../examns/writeQuestion/styles/sErrorText";
import {
  requeridValidator,
  textRequiredValidator,
} from "../examns/writeQuestion/validators/formValidators";
import { InputSvgContainer } from "../general/cOthers/styles/sInputSvg";

export default function MainUploadVideo() {
  const db = useContext(FirestoreSdkContext);
  const { listOfCourses, dataSubTopics, setDataSubTopics } =
    useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [courseSelected, setCourseSelected] = useState(null);
  const [topicSelected, setTopicSelected] = useState(null);
  const [subTopicSelected, setSubTopicSelected] = useState(null);
  const [topicsFilters, setTopicsFilters] = useState([]);
  const [localImage, setLocalImage] = useState(null);
  const [localVideo, setLocalVideo] = useState(null);

  const fileInputVideo = useRef(null);
  const fileInputImage = useRef(null);
  const refCloseImage = useRef(null);
  const refCloseVideo = useRef(null);

  const uploadVideoFile = (e) => {
    e.preventDefault();
    fileInputVideo.current.click();
    fileInputVideo.current.addEventListener("change", (ev) => {
      setLocalVideo(ev.target.files[0]);
    });
  };

  const uploadImageFile = (e) => {
    e.preventDefault();
    fileInputImage.current.click();
    fileInputImage.current.addEventListener("change", (ev) => {
      setLocalImage(ev.target.files[0]);
    });
  };

  const listOfCoursesNames = listOfCourses
    ?.map((course) => course.value)
    .sort((a, b) => a.localeCompare(b));
  const courseSelectedName = listOfCourses?.find(
    (c) => c.value === courseSelected
  )?.name;

  const onSubmit = (data) => {
    const dataGeneral = {
      title: data.title,
      description: data.description,
      course: courseSelectedName,
      topic: topicSelected,
      subTopic: subTopicSelected,
      image: localImage,
      video: localVideo,
    };
    console.log(dataGeneral);
  };

  useEffect(() => {
    filterTopics({
      courseSelectedName,
      dataSubTopics,
      setTopicsFilters,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSelected, dataSubTopics, setTopicsFilters]);

  useEffect(() => {
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
          <Title4>Subir videos</Title4>
        </div>
        <WrapperDuplex>
          <div>
            <div>
              <Title5>Subir videos a YouTube y Facebook</Title5>
            </div>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div>
                  <Title6>Detalles</Title6>
                </div>
                <div>
                  <InputContainer margin10B>
                    <label>Curso</label>
                    <div className="select">
                      <select
                        id="standard-select"
                        {...register("course", requeridValidator)}
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
                    {errors.course && (
                      <ErrorText>{errors.course.message}</ErrorText>
                    )}
                  </InputContainer>
                  <InputContainer margin10B>
                    <label>Tema</label>
                    <div className="select">
                      <select
                        id="standard-select"
                        defaultValue={topicSelected ?? ""}
                        {...register("topic", requeridValidator)}
                        onChange={(e) => setTopicSelected(e.target.value)}
                      >
                        <option>Seleccione tema</option>
                        {topicsFilters?.map((topic, index) => (
                          <option key={index} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </select>
                      <span className="focus"></span>
                    </div>
                    {errors.topic && (
                      <ErrorText>{errors.topic.message}</ErrorText>
                    )}
                  </InputContainer>
                  <InputContainer margin10B>
                    <label>Subtema</label>
                    <div className="select">
                      <select
                        id="standard-select"
                        {...register("subTopic", requeridValidator)}
                        defaultValue={
                          dataSubTopics.length > 0 ? dataSubTopics : undefined
                        }
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
                    {errors.subTopic && (
                      <ErrorText>{errors.subTopic.message}</ErrorText>
                    )}
                  </InputContainer>
                </div>
                <InputContainer margin10B>
                  <div>
                    <label>Titulo del video</label>
                  </div>
                  <input
                    name="title"
                    type={"text"}
                    {...register("title", textRequiredValidator)}
                  />
                  {errors.title && (
                    <ErrorText>{errors.title.message}</ErrorText>
                  )}
                </InputContainer>

                <InputContainer margin10B>
                  <div>
                    <label>Descripción (Explicito)</label>
                  </div>
                  <input
                    name="description"
                    type={"text"}
                    {...register("description", textRequiredValidator)}
                  />
                  {errors.description && (
                    <ErrorText>{errors.description.message}</ErrorText>
                  )}
                </InputContainer>
              </div>
              <div>
                <InputContainer margin10B>
                  <label>Imagen de miniatura</label>
                  <InputSvgContainer>
                    <Button
                      primary
                      iris
                      onClick={(e) => {
                        uploadImageFile(e);
                      }}
                    >
                      Seleccionar imagen
                    </Button>
                    <ImageFilesSVG onClick={uploadImageFile} />
                    <CloseImage
                      ref={refCloseImage}
                      style={{
                        display: localImage ? "block" : "none",
                      }}
                      onClick={() => setLocalImage(null)}
                    />
                  </InputSvgContainer>
                </InputContainer>
                <InputContainer margin10B>
                  <label>Archivo de video</label>
                  <InputSvgContainer>
                    <Button
                      primary
                      iris
                      onClick={(e) => {
                        uploadVideoFile(e);
                      }}
                    >
                      Seleccionar video
                    </Button>
                    <VideoFilesSVG onClick={uploadVideoFile} />
                    <CloseImage
                      ref={refCloseVideo}
                      style={{
                        display: localVideo ? "block" : "none",
                      }}
                      onClick={() => setLocalVideo(null)}
                    />
                  </InputSvgContainer>
                </InputContainer>
              </div>
              <Button primary inForm type={"submit"}>
                Subir video
              </Button>
            </FormContainer>
            {/* inputs type file for Button */}
            <input
              id={"inputFileImage"}
              type={"file"}
              ref={fileInputImage}
              style={{ display: "none" }}
              accept={"image/*"}
              required={true}
            />
            <input
              id={"inputFileVideo"}
              type={"file"}
              ref={fileInputVideo}
              style={{ display: "none" }}
              accept={"video/*"}
              required={true}
            />
          </div>
        </WrapperDuplex>
      </WrapperAdmin>
    </main>
  );
}
