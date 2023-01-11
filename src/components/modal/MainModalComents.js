import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirestoreSdkContext } from 'reactfire';
import { AppContext } from '../../App';
import { Button } from '../../styles/buttonGeneral';
import { InputContainer } from '../../styles/inputGeneral';
import { sendReportComent } from '../examns/checkQuestion/algorithms/sendReportComent';
import { ReactComponent as CloseSVG } from './../../icons/close.svg';
import { InputTextContainer } from './styles/sInputTextContainer';
import { Overlay, ModalContainer } from './styles/sMainModal';

export function MainModalComents({ modalStateTextArea, setModalStateTextArea, title, uqid }) {
  const db = useContext(FirestoreSdkContext);
  const navigate = useNavigate();
  const { setUnreviewedQuestionData, setLoading, dataOfUser, setDataOfQuestionToReview } =
    useContext(AppContext);

  const [comentOnQuestion, setComentOnQuestion] = useState('');

  useEffect(() => {
    return () => {};
  }, [comentOnQuestion]);
  return (
    <>
      {modalStateTextArea && (
        <>
          <Overlay
            onClick={() => {
              setModalStateTextArea(false);
            }}
          ></Overlay>
          <ModalContainer>
            <div>
              <InputContainer>
                <h1>{title}</h1>
                <InputTextContainer type="textArea">
                  <textarea onChange={(e) => setComentOnQuestion(e.target.value)}></textarea>
                </InputTextContainer>
              </InputContainer>
              <CloseSVG
                className="closeModal"
                onClick={() => {
                  setModalStateTextArea(false);
                }}
              />
            </div>
            <div className="buttonsContent">
              <Button
                iris
                secundary
                onClick={() => {
                  sendReportComent({
                    db,
                    uqid,
                    navigate,
                    setLoading,
                    setUnreviewedQuestionData,
                    dataOfUser,
                    comentOnQuestion,
                  });
                  setModalStateTextArea(!modalStateTextArea);
                  setDataOfQuestionToReview(null);
                  localStorage.setItem('idQuestion', '');
                }}
              >
                {'Enviar'}
              </Button>
              <Button
                primary
                onClick={(e) => {
                  e.preventDefault();
                  setModalStateTextArea(false);
                }}
              >
                {'Cancelar'}
              </Button>
            </div>
          </ModalContainer>
        </>
      )}
    </>
  );
}
