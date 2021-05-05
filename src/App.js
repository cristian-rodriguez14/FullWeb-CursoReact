import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Inicio from "./Inicio";
import Login from "./pages/login/Login";
import Dashboard from "./components/App2";

import Themes from "./themes";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route path="/" exact>
            <Inicio />
          </Route>
          <Route path="/login" exact>
            <UserProvider>
              <ThemeProvider theme={Themes.default}>
                <Login />
              </ThemeProvider>
            </UserProvider>
          </Route>
          <Route path="/app/dashboard" exact>
            <LayoutProvider>
              <UserProvider>
                <ThemeProvider theme={Themes.default}>
                  <CssBaseline />
                  <Dashboard />
                </ThemeProvider>
              </UserProvider>
            </LayoutProvider>
          </Route>
          <Route path="/app/tables" exact>
            <LayoutProvider>
              <UserProvider>
                <ThemeProvider theme={Themes.default}>
                  <CssBaseline />
                  <Dashboard />
                </ThemeProvider>
              </UserProvider>
            </LayoutProvider>
          </Route>
          <Route path="/app/typography" exact>
            <LayoutProvider>
              <UserProvider>
                <ThemeProvider theme={Themes.default}>
                  <CssBaseline />
                  <Dashboard />
                </ThemeProvider>
              </UserProvider>
            </LayoutProvider>
          </Route>
          <Route path="/app/notifications" exact>
            <LayoutProvider>
              <UserProvider>
                <ThemeProvider theme={Themes.default}>
                  <CssBaseline />
                  <Dashboard />
                </ThemeProvider>
              </UserProvider>
            </LayoutProvider>
          </Route>
          <Route path="/app/ui" exact>
            <LayoutProvider>
              <UserProvider>
                <ThemeProvider theme={Themes.default}>
                  <CssBaseline />
                  <Dashboard />
                </ThemeProvider>
              </UserProvider>
            </LayoutProvider>
          </Route>
          <Route path="*" exact>
            <h1>Error 404 pagina no encontrada</h1>
          </Route>
        </Switch>
      </Provider>
    </Router>
  );
}
serviceWorker.unregister();
export default App;
