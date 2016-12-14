import React, { Component } from 'react';
import { Link } from 'react-router';
import './movie.css';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {movie: null}
  }

  componentWillMount() {
    let link = `https://api.themoviedb.org/3/movie/${this.props.params.movieId}?api_key=4fca08f368f9ca63a21e4db9786b21a7&language=en-US`
    console.log(link);
    fetch(link)
      .then(res => res.json())
      .then((results) => (
        this.setState({movie: results})
      )).catch(e => e.message)
  }

  render() {
    console.log(this.state.movie);
    let imgBaseLink= 'http://image.tmdb.org/t/p/';
    let size = 'original';
    let movie = this.state.movie;
    if (movie !== null)
      return (
        <div className="movie-wrapper">
          <div className="movie">
            <img className="movie-poster" src={movie.poster_path ? imgBaseLink.concat(size, movie.poster_path) : ''} alt={movie.title}/>
            <h2 className="movie-title">{movie.title}</h2>
            <div className="movie-genre">
              {/*<span className="movie-genre-label">Genre</span>*/}
              <div className="movie-genre-list">
                {movie.genres.map(({ name }) => (
                  <Link to={`/discover?genre=${name.toLowerCase()}`} className="movie-genre-link">{name}</Link>
                ))}
              </div>
            </div>
            <div className="movie-description">{movie.overview}</div>
          </div>
        </div>
      )
    else return null;
  }
}

export default Movie;