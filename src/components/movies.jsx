import * as MovieService from "../services/fakeMovieService";
import * as GenreService from "../services/fakeGenreService";
import React, { Component } from "react";
// import Movie from "./movie";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: {},
    sortColumn: {}
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
      ],
      selectedGenre: {
        name: "All Genre",
        _id: ""
      },
      sortColumn: {
        path: "title",
        order: "asc"
      }
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

    this.setState({
      selectedGenre: genre,
      currentPage: 1
    });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
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
      pageSize,
      sortColumn
    } = this.state;
    if (selectedGenre.name !== "All Genre") {
      allMovies = allMovies.filter(m => m.genre.name === selectedGenre.name);
    }
    if (sortColumn.path !== "genre") {
      allMovies = _.orderBy(allMovies, [sortColumn.path], [sortColumn.order]);
    } else {
      // Beware of nested object values
      allMovies = _.orderBy(allMovies, m => m.genre.name, [sortColumn.order]);
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
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
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
