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
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
  } from "../types";
  import clienteAxios from "../config/axios";
  import Swal from "sweetalert2";
  
  // C
  export function addNewUserAction(usuario) {
    return async (dispatch) => {
      dispatch(addUser());
      try {
        await clienteAxios.post("/usuarios", usuario);
        dispatch(addUserSuccess(usuario));
        Swal.fire("Correcto", "El usuario se agregó correctamente", "success");
      } catch (error) {
        dispatch(addUserError(true));
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: "Hubo un error, intenta de nuevo",
        });
      }
    };
  }
  
  const addUser = () => ({
    type: REGISTER,
    payload: true,
  });
  
  const addUserSuccess = (usuario) => ({
    type: REGISTER_SUCCESS,
    payload: usuario,
  });
  
  const addUserError = (estado) => ({
    type: REGISTER_ERROR,
    payload: estado,
  });
  
  // R
  export function getUserAction() {
    return async (dispatch) => {
      dispatch(getUsers());
  
      try {
        const respuesta = await clienteAxios.get("/usuarios");
        dispatch(getUsersSuccess(respuesta.data));
      } catch (error) {
        console.log(error);
        dispatch(getUsersError());
      }
    };
  }
  
  const getUsers = () => ({
    type: READ_USER,
    payload: true,
  });
  
  const getUsersSuccess = (usuarios) => ({
    type: READ_USER_SUCCESS,
    payload: usuarios,
  });
  const getUsersError = () => ({
    type: READ_USER_ERROR,
    payload: true,
  });
  
  // U
  export function setUser(usuario) {
    return (dispatch) => {
      dispatch(setUserAction(usuario));
    };
  }
  
  const setUserAction = (usuario) => ({
    type: SET_UPDATE_USER,
    payload: usuario,
  });
  
  export function editUserAction(usuario) {
    return async (dispatch) => {
      dispatch(editUser());
  
      try {
        await clienteAxios.put(`/usuarios/${usuario.id}`, usuario);
        dispatch(editUserSuccess(usuario));
      } catch (error) {
        console.log(error);
        dispatch(editUserError());
      }
    };
  }
  const editUser = () => ({
    type: UPDATE_USER,
  });
  
  const editUserSuccess = (usuario) => ({
    type: UPDATE_USER_SUCCESS,
    payload: usuario,
  });
  
  const editUserError = () => ({
    type: UPDATE_USER_ERROR,
    payload: true,
  });
  
  // D
  export function deleteUserAction(id) {
    return async (dispatch) => {
      dispatch(getDeleteUser(id));
  
      try {
        await clienteAxios.delete(`/usuarios/${id}`);
        dispatch(deleteUserSuccess());
  
        Swal.fire("Eliminado", "El usuario se eliminó correctamente", "success");
      } catch (error) {
        console.log(error);
        dispatch(deleteUserError());
      }
    };
  }
  
  const getDeleteUser = (id) => ({
    type: DELETE_USER,
    payload: id,
  });
  const deleteUserSuccess = () => ({
    type: DELETE_USER_SUCCESS,
  });
  const deleteUserError = () => ({
    type: DELETE_USER_ERROR,
    payload: true,
  });
  