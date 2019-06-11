import React, { Component, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";

import Login from "../login";
import Register from "../register";
import Question from "../question";

export default class Routers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  componentDidMount() {
    //set token from localstorage
    let token = JSON.parse(localStorage.getItem("jwt"));
    if (token) {
      this.setState({
        isLogin: true
      });
    }
  }

  render() {
    let { isLogin } = this.state;
    return (
      <Fragment>
        <Route
          exact
          path="/login"
          render={
            () => (isLogin ? <Redirect to="/" /> : <Login />) // neu da login thi k vao duoc
          }
        />
        <Route
          exact
          path="/register"
          render={
            () => (isLogin ? <Redirect to="/" /> : <Register />) // neu da login thi k vao duoc
          }
        />
        <Route exact path="/question" component={Question} />
      </Fragment>
    );
  }
}
