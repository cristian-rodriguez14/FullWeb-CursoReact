import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LoginUserAction } from "../actions/userActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";
import { useHistory } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const cargando = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  const SignIn = (user) => dispatch(LoginUserAction(user));

  const submitLog = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      console.log("Entro aqui? 0")
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));

      return;
    } else {
      dispatch(ocultarAlertaAction());
      SignIn({ email, password });
      history.push("/users");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Inicie Sesion de Usuario
            </h2>
            {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null}
            <form onSubmit={submitLog}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
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
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Iniciar Sesion
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

export default Login;
