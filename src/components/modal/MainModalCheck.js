import React, { useContext } from "react";
import { AppContext } from "../../App";
import { Button } from "../../styles/buttonGeneral";
import { UploadStatusRevisedQuestion } from "../examns/checkQuestion/algorithms/updateStatusQuestion";
import { ReactComponent as CloseSVG } from "./../../icons/close.svg";
import { Overlay, ModalContainer } from "./styles/sMainModal";

export function MainModalCheck({
  db,
  uqid,
  navigate,
  modalState,
  setModalState,
  title,
  uqidSubTopic,
}) {
  const { setLoading, setUnreviewedQuestionData, dataOfUser } =
    useContext(AppContext);
  // console.log("uquid", uqidSubTopic);
  return (
    <>
      {modalState && (
        <>
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
            <div>
              <div>
                <Button
                  primary
                  onClick={(e) => {
                    e.preventDefault();
                    setModalState(false);
                  }}
                >
                  {"No"}
                </Button>
              </div>
              <div>
                <Button
                  iris
                  secundary
                  onClick={() => {
                    UploadStatusRevisedQuestion({
                      db,
                      uqid,
                      setLoading,
                      navigate,
                      setUnreviewedQuestionData,
                      dataOfUser,
                      uqidSubTopic,
                    });
                    setModalState(!modalState);
                  }}
                >
                  {"Si"}
                </Button>
              </div>
            </div>
          </ModalContainer>
        </>
      )}
    </>
  );
}
