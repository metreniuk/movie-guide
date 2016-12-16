import React, { Component } from 'react';
import { Link } from 'react-router';
import './discover.css';
import { connect } from 'react-redux';
import { fetchByTitle, fetchByGenre, fetchByYear, fetchByPerson, setSearchFilter, fetchGenres, clearState } from './DiscoverActions';

class Discover extends Component {
  constructor() {
    super();
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
  }

  onFetchByGenreName(name, genres = this.props.discoverGenres) {
    let [{ id }] = genres.filter(genre => genre.name === name.toLowerCase());
    this.props.onFetchByGenreId(id);
  }

  onFilterClick(filter) {
    this.props.onSetFilter(filter);
  }

  onSearchClick(query) {
    const { onFetchByTitle, onFetchByYear, onFetchByPerson } = this.props;
    switch (this.props.discoverFilter) {
      case 'title':
        onFetchByTitle(query);
        break;
      case 'genre':
        this.onFetchByGenreName(query);
        break;
      case 'year':
        onFetchByYear(query);
        break;
      case 'person':
        onFetchByPerson(query);
        break;
      default:
        onFetchByTitle(query);
    }
  }

  componentWillMount() {
    this.props.clearState()
    this.props.fetchGenres();
  }

  componentDidMount() {
    this.props.onSetFilter('title');
  }

  componentWillReceiveProps(nextProps) {
    //on redirect
    if(nextProps.discoverGenres && nextProps.location.query.genre && !nextProps.discoverResults) {
      console.log(nextProps.discoverGenres);
      this.props.onSetFilter('genre');
      this.onFetchByGenreName(this.props.location.query.genre, nextProps.discoverGenres);
    }
  }

  render() {
    return (
      <div className="discover">
        <SearchBar onSearchClick={this.onSearchClick}
                   onFilterClick={this.onFilterClick}
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
    discoverResults: state.discover.discoverResults,
    discoverFilter: state.discover.discoverFilter,
    discoverGenres: state.discover.discoverGenres
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
    },
    clearState: () => {
      dispatch(clearState())
    }
  })
)(Discover)