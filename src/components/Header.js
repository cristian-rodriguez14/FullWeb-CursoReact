import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
      <div className="container">
        <h1>
          <Link to={"/"} className="text-light">
            Cualquir Titulo por ahora
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
  );
};

export default Header;
