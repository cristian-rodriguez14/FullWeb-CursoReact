import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { readUserAction } from "../actions/userActions";

import Usuario from "../components/Usuario";

const AdmonUser = () => {
  const dispatch = useDispatch();
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(5);

  useEffect(() => {
    const cargarUsuarios = () => dispatch(readUserAction());
    cargarUsuarios();
    // eslint-disable-next-line
  }, []);

  const { users } = useSelector((state) => state.users);
  const error = useSelector((state) => state.users.error);
  const cargando = useSelector((state) => state.users.loading);

  useEffect(() => {
    const imagenesPorPagina = 5;
    const rta = users.length;
    const calcularTotalPaginas = Math.ceil(rta / imagenesPorPagina);
    guardarTotalPaginas(calcularTotalPaginas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  };

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  };

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
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0
            ? null // Message
            : users.map((user) => {
                return user.state === true ? (
                  <Usuario key={user.id} user={user} />
                ) : null;
              })}
        </tbody>
      </table>
      <div className="row justify-content-center">
        {paginaactual === 1 ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo; Anterior{" "}
          </button>
        )}

        {paginaactual === totalpaginas ? null : (
          <button
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </>
  );
};

export default AdmonUser;
