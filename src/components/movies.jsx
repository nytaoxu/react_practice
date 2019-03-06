import * as MovieService from "../services/fakeMovieService";
import React, { Component } from "react";
import Movie from "./movie";

export default class Movies extends Component {
  state = {
    movies: MovieService.getMovies()
  };
  render() {
    return (
      <div className="Movies">
        {(() => {
          if (this.state.movies.length === 0) {
            return <h1>There are no movies in the database.</h1>;
          }
          return (
            <React.Fragment>
              <p>
                Showing {this.state.movies.length} movie
                {this.state.movies.length > 1 ? "s" : ""} in the database.
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.movies.map(movie => {
                    // return (
                    //   <Movie
                    //     key={movie._id}
                    //     _id={movie._id}
                    //     title={movie.title}
                    //     genre={movie.genre.name}
                    //     stock={movie.numberInStock}
                    //     rate={movie.dailyRentalRate}
                    //   />
                    // );
                    return (
                      <tr key={movie._id} number={movie._id} className="Movie">
                        <td style={{ fontWeight: "bold" }}>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                          <button
                            onClick={e => {
                              const number = e.target.parentNode.parentNode.getAttribute(
                                "number"
                              );
                              MovieService.deleteMovie(number);
                              this.setState({
                                movies: MovieService.getMovies()
                              });
                            }}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </React.Fragment>
          );
        })()}
      </div>
    );
  }
}
