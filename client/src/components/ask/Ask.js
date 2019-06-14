import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Editor from "../editor";
import Input from "../Form/Input";
import Autocomplete from "../Form/Autocomplete";
import "./Ask.css";
import { loadTag } from "../../actions/load.action";

class Ask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * state nhan du lieu tu component con _state
       */
      tag: "",
      _title: "",
      _tag: [],
      _article: ""
    };
  }

  componentDidMount() {
    /**
     * Load tag in server
     */
    this.props.loadTag();
  }

  componentWillReceiveProps(p) {
    let tag = p.tag;
    if (tag) {
      this.setState({
        tag: tag.tag
      });
    }
  }

  updateTitleFromChildComponent = title => {
    this.setState({
      _title: title
    });
  };

  updateTagFromChildComponent = tag => {
    this.setState({
      _tag: tag
    });
  };

  updateArticleFromChildComponent = article => {
    this.setState({
      _article: article
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row ask">
          <div className="col s12">
            <Input
              updateTitle={this.updateTitleFromChildComponent}
              type="text"
              placeholder="Tiêu đề"
            />
          </div>
          <div className="col s12">
            <Autocomplete
              updateTag={this.updateTagFromChildComponent}
              tag={this.state.tag}
            />
          </div>
          <div className="col s12">
            <Editor updateArtice={this.updateArticleFromChildComponent} />
          </div>
          <div className="btn-ask">
            <button
              className="btn waves-effect waves-light blue accent-3"
              type="submit"
              name="action"
            >
              Đăng câu hỏi
              <i className="material-icons right">send</i>
            </button>
            {/* and question */}
            <Link to="/question">
              <button
                className="btn waves-effect waves-light red accent-3
              "
                type="submit"
                name="action"
              >
                Hủy bỏ
                <i className="material-icons right">do_not_disturb</i>
              </button>
            </Link>
            {/* and cancel */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tag }) => ({
  tag
});

const mapDispatchToProps = dispatch => ({
  loadTag: () => dispatch(loadTag())
});

/**
 * config prop type
 */

Ask.propTypes = {
  loadTag: PropTypes.func.isRequired,
  tag: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ask);
