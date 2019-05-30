import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";

import Login from "../login";
import Register from "../register";

export default class Routers extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Fragment>
    );
  }
}
