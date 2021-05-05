import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer.js";
import AdmonUser from "./pages/AdmonUser";
import AdmonProd from "./pages/AdmonProd";
import NewUser from "./pages/NewUser";
import NewProd from "./pages/NewProd";
import UpdateUser from "./pages/UpdateUser";
import UpdateProd from "./pages/UpdateProd";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Admin() {
  const fecha = new Date().getFullYear();
  return (
    <Router>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/About">
            <NewProd />
          </Route>
          <Route exact path="/Users">
            <AdmonUser />
          </Route>
          <Route exact path="/Users/new">
            <NewUser />
          </Route>
          <Route exact path="/Users/edit/:id">
            <UpdateUser />
          </Route>
          <Route exact path="/products">
            <AdmonProd />
          </Route>
          <Route exact path="/Admin/products/new">
            <NewProd />
          </Route>
          <Route exact path="/products/edit/:id">
            <UpdateProd />
          </Route>
          <Route exact path="/Admin/Drinks"></Route>
        </Switch>
      </div>
      <Footer fecha={fecha} />
    </Router>
  );
}

export default Admin;
