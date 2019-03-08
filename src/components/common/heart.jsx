import React, { Component } from "react";

class Heart extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";
    return (
      <i
        style={{ cursor: "pointer" }}
        onClick={this.props.clicked}
        className={classes}
      />
    );
  }
}

export default Heart;
