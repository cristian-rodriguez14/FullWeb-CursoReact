import { SHOW_ALERT, HIDE_ALERT } from "../types";

const initialState = {
  alerta: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        alerta: action.payload,
      };
    case HIDE_ALERT:
      return {
        ...state,
        alerta: null,
      };
    default:
      return state;
  }
}
