import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createUserAction, uploadImage, readUserAction } from "../actions/userActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";
import { useHistory } from "react-router";

import Swal from "sweetalert2";

const NewUser = () => {
  const [photo, setPhoto] = useState("");
  const [urlPhoto, setUrlPhoto] = useState("https://firebasestorage.googleapis.com/v0/b/fullweb-reactcourse.appspot.com/o/images%2FUsers%2FDefault.png?alt=media&token=f77bd04f-3218-4756-bc7b-8255a8287496");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(0);
  const [role] = useState("User");
  const [state] = useState(true);
  const [confirmar, setConfirmar] = useState(0);
  const [btnclick, setBtnclick] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const saveImage = (userImage) => dispatch(uploadImage(userImage));

  const UploadImage = (e) => {
    setPhoto(e.target.files[0]);
  };

  const guardarImagen = () => {
    saveImage({ photo });
    setBtnclick(true);
    setPhoto()
  };

  const cargando = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const alerta = useSelector((state) => state.alerta.alerta);
  const url = useSelector((state) => state.users.url);
  const { users } = useSelector((state) => state.users);
  useEffect(() => {
    const cargarUsuarios = () => dispatch(readUserAction());
    cargarUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(url!==null){
      setUrlPhoto(url)
    }
  }, [url]);

  const addUser = (user) => dispatch(createUserAction(user));

  const submitNew = (e) => {   
    e.preventDefault();
    const resultado = users.find((emailuser) => emailuser.email === email);
    
    if (email.trim() === "" || password.trim() === "") {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));

      return;
    } else if (password.length < 6) {
      const alerta = {
        msg: "Contraseña es muy corta. Minimo 6 caracteres",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));

      return;
    } else if (password !== confirmar) {
      const alerta = {
        msg: "Contraseñas no coinciden",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));

      return;
    } else if (typeof resultado !== "undefined") {
      const alerta = {
        msg: "El usuario ya existe",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));

      return;
    }
    dispatch(ocultarAlertaAction());
    if (btnclick === true) {      
      addUser({ urlPhoto, email, password, role, state });      
      history.push("/users");
    } else {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Se recomienda guardar una imagen del usuario",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          addUser({ urlPhoto, email, password, role, state });          
          history.push("/users");
        }
      });
    }
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
            <button onClick={guardarImagen} className="btn btn-primary">
                  Guardar Imagen
                </button>
            <form onSubmit={submitNew}>
              <div className="form-group">
                <label htmlFor="photo">Imagen del Usuario</label><br />
                <img
              src={urlPhoto}
              alt=""
              style={{ maxHeight: "200px", maxWidth: "200px" }}
            />
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  onChange={UploadImage}
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
