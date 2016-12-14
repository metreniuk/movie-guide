import React, { Component } from 'react';
import { Link } from 'react-router';
import '../General/general.css';
import './discover.css';

class Discover extends Component {
  constructor() {
    super();
    this.state = { movies: [] }
  }

  componentWillMount() {
    fetch('https://api.themoviedb.org/3/list/1?api_key=4fca08f368f9ca63a21e4db9786b21a7&language=en-US')
      .then(res => res.json())
      .then(({items}) => (
        this.setState({movies: items})
      )).catch(e => e.message)
  }
  render() {
    return (
      <div className="discover">
        <SearchBar />
        <MovieList movies={this.state.movies} />
      </div>
    )
  }
}

const SearchBar = () => (
  <div className="search-bar">
    <SearchField />
    <SearchFilter />
  </div>
);

const SearchFilter = () => (
  <div className="search-filter">
    <div className="search-filter-item"><button className="search-filter-link">Title</button></div>
    <div className="search-filter-item"><button className="search-filter-link">Genre</button></div>
    <div className="search-filter-item"><button className="search-filter-link">Year</button></div>
    <div className="search-filter-item"><button className="search-filter-link">Country</button></div>
  </div>
);

const SearchField = () => (
  <div className="search-field" >
    <input className="search-field-input" type="text" />
    <button className="search-field-btn">Search</button>
  </div>
);

const MovieList = (props) => {
  let movies = props.movies ? props.movies : [];
  let imgBaseLink= 'http://image.tmdb.org/t/p/';
  let size = 'w185';
  return (
    <div className="box-list movie-list">
      {movies.map(movie => (
        <Link to={`/movie/${movie.id}`} key={movie.id} className="box-item movie-item">
          <img className="movie-poster" src={imgBaseLink.concat(size, movie.poster_path)} alt={movie.title}/>
          <p className="movie-title">{movie.title}</p>
        </Link>
      ))}
    </div>
  )
};

MovieList.propTypes = {
  movies: React.PropTypes.array
};


export default Discover