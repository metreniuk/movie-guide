import { SHOW_SEARCH_RESULTS, SET_SEARCH_FILTER, FETCH_GENRES, CLEAR_STATE } from '../../constants'

export const discover = (state = {}, action) => {
  switch (action.type) {
    case SHOW_SEARCH_RESULTS:
      return Object.assign({}, state, {
        discoverResults: action.searchResults
      });
    case SET_SEARCH_FILTER:
      return Object.assign({}, state, {
        discoverFilter: action.searchFilter
      });
    case FETCH_GENRES:
      return Object.assign({}, state, {
        discoverGenres: action.genres
      });
    case CLEAR_STATE:
      return {};
    default:
      return state
  }
};