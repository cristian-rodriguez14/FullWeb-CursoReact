import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction, uploadImage } from "../actions/userActions";
import { useHistory } from "react-router-dom";

const UpdateUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    urlPhoto: "",
    email: "",
    password: "",
    role: "user",
    state: true,
  });

  const [image, setImage] = useState("")

  const edituser = useSelector((state) => state.users.usuarioeditar);
  const saveImage = (userImage) => dispatch(uploadImage(userImage));
  const url = useSelector((state) => state.users.url);

  useEffect(() => {
    setUser(edituser);
  }, [edituser]);

  const UploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  const guardarImagen = () => {
    saveImage({ image });
  };

  useEffect(() => {
    if(url!==null){
      user.urlPhoto = url
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const onChange = (e) => {
    
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const { urlPhoto, email, password, role, state } = user;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserAction(user));
    history.push("/users");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Usuario
            </h2>
            <button onClick={guardarImagen} className="btn btn-primary">
              Guardar Imagen
            </button>
            <form onSubmit={onSubmit}>
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
                <input
                  type="hidden"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control"
                  name="role"
                  value={role}
                  onChange={onChange}
                />
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

export default UpdateUser;
