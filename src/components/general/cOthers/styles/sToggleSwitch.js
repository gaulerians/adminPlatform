import styled, { css } from "styled-components";

export const ToggleSwitchInput = styled.label`
  position: relative;
  display: inline-block;
  width: 65px;
  height: 34px;
  cursor: pointer;

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: green;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(30px);
    -ms-transform: translateX(30px);
    transform: translateX(30px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

export const ToggleSwitchContainer = styled.div`
  display: flex;
  // flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;

  label {
    font-size: 1.1rem;
    font-weight: 400;
    color: ${(props) => props.theme.textColor};
    font-family: ${(props) => props.theme.fontFamily};
  }

  ${(props) =>
    props.margin10B &&
    css`
      margin: 0 0 10px 0;
    `}
`;
