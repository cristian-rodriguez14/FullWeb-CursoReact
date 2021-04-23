import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewUserAction } from "../actions/userActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

const NewUser = ({ history }) => {
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(0);
  const [rol, setRol] = useState("User");
  const [state, setState] = useState(true);

  const dispatch = useDispatch();

  const cargando = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  const addUser = (user) => dispatch(addNewUserAction(user));

  const submitNew = (e) => {
    e.preventDefault();
    if (photo.trim() === "") {
      setPhoto("Default.png");
    }
    if (email.trim() === "" || password.trim() === "" || rol.trim() === "") {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));

      return;
    }
    dispatch(ocultarAlertaAction());
    addUser({ photo, email, password, rol, state });
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Usuario
            </h2>
            {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null}
            <form onSubmit={submitNew}>
              <div className="form-group">
                <label htmlFor="photo">Imagen del Usuario</label>
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.files)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Nombre Usuario</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
              <input
                  type="hidden"
                  className="form-control"
                  name="rol"
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                />
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

export default NewUser;
