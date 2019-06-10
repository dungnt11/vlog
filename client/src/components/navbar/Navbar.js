import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

// import css
import "./Navbar.css";
import { connect } from "react-redux";

import { loginSuccess } from "../../actions/login";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  componentWillReceiveProps(newProps) {
    let { token, isAuth } = newProps.statusLogin;
    if (token) {
      // nhan duoc token
      this.setState({
        isLogin: true
      });
      return;
    }
    if (!isAuth) {
      this.setState({
        isLogin: false
      });
      return;
    }
  }

  componentDidMount() {
    //set token from localstorage
    let token = JSON.parse(localStorage.getItem("jwt"));
    if (token) {
      this.setState({
        isLogin: true
      });
    }
  }

  render() {
    let { isLogin } = this.state;
    let { logout } = this.props;
    return (
      <Fragment>
        <nav id="main-nav">
          <div className="nav-wrapper white lighten-3">
            <div className="container">
              <Link to="/" className="red-text brand-logo">
                <img src="/img/logo.png" alt="logo" />
              </Link>
              <Link
                to="/#"
                data-target="mobile-demo"
                className="sidenav-trigger"
              >
                <i className="right material-icons">menu</i>
              </Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link className="btn-nav" to="/newpost">
                    Bài viết mới{" "}
                    <span>
                      <i className="right material-icons">fiber_new</i>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link className="btn-nav" to="/question">
                    Câu hỏi
                    <span>
                      <i className="right material-icons">question_answer</i>
                    </span>
                  </Link>
                </li>
                {isLogin ? (
                  <li>
                    <Link className="btn-nav" onClick={logout} to="/">
                      Đăng xuất
                      <span>
                        <i className="right material-icons">
                          sentiment_very_dissatisfied
                        </i>
                      </span>
                    </Link>
                  </li>
                ) : (
                  <Fragment>
                    <li>
                      <Link className="btn-nav" to="/register">
                        Đăng kí
                        <span>
                          <i className="right material-icons">tag_faces</i>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link className="btn-nav" to="/login">
                        Đăng nhập
                        <span>
                          <i className="right material-icons">
                            supervisor_account
                          </i>
                        </span>
                      </Link>
                    </li>
                  </Fragment>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* mobile navbar */}
        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to="/">Sass</Link>
          </li>
          <li>
            <Link to="/">Components</Link>
          </li>
          <li>
            <Link to="/">JavaScript</Link>
          </li>
        </ul>
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  statusLogin: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({ login }) => ({
  statusLogin: login
});

const mapStateToDispatch = dispatch => ({
  logout: () => dispatch(loginSuccess())
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Navbar);
