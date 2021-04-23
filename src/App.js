import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdmonUser from "./pages/AdmonUser";
import AdmonProd from "./pages/AdmonProd";
import NewUser from "./pages/NewUser";
import NewProd from "./pages/NewProd";
import UpdateUser from "./pages/UpdateUser";
import UpdateProd from "./pages/UpdateProd";
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
            <Route exact path="/"><Home /></Route>
            <Route exact path="/About"><About/></Route>
            <Route exact path="/Store"><Store/></Route>
            <Route exact path="/Login"><Login/></Route>
            <Route exact path="/Register"><Register/></Route>
            <Route exact path="/Users"><AdmonUser/></Route>
            <Route exact path="/Users/new"><NewUser/></Route>
            <Route exact path="/Users/edit/:id"><UpdateUser/></Route>
            <Route exact path="/products"><AdmonProd/></Route>
            <Route exact path="/products/new"><NewProd/></Route>
            <Route exact path="/products/edit/:id"><UpdateProd/></Route>
            <Route exact path="/ShopCar/:id"><ShopCar/></Route>
            <Route exact path="/Drinks"><Drinks/></Route>
          </Switch>
        </div>
        <Footer fecha={fecha} />
      </Provider>
    </Router>
  );
}

export default App;
