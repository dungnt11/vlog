import React, { Component } from "react";

import "./Login.css";

import { withRouter } from "react-router-dom";
import _ from "lodash";
// connect redux
import { connect } from "react-redux";
// load action
import { loginStartAction } from "../../actions/login";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pwd: ""
    };
  }

  loginEvent = event => {
    event.preventDefault();
    let { email, pwd } = this.state;

    email = _.trim(email);
    pwd = _.trim(pwd);

    // check empty
    if (!(_.isEmpty(email) || _.isEmpty(pwd))) {
      let userLogin = {
        email,
        pwd
      };
      this.props.loginAction(userLogin, this.props.history);
    }
  };

  watchChange = event => {
    // theo dõi và gán dữ liệu trở lại state
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    let { email, pwd } = this.props.err;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 text-center">
            <h1>Đăng nhập</h1>
          </div>
          <form onSubmit={this.loginEvent}>
            <div className="input-field col s12 m6">
              <input
                name="email"
                onChange={this.watchChange}
                value={this.state.email}
                id="email"
                type="email"
                className="validate"
              />
              <label className="blue-text" htmlFor="email">
                Email
              </label>
              {email ? <span className="red-text">{email} !</span> : ""}
            </div>
            <div className="input-field col s12 m6">
              <input
                name="pwd"
                onChange={this.watchChange}
                value={this.state.pwd}
                id="password"
                type="password"
                className="validate"
              />
              <label className="blue-text" htmlFor="password">
                Password
              </label>
              {pwd ? <span className="red-text">{pwd} !</span> : ""}
            </div>
            <button
              className="btn waves-effect waves-light col s12 m12"
              type="submit"
              name="action"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

let mapStateToDispatch = dispatch => ({
  loginAction: (user, history) => dispatch(loginStartAction(user, history))
});

let mapStateToProps = ({ err }) => ({
  err
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(withRouter(Login));
