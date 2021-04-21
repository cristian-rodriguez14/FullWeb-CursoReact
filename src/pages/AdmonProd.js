import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getProdAction } from "../actions/productActions";
import Producto from "../components/Producto";
 
const AdmonProd = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const cargarProductos = () => dispatch(getProdAction());
    cargarProductos();
    // eslint-disable-next-line
  }, []);
  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const cargando = useSelector((state) => state.products.loading);
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
            ? "No hay nada"
            : (products.map((product) => (
                <Producto key={product.id} product={product} />
              )))}
        </tbody>
      </table>
    </>
  );
};

export default AdmonProd;
