import React, { Component } from 'react';
import { Link } from 'react-router';
import './discover.css';
import { connect } from 'react-redux';
import { fetchByTitle, fetchByGenre, fetchByYear, fetchByPerson, setSearchFilter, fetchGenres, clearState } from './DiscoverActions';
import translations from '../../translations';
import {IMG_BASE_LINK, IMG_SIZE } from '../../constants';

class Discover extends Component {
  constructor() {
    super();
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
    this.lastQuery = 'comedy';
  }

  onFetchByGenreName(name, lang = this.props.lang, genres = this.props.discoverGenres) {
    console.log(genres);
    let [{ id }] = genres.filter(genre => genre.name === name.toLowerCase());
    this.props.onFetchByGenreId(id, lang);
  }

  onFilterClick(filter) {
    this.props.onSetFilter(filter);
  }

  onSearchClick(query = this.lastQuery, lang = this.props.lang) {
    const { onFetchByTitle, onFetchByYear, onFetchByPerson } = this.props;
    switch (this.props.discoverFilter) {
      case 'title':
        onFetchByTitle(query, lang);
        this.lastQuery = query;
        break;
      case 'genre':
        this.onFetchByGenreName(query, lang);
        this.lastQuery = query;
        break;
      case 'year':
        onFetchByYear(query, lang);
        this.lastQuery = query;
        break;
      case 'person':
        onFetchByPerson(query, lang);
        this.lastQuery = query;
        break;
      default:
        onFetchByTitle(query, lang);
        this.lastQuery = query;
    }
  }

  componentWillMount() {
    this.props.clearState();
    this.props.fetchGenres();
    this.props.onSetFilter('genre');
  }

  componentWillReceiveProps(nextProps) {
    //on redirect
    if(nextProps.discoverGenres && nextProps.location.query.genre && !nextProps.discoverResults) {
      this.props.location.search = '';
      this.props.onSetFilter('genre');
      this.props.onFetchByGenreId(this.props.location.query.genre, nextProps.lang);
    }

    if (nextProps.lang !== this.props.lang) {
      console.log(this.lastQuery);
      this.onSearchClick(this.lastQuery, nextProps.lang);
    }
  }

  render() {
    let lang = this.props.lang;
    if (lang) {
      let filters = [translations[lang].discover.searchBar.filters.title, translations[lang].discover.searchBar.filters.genre, translations[lang].discover.searchBar.filters.year, translations[lang].discover.searchBar.filters.person];
      let searchBtn = translations[lang].discover.searchBar.searchBtn;
      return (
        <div className="discover">
          <SearchBar onSearchClick={this.onSearchClick}
                     onFilterClick={this.onFilterClick}
                     discoverFilter={this.props.discoverFilter}
                     filters={filters}
                     searchBtn={searchBtn}

          />
          <MovieList movies={this.props.discoverResults} />
        </div>)
    }
  }
}

const SearchBar = ({onSearchClick, onFilterClick, discoverFilter, filters, searchBtn}) => (
  <div className="search-bar">
    <SearchField onSearchClick={onSearchClick} searchBtn={searchBtn} />
    <SearchFilter onFilterClick={onFilterClick} discoverFilter={discoverFilter} filters={filters}/>
  </div>
);

const SearchFilter = ({ onFilterClick , discoverFilter, filters}) => {
  return (
    <div className="search-filter">
      {filters.map((filter) => {
        return <FilterLink key={filter} filter={filter} onFilterClick={onFilterClick} isActive={discoverFilter === filter ? 'is-active': ''}/>
      })}
    </div>
  )
};

const FilterLink = ({filter, onFilterClick, isActive}) => (
  <div className="search-filter-item">
    <button
      onClick={() => {
        return onFilterClick(filter)
      }}
      className={`btn search-filter-link ${isActive}`}>{filter}</button>
  </div>
)

const SearchField = ({onSearchClick, searchBtn}) => {
  let searchInput;
  return (
    <div className="search-field">
      <input className="input search-field-input" type="text" ref={input => searchInput = input}/>
      <button className="btn search-field-btn" onClick={() => onSearchClick(searchInput.value)}>{searchBtn}</button>
    </div>
  )
};

const MovieList = (props) => {
  let movies = props.movies ? props.movies : [];
  return (
    <div className="box-list movie-list">
      {movies.map(movie => (
        <Link to={`/movie/${movie.id}`} key={movie.id} className="box-item movie-item">
          <img className="movie-poster" src={IMG_BASE_LINK.concat(IMG_SIZE, movie.poster_path)} alt={movie.title}/>
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
    discoverGenres: state.discover.discoverGenres,
    lang: state.language.lang
  }),
  dispatch => ({
    onFetchByTitle: (query, lang) => {
      dispatch(fetchByTitle(query, lang))
    },
    onFetchByGenreId: (genreId, lang) => {
      dispatch(fetchByGenre(genreId, lang))
    },
    onFetchByYear: (year, lang) => {
      dispatch(fetchByYear(year, lang))
    },
    onFetchByPerson: (query, lang) => {
      dispatch(fetchByPerson(query, lang))
    },
    onSetFilter: (filter) => {
      dispatch(setSearchFilter(filter))
    },
    fetchGenres: (lang) => {
      dispatch(fetchGenres(lang))
    },
    clearState: () => {
      dispatch(clearState())
    }
  })
)(Discover)