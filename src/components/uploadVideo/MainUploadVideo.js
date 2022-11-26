import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../../App";
import { useForm } from "react-hook-form";
import { Title4, Title5, Title6 } from "./../../styles/textGeneral";
import { Button } from "./../../styles/buttonGeneral";
import { WrapperAdmin } from "./../../styles/generalStyles";
import { InputContainer, FormContainer } from "./../../styles/inputGeneral";
import { WrapperDuplex } from "./../../styles/boxesGeneral";

export default function MainUploadVideo() {
  const { universities, dataSubTopics, setDataSubTopics } =
    useContext(AppContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const [courseSelected, setCourseSelected] = useState(null);
  const [topicSelected, setTopicSelected] = useState(null);
  const [topicsFilters, setTopicsFilters] = useState([]);

  const listOfCourses = [
    "Selecione curso",
    "chemistry",
    "biology",
    "physics",
    "mathematics",
    "geography",
    "history",
  ];

  const fileInputVideo = useRef(null);
  const fileInputImage = useRef(null);

  const uploadVideoFile = (e) => {
    console.log("seleccionando archivo de video");
    fileInputVideo.current.click();
    console.log(fileInputVideo.current.value);
  };

  const uploadImageFile = (e) => {
    console.log("seleccionando archivo de imagen");
    fileInputImage.current.click();
    console.log(fileInputImage.current.id);
  };

  const dataAfter = { title: "hola", description: "hola" };

  const onSubmit = (data) => {
    console.log(data);
  };

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
                <div >
                  <InputContainer margin10B>
                    <label>Curso</label>
                    <div className="select">
                      <select
                        id="standard-select"
                        {...register("course", { required: true })}
                        onChange={(e) =>
                          setCourseSelected(
                            e.target?.value ? e.target?.value : []
                          )
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
                  <InputContainer margin10B>
                    <label>Tema</label>
                    <div className="select">
                      <select
                        id="standard-select"
                        {...register("topic", { required: true })}
                        onChange={(e) => setTopicSelected(e.target.value)}
                      >
                        {topicsFilters?.map((topic, index) => (
                          <option key={index} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </select>
                      <span className="focus"></span>
                    </div>
                  </InputContainer>
                  <InputContainer margin10B>
                    <label>Subtema</label>
                    <div className="select">
                      <select
                        id="standard-select"
                        {...register("subtopic", { required: true })}
                      >
                        {dataSubTopics
                          ?.filter(
                            (st) =>
                              st.courses?.includes(courseSelected) &&
                              Object.values(st.topics).includes(
                                topicSelected
                              ) &&
                              st.title
                          )
                          .map((subtopic, index) => {
                            return (
                              <option key={index} value={subtopic.title}>
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
                  <label>Titulo del video</label>
                  <input
                    type={"text"}
                    {...register("title", { required: true })}
                  />
                </InputContainer>
                <InputContainer margin10B>
                  <label>Descripción (Explicito)</label>
                  <input
                    type={"text"}
                    {...register("description", { required: true })}
                  />
                </InputContainer>
              </div>
              <div>
                <InputContainer margin10B>
                  <label>Imagen de miniatura</label>
                  <Button
                    primary
                    iris
                    onClick={(e) => {
                      uploadImageFile(e);
                    }}
                  >
                    Seleccionar imagen
                  </Button>
                </InputContainer>
                <InputContainer margin10B>
                  <label>Archivo de video</label>
                  <Button
                    primary
                    onClick={(e) => {
                      uploadVideoFile(e);
                    }}
                  >
                    Seleccionar video
                  </Button>
                </InputContainer>
              </div>
              <Button secondary inForm type={"submit"}>
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
