import styled, { css } from 'styled-components'

export const Button = styled.button`
  border-radius: 4px;
  border: none;
  margin: 0 auto;
  cursor: pointer;
  outline: none;
  font-weight: ${props => props.theme.weight.semiBold};
  width: 100%;
  font-family: ${props => props.theme.fontTitle};
  height: 44px;
  font-size: 1.035em;
  transition: .2s;
  will-change: transform;

  ${props => props.primary && css`
    background: ${props => props.theme.brandColor};
    color: ${props => props.theme.backgroundColor};

    &:hover {
      background: ${props => props.theme.hoverBrand};
    }
  `}

  ${props => props.secondary && css`
    background: transparent;
    color: ${props => props.theme.textColor};
    border: 1px solid ${props => props.theme.textColor};

    &:hover {
      background: ${props => props.theme.gray100};
    }
  `}

  ${props => props.tertiary && css`
    background: transparent;
    color: ${props => props.theme.brandColor};
    text-transform: initial;
    height: initial !important;

    &:hover {
      color: ${props => props.theme.hoverBrand};
    }
  `}

  ${props => props.quaternary && css`
    background: transparent;
    color: ${props => props.theme.textColor};
    text-transform: initial;
    border: 1px solid ${props => props.theme.textColor};
    height: 34px;
    width: auto;
    padding: 0 20px;
    font-size: 0.938em;

    &:hover {
      background: ${props => props.theme.gray0Color};
    }

    @media(min-width:768px) {
      height: 40px !important;
      padding: 0 20px !important;
    }
  `}

  ${props => props.fifth && css`
    background: #EBEBFA;
    color: ${props => props.theme.irisColor};
    text-transform: initial;
    height: 34px;
    width: auto;
    padding: 0 20px;
    font-size: 0.938em;

    &:hover {
      background: #d9d9f5;
    }

    @media(min-width:768px) {
      height: 40px !important;
      padding: 0 20px !important;
    }
  `}

  ${props => props.iris && css`
    background: ${props => props.theme.iris100};
    color: ${props => props.theme.iris500};

    &:hover {
      background: ${props => props.theme.iris200};
    }
  `}


  ${props => props.whatsApp && css`
    background: #128C7E;
    color: ${props => props.theme.backgroundColor};

    &:hover {
      background: #075E54;
    }
  `}

  ${props => props.small && css`
    height: 32px;
    padding: 0 20px;
    font-size: 0.938em;
  `}

  ${props => props.loginLanding && css`
    background: transparent;
    color: ${props => props.theme.backgroundColor};
    border: 1px solid ${props => props.theme.backgroundColor};
    margin: 0 !important;
    padding: 0 10px !important;
    width: auto !important;
    height: 34px !important;
    text-transform: initial;

    &:hover {
      background: ${props => props.theme.backgroundColor};
      color: ${props => props.theme.textColor};
    }
  `}

  ${props => props.google && css`
    background: #DB4A39;
    color: ${props => props.theme.backgroundColor};
    text-transform: initial;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      width: 20px;
      margin: 10px;
    }

    &:hover {
      background: #B93A2B;
      color: ${props => props.theme.backgroundColor};
    }

    @media(min-width:1024px) {
      display: flex !important;
    }
  `}

  ${props => props.inForm && css`
    margin: 10px 0 0 0;
  `}

  ${props => props.formEnd && css`
    margin: 30px 0 0 0;
  `}
`