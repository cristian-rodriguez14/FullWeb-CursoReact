import {
  REGISTER,
  REGISTER_ERROR,
  READ_USER,
  READ_USER_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  SET_UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  USER_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "../types";
import Swal from "sweetalert2";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";

const addUserError = (estado) => ({
  type: REGISTER_ERROR,
  payload: estado,
});

const getUsersError = () => ({
  type: READ_USER_ERROR,
  payload: true,
});

const editUserError = () => ({
  type: UPDATE_USER_ERROR,
  payload: true,
});

const deleteUserError = () => ({
  type: DELETE_USER_ERROR,
  payload: true,
});

// Create in Firestore
export function createUserAction(user) {
  return async (dispatch) => {
    try {
      await auth.createUserWithEmailAndPassword(user.email, user.password);
      await db.collection("users").doc().set(user);
      dispatch(createUserSuccess(user));
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

const createUserSuccess = () => ({
  type: REGISTER,
});

// Read
export function readUserAction() {
  return async (dispatch) => {
    try {
      db.collection("users").onSnapshot((querySnapshot) => {
        const response = [];
        querySnapshot.forEach((doc) => {
          response.push({ ...doc.data(), id: doc.id });
        });
        dispatch(readUsersSuccess(response));
      });
    } catch (error) {
      dispatch(getUsersError());
    }
  };
}

const readUsersSuccess = (users) => ({
  type: READ_USER,
  payload: users,
});

// Update
// First fill form
export function fillForm(user) {
  return (dispatch) => {
    dispatch(fillFormAction(user));
  };
}

const fillFormAction = (user) => ({
  type: SET_UPDATE_USER,
  payload: user,
});

// Second do edition
export function updateUserAction(user) {
  return async (dispatch) => {
    try {
      await db.collection("users").doc(user.id).update(user);
      dispatch(updateUserSuccess(user));
    } catch (error) {
      dispatch(editUserError());
    }
  };
}

const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

// Delete
export function suprUserAction(user) {
  return async (dispatch) => {
    try {
      await db.collection("users").doc(user.id).update(user);
      dispatch(suprUserSuccess(user));
      Swal.fire("Eliminado", "El usuario se eliminó correctamente", "success");
    } catch (error) {
      dispatch(deleteUserError());
    }
  };
}

const suprUserSuccess = (user) => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
});

// Signin
export function LoginUserAction(user) {
  return async (dispatch) => {
    try {
      await auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then((u) => {
          dispatch(UserLoginError(u.user.email));
        });
      Swal.fire(
        "Correcto",
        "El usuario inició sesion correctamente",
        "success"
      );
    } catch (error) {
      dispatch(getUsersError());
    }
  };
}

const UserLoginError = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

export function GoogleLoginAction(user) {
  return async (dispatch) => {
    try {
    } catch (error) {
      dispatch(getUsersError());
    }
  };
}

export function FacebookLoginAction(user) {
  return async (dispatch) => {
    try {
    } catch (error) {
      dispatch(getUsersError());
    }
  };
}

export function authListener() {
  return (dispatch) => {
    //Compruebo si el usuario se ha loggeado
    auth.onAuthStateChanged((user) => {
      if (user) {
        //Usuario loggeado
        dispatch(LogUserData(user));
      } else {
        //Usuario NO logueado
        dispatch(NotLogUserData());
      }
    });
  };
}

const LogUserData = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const NotLogUserData = () => ({
  type: LOGIN_ERROR,
  payload: false,
});

export function LogoutUserAction(user) {
  return async () => {
    await auth.signOut();
  };
}
