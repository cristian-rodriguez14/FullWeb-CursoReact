import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUserAction } from "../actions/userActions";
import { useHistory } from "react-router";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const UserLogin = useSelector((state) => state.users.log);
  const CloseLogin = () => dispatch(LogoutUserAction());
  const CloseSesion = () => {
    CloseLogin();
    history.push("/");
  };
  return (
    <>
    {UserLogin === null ? (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
      <div className="container">      
        <h1>
          <Link to={"/"} className="text-light">
            Cualquier Titulo por ahora
          </Link>
        </h1>
      </div>
      <Link
        to={"/products/new"}
        className="btn btn-danger nuevo-post d-block d-md-inline-block mr-4"
      >
        Agregar Producto &#43;
      </Link>
      <Link
        to={"/users/new"}
        className="btn btn-danger nuevo-post d-block d-md-inline-block"
      >
        Agregar Usuario &#43;
      </Link>
    </nav>
      ) : (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
        <div className="container">      
          <h1>Bienvenido {UserLogin}
          </h1>
        </div>
        <button
          type="button"
          onClick={CloseSesion}
          className="btn btn-primary mr-2"
        >
          Cerrar Sesion
        </button>
      </nav>
      )}
    </>
  );
};

export default Header;
