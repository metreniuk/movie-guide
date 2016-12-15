import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import './index.css';
import './components/General/general.css';
import App from './components/App';
import discoverReducer from './components/Discover/DiscoverReducer';
const store = createStore(
  discoverReducer,
  applyMiddleware(thunkMiddleware)
);

store.subscribe(() => {
  console.log('State', store.getState());
});

ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root')
);
