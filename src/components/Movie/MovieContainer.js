import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './movie.css';
import { fetchMovieById, fetchMovieVideoById, clearState } from './MovieActions';

class Movie extends Component {
  componentWillMount() {
    this.props.clearState();
    this.id = this.props.params.movieId;
    this.props.onFetchMovieById(this.id, this.props.lang);
    //this.props.onFetchMovieVideoById(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lang !== this.props.lang) {
      console.log(nextProps.lang);
      this.props.clearState();
      this.props.onFetchMovieById(this.id, nextProps.lang);
    }

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
                {movie.genres.map(({ name, id }) => (
                  <Link key={name} to={`/discover?genre=${id}`} className="movie-genre-link">{name}</Link>
                ))}
              </div>
            </div>
            <div className="movie-description">{movie.overview}</div>
          </div>
          <div className="related-movies">

          </div>
        </div>
      );
    else return null;
  }
}

export default connect(
  state => ({
    movie: state.movie.movieDetails,
    trailerKey: state.movie.trailerKey,
    lang: state.language.lang
  }),
  dispatch => ({
    onFetchMovieById: (id, lang) => {
      dispatch(fetchMovieById(id, lang))
    },
    onFetchMovieVideoById: (id) => {
      dispatch(fetchMovieVideoById(id))
    },
    clearState: () => {
      dispatch(clearState())
    }
  })
)(Movie);