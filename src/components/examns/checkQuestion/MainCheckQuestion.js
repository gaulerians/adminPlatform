import React from 'react'
import { Title4, Title5, Title6 } from './../../../styles/textGeneral'
import { WrapperAdmin } from './../../../styles/generalStyles'
import Tag from './../../general/cOthers/Tag'
import { TagsUnlist } from './../../../styles/boxesGeneral'

export default function MainCheckQuestion() {
  return (
    <main>
      <WrapperAdmin>
        <div>
          <Title4>Revisión de preguntas</Title4>
        </div>
        <div>
          <Title5>Detalles de la pregunta</Title5>
          <div>
            <Title6>Metadatos</Title6>
            <TagsUnlist>
              <Tag name="Reportado" type="report" />
              <Tag name="Biología" type="course" />
              <Tag name="USNCH" type="university" />
              <Tag name="UNI" type="university" />
            </TagsUnlist>
          </div>
          <div>
            <Title6>Pregunta</Title6>
          </div>
          <div>
            <Title6>Resolución</Title6>
          </div>
        </div>
      </WrapperAdmin>
    </main>
  )
}
