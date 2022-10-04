import styled from 'styled-components'

export const DesktopRegisterContainer = styled.div`
  display: block;

  @media(min-width:1200px) {
    display: flex;
  }
`

export const MainRegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  p {
    text-align: center;
    margin: 0 0 20px 0;
  }

  .logoFooterLanding {
    fill: ${props => props.theme.textColor};
    margin: 0 0 50px 0;
    width: -webkit-fill-available;

    @media(min-width:768px) {
      height: 58px;
    }

    @media(min-width:1200px) {
      margin: 0 0 25px 0;
    }
  }
`
