import React from 'react'
import { Title4, Title5 } from './../../styles/textGeneral'
import { WrapperAdmin } from './../../styles/generalStyles'

export default function MainHome() {
  return (
    <main>
      <WrapperAdmin>
        <div>
          <Title4>Hola Administrador</Title4>
        </div>
        <div>
          <Title5>Preguntas para revisar</Title5>
        </div>
      </WrapperAdmin>
    </main>
  )
}
