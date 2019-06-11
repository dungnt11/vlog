import React, { Component } from "react";
import "./Sidebar.css";
export default class Sidebar extends Component {
  render() {
    return (
      <div className="new-post">
        <a href="!#" className="_post-title">
          Bài viết mới
        </a>
        {/* and post title */}
        <div className="post-repeat">
          <div className="_post-repeat-title">
            <h4>Retrofit 2.6.0 và suspend fun cho Kotlin Coroutine</h4>
          </div>
          <div className="_post-repeat-info">
            <div className="view">
              <i className="material-icons">visibility</i>
              <span className="_view">6</span>
            </div>
            <div className="chat">
              <i className="material-icons">chat_bubble</i>
              <span className="_chat">1</span>
            </div>
            <div className="vote">
              <div className="_vote">
                <i className="material-icons">arrow_drop_up</i>
                <i className="material-icons">arrow_drop_down</i>
              </div>
              <span className="number_vote">1</span>
            </div>
            <div className="author">
              <a href="/">Nguyen Dung</a>
            </div>
          </div>
          {/* and child post repeat */}
        </div>
        {/* and post repeat */}
      </div>
    );
  }
}
