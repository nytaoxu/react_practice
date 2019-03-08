import * as MovieService from "../services/fakeMovieService";
import React, { Component } from "react";
import Movie from "./movie";
import Heart from "./heart";

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: MovieService.getMovies(),
      likes: {}
    };
    // this.state.movies.forEach(m => {
    //   this.state.liked[this.state.movies._id] = false;
    // });
  }
  handleClick = id => {
    // console.log(id);
    let likes = {};
    this.state.movies.forEach(m => {
      if (m._id === id) {
        likes[m._id] = !this.state.likes[m._id];
      } else {
        likes[m._id] = this.state.likes[m._id];
      }
    });
    this.setState({
      likes
    });
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
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.movies.map(movie => {
                    return (
                      <tr key={movie._id} number={movie._id} className="Movie">
                        <td style={{ fontWeight: "bold" }}>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                          <Heart
                            id={movie._id}
                            clicked={this.handleClick}
                            liked={this.state.likes[movie._id]}
                          />
                        </td>
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
            </React.Fragment>
          );
        })()}
      </div>
    );
  }
}
