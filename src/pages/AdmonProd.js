import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { readProductAction } from "../actions/productActions";
import Producto from "../components/Producto";

import { auth } from "../config/firebase";

const AdmonProd = () => {
  const dispatch = useDispatch();
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(5);
  const [userLog, setUserLog] = useState(null)

  useEffect(() => {
    const cargarProductos = () => dispatch(readProductAction());
    cargarProductos();
    // eslint-disable-next-line
  }, []);

  const { products } = useSelector((state) => state.products);
  const error = useSelector((state) => state.products.error);
  const cargando = useSelector((state) => state.products.loading);

  useEffect(() => {
    if(window.localStorage.getItem("accessToken") !== null) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUserLog(user)
        } 
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLog]);

  useEffect(() => {
    const imagenesPorPagina = 5;
    const rta = products.length;
    const calcularTotalPaginas = Math.ceil(rta / imagenesPorPagina);
    guardarTotalPaginas(calcularTotalPaginas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  };

  // definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  };
  return (
    <>
      <h2 className="text-center my-5">Listado de Productos</h2>
      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un error
        </p>
      ) : null}

      {cargando ? <p className="text-center">Cargando....</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Imagen</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Descripción</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0
            ? null // Message
            : products.map((product) => {
                return <Producto key={product.id} product={product} />;
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

export default AdmonProd;
