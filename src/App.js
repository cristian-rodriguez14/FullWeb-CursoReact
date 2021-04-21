import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdmonUsers from "./pages/AdmonUsers";
import AdmonProd from "./pages/AdmonProd";
import NewUser from "./pages/NewUser";
import NewProduct from "./pages/NewProduct";
import UpdateUser from "./pages/UpdateUser";
import UpdateProduct from "./pages/UpdateProduct";
import ShopCar from "./pages/ShopCar";
import Drinks from "./pages/Drinks";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  const fecha = new Date().getFullYear();
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/About" component={About} />
            <Route exact path="/Store" component={Store} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Users" component={AdmonUsers} />
            <Route exact path="/Users/new" component={NewUser} />
            <Route exact path="/Users/edit/:id" component={UpdateUser} />
            <Route exact path="/products" component={AdmonProd} />
            <Route exact path="/products/new" component={NewProduct} />
            <Route exact path="/products/edit/:id" component={UpdateProduct} />
            <Route exact path="/ShopCar/:id" component={ShopCar} />
            <Route exact path="/Drinks" component={Drinks} />
          </Switch>
        </div>
        <Footer fecha={fecha} />
      </Provider>
    </Router>
  );
}

export default App;
