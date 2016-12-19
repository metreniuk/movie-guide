import { SET_SEARCH_FILTER, SHOW_SEARCH_RESULTS, API_KEY, FETCH_GENRES, CLEAR_STATE } from '../../constants'

export const clearState = () => {
  return (dispatch) => {
    dispatch({type: CLEAR_STATE})
  }
};

export const setSearchFilter = (searchFilter) => ({
    type: SET_SEARCH_FILTER,
    searchFilter
  });

export const showSearchResults = (searchResults) => ({
    type: SHOW_SEARCH_RESULTS,
    searchResults
  }
);

export const fetchGenres = (lang) => {
  return (dispatch) => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${lang}`)
      .then(res => res.json())
      .then(({ genres }) => {
        genres = genres.map(({id, name}) => ({id, name: name.toLowerCase()}));
        dispatch({
          type: FETCH_GENRES,
          genres
        })
      })
  }
};

export const fetchByTitle = (query, lang) => {
  return (dispatch) => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=${lang}&query=${query}&page=1&include_adult=false`)
          .then(res => res.json())
          .then(({results}) => {
            let searchResults = results.map(({id, poster_path, title}) => (
              {
                id,
                poster_path,
                title
              }
            ));
            dispatch(showSearchResults(searchResults));
          })
          .catch(e => e.message)
  }
};

export const fetchByGenre = (genreId, lang) => {
  return (dispatch) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`)
      .then(res => res.json())
      .then(({results}) => {
        let searchResults = results.map(({id, poster_path, title}) => (
          {
            id,
            poster_path,
            title
          }
        ));
        dispatch(showSearchResults(searchResults));
      })
      .catch(e => e.message)
  }
};

export const fetchByYear = (year, lang) => {
  return (dispatch) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=${year}`)
      .then(res => res.json())
      .then(({results}) => {
        let searchResults = results.map(({id, poster_path, title}) => (
          {
            id,
            poster_path,
            title
          }
        ));
        dispatch(showSearchResults(searchResults));
      })
      .catch(e => e.message)
  }
};

export const fetchByPerson = (query, lang) => {
  return (dispatch) => {
    fetch(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=${lang}&query=${query}&page=1&include_adult=false`)
      .then(res => res.json())
      .then(({results}) => {
        let searchResults = []
        results.forEach((person) =>{
          console.log(person.id)
          searchResults.push(...person.known_for.map(({id, poster_path, title}) => (
            {
              id,
              poster_path,
              title
            }
          )))
        })
        dispatch(showSearchResults(searchResults));
      })
      .catch(e => e.message)
  }
};