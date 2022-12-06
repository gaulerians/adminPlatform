import React, { useEffect } from "react";
import { Button } from "../../styles/buttonGeneral";
import { ReactComponent as CloseSVG } from "./../../icons/close.svg";
import { Overlay, ModalContainer } from "./styles/sMainModal";

export function MainModalUpload({
  functionUpload,
  modalState,
  setModalState,
  title,
}) {
  useEffect(() => {}, []);
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
                  onClick={(e) => {
                    functionUpload();
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
