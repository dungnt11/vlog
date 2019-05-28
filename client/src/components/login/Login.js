import React, { Component } from "react";

import "./Login.css";

export default class Login extends Component {
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
    let userLogin = {
      email,
      pwd
    };
    console.log(userLogin);
  };

  watchChange = event => {
    // theo dõi và gán dữ liệu trở lại state
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
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
