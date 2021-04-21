import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import alertaReducer from './alertaReducer';

export default combineReducers({
  products: productsReducer,
  alerta: alertaReducer
});
