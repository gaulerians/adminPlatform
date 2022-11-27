import styled,{ css }  from 'styled-components'

export const ErrorText = styled.p`
  font-size: 0.85em;
  line-height: 1.5em;
  font-weight: ${props => props.theme.weight.medium};
  color: ${props => props.theme.red500 };
  cursor: default;

  ${props => props.sizeH3 && css`
    font-size: 1.125em;
    line-height: 1.25em;
    `
  }

  ${props => props.paragraphLanding && css`
    margin: 15px 0 0 0;
  `}
`