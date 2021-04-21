import React from "react";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deleteProductAction, setProduct } from "../actions/productActions";

const Producto = ({ product }) => {
  const { image, name, price, description, state, id } = product;

  const dispatch = useDispatch();
  const history = useHistory();

  const confirmDeleteProduct = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un producto que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // pasarlo al action
        dispatch(deleteProductAction(id));
      }
    });
  };

  const toEdit = (product) => {
    dispatch(setProduct(product));
    history.push(`/products/edit/${product.id}`);
  };

  return (
    <tr>
      <td>{image}</td>
      <td>{name}</td>
      <td>${price}</td>
      <td>{description}</td>
      <td>{state}</td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => toEdit(product)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmDeleteProduct(id)}
        >
          Eliminar{" "}
        </button>
      </td>
    </tr>
  );
};

export default Producto;
