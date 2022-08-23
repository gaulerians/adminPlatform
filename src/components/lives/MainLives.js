import React from 'react'
import { Title4, Title5, Title6 } from './../../styles/textGeneral'
import { Button } from './../../styles/buttonGeneral'
import { WrapperAdmin } from './../../styles/generalStyles'
import { InputContainer, FormContainer } from './../../styles/inputGeneral'
import { WrapperDuplex } from './../../styles/boxesGeneral'

export default function MainALives() {
  return (
    <main>
      <WrapperAdmin>
        <div>
          <Title4>En vivo</Title4>
        </div>
        <WrapperDuplex>
          <div>
            <div>
              <Title5>Transión en vivo</Title5>
            </div>
            <FormContainer>
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
                <Button secondary inForm>Cargar miniatura</Button>
              </div>
              <div>
                <Title6>Enlace</Title6>
                <div>
                  <InputContainer margin10B>
                    <label>Link de YouTube</label>
                    <input />
                  </InputContainer>
                  <InputContainer noMargin>
                    <label>Link de Facebook</label>
                    <input />
                  </InputContainer>
                </div>
                <Button primary formEnd>Iniciar transmisión</Button>
              </div>
            </FormContainer>
          </div>
        </WrapperDuplex>
      </WrapperAdmin>
    </main>
  )
}
