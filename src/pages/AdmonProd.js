import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getProdAction } from "../actions/productActions";
import Producto from "../components/Producto";

const AdmonProd = () => {
  const dispatch = useDispatch();
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(5);
  // const Message = "No hay ningun producto guardado"
  useEffect(() => {
    const cargarProductos = () => dispatch(getProdAction());
    cargarProductos();
    // eslint-disable-next-line
  }, []);
  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const cargando = useSelector((state) => state.products.loading);

  useEffect(() => {
    const imagenesPorPagina = 5;
    const rta = products.length;
    const calcularTotalPaginas = Math.ceil(rta / imagenesPorPagina);
    guardarTotalPaginas(calcularTotalPaginas);
  }, [products, paginaactual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    console.log(nuevaPaginaActual);
    if (nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  };

  // definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    console.log(nuevaPaginaActual);
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
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0
            ? null // Message
            : products.map((product) => {
                return product.state === true ? (
                  <Producto key={product.id} product={product} />
                ) : null;
              })}
        </tbody>
      </table>
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
    </>
  );
};

export default AdmonProd;
