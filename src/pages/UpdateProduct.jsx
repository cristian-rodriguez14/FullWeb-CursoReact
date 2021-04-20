import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductAction } from "../actions/productActions";
import { useHistory } from "react-router-dom";

const UpdateProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    image: "",
    name: "",
    price: "",
    description: "",
    state: true,
  });

  const editproduct = useSelector((state) => state.products.editproduct);

  useEffect(() => {
    setProduct(editproduct);
  }, [editproduct]);

  const onChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const { image, name, price, description, state } = product;

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(editProductAction(product));

    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>Imagen del Producto</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  value={image}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label>Nombre Producto</label>
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
                <label>Precio Producto</label>
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
                <label>Descripcion</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={onChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Estado Producto</label>
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

export default UpdateProduct;
