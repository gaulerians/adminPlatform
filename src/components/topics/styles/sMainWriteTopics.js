import styled, { css } from "styled-components";

export const InputTopicContainer = styled.div`
  display: flex;
  align-items: center;
  min-margin: 10px;

  input {
    flex: 1;
    margin: 0 0 10px 0;

  }

  p {
    font-weight: ${(props) => props.theme.weight.medium};
    // margin: 10px 10px 0 0;
  }

  input {
    margin: 0 0 10px 0;

    &:last-child {
      margin: 0;
    }
  }


  label {
    margin: 0 10px 0 0;
    border: 1px solid #ccc;
    padding: 5px;
    background-color: ${(props) => props.theme.gray200};
    boder-color: #000;
    border-left: 5px solid #000;
    border-right: none;
  }

`;
