import { API_KEY, SHOW_MOVIE_PAGE, SHOW_MOVIE_TRAILER, SHOW_SIMILAR_MOVIES, CLEAR_STATE } from '../../constants';

export const showMoviePage = (movieDetails) => ({
  type: SHOW_MOVIE_PAGE,
  movieDetails
});

export const showMovieTrailer = (key) => ({
  type: SHOW_MOVIE_TRAILER,
  key
});

export const showSimilarMovies = (similarMovies) => ({
  type: SHOW_SIMILAR_MOVIES,
  similarMovies
});

export const fetchMovieById = (movieId, lang) => {
  return (dispatch) => {
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
      dispatch(fetchMovieVideoById(movieId, lang));
      dispatch(fetchSimilarMovies(movieId, lang))
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

export const fetchSimilarMovies = (movieId, lang) => {
  return (dispatch) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=${lang}&page=1`)
      .then(res => res.json())
      .then(({results}) => {
        let movies = results.map(movie => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path
        }));
        console.log(movies);
        dispatch(showSimilarMovies(movies))
      }).catch(e => e.message)
  }
};

export const clearState = () => {
  return (dispatch) => {
    dispatch({type: CLEAR_STATE})
  }
};