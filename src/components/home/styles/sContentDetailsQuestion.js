import styled from "styled-components";

export const QuestionPrevContainer = styled.div`
  margin: 15px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  with: 50%;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: auto;
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  }

  div {
    margin-top: 2px;
    margin-bottom: 2px;
    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }

  p {
    @media (max-width: 600px) {
      font-size: 0.8rem;
    }
  }

  button {
    padding: auto;
    width: 100px;
    @media (max-width: 600px) {
      font-size: 0.8rem;
      height: 30px;
    }
  }

  span:first-child {
    text-align: center;
    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }

  .latex-container {
    
  }

  .container-text {
    with: 66.6%;
    padding: 0 10px;
  }

  .container-text-data {
    margin-left: 10px;
  }

  .container-button {
    with: 33.3%;
    padding: 10px;
    align-self: center;
    position: relative;
  }

  .container-duplex {
    display: flex;
    gap: 30px;
  }
`;
