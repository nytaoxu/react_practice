import React, { Component } from "react";
import * as MovieService from "../services/fakeMovieService";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: props
    };
  }
  render() {
    const movie = this.state.movie;
    return (
      <tr key={movie._id} number={movie._id} className="Movie">
        <td style={{ fontWeight: "bold" }}>{movie.title}</td>
        <td>{movie.genre}</td>
        <td>{movie.stock}</td>
        <td>{movie.rate}</td>
        <td>
          <button
            onClick={e => {
              const number = e.target.parentNode.parentNode.getAttribute(
                "number"
              );
              console.log(number);
              MovieService.deleteMovie(number);
              this.setState({
                movie: {}
              });
              console.log(MovieService.getMovies().length);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
