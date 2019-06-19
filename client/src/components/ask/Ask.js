import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Editor from "../editor";
import Input from "../Form/Input";
import Autocomplete from "../Form/Autocomplete";
import "./Ask.css";
import { loadTag } from "../../actions/load.action";
import { startAsk } from "../../actions/article.actions";

import M from "materialize-css/dist/js/materialize.min.js";

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

    /**
     * chuyen huong sau khi up cau hoi thanh cong
     */
    let _aks = p.askReducer;
    if (_aks.msg) {
      M.toast({
        /**
         * @config sẽ chuyển hướng sau
         */
        displayLength: 1500,
        html: "Thêm câu hỏi thành công !",
        completeCallback: function() {
          window.location.href = "/";
        }
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

  submitAsk = () => {
    let { _article, _tag, _title } = this.state;
    const article = {
      title: _title,
      _tag,
      article: _article
    };
    this.props.sendAsk(article);
  };

  cancelAsk = () => {
    M.AutoInit();
    M.toast({
      /**
       * @config sẽ chuyển hướng sau
       */
      displayLength: 700,
      html: "Đã hủy thao tác !",
      completeCallback: function() {
        window.location.href = "/";
      }
    });
  };

  render() {
    let _askReducer = this.props.askReducer;
    if (_askReducer.err) {
      var { title, _tag, article } = _askReducer.err;
    }
    return (
      <div className="container">
        <div className="row ask">
          <div className="col s12">
            <Input
              updateTitle={this.updateTitleFromChildComponent}
              type="text"
              placeholder="Tiêu đề"
            />
            {title ? <span className="red-text">{title}</span> : ""}
          </div>
          <div className="col s12">
            <Autocomplete
              updateTag={this.updateTagFromChildComponent}
              tag={this.state.tag}
            />
            {_tag ? <span className="red-text">{_tag}</span> : ""}
          </div>
          <div className="col s12">
            <Editor updateArtice={this.updateArticleFromChildComponent} />
            {article ? <span className="red-text">{article}</span> : ""}
          </div>
          <div className="btn-ask">
            <button
              className="btn waves-effect waves-light blue accent-3"
              type="submit"
              name="action"
              onClick={this.submitAsk}
            >
              Đăng câu hỏi
              <i className="material-icons right">send</i>
            </button>
            {/* and question */}
            <button
              className="btn waves-effect waves-light red accent-3
              "
              type="submit"
              name="action"
              onClick={this.cancelAsk}
            >
              Hủy bỏ
              <i className="material-icons right">do_not_disturb</i>
            </button>
            {/* and cancel */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tag, askReducer }) => ({
  tag,
  askReducer
});

const mapDispatchToProps = dispatch => ({
  loadTag: () => dispatch(loadTag()),
  sendAsk: data => dispatch(startAsk(data))
});

/**
 * config prop type
 */

Ask.propTypes = {
  loadTag: PropTypes.func.isRequired,
  tag: PropTypes.object.isRequired,
  askReducer: PropTypes.object.isRequired,
  sendAsk: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ask);
