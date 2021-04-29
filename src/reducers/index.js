import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import usersReducer from "./usersReducer"
import alertaReducer from './alertaReducer';
import carsReducer from "./carsReducer";

export default combineReducers({
  products: productsReducer,
  users: usersReducer,
  cars: carsReducer,
  alerta: alertaReducer
});
