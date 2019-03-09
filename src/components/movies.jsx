import * as MovieService from "../services/fakeMovieService";
import React, { Component } from "react";
// import Movie from "./movie";
import Heart from "./common/heart";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

export default class Movies extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   movies: MovieService.getMovies()
    // };
    this.state = {
      movies: MovieService.getMovies(),
      currentPage: 1,
      pageSize: 4
    };
  }
  handleLike = movie => {
    // console.log(movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    // console.log(index);
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies
    });
  };
  handleDelete = id => {
    MovieService.deleteMovie(id);
    this.setState({
      movies: MovieService.getMovies()
    });
  };
  handlePageChange = pageNumber => {
    // console.log(pageNumber);
    this.setState({
      currentPage: pageNumber
    });
  };
  render() {
    const movies = paginate(
      this.state.movies,
      this.state.currentPage,
      this.state.pageSize
    );
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
                  {movies.map(movie => {
                    return (
                      <tr key={movie._id} number={movie._id} className="Movie">
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                          <Heart
                            clicked={() => this.handleLike(movie)}
                            liked={movie.liked}
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => this.handleDelete(movie._id)}
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
              <Pagination
                itemsCount={this.state.movies.length}
                currentPage={this.state.currentPage}
                pageSize={this.state.pageSize}
                onPageChange={this.handlePageChange}
              />
            </React.Fragment>
          );
        })()}
      </div>
    );
  }
}
