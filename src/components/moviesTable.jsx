import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import Heart from "./common/heart";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      path: "like",
      content: movie => (
        <Heart clicked={() => this.props.onLike(movie)} liked={movie.liked} />
      )
    },
    {
      path: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie._id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { movies, onLike, onDelete, onSort, sortColumn } = this.props;
    return (
      <table>
        <TableHeader
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody
          data={movies}
          columns={this.columns}
          onLike={onLike}
          onDelete={onDelete}
        />
      </table>
    );
  }
}

export default MoviesTable;
