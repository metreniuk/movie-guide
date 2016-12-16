import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './movie.css';
import { fetchMovieById, fetchMovieVideoById, clearState } from './MovieActions';

class Movie extends Component {
  componentWillMount() {
    this.props.clearState();
    let id = this.props.params.movieId;
    this.props.onFetchMovieById(id);
    //this.props.onFetchMovieVideoById(id);
  }

  render() {

    let trailerKey = this.props.trailerKey;
    let imgBaseLink= 'http://image.tmdb.org/t/p/';
    let size = 'original';
    let movie = this.props.movie;
    if (movie)
      return (
        <div className="movie-wrapper">
          <div className="movie">
            <iframe className="movie-trailer" width="420" height="315"
                    src={`https://www.youtube.com/embed/${trailerKey}`}>
            </iframe>
            {/*<img className="movie-poster" src={movie.poster_path ? imgBaseLink.concat(size, movie.poster_path) : ''} alt={movie.title}/>*/}
            <h2 className="movie-title">{movie.title}</h2>
            <div className="movie-genre">
              <div className="movie-genre-list">
                {movie.genres.map(({ name }) => (
                  <Link key={name} to={`/discover?genre=${name.toLowerCase()}`} className="movie-genre-link">{name}</Link>
                ))}
              </div>
            </div>
            <div className="movie-description">{movie.overview}</div>
          </div>
          <div className="related-movies">

          </div>
        </div>
      )
    else return null;
  }
}

export default connect(
  state => ({
    movie: state.movie.movieDetails,
    trailerKey: state.movie.trailerKey
  }),
  dispatch => ({
    onFetchMovieById: (id) => {
      dispatch(fetchMovieById(id))
    },
    onFetchMovieVideoById: (id) => {
      dispatch(fetchMovieVideoById(id))
    },
    clearState: () => {
      dispatch(clearState())
    }
  })
)(Movie);