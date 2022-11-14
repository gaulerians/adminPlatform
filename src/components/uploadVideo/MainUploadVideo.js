import React from "react";
import { Title4, Title5, Title6 } from "./../../styles/textGeneral";
import { Button } from "./../../styles/buttonGeneral";
import { WrapperAdmin } from "./../../styles/generalStyles";
import { InputContainer, FormContainer } from "./../../styles/inputGeneral";
import { WrapperDuplex } from "./../../styles/boxesGeneral";

export default function MainUploadVideo() {
  const uploadVideoFile = (e) => {
    // logica para seleccionar archivo de video para subir
    console.log("seleccionando archivo de video");
  };

  const uploadImageFile = (e) => {
    // logica para seleccionar archivo de imagen para subir
    console.log("seleccionando archivo de imagen");
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
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div>
                <Title6>Detalles</Title6>
                <div>
                  <InputContainer margin10B>
                    <label>Titulo</label>
                    <input />
                  </InputContainer>
                  <InputContainer noMargin>
                    <label>Descripción (Explicito)</label>
                    <input />
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
                      onChange={(e) => {
                        console.log(e);
                      }}
                    >
                      Seleccionar video
                    </Button>
                  </InputContainer>
                </div>
                <Button secondary inForm>
                  Subir video
                </Button>
              </div>
            </FormContainer>
          </div>
        </WrapperDuplex>
      </WrapperAdmin>
    </main>
  );
}
