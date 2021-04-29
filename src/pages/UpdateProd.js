import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction, uploadImage } from "../actions/productActions";
import { useHistory } from "react-router-dom";

const UpdateProd = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    imageTwo: "",
    name: "",
    price: "",
    description: "",
    state: "",
  });
  const [img, setimg] = useState("");

  const editproduct = useSelector((state) => state.products.productoeditar);
  const url = useSelector((state) => state.products.url);
  const saveImage = (productImage) => dispatch(uploadImage(productImage));

  useEffect(() => {
    setProduct(editproduct);
  }, [editproduct]);

  const UploadImage = (e) => {
    setimg(e.target.files[0]);
  };

  const guardarImagen = () => {
    saveImage({ img });
  };

  useEffect(() => {
    if (url !== null) {
      product.imageTwo = url;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const onChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const { imageTwo, name, price, description, state } = product;

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
                <label htmlFor="img">Imagen del Producto</label>
                <br />
                <img
                  src={imageTwo}
                  alt=""
                  style={{ maxHeight: "200px", maxWidth: "200px" }}
                />
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
