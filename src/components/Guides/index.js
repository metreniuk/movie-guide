import React, { Component } from 'react';
import CollectionList from '../Collections/CollectionList';

class Guides extends Component {
  constructor() {
    super();
    this.state = {
      fincher: [],
      ritchie: []
    }
  }

  componentWillMount() {
    fetch('https://api.themoviedb.org/3/search/person?api_key=4fca08f368f9ca63a21e4db9786b21a7&language=en-US&query=david%20fincher&page=1&include_adult=false')
      .then(res => res.json())
      .then(({results}) => (
        this.setState({fincher: results[0].known_for})
      )).catch(e => e.message)

    fetch('https://api.themoviedb.org/3/search/person?api_key=4fca08f368f9ca63a21e4db9786b21a7&language=en-US&query=guy%20ritchie&page=1&include_adult=false')
      .then(res => res.json())
      .then(({results}) => (
        this.setState({ritchie: results[0].known_for})
      )).catch(e => e.message)

  }

  render() {
    return (
      <div>
        <h1>Guides</h1>
        <CollectionList collections={[this.state.fincher, this.state.ritchie]} />
      </div>
    )
  }
}

export default Guides