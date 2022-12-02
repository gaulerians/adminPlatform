import styled, { css } from "styled-components";

export const TagContainerCheck = styled.div`
  padding: 12px 15px;
  font-family: ${(props) => props.theme.textFont};
  font-weight: ${(props) => props.theme.weight.medium};
  font-size: 0.875em;
  border-radius: 50px;
  cursor: default;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.type == "no" &&
    css`
      background: #f8d;
      color: #f80808;
    `}

  ${(props) =>
    props.type === "ok" &&
    css`
      background: #00ff00;
      color: #00ff00;
    `}


  .svg-icon {
    fill: #fff;
    width: 1.9em;
    height: 1.9em;
    transform: scale(1.5);
    cursor: pointer;
  }

  .div {
    cursor: pointer;
    margin: 5px;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`