import React from "react";
import Heart from "./common/heart";

const MoviesTable = props => {
  const { movies, onLike, onDelete, onSort } = props;
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort("title")}>Title</th>
          <th onClick={() => onSort("genre")}>Genre</th>
          <th onClick={() => onSort("numberInStock")}>Stock</th>
          <th onClick={() => onSort("dailyRentalRate")}>Rate</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => {
          return (
            <tr key={movie._id} number={movie._id} className="Movie">
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Heart clicked={() => onLike(movie)} liked={movie.liked} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie._id)}
                  className="btn btn-danger btn-sm m-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MoviesTable;
