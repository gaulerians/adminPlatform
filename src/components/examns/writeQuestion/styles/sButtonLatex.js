import styled, { css } from "styled-components";

export const ButtonLatex = styled.button`
  border-radius: 4px;
  border: none;
  margin: 0 auto;
  cursor: pointer;
  outline: none;
  font-weight: ${(props) => props.theme.weight.semiBold};
  width: 100%;
  font-family: ${(props) => props.theme.fontTitle};
  height: 44px;
  font-size: 1.035em;
  transition: 0.2s;
  will-change: transform;

  ${(props) =>
    props.primary &&
    props.className == "largeButton" &&
    css`
      background: transparent;
      color: ${(props) => props.theme.textColor};
      text-transform: initial;
      border: 1px solid ${(props) => props.theme.textColor};
      height: 34px;
      width: auto;
      padding: 0 20px;
      font-size: 0.938em;

      &:hover {
        background: ${(props) => props.theme.gray0Color};
      }

      @media (min-width: 768px) {
        height: auto !important;
        padding: 5px auto !important;
      }
    `}

  ${(props) =>
    props.secundary &&
    props.className == "smallButton" &&
    css`
      background: transparent;
      color: ${(props) => props.theme.brandColor};
      text-transform: initial;
      height: initial !important;

      &:hover {
        color: ${(props) => props.theme.hoverBrand};
      }
      @media (min-width: 768px) {
        height: auto !important;
        padding: 5px 12px !important;
      }
    `}
  
  

  ${(props) =>
    props.iris &&
    css`
      background: ${(props) => props.theme.iris100};
      color: ${(props) => props.theme.iris500};

      &:hover {
        background: ${(props) => props.theme.iris200};
      }
    `}


  ${(props) =>
    props.small &&
    css`
      height: 32px;
      padding: 5px 20px;
      font-size: 0.938em;
    `}


  ${(props) =>
    props.inForm &&
    css`
      margin: 10px 5px;
    `}

  ${(props) =>
    props.className == "smallButton" &&
    css`
      background: transparent;
      color: ${(props) => props.theme.brandColor};
      font-size: 0.9em;
      text-transform: initial;
      height: initial !important;
      height: auto !important;
      width: auto !important;
      border: 1px solid ${(props) => props.theme.brandColor};

      &:hover {
        color: ${(props) => props.theme.hoverBrand};
      }
    `}

  ${(props) =>
    props.className == "largeButton" &&
    css`
      background: transparent;
      color: ${(props) => props.theme.brandColor};
      font-size: 0.9em;
      text-transform: initial;
      height: initial !important;
      height: auto !important;
      width: auto !important;
      border: 1px solid ${(props) => props.theme.brandColor};

      &:hover {
        color: ${(props) => props.theme.hoverBrand};
      }
    `}
`;
