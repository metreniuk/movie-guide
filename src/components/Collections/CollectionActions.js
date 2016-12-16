import { API_KEY, SHOW_POPULAR_COLLECTION, SHOW_IN_THEATRE_COLLECTION, SHOW_TOP_RATED_COLLECTION, CLEAR_STATE } from '../../constants';

export const clearState = () => {
  return (dispatch) => {
    dispatch({type: CLEAR_STATE})
  }
};

export const showPopularCollection = (popularCollectionList) => ({
    type: SHOW_POPULAR_COLLECTION,
    popularCollectionList
  }
);

export const showInTheatreCollection = (inTheatreCollectionList) => ({
    type: SHOW_IN_THEATRE_COLLECTION,
    inTheatreCollectionList
  }
);

export const showTopRatedCollection = (topRatedCollectionList) => ({
    type: SHOW_TOP_RATED_COLLECTION,
    topRatedCollectionList
  }
);

export const fetchPopularCollection = () => {
  return (dispatch) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
      .then(res => res.json())
      .then(({results}) => {
        results = results.map(({id, title}) => (
          {
            id,
            title
          }
        ));
        dispatch(showPopularCollection(results));
      })
      .catch(e => e.message)
  }
};

export const fetchInTheatreCollection = () => {
  return (dispatch) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2016-11-15&primary_release_date.lte=2016-12-14`)
      .then(res => res.json())
      .then(({results}) => {
        results = results.map(({id, title}) => (
          {
            id,
            title
          }
        ));
        dispatch(showInTheatreCollection(results));
      })
      .catch(e => e.message)
  }
};

export const fetchTopRatedCollection = () => {
  return (dispatch) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=3000`)
      .then(res => res.json())
      .then(({results}) => {
        results = results.map(({id, title}) => (
          {
            id,
            title
          }
        ));
        dispatch(showTopRatedCollection(results));
      })
      .catch(e => e.message)
  }
};