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
