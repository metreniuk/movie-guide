import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Discover from '../Discover';
import Collections from '../Collections';
import Guides from '../Guides';
import Navigation from '../Navigation';
import Movie from '../Movie';

const App = () => (
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
)

export default App;