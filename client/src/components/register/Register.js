import React, { Component, Fragment } from "react";
import "./Register.css";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerStart } from "../../actions/register";
import M from "materialize-css/dist/js/materialize.min.js";

class Register extends Component {
  componentDidMount() {
    M.AutoInit();
  }
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
      selectFile: "", // src avatar
      err: ""
    };

    this.progressPwd = React.createRef();
  }

  submitAction = event => {
    event.preventDefault();
    let { name, email, pwd, pwd1, sex, selectFile } = this.state;
    let fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    fd.append("pwd", pwd);
    fd.append("pwd1", pwd1);
    fd.append("sex", sex);
    fd.append("image", selectFile);
    this.props.register(fd, this.props.history);
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
    // xu ly va gan state khi thay doi gia tri trong form
    let { name, value, files } = event.target;
    this.setState({
      [name]: value
    });
    if (name === "file" && files[0]) {
      // fix trường hợp chọn xong ấn cancel
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

    if (name === "pwd") {
      let width = 0;
      // check độ phức tạp của mật khẩu
      if (value.match(/[0-9a-zA-Z]{2,}/)) {
        width += 25;
      }

      if (value.match(/[~<>?]+/)) {
        width += 25;
      }

      if (value.match(/[!@#$%^&*()]+/)) {
        width += 25;
      }
      if (value.match(/[0-9a-zA-Z]{10,30}/)) {
        width += 25;
      }
      this.progressPwd.current.style.width = width + "%";
    }
  };

  componentWillReceiveProps(newProps) {
    let err = newProps.error;
    if (err) {
      this.setState({
        err
      });
    }
  }

  render() {
    let { name, email, pwd, pwd1, sex, avatar } = this.state;
    let { err } = this.state;
    return (
      <Fragment>
        <div className="container">
          <h1>Đăng kí thành viên</h1>
          <form
            encType="multipart/form-data"
            onSubmit={this.submitAction}
            className="col s12"
          >
            <div className="row form-register">
              <div className="input-field col s12 m6">
                <input
                  value={name}
                  onChange={this.change}
                  name="name"
                  id="name"
                  type="text"
                  className="validate"
                />
                <label htmlFor="name">Họ tên &#42;</label>
                {err.name ? (
                  <span className="helper-text">{err.name}</span>
                ) : (
                  ""
                )}
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
                <label htmlFor="email">Email &#42;</label>
                {err.email ? (
                  <span className="helper-text">{err.email}</span>
                ) : (
                  ""
                )}
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
                <label htmlFor="pwd">Mật khẩu &#42;</label>
                <div className="progress">
                  <div ref={this.progressPwd} className="determinate" />
                </div>
                {err.pwd ? <span className="helper-text">{err.pwd}</span> : ""}
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
                <label htmlFor="pwd1">Nhập lại mật khẩu &#42;</label>
                {err.pwd1 ? (
                  <span className="helper-text">{err.pwd1}</span>
                ) : (
                  ""
                )}
              </div>

              <div className="file-field col s12 m6 avatar">
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

const mapStateToProps = ({ err }) => ({
  error: err.err
});

const mapDispatchToProps = dispatch => ({
  register: (user, history) => dispatch(registerStart(user, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
