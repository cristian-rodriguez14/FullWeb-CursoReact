import React from "react";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { suprProductAction, fillForm } from "../actions/productActions";

const Producto = ({ product }) => {
  const { image, name, price, description } = product;

  const dispatch = useDispatch();
  const history = useHistory();

  const confirmDeleteProduct = (product) => {
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
        product.state = false;
        dispatch(suprProductAction(product)); 
      }
    });
  };

  const toEdit = (product) => {
    dispatch(fillForm(product));
    history.push(`/products/edit/${product.id}`);     
  };

  return (
    <tr>
      <td><img src={image} alt="" style={{maxHeight: "100px", maxWidth: "200px"}}/></td>
      <td>{name}</td>
      <td>${price}</td>
      <td>{description}</td>
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
          // onClick={() => confirmDeleteProduct(id)}
          onClick={() => confirmDeleteProduct(product)}
        >
          Eliminar{" "}
        </button>
      </td>
    </tr>
  );
};

export default Producto;
