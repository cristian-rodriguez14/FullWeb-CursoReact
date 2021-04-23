import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import usersReducer from "./usersReducer"
import alertaReducer from './alertaReducer';

export default combineReducers({
  products: productsReducer,
  users: usersReducer,
  alerta: alertaReducer
});
