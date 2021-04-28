import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  LoginUserAction,
  GoogleLoginAction,
  FacebookLoginAction,
  readUserAction,
} from "../actions/userActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";
import { useHistory } from "react-router";

import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";
import FacebookLogin from "react-facebook-login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const cargando = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const alerta = useSelector((state) => state.alerta.alerta);
  const { users } = useSelector((state) => state.users);

  const [google, setGoogle] = useState(null);
  const [facebook, setFacebook] = useState(null);

  const CustomSignIn = (user) => dispatch(LoginUserAction(user));
  const GoogleSignIn = (data) => dispatch(GoogleLoginAction(data));
  const FacebookSignIn = (data) => dispatch(FacebookLoginAction(data));

  const responseGoogle = (response) => {
    setGoogle(response.profileObj);
    GoogleSignIn(response.profileObj);
  };

  const responseFacebook = (response) => {
    setFacebook(response);
    FacebookSignIn(response);
  };
  /* useEffect(() => {
    if (google !== null || facebook !== null) {
      history.push("/users");
    }
  }, [google, facebook, history]);   */
  useEffect(() => {
    const cargarUsuarios = () => dispatch(readUserAction());
    cargarUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitLog = (e) => {
    e.preventDefault();
    const resultado = users.find((emailuser) => emailuser.email === email);
    if (email.trim() === "" || password.trim() === "") {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));

      return;
    } else if (typeof resultado === "undefined") {
      const alerta = {
        msg: "Email no existe en la base de datos",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));

      return;
    } else {
      dispatch(ocultarAlertaAction());
      CustomSignIn({ email, password });
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
            <div className="row justify-content-center">
              <GoogleLogin
                clientId="397592795206-dvcvhmn1kkm80794obkla0rupmcvn9qi.apps.googleusercontent.com"
                render={(renderProps) => (
                  <GoogleButton
                    onClick={renderProps.onClick}
                    label="Login con Google"
                    type="dark"
                    style={{
                      backgroundColor: "#ffffff00",
                      color: "red",
                      borderRadius: 5,
                      border: "1px solid gray",
                    }}
                  >
                    Login con Google
                  </GoogleButton>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className="row justify-content-center">
              <FacebookLogin
                appId="265757501925318"
                autoLoad={false}
                fields="email,picture"
                onClick={responseFacebook}
                callback={responseFacebook}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
