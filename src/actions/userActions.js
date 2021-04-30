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
  /* LOGIN_SUCCESS,
  LOGIN_ERROR, */
} from "../types";
import Swal from "sweetalert2";
import { db, storage, auth } from "../config/firebase";

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

export function uploadImage(userImage) {
  return async (dispatch) => {
    try {
      const uploadTask = storage
        .ref(`images/Users/${userImage.photo.name}`)
        .put(userImage.photo);
      alert(`imagen guardada: ${userImage.photo.name}`);
      uploadTask.on(
        "state_changed",
        (snapShot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref(`images/Users/${userImage.photo.name}`)
            .getDownloadURL()
            .then((url) => {
              dispatch(sendPhoto(url));
            });
        }
      );
    } catch (error) {}
  };
}

const sendPhoto = (url) => ({
  type: RECEIVE_PHOTO,
  payload: url,
});

// Create in Firestore
export function createUserAction(user) {
  return async (dispatch) => {
    try {
      const usuarioparadb = {
        photo: user.urlPhoto,
        email: user.email,
        role: user.role,
        state: user.state,
      };
      await auth.createUserWithEmailAndPassword(user.email, user.password);
      registerInFirestore(usuarioparadb);
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

const registerInFirestore = async (usuario) => {
  await db.collection("users").doc().set(usuario);
};

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
          dispatch(UserCustomLogin(u.user.email));
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

const UserCustomLogin = (user) => ({
  type: USER_CUSTOM_LOGIN,
  payload: user,
});

export function GoogleLoginAction(result) {
  return async (dispatch) => {
    try {
      const usuarioGooparadb = {
        photo: result.result.user.photoURL,
        email: result.result.user.email,
        role: "User",
        state: true,
      };
      dispatch(UserLogin(result));
      registerInFirestore(usuarioGooparadb);
    } catch (error) {
      console.log(error);
      dispatch(getUsersError());
    }
  };
}

const UserLogin = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

export function FacebookLoginAction(result) {
  return async (dispatch) => {
    try {
      const usuarioFaceparadb = {
        photo: result.result.data.picture.data.url,
        email: result.result.data.email,
        role: "User",
        state: true,
      };
      dispatch(UserLogin(result));
      registerInFirestore(usuarioFaceparadb);
    } catch (error) {
      dispatch(getUsersError());
    }
  };
}

/* export function GoogleLoginAction() {
  return async (dispatch) => {
    try {
      console.log("Si entro: ", data);
      const usuarioGoogleparadb = [data.imageUrl, data.email, "user", true];
      Gooprovider.addScope('profile');
      Gooprovider.addScope('email');
      console.log("You are in the Action of Google");
      auth.signInWithPopup(Gooprovider).then((result) => {
        dispatch(UserLogin(result));
        console.log("Login by Google", result);
      });
      // registerInFirestore(usuarioGoogleparadb);
    } catch (error) {
      console.log(error)
      dispatch(getUsersError());
    }
  };
}

const UserLogin = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

export function FacebookLoginAction(data) {
  return async (dispatch) => {
    try {
      console.log("Si entro: ", data);
      const usuarioFacebookparadb = [
        data.picture.data.url,
        data.email,
        "user",
        true,
      ];
      console.log("Usuario: ", usuarioFacebookparadb);
      Faceprovider.addScope('user_birthday');
      console.log("Algo pasó?");
      auth.signInWithPopup(Faceprovider).then((result) => {        
        dispatch(UserLogin(result));
        console.log("Exito");
      }); 
      registerInFirestore(usuarioFacebookparadb);
    } catch (error) {
      dispatch(getUsersError());
    }
  };
} */

export function LogoutUserAction() {
  return async (dispatch) => {
    await auth.signOut();
    dispatch(UserLogout());
  };
}

const UserLogout = () => ({
  type: USER_LOGOUT,
});
