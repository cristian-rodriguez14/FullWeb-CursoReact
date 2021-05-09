import firebase from "../../../config/firebase";
import Usuarios from "../modelo/usuarios";

const firestore = firebase.firestore();

export const getUsuarios = async () => {
  try {
    const response = await firestore.collection("users");
    const data = await response.get();
    let array = [];
    data.forEach((doc) => {
      const usuario = new Usuarios(
        doc.id,
        doc.data().nombre,
        doc.data().email,
        doc.data().photo,
        doc.data().role,
        doc.data().state
      );

      array.push(usuario);
    });
    return array;
  } catch (error) {
    throw error;
  }
};

export const addUsuario = async (usuario) => {
  try {
    await firestore.collection("users").doc().set(usuario);
  } catch (error) {
    throw error;
  }
};

export const getCustomer = async (id) => {
  try {
    const customer = await firestore.collection("users").doc(id);
    const data = await customer.get();
    return data.data();
  } catch (error) {
    throw error;
  }
};

export const updateUsuario = async (id, data) => {
  try {
    const usuario = await firestore.collection("users").doc(id);
    await usuario.update(data);
  } catch (error) {
    throw error;
  }
};

export const deleteUsuario = async (id) => {
  try {
    await firestore.collection("users").doc(id).delete();
  } catch (error) {
    throw error;
  }
};
