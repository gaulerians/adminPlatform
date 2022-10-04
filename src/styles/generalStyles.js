import styled, { css } from 'styled-components'

const mixinWrapper = css`
  @media(min-width:360px) {
    padding: 0 20px;
  }

  @media(min-width:375px) {
    padding: 0 25px;
  }

  @media(min-width:768px) {
    padding: 0 18%;
  }

  @media(min-width:1024px) {
    padding: 0 15%;
  }
`

export const Wrapper = styled.div`
  ${mixinWrapper}

  @media(min-width:1200px) {
    padding: 0;
    margin: ${props => props.margin || '0 auto'};
    width: ${props => props.width || '1100px'};
  }
`

export const WrapperAdmin = styled.div`
  @media(min-width:1200px) {
    padding: 0 0 4% 0;
    width: 990px;
    margin: 0 auto;
  }
`

export const ModalNavbarContainer = styled.div`
  background: ${props => props.theme.backgroundColor};
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  height: 100vh;
`

export const GridAdminLayout = styled.div`
  @media(min-width:1200px) {
    display: grid;
    grid-template-columns: 250px 1fr;
  }
`

export const WrapperExpand = styled.div`
  ${mixinWrapper}

  @media(min-width:360px) {
    position: relative;
    top: ${props => props.top || '50px'};
  }

  @media(min-width:375px) {
    padding: 0 25px;
  }

  @media(min-width:768px) {
    padding: 0 18%;
  }

  @media(min-width:1024px) {
    padding: 0 15%;
  }

  @media(min-width:1200px) {
    position: static;
    padding: 0;
    margin: ${props => props.margin || '0 auto'};
    width: ${props => props.width || '1200px'};
  }
`;

export const WrapperOthers = styled.div`
  padding: 0 15px;
  width: 100%;

  @media(min-width:360px) {
    padding: 0 20px;
  }

  @media(min-width:375px) {
    padding: 0 25px;
  }

  @media(min-width:768px) {
    padding: 0 18%;
  }

  @media(min-width:1024px) {
    padding: 0 15%;
  }

  @media(min-width:1200px) {
    padding: 0;
    width: 970px;
    margin: 0 auto 30px auto;
  }
`

export const RegisterAndLoginWrapper = styled.div`
  margin: 50px 0 70px 0;

  .registerAndLoginFooter {
    font-weight: ${props => props.theme.weight.medium};
  }

  .mainRegisterAndLogin {
    flex: 1 0 auto;
  }

  .footerRegisterAndLogin {
    flex: 0 0 auto;
  }

  @media(min-width:340px) {
    .mainRegisterAndLogin {
      margin: 0 0 200px 0;
    }
  }

  @media(min-width:410px) {
    .mainRegisterAndLogin {
      margin: 0 0 300px 0;
    }
  }

  @media(min-width:1024px) {
    .mainRegisterAndLogin {
      margin: 0 0 150px 0;
    }
  }

  @media(min-width:1200px) {
    margin: 35px 110px 25px 110px;

    .mainRegisterAndLogin {
      margin: 0 0 250px 0;
    }
  }
`