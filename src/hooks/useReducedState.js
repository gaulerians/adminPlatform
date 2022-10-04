import { useReducer } from "react";

export const useReducedState = (initState) => {
  const reducer = (state, newState) => {
    if (typeof state === "object") {
      return { ...state, ...newState };
    } else {
      return newState;
    }
  };
  const [resultOfState, dispatch] = useReducer(reducer, initState);
  const setFunction = (key, value) =>
    dispatch(value === undefined ? key : { [key]: value });
  return [resultOfState, setFunction];
};