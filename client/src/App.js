import React, { Component } from "react";
import "./App.css";
// router
import { BrowserRouter as Router } from "react-router-dom";

//import Provider
import { Provider } from "react-redux";

// import material css
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

// import cac component
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// import router
import Routers from "./components/routes/Routers";
// config store
import configureStore from "./store/index";
const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routers />
          <Footer />
        </Router>
      </Provider>
    );
  }
}
