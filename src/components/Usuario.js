import React from "react";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deleteUserAction, setUser } from "../actions/userActions";

const Usuario = ({ user }) => {
  const { photo, email, password, rol, state, id } = user;

  const dispatch = useDispatch();
  const history = useHistory();

  const confirmDeleteUser = (id) => {
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
        dispatch(deleteUserAction(id));
      }
    });
  };

  const toEdit = (user) => {
    dispatch(setUser(user));
    history.push(`/users/edit/${user.id}`);
  };

  return (
    <tr>
      <td>{photo}</td>
      <td>{email}</td>
      <td>{password}</td>
      <td>{rol}</td>
      <td>{state}</td>
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
          onClick={() => confirmDeleteUser(id)}
        >
          Eliminar{" "}
        </button>
      </td>
    </tr>
  );
};

export default Usuario;
