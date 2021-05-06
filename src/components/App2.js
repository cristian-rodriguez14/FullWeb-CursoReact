import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout/Layout";

// pages
import Error from "../pages/error/Error";
import Login from "../pages/login/Login";

// context
import { useUserState } from "../context/UserContext";

export default function App2() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
      <Route
        exact
        path="/app"
        render={() => <Redirect to="/app/dashboard" />}
      />
      <PrivateRoute path="/app" component={Layout} />
      <PublicRoute path="/login" component={Login} />
      <Route component={Error} />
    </Switch>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
