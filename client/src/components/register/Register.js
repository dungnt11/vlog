import React, { Component, Fragment } from "react";
import "./Register.css";

import M from "materialize-css/dist/js/materialize.min.js";

export default class Register extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <Fragment>
        <div className="container">
          <h1>Đăng kí thành viên</h1>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input id="name" type="text" className="validate" />
                <label htmlFor="name">Họ tên</label>
              </div>

              <div className="input-field col s6">
                <input id="email" type="text" className="validate" />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field col s6">
                <input id="pwd" type="password" className="validate" />
                <label htmlFor="pwd">Mật khẩu</label>
              </div>

              <div className="file-field col s6 input-field">
                <div className="btn">
                  <span>Ảnh đại diện</span>
                  <input type="file" />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>

              <div className="input-field col s12 m6">
                <select ref="dropdown" defaultValue="1" className="icons">
                  <option value disabled selected>
                    Choose your option
                  </option>
                  <option
                    value
                    data-icon="images/sample-1.jpg"
                    className="left"
                  >
                    example 1
                  </option>
                  <option value data-icon="images/office.jpg" className="left">
                    example 2
                  </option>
                  <option value data-icon="images/yuna.jpg" className="left">
                    example 3
                  </option>
                </select>
                <label>Images in select</label>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
