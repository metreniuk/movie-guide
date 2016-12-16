import { SHOW_POPULAR_COLLECTION, SHOW_IN_THEATRE_COLLECTION, SHOW_TOP_RATED_COLLECTION, CLEAR_STATE } from '../../constants'

export const collections = (state = {}, action) => {
  switch (action.type) {
    case SHOW_POPULAR_COLLECTION:
      return Object.assign({}, state, {
        popularCollectionList: action.popularCollectionList
      });
    case SHOW_IN_THEATRE_COLLECTION:
      return Object.assign({}, state, {
        inTheatreCollectionList: action.inTheatreCollectionList
      });
    case SHOW_TOP_RATED_COLLECTION:
      return Object.assign({}, state, {
        topRatedCollectionList: action.topRatedCollectionList
      });
    case CLEAR_STATE:
      return {};
    default:
      return state
  }
};