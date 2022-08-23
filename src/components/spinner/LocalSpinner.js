import React from 'react'
import { LocalSpinnerContainer } from './styles/sLocalSpinner'

export default function LocalSpinner({ title }) {
  return (
    <LocalSpinnerContainer>
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
      {
        title && <p>{title}</p>
      }
    </LocalSpinnerContainer>
  )
}
