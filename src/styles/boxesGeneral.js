import styled from 'styled-components'

export const ButtonBox = styled.div`
  margin: 0 0 30px 0;
`

export const BoxCard = styled.div`
  margin: 0 0 10px 0;
`;

export const WrapperDuplex = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const TagsUnlist = styled.ul`
  display: flex;

  li {
    margin: 0 10px 0 0;

    &:last-child {
      margin: 0;
    }
  }
`;

export const TransparentLR = styled.div`
  width: 50vw;
  height: 100vh;
  position: absolute;
  background: rgba(29, 30, 34, 0.7);
  backdrop-filter: blur(2px);
`;

export const ImageDesktopRegisterAndLogin = styled.div`
  display: none;

  @media(min-width:1200px) {
    display: block;

    img {
      width: 50vw;
      height: 100vh;
    }
  }
`