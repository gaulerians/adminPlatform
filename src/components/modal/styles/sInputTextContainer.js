import styled, { css } from 'styled-components';

export const InputTextContainer = styled.div`
  display: flex;
  align-items: center;
  
  textarea,
  input {
    flex: 1;
    outline: none;
    font-size: 1.2rem;
    padding: 0.5rem;
    border-radius: 0.8rem;
    background-color: #f5f5f5;
    color: #000;
    margin-bottom: 1.6rem;
    height: 10rem;
  }

  
  ${(props) => props.type === "textArea" && css`
    align-items: flex-start;

    label {
      margin: 10px 0 0 0;
    }

    svg {
      margin: 15px 0 0 15px;
    }
  `}
`;
