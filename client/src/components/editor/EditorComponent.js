import React, { Component } from "react";

import "jodit";
import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";

export default class EdittorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  updateContent = value => {
    this.setState({ content: value });
    this.props.updateArtice(value);
  };

  jodit;
  setRef = jodit => (this.jodit = jodit);

  config = {
    uploader: {
      url: "/upload",
      filesVariableName: "images", // ten file multer.eny('<-- ten file here -->')
      pathVariableName: "path",
      prepareData: function(data) {
        return data;
      },
      isSuccess: function(resp) {
        return !resp.error;
      },
      process: function(resp) {
        /**
         * resp : response tra ve tu server 
         * {
            msg: "File was uploaded",
            error: 0,
            images: ["/url_image.png"]
          }
         */
        return {
          files: resp[this.options.filesVariableName] || [],
          baseurl: "http://localhost:8080/public/uploads/",
          error: resp.error,
          msg: resp.msg
        };
      },
      error: function(e) {
        console.log(e);
      }
    }
  };
  render() {
    return (
      <JoditEditor
        editorRef={this.setRef}
        value={this.state.content}
        config={this.config}
        onChange={this.updateContent}
      />
    );
  }
}
