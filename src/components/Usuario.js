import React from "react";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { suprUserAction, fillForm } from "../actions/userActions";

const Usuario = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const confirmDeleteUser = (user) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un usuario que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // pasarlo al action
        user.state = false;
        dispatch(suprUserAction(user));
      }
    });
  };

  const toEdit = (user) => {
    dispatch(fillForm(user));
    history.push(`/users/edit/${user.id}`);
  };

  return (
    <tr>
      <td><img src={user.photo} alt="" style={{maxHeight: "100px", maxWidth: "200px"}}/></td>
      <td>{user.email}</td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => toEdit(user)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmDeleteUser(user)}
        >
          Eliminar{" "}
        </button>
      </td>
    </tr>
  );
};

export default Usuario;
