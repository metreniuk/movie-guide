import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Layout from '../../components/Layout';
import Discover from '../../components/Discover';
import Collections from '../../components/Collections';
import Guides from '../../components/Guides';
import Navigation from '../../components/Navigation';
import Movie from '../../components/Movie';

import { discover } from '../../components/Discover/DiscoverReducer';
import { collections } from '../../components/Collections/CollectionReducer';
import { movie } from '../../components/Movie/MovieReducer';
import { language } from '../../components/Layout/LayoutReducer';

const reducer = combineReducers({
  discover,
  collections,
  movie,
  language
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
});

const AppContainer = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Navigation} />
        <Route path="discover" component={Discover}/>
        <Route path="collections" component={Collections}/>
        <Route path="guides" component={Guides}/>
        <Route path="movie/:movieId" component={Movie}/>
      </Route>
      <Route path="/*" component={Navigation}/>
    </Router>
  </Provider>
);

export default AppContainer;