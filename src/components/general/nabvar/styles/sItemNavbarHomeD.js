import styled from 'styled-components';

export const ItemNavbarHomeDContainer = styled.li`
  margin: 0 0 12px 0;

  a {
    color: ${props => props.theme.textColor};
    display: flex;
    align-items: center;
    padding: 10px 20px;
  
    span {
      font-weight: ${props => props.theme.weight.semiBold};
      margin: 0 0 0 10px;
      font-size: 0.875em;
    }
  
    svg {
      fill: ${props => props.theme.textColor};
      width: 20px;
      height: 20px;
    }
  
    &:hover {
      background: ${props => props.theme.orange200};
    }

    .userGaulerMenu {
      fill: ${props => props.theme.whiteColor};
      width: 24px;
      height: 24px;
    }
  }
`
