import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo

import google from "./google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  return (
    <div className="App">
      <Grid container className={classes.container}>
        <div className={classes.logotypeContainer}>imagen</div>

        <div className={classes.formContainer}>
          <div className={classes.form}>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => setActiveTabId(id)}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Login" classes={{ root: classes.tab }} />
              <Tab label="Nuevo Usuario" classes={{ root: classes.tab }} />
            </Tabs>
            {activeTabId === 0 && (
              <React.Fragment>
                <Typography variant="h1" className={classes.greeting}>
                  Gracias por Venir, Usuario
                </Typography>
                <Button size="large" className={classes.googleButton}>
                  <img
                    src={google}
                    alt="google"
                    className={classes.googleIcon}
                  />
                  &nbsp;Conectarme con Google
                </Button>
                <div className={classes.formDividerContainer}>
                  <div className={classes.formDivider} />
                  <Typography className={classes.formDividerWord}></Typography>
                  <div className={classes.formDivider} />
                </div>
                <Fade in={error}>
                  <Typography
                    color="secondary"
                    className={classes.errorMessage}
                  >
                    Algo paso con u Usuario o Contraseña, por favor intentelo de
                    nuevo{" "}
                  </Typography>
                </Fade>
                <TextField
                  id="email"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={loginValue}
                  onChange={(e) => setLoginValue(e.target.value)}
                  margin="normal"
                  placeholder="Ingrese su Usuario"
                  type="email"
                  fullWidth
                />
                <TextField
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  margin="normal"
                  placeholder="Ingrese su Contraseña"
                  type="password"
                  fullWidth
                />
                <div className={classes.formButtons}>
                  {isLoading ? (
                    <CircularProgress
                      size={26}
                      className={classes.loginLoader}
                    />
                  ) : (
                    <Button
                      disabled={
                        loginValue.length === 0 || passwordValue.length === 0
                      }
                      onClick={() =>
                        loginUser(
                          userDispatch,
                          loginValue,
                          passwordValue,
                          props.history,
                          setIsLoading,
                          setError
                        )
                      }
                      variant="contained"
                      color="secondary"
                      size="large"
                    >
                      Login
                    </Button>
                  )}
                  <Link
                    color="info"
                    size="large"
                    className={classes.forgetButton}
                    to="/"
                  >
                    VOLVER AL INICIO
                  </Link>
                </div>
              </React.Fragment>
            )}
            {activeTabId === 1 && (
              <React.Fragment>
                <Typography variant="h1" className={classes.greeting}>
                  Welcome!
                </Typography>
                <Typography variant="h2" className={classes.subGreeting}>
                  Create your account
                </Typography>
                <Fade in={error}>
                  <Typography
                    color="secondary"
                    className={classes.errorMessage}
                  >
                    Something is wrong with your login or password :(
                  </Typography>
                </Fade>
                <TextField
                  id="name"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  margin="normal"
                  placeholder="Full Name"
                  type="text"
                  fullWidth
                />
                <TextField
                  id="email"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={loginValue}
                  onChange={(e) => setLoginValue(e.target.value)}
                  margin="normal"
                  placeholder="Email Adress"
                  type="email"
                  fullWidth
                />
                <TextField
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  margin="normal"
                  placeholder="Password"
                  type="password"
                  fullWidth
                />
                <div className={classes.creatingButtonContainer}>
                  {isLoading ? (
                    <CircularProgress size={26} />
                  ) : (
                    <Button
                      onClick={() =>
                        loginUser(
                          userDispatch,
                          loginValue,
                          passwordValue,
                          props.history,
                          setIsLoading,
                          setError
                        )
                      }
                      disabled={
                        loginValue.length === 0 ||
                        passwordValue.length === 0 ||
                        nameValue.length === 0
                      }
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.createAccountButton}
                    >
                      Crear Cuenta
                    </Button>
                  )}
                </div>
                <div className={classes.formDividerContainer}>
                  <div className={classes.formDivider} />
                  <Typography className={classes.formDividerWord}>
                    or
                  </Typography>
                  <div className={classes.formDivider} />
                </div>
                <Button
                  size="large"
                  className={classnames(
                    classes.googleButton,
                    classes.googleButtonCreating
                  )}
                >
                  <img
                    src={google}
                    alt="google"
                    className={classes.googleIcon}
                  />
                  &nbsp;Conectarme con Google
                </Button>
              </React.Fragment>
            )}
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default withRouter(Login);
