import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserAction } from "../actions/userActions";
import { useHistory } from "react-router-dom";

const UpdateUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    photo: "",
    email: "",
    password: "",
    rol: "user",
    state: true,
  });

  const edituser = useSelector((state) => state.users.edituser);

  useEffect(() => {
    setUser(edituser);
  }, [edituser]);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const { photo, email, rol, state } = user;

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(editUserAction(user));

    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Usuario
            </h2>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="photo">Imagen del Usuario</label>
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  value={photo}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="rol">rol</label>
                <input
                  type="hidden"
                  className="form-control"
                  name="rol"
                  value={rol}
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
