import firebase from "../../../config/firebase";
import Producto from "../modelo/producto";

const firestore = firebase.firestore();

export const getUsuarios = async () => {
  try {
    const response = await firestore.collection("products");
    const data = await response.get();
    let array = [];
    data.forEach((doc) => {
      const producto = new Producto(
        doc.id,
        doc.data().name,
        doc.data().description,
        doc.data().price,
        doc.data().image,
        doc.data().state
      );

      array.push(producto);
    });
    return array;
  } catch (error) {
    throw error;
  }
};

export const addUsuario = async (producto) => {
  try {
    await firestore.collection("products").doc().set(producto);
  } catch (error) {
    throw error;
  }
};

export const getCustomer = async (id) => {
  try {
    const customer = await firestore.collection("products").doc(id);
    const data = await customer.get();
    return data.data();
  } catch (error) {
    throw error;
  }
};

export const updateUsuario = async (id, data) => {
  try {
    const usuario = await firestore.collection("products").doc(id);
    await usuario.update(data);
  } catch (error) {
    throw error;
  }
};

export const deleteUsuario = async (id) => {
  try {
    await firestore.collection("products").doc(id).delete();
  } catch (error) {
    throw error;
  }
};
