import {
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    READ_USER,
    READ_USER_SUCCESS,
    READ_USER_ERROR,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
    SET_UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
  } from "../types";
  
  const initialState = {
    users: [],
    error: null,
    loading: false,
    usuarioeliminar: null,
    usuarioeditar: null,
  };
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
    switch (action.type) {
      case READ_USER:
      case REGISTER:
        return {
          ...state,
          loading: action.payload,
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          users: [...state.users, action.payload],
        };
      case REGISTER_ERROR:
      case READ_USER_ERROR:
      case DELETE_USER_ERROR:
      case UPDATE_USER_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case READ_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          users: action.payload,
        };
      case DELETE_USER:
        return {
          ...state,
          usuarioeliminar: action.payload,
        };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.filter(
            (user) => user.id !== state.usuarioeliminar
          ),
          usuarioeliminar: null,
        };
      case SET_UPDATE_USER:
        return {
          ...state,
          usuarioeditar: action.payload,
        };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          usuarioeditar: null,
          users: state.users.map((user) =>
            user.id === action.payload.id
              ? (user = action.payload)
              : user
          ),
        };
      default:
        return state;
    }
  }
  