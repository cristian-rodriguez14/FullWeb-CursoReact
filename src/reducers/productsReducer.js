import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_ERROR,
  RECEIVE_IMAGE,
  READ_PRODUCT,
  READ_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  SET_UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "../types";

const initialState = {
  products: [],
  user: [],
  url: null,
  error: null,  
  loading: false,
  productoeliminar: null,
  productoeditar: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case READ_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
      };
    case CREATE_PRODUCT_ERROR:
    case READ_PRODUCT_ERROR:
    case DELETE_PRODUCT_ERROR:
    case UPDATE_PRODUCT_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_UPDATE_PRODUCT:
      return {
        ...state,
        productoeditar: action.payload,
      };
    case RECEIVE_IMAGE:
      return {
        ...state,
        imagen: action.payload,
      };
    case UPDATE_PRODUCT_SUCCESS:
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        productoeditar: null,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
      };
      case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
