import React, { Component } from "react";
import { Link } from "react-router-dom";

// import css
import "./Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav id="main-nav">
        <div className="nav-wrapper white lighten-3">
          <div className="container">
            <Link to="/" className="red-text brand-logo">
              <img src="/img/logo.png" alt="logo" />
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link
                  className="waves-effect waves-dark btn-nav"
                  to="/register"
                >
                  Đăng kí
                </Link>
              </li>
              <li>
                <Link className="waves-effect waves-dark btn-nav" to="/login">
                  Đăng nhập
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
