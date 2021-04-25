import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createProductAction /*, uploadImage, */,
} from "../actions/productActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";
import { useHistory } from "react-router";
import { storage } from "../config/firebase";

const NewProd = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [state, setState] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  // const saveImage = (productImage) => dispatch(uploadImage(productImage));

  const UploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  const guardarImagen = () => {
    const uploadTask = storage.ref(`images/Products/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images/Products")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            alert("Imagen Guardada exitosamente");
            setImage(url);
          });
      }
    );
  };

  /* useEffect(() => {
    if (image !== "") {
      saveImage({ image });
    }
    
  }, [image]); */

  const cargando = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  const addProduct = (product) => dispatch(createProductAction(product));

  const submitNew = (e) => {
    e.preventDefault();

    if (name.trim() === "" || price.trim() <= 0 || description.trim() === "") {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));

      return;
    }
    dispatch(ocultarAlertaAction());
    console.log("Ultimo paso", image);
    addProduct({ image, name, price, description, state });
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
                <label htmlFor="image">Imagen del Producto</label><br/>
                <img src={image} alt="" style={{maxHeight: "200px", maxWidth: "200px"}}/>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  onChange={UploadImage}
                />
                <button onClick={guardarImagen} className="btn btn-primary">
                  Guardar Imagen
                </button>
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
