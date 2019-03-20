import React from "react";

// interface, input, output

const ListGroup = props => {
  const { items, textProperty, valueProperty } = props;
  return (
    <ul className="list-group">
      {items.map(i => (
        <li key={i[valueProperty]} className="list-group-item">
          {i[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
