import React, { Component } from 'react';
import { Link } from 'react-router';
import './discover.css';
import { connect } from 'react-redux';
import { fetchByTitle, fetchByGenre, fetchByYear, fetchByPerson, setSearchFilter, fetchGenres } from './DiscoverActions';

class Discover extends Component {

  onFetchByGenreName(name) {
    let [{ id }] = this.props.discoverGenres.filter(genre => genre.name === name.toLowerCase());
    this.props.onFetchByGenreId(id);
  }

  onFilterClick(filter) {
    this.props.onSetFilter(filter);
  }

  onSearchClick(query) {
    switch (this.props.discoverFilter) {
      case 'title':
        this.props.onFetchByTitle(query);
        break;
      case 'genre':
        this.onFetchByGenreName(query);
        break;
      case 'year':
        this.props.onFetchByYear(query);
        break;
      case 'person':
        this.props.onFetchByPerson(query);
        break;
      default:
        this.props.onFetchByTitle(query);
    }
  }

  componentWillMount() {
    this.props.fetchGenres();
    this.props.onSetFilter('title');
    //on redirect to this page
    setTimeout(() => {
      if(this.props.location.query.genre) {
        this.props.onSetFilter('genre');
        console.log('hi')
        this.onFetchByGenreName(this.props.location.query.genre);
      }
    }, 500)
  }
  render() {
    return (
      <div className="discover">
        <SearchBar onSearchClick={this.onSearchClick.bind(this)}
          onFilterClick={this.onFilterClick.bind(this)}
          discoverFilter={this.props.discoverFilter}
        />
        <MovieList movies={this.props.discoverResults} />
      </div>
    )
  }
}

const SearchBar = ({onSearchClick, onFilterClick, discoverFilter}) => (
  <div className="search-bar">
    <SearchField onSearchClick={onSearchClick} />
    <SearchFilter onFilterClick={onFilterClick} discoverFilter={discoverFilter}/>
  </div>
);

const SearchFilter = ({ onFilterClick , discoverFilter}) => {
  let filters = ['title', 'genre', 'year', 'person']
  return (
  <div className="search-filter">
    {filters.map((filter) => {
      return <FilterLink key={filter} filter={filter} onFilterClick={onFilterClick} isActive={discoverFilter === filter ? 'is-active': ''}/>
    })}
  </div>
)};

const FilterLink = ({filter, onFilterClick, isActive}) => (
  <div className="search-filter-item">
    <button
      onClick={() => {
        return onFilterClick(filter)
      }}
      className={`btn search-filter-link ${isActive}`}>{filter}</button>
  </div>
)

const SearchField = ({onSearchClick}) => {
  let searchInput;
  return (
    <div className="search-field">
    <input className="input search-field-input" type="text" ref={input => searchInput = input}/>
    <button className="btn search-field-btn" onClick={() => onSearchClick(searchInput.value)}>Search</button>
  </div>
  )
};

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


export default connect(
  state => ({
    discoverResults: state.discoverResults,
    discoverFilter: state.discoverFilter,
    discoverGenres: state.discoverGenres
  }),
  dispatch => ({
    onFetchByTitle: (query) => {
      dispatch(fetchByTitle(query))
    },
    onFetchByGenreId: (genreId) => {
      dispatch(fetchByGenre(genreId))
    },
    onFetchByYear: (year) => {
      dispatch(fetchByYear(year))
    },
    onFetchByPerson: (query) => {
      dispatch(fetchByPerson(query))
    },
    onSetFilter: (filter) => {
      dispatch(setSearchFilter(filter))
    },
    fetchGenres: () => {
      dispatch(fetchGenres())
    }
  })
)(Discover)