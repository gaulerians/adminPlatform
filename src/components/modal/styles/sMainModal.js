import styled from 'styled-components';

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(29, 30, 34, 0.8);
  backdrop-filter: blur(5px);
  z-index: 4000;
`;

export const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`

export const ModalContainer = styled.div`
  min-height: 100px;
  background: ${props => props.theme.backgroundColor};
  position: fixed;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 8px;
  padding: 20px;
  overflow: auto;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: fit-content;
  height: fit-content;
  margin: auto;
  
  h1 {
    font-family: ${props => props.theme.titleFont};
    font-weight: ${props => props.theme.weight.semiBold};
    font-size: 1.325em;
    text-align: center;
    padding: 0 10%;
    margin: 10px 0 30px 0;
    line-height: 1.35em;
  }

  .closeModal {
    position: absolute;
    top: 10px;
    right: 15px;
    fill: ${props => props.theme.gray400};
    width: 20px;
    cursor: pointer;
    transition: .2s all;

    &:hover {
      fill: ${props => props.theme.textColor};
    }
  }

  .buttonsContent {
    display: flex;
    margin: 30px 0 0 0;
    gap: 20px;
  }

  @media(min-width:768px) {
    padding: 20px 60px 30px 60px;

    h1 {
      padding: 0;
      margin: 10px 0 30px 0;
    }

    .closeModal {
      top: 15px;
      right: 20px;
    }

    .buttonsContent {
      gap: 30px;
    }
  }
`;
