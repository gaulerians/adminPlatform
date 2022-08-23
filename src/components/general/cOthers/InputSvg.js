import React from 'react'
import { InputContainer } from '../../../styles/inputGeneral'
import { ReactComponent as ImageFilesSVG } from './../../../icons/image-files.svg'
import { InputSvgContainer } from './styles/sInputSvg'

export default function InputSvg({ heightTextArea, type, number, label }) {
  return (
    <InputContainer noMargin heightTextArea={heightTextArea}>
      {
        type == "textArea" ? (
          <>
            <label>{label}</label>
            <InputSvgContainer type={type}>
              <textarea />
              <ImageFilesSVG />
            </InputSvgContainer>
          </>
        ) : (
          <InputSvgContainer type={type}>
            <p>{number}</p>
            <input />
            <ImageFilesSVG />
          </InputSvgContainer>
        )
      }
    </InputContainer>
  )
}
