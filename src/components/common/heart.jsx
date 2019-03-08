import React, { Component } from "react";

class Heart extends Component {
  render() {
    if (this.props.liked)
      return (
        <i
          onClick={() => this.props.clicked(this.props.id)}
          className="fa fa-heart"
        />
      );
    else
      return (
        <i
          onClick={() => this.props.clicked(this.props.id)}
          className="fa fa-heart-o"
        />
      );
  }
}

export default Heart;
