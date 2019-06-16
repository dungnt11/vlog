import React, { Component, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

import Login from "../login";
import Register from "../register";
import Question from "../question";
import Ask from "../ask";
import setHeader from "../../configs/axios.config";

class Routers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  componentDidMount() {
    //set token from localstorage
    let token = JSON.parse(localStorage.getItem("jwt"))
      ? JSON.parse(localStorage.getItem("jwt")).token
      : "";
    if (token) {
      this.setState({
        isLogin: true
      });
      setHeader(token); // set header neu da dang nhap
    }
  }

  componentWillReceiveProps(newProps) {
    let p = newProps.login ? newProps.login : false;
    if (p) {
      this.setState({
        isLogin: p.isAuth
      });
      setHeader(newProps.login.token);
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
        <Route
          path="/ask"
          render={() => (isLogin ? <Ask /> : <Redirect to="/" />)}
        />
      </Fragment>
    );
  }
}

Routers.propTypes = {
  login: propTypes.object.isRequired
};

const mapStateToProps = ({ login }) => ({
  login
});

export default connect(
  mapStateToProps,
  null
)(Routers);
