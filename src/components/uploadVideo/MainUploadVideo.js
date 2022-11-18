import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Title4, Title5, Title6 } from "./../../styles/textGeneral";
import { Button } from "./../../styles/buttonGeneral";
import { WrapperAdmin } from "./../../styles/generalStyles";
import { InputContainer, FormContainer } from "./../../styles/inputGeneral";
import { WrapperDuplex } from "./../../styles/boxesGeneral";

export default function MainUploadVideo() {
  const { register, handleSubmit, watch, errors } = useForm();

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
            <FormContainer
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Title6>Detalles</Title6>
                <div>
                  <InputContainer margin10B>
                    <label>Titulo</label>
                    <input
                      type={"text"}
                      {...register("title", { required: true })}
                    />
                  </InputContainer>
                  <InputContainer noMargin>
                    <label>Descripción (Explicito)</label>
                    <input
                      type={"text"}
                      {...register("description", { required: true })}
                    />
                  </InputContainer>
                </div>
                <div>
                  <InputContainer noMargin>
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
                  <InputContainer noMargin>
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
              </div>
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
