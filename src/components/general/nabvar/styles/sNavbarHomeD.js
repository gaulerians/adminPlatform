import styled from 'styled-components';

export const NavbarHomeDContainer = styled.nav`
  position: fixed;
  width: 250px;
  height: 100%;
  background: ${props => props.theme.whiteColor};
  display: none;
  z-index: 4000;
  padding: 20px 0;
  top: 0;
  box-shadow: ${props => props.theme.shadowCard};

  @media(min-width:1200px) {
    display: block;

    .logoNavbarAHomeD {
      margin: 0 0 20px 0;
      display: flex;
      justify-content: center;
    }
  }
`

export const UnlistNavbarHomeD = styled.ul`
  &:nth-child(2) {
    padding: 0 0 10px 0;
    border-bottom: 1px solid ${props => props.theme.gray200};
  }

  &:nth-child(3) {
    padding: 20px 0 0 0;
  }
`
