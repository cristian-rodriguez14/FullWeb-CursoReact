import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../actions/userActions";
import { useHistory } from "react-router-dom";
import { storage } from "../config/firebase";

const UpdateUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    photo: "",
    email: "",
    password: "",
    role: "user",
    state: true,
  });

  const [image, setImage] = useState("")

  const edituser = useSelector((state) => state.users.usuarioeditar);

  useEffect(() => {
    setUser(edituser);
  }, [edituser]);

  const UploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  const guardarImagen = () => {
    const uploadTask = storage.ref(`images/Products/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images/Products")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            alert("Imagen Guardada exitosamente");
            setImage(url);
          });
      }
    );
  };

  const onChange = (e) => {
    user.photo = image;
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const { photo, email, password, role, state } = user;

  const onSubmit = (e) => {
    e.preventDefault();
    user.photo = image;
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
                  src={photo}
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
