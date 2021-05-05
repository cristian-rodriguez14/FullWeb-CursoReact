import {
  CREATE_CAR,
  CREATE_CAR_ERROR,
  READ_CAR,
  READ_CAR_ERROR,
  DELETE_CAR_SUCCESS,
  DELETE_CAR_ERROR,
  SET_UPDATE_CAR,
  UPDATE_CAR_SUCCESS,
  UPDATE_CAR_ERROR,
} from "../types";
import { db } from "../config/firebase";
import Swal from "sweetalert2";

export function createCarAction(car) {
    return async (dispatch) => {
      try {
        await db.collection("cars").doc().set(car);
        dispatch(createCarSuccess(car));
        Swal.fire("Correcto", "El carrito se agregó correctamente", "success");
      } catch (error) {
        dispatch(addCarError(true));
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: "Hubo un error, intenta de nuevo",
        });
      }
    };
  }
  
  const createCarSuccess = () => ({
    type: CREATE_CAR,
  });

  const addCarError = (estado) => ({
    type: CREATE_CAR_ERROR,
    payload: estado,
  }); 
  
  const getCarsError = () => ({
    type: READ_CAR_ERROR,
    payload: true,
  }); 
  
  const editCarError = () => ({
    type: UPDATE_CAR_ERROR,
    payload: true,
  }); 
  
  const deleteCarError = () => ({
    type: DELETE_CAR_ERROR,
    payload: true,
  });
  
  // Read
  export function readCarAction() {
    return async (dispatch) => {
      try {
        db.collection("cars").onSnapshot((querySnapshot) => {
          const response = [];
          querySnapshot.forEach((doc) => {
            response.push({ ...doc.data(), id: doc.id });
          });
          dispatch(readCarsSuccess(response));
        });
      } catch (error) {
        dispatch(getCarsError());
      }
    };
  }
  
  const readCarsSuccess = (cars) => ({
    type: READ_CAR,
    payload: cars,
  });
  
  // Update
  // First fill form
  export function LlenarCarrito(car) {
    return (dispatch) => {
      dispatch(LlenarCarritoAction(car));
    };
  }
  
  const LlenarCarritoAction = (car) => ({
    type: SET_UPDATE_CAR,
    payload: car,
  });
  
  // Second do edition
  export function updateCarAction(car) {
    return async (dispatch) => {
      try {
        await db.collection("cars").doc(car.id).update(car);
        dispatch(updateCarSuccess(car));
      } catch (error) {
        dispatch(editCarError());
      }
    };
  }
  
  const updateCarSuccess = (car) => ({
    type: UPDATE_CAR_SUCCESS,
    payload: car,
  });
  
  // Delete
  export function suprCarAction(car) {
    return async (dispatch) => {
      try {
        await db.collection("cars").doc(car.id).delete();
        dispatch(suprCarSuccess(car));
        Swal.fire("Eliminado", "El carrito se eliminó correctamente", "success");
      } catch (error) {
        dispatch(deleteCarError());
      }
    };
  }
  
  const suprCarSuccess = (car) => ({
    type: DELETE_CAR_SUCCESS,
    payload: car,
  });