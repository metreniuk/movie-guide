import { SHOW_SEARCH_RESULTS, SET_SEARCH_FILTER, FETCH_GENRES} from '../../constants'

const discoverReducer = (state = {}, action) => {
  console.log(action);
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
    default:
      return state
  }
}

export default discoverReducer;