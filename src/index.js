import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Discover from './components/Discover';
import Collections from './components/Collections';
import Guides from './components/Guides';
import Navigation from './components/Navigation';
import Movie from './components/Movie';

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={Navigation} />
        <Route path="discover" component={Discover}/>
        <Route path="collections" component={Collections}/>
        <Route path="guides" component={Guides}/>
        <Route path="movie/:movieId" component={Movie}/>
      </Route>
      <Route path="/*" component={Navigation}/>
    </Router>
  ),
  document.getElementById('root')
);
