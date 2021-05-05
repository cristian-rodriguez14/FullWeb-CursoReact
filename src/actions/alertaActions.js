import { SHOW_ALERT, HIDE_ALERT } from "../types";

export function mostrarAlerta(alerta) {
  return (dispatch) => {
    dispatch(crearAlerta(alerta));
  };
}
const crearAlerta = (alerta) => ({
  type: SHOW_ALERT,
  payload: alerta,
});

export function ocultarAlertaAction() {
  return (dispatch) => {
    dispatch(ocultarAlerta());
  };
}

const ocultarAlerta = () => ({
  type: HIDE_ALERT,
});
