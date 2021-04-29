import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createCarAction,
  readCarAction,
  /* updateCarAction, */
} from "../actions/carActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";
import ShCar from "../components/Car";

export default function ShopCar({ userId, carId }) {
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const cargarCarrito = () => dispatch(readCarAction());
    cargarCarrito();
    // eslint-disable-next-line
  }, []);

  const { cars } = useSelector((state) => state.cars);
  const error = useSelector((state) => state.cars.error);
  const cargando = useSelector((state) => state.cars.loading);
  const alerta = useSelector((state) => state.alerta.alerta);
  // Actualiza la cantidad de productos en el carrito
  /* const editcar = useSelector((state) => state.cars.carroeditar); */
  
  /* useEffect(() => {
    setProduct(editproduct);
  }, [editproduct]); */

  /* const onChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }; */

  const addToCar = (car) => dispatch(createCarAction(car));

  const submitNew = (e) => {
    e.preventDefault();

    if (quantity.trim() <= 0) {
      const alerta = {
        msg: "Escriba una cantidad valida",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));

      return;
    }
    // Para editar
    // dispatch(updateProductAction(product));
    // Para añadir
    dispatch(ocultarAlertaAction());
    addToCar({
      userId: userId,
      caro: { carId: carId, cantidad: quantity },
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body"></div>
          <h2 className="text-center mb-4 font-weight-bold">
            Agregar a Mi Carrito de Compras
          </h2>
          {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null}
          {error ? (
            <p className="font-weight-bold alert alert-danger text-center mt-4">
              Hubo un error
            </p>
          ) : null}

          {cargando ? <p className="text-center">Cargando....</p> : null}
          <form onSubmit={submitNew}>
            <div className="form-group">
              <label htmlFor="name">Nombre Producto</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre Producto"
                name="name"
                value={carId}
                disabled="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Cantidad</label>
              <input
                type="number"
                className="form-control"
                placeholder="Precio Producto"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </form>
          {cars.length === 0
            ? null // Message
            : cars.map((car) => {
                return <ShCar key={car.id} car={car} />;
              })}
        </div>
      </div>
    </div>
  );
}
