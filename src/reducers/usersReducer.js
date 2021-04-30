import {
  REGISTER,
  REGISTER_ERROR,
  RECEIVE_PHOTO,
  READ_USER,
  READ_USER_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  SET_UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  USER_CUSTOM_LOGIN,
  USER_LOGIN,
  USER_LOGOUT,
} from "../types";

const initialState = {
  users: [],
  log: null,
  url: null,
  error: null,
  loading: false,
  usuarioeditar: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case READ_USER:
      return {
        ...state,
        users: action.payload,
      };
    case RECEIVE_PHOTO:
      return {
        ...state,
        url: action.payload,
      };
    case USER_CUSTOM_LOGIN:
      return {
        ...state,
        log: action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        log: action.payload.user,
      };
    case USER_LOGOUT:
      return {
        ...state,
        log: null,
      };
    case REGISTER:
      return {
        ...state,
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
    case SET_UPDATE_USER:
      return {
        ...state,
        usuarioeditar: action.payload,
      };
    case UPDATE_USER_SUCCESS:
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        usuarioeditar: null,
        users: state.users.map((user) =>
          user.id === action.payload.id ? (user = action.payload) : user
        ),
      };
    default:
      return state;
  }
}
