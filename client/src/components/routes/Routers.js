import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";

import Login from '../login'

export default class Routers extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/login" component={ Login } />
      </Fragment>
    );
  }
}
