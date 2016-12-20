import { SHOW_MOVIE_PAGE, SHOW_MOVIE_TRAILER, SHOW_SIMILAR_MOVIES, CLEAR_STATE} from '../../constants'

export const movie = (state = {}, action) => {
  switch (action.type) {
    case SHOW_MOVIE_PAGE:
      return Object.assign({}, state, {
        movieDetails: action.movieDetails
      });
    case SHOW_MOVIE_TRAILER:
      return Object.assign({}, state, {
        trailerKey: action.key
      });
    case SHOW_SIMILAR_MOVIES:
      return Object.assign({}, state, {
        similarMovies: action.similarMovies
      });
    case CLEAR_STATE:
      return {};
    default:
      return state
  }
};