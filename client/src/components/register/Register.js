import React, { Component, Fragment } from "react";
import "./Register.css";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerStart } from "../../actions/register";

import M from "materialize-css/dist/js/materialize.min.js";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      pwd: "",
      pwd1: "",
      avatar: "", // avatar preview
      sex: "Bí mật",
      choose: [
        {
          name: "Nam",
          avatarDefault: "img/men.png",
          value: "Nam"
        },
        {
          name: "Nữ",
          avatarDefault: "img/women.png",
          value: "Nữ"
        },
        {
          name: "Bí mật",
          avatarDefault: "img/anony.png",
          value: "Bí mật"
        }
      ],
      selectFile: "" // src avatar
    };
  }

  componentDidMount() {
    // khoi tao materialize event select
    M.AutoInit();
  }

  submitAction = event => {
    event.preventDefault();
    let { name, email, pwd, pwd1, sex, selectFile } = this.state;
    let file = selectFile.name;
    let user = {
      name,
      email,
      pwd,
      pwd1,
      sex,
      file
    };
    this.props.register(user, this.props.history);
  };

  sexSelect = () => {
    // render list gioi tinh
    return this.state.choose.map((e, i) => (
      <option
        key={i}
        value={e.value}
        data-icon={e.avatarDefault}
        className="left"
      >
        {e.name}
      </option>
    ));
  };

  change = event => {
    let { name, value, files } = event.target;
    // xu ly va gan state khi thay doi gia tri trong form
    this.setState({
      [name]: value
    });
    if (name === "file") {
      // xu li file
      let readFile = new FileReader();
      readFile.readAsDataURL(files[0]);
      readFile.onload = e => {
        this.setState({
          avatar: e.target.result
        });
      };
      this.setState({
        selectFile: event.target.files[0]
      });
    }
  };

  render() {
    let { name, email, pwd, pwd1, sex, avatar } = this.state;
    return (
      <Fragment>
        <div className="container">
          <h1>Đăng kí thành viên</h1>
          <form onSubmit={this.submitAction} className="col s12">
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  value={name}
                  onChange={this.change}
                  name="name"
                  id="name"
                  type="text"
                  className="validate"
                />
                <label htmlFor="name">Họ tên</label>
              </div>

              <div className="input-field col s12 m6">
                <input
                  value={email}
                  onChange={this.change}
                  name="email"
                  id="email"
                  type="email"
                  className="validate"
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field col s12 m6">
                <input
                  value={pwd}
                  onChange={this.change}
                  name="pwd"
                  id="pwd"
                  type="password"
                  className="validate"
                />
                <label htmlFor="pwd">Mật khẩu</label>
              </div>

              <div className="input-field col s12 m6">
                <input
                  value={pwd1}
                  onChange={this.change}
                  name="pwd1"
                  id="pwd1"
                  type="password"
                  className="validate"
                />
                <label htmlFor="pwd1">Nhập lại mật khẩu</label>
              </div>

              <div className="file-field col s12 m6 input-field">
                <div className="btn">
                  <span>Ảnh đại diện</span>
                  <input name="file" onChange={this.change} type="file" />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>

              <div className="input-field col s12 m6">
                <select
                  value={sex}
                  onChange={this.change}
                  name="sex"
                  className="icons"
                >
                  {this.sexSelect()}
                </select>
                <label>Giới tính ?</label>
              </div>

              <button
                className="btn red waves-effect waves-light modal-trigger"
                name="action"
                href="#modal1"
              >
                Xem trước
                <i className="material-icons right">visibility</i>
              </button>
            </div>
            {/* popup xac nhan upload anh */}
            <div id="modal1" className="modal">
              <div className="modal-content">
                <h4>Xem trước nội dung</h4>
                <p>Tên: {name}</p>
                <p>Email: {email}</p>
                <p>Giới tính: {sex}</p>
                {avatar ? (
                  <Fragment>
                    <p>Ảnh đại diện </p>
                    <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img
                          className="activator avatar-preview"
                          alt="avatar"
                          src={avatar}
                        />
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  ""
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="modal-close waves-effect waves-green btn-flat"
                  type="submit"
                >
                  Đồng ý !{" "}
                  <span>
                    <i className="material-icons">check_circle</i>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = () => {};

const mapDispatchToProps = dispatch => ({
  register: (user, history) => dispatch(registerStart(user, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
