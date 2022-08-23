import styled, { css } from 'styled-components'

export const PrincipalTitle = styled.h1`
  font-family: ${props => props.theme.titleFont};
  color: ${props => props.theme.textColor};
  font-weight: ${props => props.theme.weight.bold};
  font-size: 2.563em;
  cursor: default;

  @media (orientation: landscape) {
    font-size: 2.55em;
  }
  
  @media(min-width:768px) {
    font-size: 3.25em;
  }

  @media(min-width:1200px) {
    font-size: 3.375em;
  }
`

export const SecondaryTitle = styled.h2`
  font-family: ${props => props.theme.textFont};
  color: ${props => props.theme.textColor};
  font-size: 1.00em;
  line-height: 1.50em;
  cursor: default;
  font-weight: ${props => props.theme.weight.regular};

  @media(min-width:768px) {
    font-size: 1.85em;
    line-height: 1.45em;
  }

  @media(min-width:1200px) {
    font-size: 1.25em;
    line-height: 1.563em;
  }
`

export const TertiaryTitle = styled.h3`
  font-family: ${props => props.theme.titleFont};
  color: ${props => props.theme.textColor};
  font-weight: ${props => props.theme.weight.bold};
  font-size: 1.85em;
  cursor: default;
  margin: 0 0 20px 0;
  line-height: 1.25em;

  @media(min-width:768px) {
    font-size: 2em;
  }

  @media(min-width:1200px) {
    font-size: 2.125em;
  }

  ${props => props.center && css`
    text-align: center;
  `}

  ${props => props.noMargin && css`
    margin: 0;
  `}
`;

export const Title2 = styled.h2`
  font-size: 1.563em;
  font-family:${props => props.theme.titleFont};
  font-weight: ${props => props.theme.weight.bold};
  padding: 46px 0 10px 0;
  line-height: 1.25em;
  cursor: default;

  @media(min-width:375px) {
    padding: 58px 0 12px 0;
  }
  
  @media(min-width:768px) {
    font-size: 1.763em;
    line-height: 1.55em;
  }

  @media(min-width:1200px) {
    font-size: 2.47em;
    padding: 85px 0 20px 0;
  }
`

export const Title3 = styled.h2`
  font-size: 0.938em;
  font-weight: ${props => props.theme.weight.semiBold};
  font-family: ${props => props.theme.titleFont};
  color: ${props => props.theme.iris500};
  padding: 15px 0 10px 0;
  cursor: default;
  line-height: 1.5em;

  @media(min-width:375px) {
    padding: 20px 0 12px 0;
  }

  @media(min-width:768px) {
    font-size: 0.948em;
  }

  @media(min-width:1200px) {
    font-size: 1.27em;
    line-height: 1.5em;
  }
`

export const Title4= styled.h2`
  font-size: 1.375em;
  font-weight: ${props => props.theme.weight.bold};
  font-family: ${props => props.theme.titleFont};
  color: ${props => props.theme.textColor};
  padding: 35px 0 15px 0;
  cursor: default;
  line-height: 1.5em;
  text-align: center;

  @media(min-width:1200px) {
    font-size: 1.563em;
  }
`

export const Title5 = styled.h3`
  font-size: 1.375em;
  font-weight: ${props => props.theme.weight.semiBold};
  font-family: ${props => props.theme.titleFont};
  color: ${props => props.theme.textColor};
  padding: 30px 0 15px 0;
  cursor: default;
  line-height: 1.5em;

  ${props => props.textBrand && css`
    color: ${props => props.theme.brandColor};
    font-size: 0.95em;
    font-weight: ${props => props.theme.weight.bold};
  `}
`

export const Title6 = styled.h3`
  font-size: 1.125em;
  font-weight: ${props => props.theme.weight.medium};
  font-family: ${props => props.theme.titleFont};
  color: ${props => props.theme.textColor};
  padding: 10px 0;
  cursor: default;
  line-height: 1.5em;
`

export const Text = styled.p`
  font-size: 0.938em;
  font-family: ${props => props.theme.textFont};
  line-height: 1.5em;
  font-weight: ${props => props.theme.weight.regular};
  cursor: default;

  ${props => props.center && css`
    text-align: center;
  `}

  ${props => props.centerD && css`
    @media(min-width:1200px) {
      text-align: center;
    }
  `}

  ${props => props.boldText && css`
    font-weight: ${props => props.theme.weight.bold};
    font-size: 1.938em;
  `}
  

  @media(min-width:768px) {
    font-size: 0.948em;
    line-height: 1.6em;

    ${props => props.boldText && css`
      font-weight: ${props => props.theme.weight.bold};
      font-size: 2.563em;
    `}
  }

  @media(min-width:1200px) {
    font-size: 1em;
    line-height: 1.5em;
    font-weight: ${props => props.theme.weight.regular};

    ${props => props.boldText && css`
      font-weight: ${props => props.theme.weight.bold};
      font-size: 2.563em;
    `}
  }
`

export const TextBody1 = styled.p`
  font-size: 1em;
  line-height: 1.313em;
  font-family: ${props => props.theme.textFont};
  font-weight: ${props => props.theme.weight.medium}; 
`

export const TextBody3 = styled.p`
  font-size: 0.938em;
  line-height: 1.313em;
  font-family: ${props => props.theme.textFont};
  font-weight: ${props => props.theme.weight.semiBold};
`

export const TextBody4 = styled.p`
  font-size: 0.938em;
  line-height: 1.313em;
  font-family: ${props => props.theme.textFont};
  font-weight: ${props => props.theme.weight.regular}; 
`

export const TextSubtitle2 = styled.p`
  font-size: 0.938em;
  line-height: 1.5em;
  font-family: ${props => props.theme.textFont};
  font-weight: ${props => props.theme.weight.semiBold}; 
`

export const TextSubtext1 = styled.p`
  font-size: 0.938em;
  line-height: 1.5em;
  font-family: ${props => props.theme.titleFont};
  font-weight: ${props => props.theme.weight.medium};

  @media(min-width:768px) {
    font-size: 0.978em;
  }
`

export const TextSubtext2 = styled.p`
  font-size: 0.875em;
  line-height: 1.125em;
  font-family: ${props => props.theme.titleFont};
  font-weight: ${props => props.theme.weight.medium};
`
