import styled, { keyframes } from 'styled-components'

const cercles = keyframes`
  0% { transform: rotate(20deg) }
  100% { transform: rotate(360deg) }
`

const fade = keyframes`
  0% { opacity: 0; transform: scale(0) }
  100% { opacity: 1; transform: scale(1) }
`

export const MainSpinnerContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 5000;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  .spinnerDescription {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    animation-name: ${fade};
    animation-duration: .4s;
    animation-timing-function: ease-out;
  }

  svg {
    height: 40px;
    animation-name: ${cercles};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.1, 0.5, 0.8 0.1);
  }

  p {
    font-family: 'Montserrat';
    margin: 20px 20px 0 20px;
    text-align: center;
  }
`
