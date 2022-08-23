import styled, { css } from 'styled-components';

export const TagContainer = styled.div`
  padding: 7px 15px;
  font-family: ${props => props.theme.textFont};
  font-weight: ${props => props.theme.weight.medium};
  font-size: 0.875em;
  border-radius: 50px;
  width: max-content;
  cursor: default;

  ${props => props.type == "report" && css`
    background: ${props => props.theme.red300};
    color: ${props => props.theme.red500};
  `}
  
  ${props => props.type == "university" && css`
    background: #B9F1EE;
    color: #05322F;
  `}

  ${props => props.name == "Biología" && css`
    background: #BBF9B9;
    color: #083906;
  `}
`;
