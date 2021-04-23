import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewProdAction, addNewImageAction } from "../actions/productActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";
import {useHistory} from "react-router";

const NewProd = () => {
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [state, setState] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  const UploadImage = (e) => {
    setImageName(e.target.files[0].name);
    setImage(e.target.files[0]);
  }

  const cargando = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  const addProduct = (product) => dispatch(addNewProdAction(product));
  const addImage = (image) => dispatch(addNewImageAction(image));

  const submitNew = (e) => {
    e.preventDefault();
    if (imageName.trim() === "") {
      setImage("Default.png");
    }
    if (name.trim() === "" || price.trim() <= 0 || description.trim() === "") {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));

      return;
    }
    dispatch(ocultarAlertaAction());
    addImage({image});
    addProduct({ imageName, name, price, description, state });
    history.push("/products");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null}
            <form onSubmit={submitNew}>
              <div className="form-group">
                <label htmlFor="image">Imagen del Producto</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  onChange={UploadImage}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="number">Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripcion</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProd;
