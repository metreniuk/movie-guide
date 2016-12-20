import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './movie.css';
import { fetchMovieById, clearState } from './MovieActions';
import { IMG_BASE_LINK, IMG_SIZE } from '../../constants';

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
    let movie = this.props.movie;
    let similarMovies = this.props.similarMovies;
    if (movie && similarMovies)
      return (
        <div className="movie-wrapper">
          <div className="movie">
            <iframe className="movie-trailer" width="420" height="315"
                    src={`https://www.youtube.com/embed/${trailerKey}`}>
            </iframe>
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
          <div className="similar-movies">
            {/*{similarMovies.map(({id, title, poster_path}) => {*/}
              {/*return <SimilarMovie id={id} title={title} poster_path={poster_path} />*/}
            {/*})}*/}
          </div>
        </div>
      );
    else return null;
  }
}

const SimilarMovie = ({id, title, poster_path}) => {
  return (
  <div key={id} className="similar-movie">
    <img className="similar-poster" src={poster_path ? IMG_BASE_LINK.concat(IMG_SIZE, poster_path) : ''} alt={title}/>
    <p>{title}</p>
  </div>)
};

export default connect(
  state => ({
    movie: state.movie.movieDetails,
    trailerKey: state.movie.trailerKey,
    similarMovies: state.movie.similarMovies,
    lang: state.language.lang
  }),
  dispatch => ({
    onFetchMovieById: (id, lang) => {
      dispatch(fetchMovieById(id, lang))
    },
    clearState: () => {
      dispatch(clearState())
    }
  })
)(Movie);