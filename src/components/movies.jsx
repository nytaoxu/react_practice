import * as MovieService from "../services/fakeMovieService";
import * as GenreService from "../services/fakeGenreService";
import React, { Component } from "react";
// import Movie from "./movie";
import ListGroup from "./common/listGroup";
import Heart from "./common/heart";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null
  };

  componentDidMount() {
    this.setState({
      movies: MovieService.getMovies(),
      genres: [
        {
          name: "All Genre",
          _id: ""
        },
        ...GenreService.getGenres()
      ]
    });
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
    const newState = {
      movies: MovieService.getMovies()
    };
    // the following 'if' statement handles tha case in which
    // there are no more entries in current page.
    if (
      newState.movies.length <=
      (this.state.currentPage - 1) * this.state.pageSize
    ) {
      newState.currentPage = this.state.currentPage - 1;
    }
    this.setState(newState);
  };
  handlePageChange = pageNumber => {
    // console.log(pageNumber);
    this.setState({
      currentPage: pageNumber
    });
  };
  handleGenreSelect = genre => {
    /**
     *  structure of this.state
      state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4
      };
    */
    if (genre && genre.name === "All Genre") {
      this.setState({
        selectedGenre: null,
        currentPage: 1
      });
    } else {
      this.setState({
        selectedGenre: genre,
        currentPage: 1
      });
    }
  };
  render() {
    if (this.state.movies.length === 0) {
      return <h1>There are no movies in the database.</h1>;
    }
    let {
      genres,
      selectedGenre,
      movies: allMovies,
      currentPage,
      pageSize
    } = this.state;
    if (selectedGenre) {
      allMovies = allMovies.filter(m => m.genre.name === selectedGenre.name);
    }
    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <div className="Movies">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              onItemSelect={this.handleGenreSelect}
              selectedGenre={this.state.selectedGenre}
            />
          </div>
          <div className="col">
            <p>
              Showing {allMovies.length} movie
              {allMovies.length > 1 ? "s" : ""} in the database.
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
              itemsCount={allMovies.length}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
