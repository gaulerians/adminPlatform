import React from "react";
import {
  ToggleSwitchContainer,
  ToggleSwitchInput,
} from "./styles/sToggleSwitch";

export const ToggleSwitch = ({
  textRight,
  textLeft,
  toggleSwitchStatus,
  setToggleSwitchStatus,
}) => {
  return (
    <ToggleSwitchContainer margin10B>
      <label>{textLeft}</label>
      <ToggleSwitchInput className="switch">
        <input type="checkbox" />
              <span className="slider round"
              onClick={() => setToggleSwitchStatus(!toggleSwitchStatus)}
              ></span>
      </ToggleSwitchInput>
      <label>{textRight}</label>
    </ToggleSwitchContainer>
  );
};
