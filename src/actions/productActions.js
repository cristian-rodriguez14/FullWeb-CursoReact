import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  READ_PRODUCT,
  READ_PRODUCT_SUCCESS,
  READ_PRODUCT_ERROR,
  // DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  SET_UPDATE_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
} from "../types";
import clienteAxios from "../config/axios";
import { db } from "../config/firebase";
import Swal from "sweetalert2";

// C
export function addNewProdAction(product) {
  return async (dispatch) => {
    dispatch(addProduct());
    try {
      await clienteAxios.post("/products", product);
      dispatch(addProductSuccess(product));
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

const addProduct = () => ({
  type: CREATE_PRODUCT,
  payload: true,
});

const addProductSuccess = (product) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: product,
});

const addProductError = (estado) => ({
  type: CREATE_PRODUCT_ERROR,
  payload: estado,
});

// R
export function getProdAction() {
  return async (dispatch) => {
    dispatch(getProducts());

    try {
      const respuesta = await clienteAxios.get("/products");
      dispatch(getProductsSuccess(respuesta.data));
    } catch (error) {
      dispatch(getProductsError());
    }
  };
}

const getProducts = () => ({
  type: READ_PRODUCT,
  payload: true,
});

const getProductsSuccess = (products) => ({
  type: READ_PRODUCT_SUCCESS,
  payload: products,
});
const getProductsError = () => ({
  type: READ_PRODUCT_ERROR,
  payload: true,
});

// U
export function setProduct(product) {
  return (dispatch) => {
    dispatch(setProductAction(product));
  };
}

const setProductAction = (product) => ({
  type: SET_UPDATE_PRODUCT,
  payload: product,
});

export function editProductAction(product) {
  return async (dispatch) => {
    dispatch(editProduct());

    try {
      await clienteAxios.put(`/products/${product.id}`, product);
      dispatch(editProductSuccess(product));
    } catch (error) {
      dispatch(editProductError());
    }
  };
}
const editProduct = () => ({
  type: UPDATE_PRODUCT,
});

const editProductSuccess = (product) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: product,
});

const editProductError = () => ({
  type: UPDATE_PRODUCT_ERROR,
  payload: true,
});

// D
// export function deleteProductAction(id) {
export function deleteProductAction(product) {
  return async (dispatch) => {
    // dispatch(getDeleteProduct(id));
    dispatch(getDeleteProduct());

    try {
      //await clienteAxios.delete(`/products/${id}`);
      await clienteAxios.put(`/products/${product.id}`, product);
      //dispatch(deleteProductSuccess());
      dispatch(deleteProductSuccess(product));
      Swal.fire("Eliminado", "El producto se eliminó correctamente", "success");
    } catch (error) {
      // dispatch(deleteProductError());
      dispatch(deleteProductError());
    }
  };
}

const getDeleteProduct = () => ({
  type: UPDATE_PRODUCT,
});

const deleteProductSuccess = (product) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: product,
});

const deleteProductError = () => ({
  type: DELETE_PRODUCT_ERROR,
  payload: true,
});

// Firebase CRUD
/* export function uploadImage(productImage) {
  return async () => {
    try {
      const uploadTask = storage
        .ref(`images/Products/${productImage.image.name}`)
        .put(productImage.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images/Products")
            .child(productImage.image.name)
            .getDownloadURL()
            .then((url) => {
              sendURLtoPage(url)
            });
        }
      );
    } catch (error) {}
  };
} */
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
