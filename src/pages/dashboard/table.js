import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  makeStyles,
  Container,
  Button,
  IconButton,
} from "@material-ui/core";
import { AddCircle, Edit, Delete } from "@material-ui/icons";
import { ScaleLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import firebase from "../../config/firebase";

// components
import PageTitle from "../../components/PageTitle";
import {
  getUsuarios,
  addUsuario,
  getCustomer,
  updateUsuario,
  deleteUsuario,
} from "./data/infoUsuarios";

import UsuarioDialog from "./addUsuario";

const Tabla = () => {
  const classes = useStyles();
  const [Tabla, setTabla] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState(true);
  const [custId, setCustId] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [role, setRole] = useState("user");
  const [state, setState] = useState("true");

  const override = `
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;

  const handleClose = () => {
    setOpen(false);
  };
  const handleNombre = (event) => {
    setNombre(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleRole = (event) => {
    setRole(event.target.value);
  };
  const handleState = (event) => {
    setState(event.target.value);
  };

  const handlePhoto = (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/images/Users/${file.name}`);
    const task = storageRef.put(file);
    setPhoto(event.target.value);
  };

  const getlist = async () => {
    try {
      setLoading(true);
      const list = await getUsuarios();
      setTabla(list);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const getOneCustomer = async (id) => {
    try {
      setFormMode(false);
      setOpen(true);
      setCustId(id);
      const response = await getCustomer(id);
      setNombre(response.nombre);
      setEmail(response.email);
      setRole(response.role);
      setPhoto(response.task);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await deleteUsuario(id);
      getlist();
      toast.success("Customer Deleted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAdd = () => {
    setOpen(true);
    setFormMode(true);
    setNombre("");
    setEmail("");
    setPhoto("");
    setRole("user");
    setState("true");
  };

  const addUsuarioHandler = async () => {
    try {
      const user = {
        nombre,
        email,
        role,
        photo,
        state,
      };
      if (formMode) {
        await addUsuario(user);
        toast.success("USUARIO REGISTRADO CORRECTAMENTE");
        getlist();
        setOpen(false);
        setNombre("");
        setEmail("");
        setPhoto("");
        setRole("user");
        setState("true");
      } else {
        await updateUsuario(custId, user);
        toast.success("usuario MODIFICADO CORRECTAMENTE");
        getlist();
        setOpen(false);
        setNombre("");
        setEmail("");
        setPhoto("");
        setRole("user");
        setState("true");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getlist();
  }, []);

  return (
    <>
      <ToastContainer />
      <PageTitle
        title="Usuarios Registrados"
        button={
          <Button
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<AddCircle />}
            onClick={handleAdd}
          >
            Registrar Usuario
          </Button>
        }
      />
      <Container classesName={classes.container}>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}></TableCell>
                <TableCell className={classes.head} align="center">
                  Nombre
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Correo Electronico
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Status
                </TableCell>
                <TableCell className={classes.head}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Tabla.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <ScaleLoader
                      css={override}
                      size={250}
                      color={"#eb4034"}
                      loading={loading}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {Tabla.map((cust) => (
                    <TableRow key={cust.id}>
                      <TableCell>
                        <img
                          src={cust.photo}
                          alt="blog story"
                          width="90"
                          height="80"
                        />
                      </TableCell>
                      <TableCell align="center">{cust.nombre}</TableCell>
                      <TableCell align="center">{cust.email}</TableCell>
                      <TableCell align="center">{cust.role}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          title="Editar Usuario"
                          aria-label="update customer"
                          onClick={() => getOneCustomer(cust.id)}
                        >
                          <Edit style={{ fontSize: 25 }} />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          title="Eliminar Usuario"
                          aria-label="delete customer"
                          onClick={() => deleteHandler(cust.id)}
                        >
                          <Delete style={{ fontSize: 25 }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <UsuarioDialog
          open={open}
          close={handleClose}
          formmode={formMode}
          nombre={nombre}
          email={email}
          photo={photo}
          role={role}
          changeNombre={handleNombre}
          changeEmail={handleEmail}
          changeRole={handleRole}
          changePhoto={handlePhoto}
          changeState={handleState}
          addUsuario={addUsuarioHandler}
        />
      </Container>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 850,
  },
  container: {
    marginTop: "10px",
  },
  title: {
    flex: "1 1 100%",
    padding: "20px",
  },
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    marginLeft: "-10px",
  },
}));

export default Tabla;
