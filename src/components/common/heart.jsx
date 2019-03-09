import React from "react";

const Heart = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={props.clicked}
      className={classes}
    />
  );
};

export default Heart;
