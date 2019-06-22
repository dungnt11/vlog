import React, { Component } from "react";
import "./Question.css";
export default class Question extends Component {
  componentDidMount() {
    
  }
  render() {
    return (
      <div className="question">
        <div className="g-topic">
          <div className="row">
            <div className="col m2">
              <div className="l1">
                <span>
                  <i className="material-icons">perm_contact_calendar</i>
                  about 5 hours ago
                </span>
              </div>
              <div className="l2">
                <div className="reply">
                  <i className="material-icons">reply</i>
                  <span>3</span>
                </div>
                <div className="vote">
                  <div className="_vote">
                    <i className="material-icons">arrow_drop_up</i>
                    <i className="material-icons">arrow_drop_down</i>
                  </div>
                  <span className="number_vote">1</span>
                </div>
                <div className="chat">
                  <i className="material-icons">chat_bubble</i>
                  <span className="_chat">1</span>
                </div>
                <div className="view">
                  <i className="material-icons">visibility</i>
                  <span className="_view">6</span>
                </div>
              </div>
            </div>
            {/*     and col md2 */}
            <div className="col m10">
              <div className="tit">
                <img
                  src="https://i.pinimg.com/originals/75/0a/a7/750aa7ad652919a638f6343887841e9f.jpg"
                  alt="img"
                  className="user_avatar"
                />
                <a href="/" className="user_name">
                  Nguyen Dung
                </a>
                <i className="material-icons">reply</i>
                <div className="reply_toppic">
                  <img
                    src="https://i.pinimg.com/originals/75/0a/a7/750aa7ad652919a638f6343887841e9f.jpg"
                    alt="img"
                    className="user_avatar"
                  />
                  <img
                    src="https://i.pinimg.com/originals/75/0a/a7/750aa7ad652919a638f6343887841e9f.jpg"
                    alt="img"
                    className="user_avatar"
                  />
                  <img
                    src="https://i.pinimg.com/originals/75/0a/a7/750aa7ad652919a638f6343887841e9f.jpg"
                    alt="img"
                    className="user_avatar"
                  />
                </div>
                {/*       and reply toppic */}
              </div>
              <div className="topicpre">
                <h3 className="title">
                  Hỏi về cách sử dụng font `Noto Sans CJK JP` cho web
                </h3>
                <div className="topic_tag">
                  <a href="/" className="_tag">
                    font
                  </a>
                  <a href="/" className="_tag">
                    css
                  </a>
                </div>
              </div>
            </div>
            {/*     and col m10 */}
          </div>
        </div>{" "}
        {/*<-- and question --> */}
      </div>
    );
  }
}
