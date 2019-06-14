import React, { Component } from "react";

import "./Input.css";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  _updateTitle = newTitle => {
    let title = newTitle.target.value;
    this.setState({ title });
    this.props.updateTitle(title);
  };
  render() {
    const { title } = this.state;
    const { type, placeholder } = this.props;
    return (
      <input
        value={title}
        onChange={this._updateTitle}
        type={type}
        placeholder={placeholder}
        className="input-form"
      />
    );
  }
}
