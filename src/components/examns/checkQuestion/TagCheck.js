import React from "react";
import { TagContainerCheck } from "./styles/sTagCheck";
import { ReactComponent as CloseSvg } from "../../../icons/close.svg";
import { ReactComponent as CheckSvg } from "../../../icons/check.svg";

export default function TagCheck({
  setModalStateTextArea,
  modalStateTextArea,
  name,
  type,
  modalState,
  setModalState,
}) {
  return (
    <li>
      <TagContainerCheck type={type}>
        {name === "ok" ? (
          <div>
            <CheckSvg
              className={"svg-icon"}
              onClick={() => setModalState(!modalState)}
            />
          </div>
        ) : (
          <div>
            <CloseSvg
              className={"svg-icon"}
                onClick={() => {
                setModalStateTextArea(!modalStateTextArea);
              }}
            />
          </div>
        )}
      </TagContainerCheck>
    </li>
  );
}
