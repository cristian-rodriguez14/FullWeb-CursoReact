import {
  CREATE_PRODUCT,
  // CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  READ_PRODUCT,
  // READ_PRODUCT_SUCCESS,
  READ_PRODUCT_ERROR,
  // DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  SET_UPDATE_PRODUCT,
  // UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
} from "../types";
// import clienteAxios from "../config/axios";
import { db } from "../config/firebase";
import Swal from "sweetalert2";

const addProductError = (estado) => ({
  type: CREATE_PRODUCT_ERROR,
  payload: estado,
}); 

const getProductsError = () => ({
  type: READ_PRODUCT_ERROR,
  payload: true,
}); 

const editProductError = () => ({
  type: UPDATE_PRODUCT_ERROR,
  payload: true,
}); 

const deleteProductError = () => ({
  type: DELETE_PRODUCT_ERROR,
  payload: true,
}); 

// Firebase CRUD

// Create in Firestore
export function createProductAction(product) {
  return async (dispatch) => {
    try {
      await db.collection("products").doc().set(product);
      dispatch(createProductSuccess(product));
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      dispatch(addProductError(true));
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
}

const createProductSuccess = () => ({
  type: CREATE_PRODUCT,
});

// Read
export function readProductAction() {
  return async (dispatch) => {
    try {
      db.collection("products").onSnapshot((querySnapshot) => {
        const response = [];
        querySnapshot.forEach((doc) => {
          response.push({ ...doc.data(), id: doc.id });
        });
        dispatch(readProductsSuccess(response));
      });
    } catch (error) {
      dispatch(getProductsError());
    }
  };
}

const readProductsSuccess = (products) => ({
  type: READ_PRODUCT,
  payload: products,
});

// Update
// First fill form
export function fillForm(product) {
  return (dispatch) => {
    dispatch(fillFormAction(product));
  };
}

const fillFormAction = (product) => ({
  type: SET_UPDATE_PRODUCT,
  payload: product,
});

// Second do edition
export function updateProductAction(product) {
  return async (dispatch) => {
    try {
      await db.collection("products").doc(product.id).update(product);
      dispatch(updateProductSuccess(product));
    } catch (error) {
      dispatch(editProductError());
    }
  };
}

const updateProductSuccess = (product) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: product,
});

// Delete
export function suprProductAction(product) {
  return async (dispatch) => {
    try {
      await db.collection("products").doc(product.id).update(product);
      dispatch(suprProductSuccess(product));
      Swal.fire("Eliminado", "El producto se eliminó correctamente", "success");
    } catch (error) {
      dispatch(deleteProductError());
    }
  };
}

const suprProductSuccess = (product) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: product,
});
