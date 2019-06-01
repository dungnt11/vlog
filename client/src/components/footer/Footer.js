import React, { Component } from "react";

import "./Footer.css";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear()
    };
  }
  render() {
    let { year } = this.state;
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Footer Content</h5>
              <p className="grey-text text-lighten-4">
                You can use rows and columns here to organize your footer
                content.
              </p>
            </div>
            {/* tung cot */}
            <div className="col l2 offset-l2 s12">
              <h5 className="white-text text-header">Liên hệ</h5>
              <ul>
                <li>
                  <i className="material-icons">email</i>
                  <a className="grey-text text-lighten-3" href="#!">
                    nihilism.core@gmail.com
                  </a>
                </li>
                <li>
                  <i className="material-icons">local_phone</i>
                  <a className="grey-text text-lighten-3" href="#!">
                    0332593556
                  </a>
                </li>
              </ul>
            </div>
            {/* tung cot */}
            <div className="col l2 s12">
              <h5 className="white-text text-header">Liên hệ</h5>
              <ul>
                <li>
                  <i className="material-icons">email</i>
                  <a className="grey-text text-lighten-3" href="#!">
                    nihilism.core@gmail.com
                  </a>
                </li>
                <li>
                  <i className="material-icons">local_phone</i>
                  <a className="grey-text text-lighten-3" href="#!">
                    0332593556
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © {year} Copyright
            <a className="grey-text text-lighten-4 right" href="#!">
              More Links
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
