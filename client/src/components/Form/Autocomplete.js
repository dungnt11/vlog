import React, { Component } from "react";
import Chips from "react-chips";

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chips: []
    };
  }
  onChange = chips => {
    this.setState({ chips });
    this.props.updateTag(chips);
  };

  render() {
    let { tag } = this.props;
    return (
      <Chips
        value={this.state.chips}
        onChange={this.onChange}
        suggestions={[...tag]}
        placeholder="Thêm tag cho bài viết của bạn !"
        uniqueChips={true}
      />
    );
  }
}
