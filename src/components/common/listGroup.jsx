import React from "react";

// interface, input, output

const ListGroup = props => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedGenre
  } = props;
  return (
    <ul className="list-group">
      {items.map(i => (
        <li
          key={i[valueProperty]}
          style={{ cursor: "pointer" }}
          className={"list-group-item" + (i === selectedGenre ? " active" : "")}
          onClick={() => onItemSelect(i)}
        >
          {i[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
