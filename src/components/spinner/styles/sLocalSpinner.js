import styled, { keyframes } from 'styled-components';

const SkChase = keyframes`
  100% { transform: rotate(360deg); } 
`

const SkChaseDot = keyframes`
  80%, 100% { transform: rotate(360deg); } 
`

const SkChaseDotBefore = keyframes`
  50% {
    transform: scale(0.4); 
  } 100%, 0% {
    transform: scale(1.0); 
  } 
`

export const LocalSpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10% 0;

  .sk-chase {
    width: 40px;
    height: 40px;
    position: relative;
    animation: ${SkChase} 2.5s infinite linear both;
  }

  .sk-chase-dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0; 
    animation: ${SkChaseDot} 2.0s infinite ease-in-out both; 
  }

  .sk-chase-dot:before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: ${props => props.theme.brandColor};
    border-radius: 100%;
    animation: ${SkChaseDotBefore} 2.0s infinite ease-in-out both; 
  }

  .sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
  .sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
  .sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
  .sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
  .sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
  .sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
  .sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
  .sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
  .sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
  .sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
  .sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
  .sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

  p {
    margin: 10px 0 0 0;
    text-align: center;
  }
`;
