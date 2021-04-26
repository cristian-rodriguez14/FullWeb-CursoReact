import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createUserAction } from "../actions/userActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";
import { useHistory } from "react-router";
import { storage } from "../config/firebase";
// import { auth } from "../config/firebase";

const NewUser = () => {
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(0);
  const [role, setRole] = useState("User");
  const [state, setState] = useState(true);
  const [confirmar, setConfirmar] = useState(0);
  const [btnclick, setBtnclick] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const UploadImage = (e) => {
    setPhoto(e.target.files[0]);
  };

  const guardarImagen = () => {
    const uploadTask = storage.ref(`images/Users/${photo.name}`).put(photo);
    uploadTask.on(() => {
      storage
        .ref("images/Users")
        .child(photo.name)
        .getDownloadURL()
        .then((url) => {
          setPhoto(url);
          setBtnclick(true);
          const alerta = {
            msg: "Imagen Subida exitosamente",
            classes: "alert alert-success text-center text-uppercase p3",
          };
          dispatch(mostrarAlerta(alerta));
        });
    });
  };

  const cargando = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  const addUser = (user) => dispatch(createUserAction(user));

  const submitNew = (e) => {
    dispatch(ocultarAlertaAction());
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      } 
      dispatch(mostrarAlerta(alerta));

      return;
    } else if (password.length < 6) {
      const alerta = {
        msg: "Contraseña es muy corta. Minimo 6 caracteres",
        classes: "alert alert-danger text-center text-uppercase p3",
      } 
      dispatch(mostrarAlerta(alerta));

      return;
    } else if (password !== confirmar) {
      const alerta = {
        msg: "Contraseñas no coinciden",
        classes: "alert alert-danger text-center text-uppercase p3",
      } 
      dispatch(mostrarAlerta(alerta));

      return;
    }
    dispatch(ocultarAlertaAction());
    if (btnclick === true) {
      addUser({ photo, email, password, role, state });
      history.push("/users");
      return;
    } else {
      const alerta = {
        msg: "Por favor suba una imagen",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));
    }
    dispatch(ocultarAlertaAction());
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
            <img
              src={photo}
              alt=""
              style={{ maxHeight: "200px", maxWidth: "200px" }}
            />
            <form onSubmit={submitNew}>
              <div className="form-group">
                <label htmlFor="photo">Imagen del Usuario</label>

                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  onChange={UploadImage}
                />
                <button onClick={guardarImagen} className="btn btn-primary">
                  Guardar Imagen
                </button>
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
                <label htmlFor="confirmar">Confirmar Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Escriba la Contraseña"
                  name="confirmar"
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
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
