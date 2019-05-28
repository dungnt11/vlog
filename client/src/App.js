import React, { Component, Fragment } from "react";
import "./App.css";

// router
import { BrowserRouter as Router } from "react-router-dom";

// import material css
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

// import cac component
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// import router
import Routers from "./components/routes/Routers";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Navbar />
          <Routers />
          <Footer />
        </Router>
      </Fragment>
    );
  }
}
