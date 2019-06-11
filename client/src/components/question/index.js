import React, { Component } from "react";
import Question from "./Question";
import Sidebar from "../aside/Sidebar";

export default class index extends Component {
  render() {
    return (
      <div className="container">
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
