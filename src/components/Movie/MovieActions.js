import { API_KEY, SHOW_MOVIE_PAGE, SHOW_MOVIE_TRAILER, CLEAR_STATE } from '../../constants';

export const showMoviePage = (movieDetails) => ({
  type: SHOW_MOVIE_PAGE,
  movieDetails
});

export const showMovieTrailer = (key) => ({
  type: SHOW_MOVIE_TRAILER,
  key
});

export const fetchMovieById = (movieId, lang) => {
  return (dispatch) => {
    console.log(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${lang}`)
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${lang}`)
      .then(res => res.json())
      .then(({id, poster_path, title, genres, overview}) => {
      let movie = {
        id,
        title,
        poster_path,
        genres,
        overview
      };
      dispatch(showMoviePage(movie));
      dispatch(fetchMovieVideoById(movieId));
      }).catch(e => e.message)
  }
};

export const fetchMovieVideoById = (movieId, lang) => {
  return (dispatch) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=${lang}`)
      .then(res => res.json())
      .then(({results}) => {
        let { key } = results[0];
        dispatch(showMovieTrailer(key));
      }).catch(e => e.message)
  }
};

export const clearState = () => {
  return (dispatch) => {
    dispatch({type: CLEAR_STATE})
  }
};