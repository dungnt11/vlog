import React, { Component } from "react";
import { Link } from "react-router-dom";

//import component
import Question from "./Question";
import Sidebar from "../aside/Sidebar";
import "./Button.css";

export default class index extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 _btn">
            <Link to="/ask" className="btn-create">
              <b className="hide-on-mobile btn-floating btn-large cyan pulse">
                <i className="material-icons">edit</i>
              </b>
              <span>Tạo bài viết</span>
            </Link>
            <Link
              to="/ask"
              className="hide-on-desktop btn-floating btn-large cyan pulse"
            >
              <i className="material-icons">edit</i>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col m9 s12">
            <Question />
          </div>
          <div className="col m3 s12">
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }
}
