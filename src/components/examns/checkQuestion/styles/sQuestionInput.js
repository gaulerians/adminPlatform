import styled, { css } from 'styled-components';
import { Text } from './../../../../styles/textGeneral';

export const QuestionInputContainer = styled.li`
  margin: 0;
  padding: 0 0 20px 0;
  font-family: ${(props) => props.theme.textFont};
  border-bottom: 1px solid ${(props) => props.theme.gray100};

  &:last-child {
    border-bottom: none;
  }

  input {
    appearance: none;
    visibility: hidden;
    position: absolute;
    right: 0;
  }

  input[type='radio'] + label > .keyLetterQuestion,
  input[type='radio'] + label > .question {
    transition: all 0.2s;
  }

  input[type='radio'] + label {
    transition: all 0.2s;

    &:hover > .keyLetterQuestion,
    &:hover > .question {
      border: 1px solid ${(props) => props.theme.iris500};
    }
  }

  input[type='radio']:checked + label > .keyLetterQuestion {
    background: ${(props) => props.theme.iris500};
    border: 1px solid ${(props) => props.theme.iris500};
    color: ${(props) => props.theme.backgroundColor};
  }

  input[type='radio']:checked + label > .question {
    border: 1px solid ${(props) => props.theme.iris500};
  }

  .questionImage {
    width: 100%;
  }

  .questionContainer,
  label {
    display: flex;
    margin: 5px 0;
    align-items: flex-start;
    margin-left: 7px;
    margin-right: 7px;
  }

  .keyLetterQuestion,
  .question {
    border: 1px solid ${(props) => props.theme.iris300};
  }

  label {
    // cursor: pointer;
    width: 100vw;
  }

  .keyLetterQuestion {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 44px;
    background: ${(props) => props.theme.iris200};
  }

  .question {
    padding: 12px 10px;
    margin: 0 0 0 10px;
    border-radius: 8px;
    width: 100%;
  }

  img {
    margin: 10px 0;
    max-width: 300px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  ${(props) =>
    props.inputResults &&
    css`
      input[type='radio'] + label {
        &:hover > .keyLetterQuestion,
        &:hover > .question {
          border: 1px solid transparent;
        }
      }
    `}

  @media(min-width:768px) {
    .questionImage {
      width: auto;
    }
  }

  @media (min-width: 1200px) {
    margin: 0 0 35px 0;
    padding: 0 0 35px 0;

    .question {
      padding: 12px 15px;
    }
  }
`;

export const TextQuestionStyled = styled(Text)`
  font-weight: ${(props) => props.theme.weight.regular};
  padding: 0 0 10px 0;
  line-height: 1.55em;
`;

export const InputLabelResult = styled.label`
  cursor: default !important;

  button {
    font-size: 0.813em;
    font-weight: ${(props) => props.theme.weight.bold};
    display: block;
    margin: 10px 0 0 0;
    transition: all 0.2s;
    line-height: inherit;
    background: transparent;
    font-family: ${(props) => props.theme.textFont};
  }

  ${(props) =>
    props.stateQuestion === 'correct' &&
    css`
      button {
        color: ${(props) => props.theme.green500};

        &:hover {
          color: ${(props) => props.theme.green700};
        }
      }

      .keyLetterQuestion {
        color: ${(props) => props.theme.backgroundColor};
        background: ${(props) => props.theme.green500};
        border: 1px solid ${(props) => props.theme.green500};
      }

      .question {
        background: ${(props) => props.theme.green300};
        border: 1px solid ${(props) => props.theme.green300};
      }
    `}

  ${(props) =>
    props.stateQuestion === 'incorrect' &&
    css`
      button {
        color: ${(props) => props.theme.red500};

        &:hover {
          color: ${(props) => props.theme.red700};
        }
      }

      .keyLetterQuestion {
        color: ${(props) => props.theme.backgroundColor};
        background: ${(props) => props.theme.red500};
        border: 1px solid ${(props) => props.theme.red500};
      }

      .question {
        background: ${(props) => props.theme.red300};
        border: 1px solid ${(props) => props.theme.red300};
      }
    `}

  ${(props) =>
    props.stateQuestion === 'unaswered' &&
    css`
      button {
        color: ${(props) => props.theme.yellow500};

        &:hover {
          color: ${(props) => props.theme.yellow700};
        }
      }

      .keyLetterQuestion {
        color: ${(props) => props.theme.backgroundColor};
        background: ${(props) => props.theme.yellow500};
        border: 1px solid ${(props) => props.theme.yellow500};
      }

      .question {
        background: ${(props) => props.theme.yellow300};
        border: 1px solid ${(props) => props.theme.yellow300};
      }
    `}

  @media(min-width:1024px) {
    button {
      margin: 0 0 0 20px;
    }

    .question {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const InputQuestionModalStyled = styled.div`
  max-width: 800px;
  label {
    width: 100%;
    margin: 0;
  }

  .questionContainer {
    margin: 0 0 10px 0;
  }

  .question {
    margin: 0;
  }

  button {
    cursor: default;
  }
`;
