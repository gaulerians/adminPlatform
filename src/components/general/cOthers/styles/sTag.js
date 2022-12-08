import styled, { css } from "styled-components";

export const TagContainer = styled.div`
  padding: 7px 15px;
  font-family: ${(props) => props.theme.textFont};
  font-weight: ${(props) => props.theme.weight.medium};
  font-size: 0.875em;
  border-radius: 50px;
  width: max-content;
  cursor: default;

  ${(props) =>
    props.type == "report" &&
    css`
      background: ${(props) => props.theme.red300};
      color: ${(props) => props.theme.red500};
    `}

  ${(props) =>
    props.type === "university" &&
    css`
      background: #b9f1ee;
      color: #05322f;
    `}

  ${(props) =>
    (props.name === "Biología" || props.name === "biology") &&
    css`
      background: #bbf9b9;
      color: #083906;
    `}

    ${(props) =>
    props.name === "algebra" &&
    css`
      background: #bb4;
      color: #083906;
    `}

    ${(props) =>
    props.name === "Anatomía humana" &&
    css`
      background: #bb4;
      color: #083906;
    `}


      ${(props) =>
    props.name === "geometría" &&
    css`
      background: #bc3;
      color: #083906;
    `}

  ${(props) =>
    props.name === "Física" &&
    css`
      background: #f9e9b9;
      color: #5f3a00;
    `}
  ${(props) =>
    props.name === "Razonameinto " &&
    css`
      background: #f9b9b9;
      color: #5f0000;
    `}
  ${(props) =>
    props.name === "Química" &&
    css`
      background: #f9b9b9;
      color: #5f0000;
    `}
  ${(props) =>
    props.name === "Historia" &&
    css`
      background: #b9f1ee;
      color: #05322f;
    `}
  ${(props) =>
    props.name === "Historia del Perú" &&
    css`
      background: #b9f1ee;
      color: #05322f;
    `}

  ${(props) =>
    props.type == "course" &&
    css`
      background: #b9f1ee;
      color: #083906;
    `}

  .div {
    cursor: pointer;
    margin: 5px;
  }
`;
