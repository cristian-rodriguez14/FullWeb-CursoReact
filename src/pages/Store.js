import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { readProductAction, authListener } from "../actions/productActions";
import Producto from "../components/Producto";
import ShopCar from "./ShopCar";

const Store = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(" ");

  useEffect(() => {
    const cargarProductos = () => dispatch(readProductAction());
    cargarProductos();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (log !== null) {
      const usuarioLogueado = () => dispatch(authListener());
      usuarioLogueado();
      setUserId(products.user.id) 
    }
  // eslint-disable-next-line no-use-before-define
  }, [dispatch, log, products.user.id]);

  const { products } = useSelector((state) => state.products);
  const log = useSelector((state) => state.users.log);
  const error = useSelector((state) => state.products.error);
  const cargando = useSelector((state) => state.products.loading);

  return (
    <>
      <h2 className="text-center my-5">Productos Disponibles</h2>
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
                return product.state === true ? (
                  <>
                    <Producto key={product.id} product={product} />
                    <button name="add" className="btn btn-danger d-block d-md-inline-block" onClick={<ShopCar userId={userId} productId={product.id} />}></button>
                  </>
                ) : null;
              })}
        </tbody>
      </table>
    </>
  );
};

export default Store;
