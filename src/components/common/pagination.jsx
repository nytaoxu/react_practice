import React from "react";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, onPageChange } = props;
  // const remainder = props.itemsCount % props.pageSize;
  // const pageNumber =
  //   Math.floor(props.itemsCount / props.pageSize) + (remainder === 0 ? 0 : 1);
  // better solution: pageNumber = Math.ceil(itemsCount / pageSize)
  const pageNumber = Math.ceil(itemsCount / pageSize);
  if (pageNumber <= 1) return null;
  const pages = _.range(1, pageNumber + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(p => (
          <li className="page-item" key={p}>
            <a className="page-link" onClick={() => onPageChange(p)}>
              {p}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
