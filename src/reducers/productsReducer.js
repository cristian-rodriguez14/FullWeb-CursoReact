import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  READ_PRODUCT,
  READ_PRODUCT_SUCCESS,
  READ_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  SET_UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
} from "../types";

const initialState = {
  products: [],
  error: null,
  loading: false,
  productoeliminar: null,
  productoeditar: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case READ_PRODUCT:
    case CREATE_PRODUCT:
      return {
        ...state,
        loading: action.payload,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };
    case CREATE_PRODUCT_ERROR:
    case READ_PRODUCT_ERROR:
    case DELETE_PRODUCT_ERROR:
    case UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case READ_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        productoeliminar: action.payload,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== state.productoeliminar
        ),
        productoeliminar: null,
      };
    case SET_UPDATE_PRODUCT:
      return {
        ...state,
        productoeditar: action.payload,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        productoeditar: null,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
      };
    default:
      return state;
  }
}
