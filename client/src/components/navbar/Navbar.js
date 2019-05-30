import React, { Component } from "react";
import { Link } from "react-router-dom";

// import css
import "./Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav id="main-nav">
        <div className="nav-wrapper blue lighten-3">
          <Link to="/" className="red-text brand-logo">
            <img src="/img/logo.png" alt="logo" />
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link className="pink waves-effect waves-dark btn" to="/register">
                Register
              </Link>
            </li>
            <li>
              <Link className="blue waves-effect waves-light btn" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
