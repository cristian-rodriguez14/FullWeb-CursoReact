import {
  CREATE_CAR,
  CREATE_CAR_ERROR,
  READ_CAR,
  READ_CAR_ERROR,
  DELETE_CAR_SUCCESS,
  DELETE_CAR_ERROR,
  SET_UPDATE_CAR,
  UPDATE_CAR_SUCCESS,
  UPDATE_CAR_ERROR,
} from "../types";

const initialState = {
  cars: [],
  error: null,
  loading: false,
  carroeliminar: null,
  carroeditar: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case READ_CAR:
      return {
        ...state,
        cars: action.payload,
      };
    case CREATE_CAR:
      return {
        ...state,
      };
    case CREATE_CAR_ERROR:
    case READ_CAR_ERROR:
    case DELETE_CAR_ERROR:
    case UPDATE_CAR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_UPDATE_CAR:
      return {
        ...state,
        carroeditar: action.payload,
      };
    case UPDATE_CAR_SUCCESS:
      return {
        ...state,
        carroeditar: null,
        cars: state.cars.map((car) =>
          car.id === action.payload.id ? (car = action.payload) : car
        ),
      };
    case DELETE_CAR_SUCCESS:
      return {
        ...state,
        cars: state.cars.filter((car) => car.id !== state.carroeliminar),
        carroeliminar: null,
      };
    default:
      return state;
  }
}
