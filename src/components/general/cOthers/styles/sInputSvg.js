import styled, { css } from 'styled-components';

export const InputSvgContainer = styled.div`
  display: flex;
  align-items: center;
  
  textarea,
  input {
    flex: 1;
  }

  p {
    font-weight: ${props => props.theme.weight.medium};
    margin: 0 10px 0 0;
  }

  input {
    margin: 0 0 10px 0;

    &:last-child {
      margin: 0;
    }
  }

  svg {
    margin: 0 0 0 15px;
    fill: ${props => props.theme.textColor};
    cursor: pointer;
    transition: all .2s;

    &:hover {
      fill: ${props => props.theme.brandColor};
    }
  }
  
  ${(props) => props.type == "textArea" && css`
    align-items: flex-start;

    label {
      margin: 10px 0 0 0;
    }

    svg {
      margin: 15px 0 0 15px;
    }
  `}
`;
