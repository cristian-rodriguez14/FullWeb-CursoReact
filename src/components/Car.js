import React from "react";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";

import { suprCarAction, LlenarCarrito } from "../actions/carActions";

const ShCar = ({ car }) => {
  const { userId, productId, quantity, id } = car;

  const dispatch = useDispatch();

  const confirmDeleteCar = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un caro que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // pasarlo al action
        dispatch(suprCarAction(id)); 
      }
    });
  };

  const toEdit = (car) => {
    dispatch(LlenarCarrito(car));    
  };

  return (
    <tr>
      <td>{userId}</td>
      <td>{productId}</td>
      <td>{quantity}</td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => toEdit(car)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmDeleteCar(id)}
        >
          Eliminar{" "}
        </button>
      </td>
    </tr>
  );
};

export default ShCar;
