import React from "react";

// interface, input, output

const ListGroup = props => {
  return (
    <ul className="list-group">
      {props.items.map(i => (
        <li key={i._id} className="list-group-item">
          {i.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
