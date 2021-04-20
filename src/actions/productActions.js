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
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,  
} from "../types";
import clienteAxios from "../config/axios";
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
        dispatch( getProducts() );

        try {
            const respuesta = await clienteAxios.get('/products');
            dispatch( getProductsSuccess(respuesta.data) )
        } catch (error) {
            console.log(error);
            dispatch( getProductsError() )
        }
    }
}

const getProducts = () => ({
    type: READ_PRODUCT,
    payload: true
});

const getProductsSuccess = products => ({
    type: READ_PRODUCT_SUCCESS,
    payload: products
})
const getProductsError = () => ({
    type: READ_PRODUCT_ERROR, 
    payload: true
});

// U
export function setProduct(product) {
  return (dispatch) => {
      dispatch( setProductAction(product) )
  }
}

const setProductAction = product => ({
  type: SET_UPDATE_PRODUCT,
  payload: product
})

export function editProductAction(product) {
  return async (dispatch) => {
      dispatch( editProduct() );

      try {
          await clienteAxios.put(`/products/${product.id}`, product);    
          dispatch( editProductSuccess(product) );
      } catch (error) {
          console.log(error);
          dispatch( editProductError() );
      }
  }
}
const editProduct = () => ({
  type: UPDATE_PRODUCT
});

const editProductSuccess = producto => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: producto
});

const editProductError = () => ({
  type: UPDATE_PRODUCT_ERROR,
  payload: true
})

// D
export function deleteProductAction(id) {
  return async (dispatch) => {
      dispatch(getDeleteProduct(id) );

      try {
          await clienteAxios.delete(`/products/${id}`);
          dispatch( deleteProductSuccess() );

          Swal.fire(
              'Eliminado',
              'El producto se eliminó correctamente',
              'success'
          )
      } catch (error) {
          console.log(error);
          dispatch( deleteProductError() );
      }
  }
}

const getDeleteProduct = id => ({
  type: DELETE_PRODUCT,
  payload: id
});
const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS
})
const deleteProductError = () => ({
  type: DELETE_PRODUCT_ERROR,
  payload: true
});