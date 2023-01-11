import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Button } from '../../styles/buttonGeneral';
import { sendQuestionForQuestionBank } from '../examns/checkQuestion/algorithms/sendQuestionForQuestionBank';
import { UploadStatusRevisedQuestion } from '../examns/checkQuestion/algorithms/updateStatusQuestion';
import { ReactComponent as CloseSVG } from './../../icons/close.svg';
import { Overlay, ModalContainer } from './styles/sMainModal';

export function MainModalCheck({
  db,
  uqid,
  navigate,
  modalState,
  setModalState,
  title,
  subTopicId,
  setResultOfQuestion,
  dataForQuestionBank,
}) {
  const {
    setLoading,
    setDataOfQuestionToReview,
    setUnreviewedQuestionData,
    unreviewedQuestionData,
    dataOfUser,
  } = useContext(AppContext);
  // console.log("uquid", subTopicId);
  return (
    <>
      {modalState && (
        <div>
          <Overlay
            onClick={() => {
              setModalState(false);
            }}
          ></Overlay>
          <ModalContainer>
            <div>
              <h1>{title}</h1>
              <CloseSVG
                className="closeModal"
                onClick={() => {
                  setModalState(false);
                }}
              />
            </div>
            <div className="buttonsContent">
              <Button
                primary
                onClick={(e) => {
                  e.preventDefault();
                  setModalState(false);
                }}
              >
                {'No'}
              </Button>
              <Button
                iris
                secundary
                onClick={() => {
                  sendQuestionForQuestionBank({
                    db,
                    dataForQuestionBank,
                    setLoading,
                  });
                  subTopicId &&
                    UploadStatusRevisedQuestion({
                      db,
                      uqid,
                      setLoading,
                      navigate,
                      setUnreviewedQuestionData,
                      unreviewedQuestionData,
                      dataOfUser,
                      subTopicId,
                    });
                  setDataOfQuestionToReview(null);
                  setResultOfQuestion(null);
                  localStorage.setItem('idQuestion', '');
                  setModalState(!modalState);
                }}
              >
                {'Si'}
              </Button>
            </div>
          </ModalContainer>
        </div>
      )}
    </>
  );
}
