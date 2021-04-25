import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../actions/productActions";
import { useHistory } from "react-router-dom";
import { storage } from "../config/firebase";

const UpdateProd = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    image: "",
    name: "",
    price: "",
    description: "",
    state: "",
  });
  const [img, setimg] = useState("")

  const editproduct = useSelector((state) => state.products.productoeditar);

  useEffect(() => {
    setProduct(editproduct);
  }, [editproduct]);

  const UploadImage = (e) => {
    setimg(e.target.files[0]);
  };

  const guardarImagen = () => {
    const uploadTask = storage.ref(`images/Products/${img.name}`).put(img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images/Products")
          .child(img.name)
          .getDownloadURL()
          .then((url) => {
            alert("Imagen Guardada exitosamente");
            setimg(url);
          });
      }
    );
  };

  
  const onChange = (e) => {
    product.image=img
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const { image, name, price, description, state } = product;

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProductAction(product));

    history.push("/products");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            <button onClick={guardarImagen} className="btn btn-primary">
                  Guardar Imagen
                </button>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="img">Imagen del Producto</label><br />
                <img src={image} alt="" style={{maxHeight: "200px", maxWidth: "200px"}}/>
                <input
                  type="file"
                  className="form-control"
                  name="img"
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
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="price"
                  value={price}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripcion</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={onChange}
                ></textarea>
              </div>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control"
                  name="state"
                  value={state}
                  onChange={onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProd;
