import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getUserAction } from "../actions/userActions";
import Usuario from "../components/Usuario";
 
const AdmonUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const cargarUsuarios = () => dispatch(getUserAction());
    cargarUsuarios();
    // eslint-disable-next-line
  }, []);
  const users = useSelector((state) => state.users.users);
  const error = useSelector((state) => state.users.error);
  const cargando = useSelector((state) => state.users.loading);
  return (
    <>
      <h2 className="text-center my-5">Listado de Usuarios</h2>
      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un error
        </p>
      ) : null}

      {cargando ? <p className="text-center">Cargando....</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Foto</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Rol</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0
            ? "No hay nada"
            : (users.map((user) => (
                <Usuario key={user.id} user={user} />
              )))}
        </tbody>
      </table>
    </>
  );
};

export default AdmonUser;
