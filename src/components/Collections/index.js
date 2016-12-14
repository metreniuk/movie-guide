import React, { Component } from 'react';
import CollectionList from './CollectionList'
import '../General/general.css';

class Collections extends Component {
  constructor() {
    super();
    this.state = {
      popular: [],
      inTheatre: [],
      topAllTime: []
    }
  }

  componentWillMount() {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=4fca08f368f9ca63a21e4db9786b21a7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
      .then(res => res.json())
      .then(({results}) => (
        this.setState({popular: results})
      )).catch(e => e.message)

    fetch('https://api.themoviedb.org/3/discover/movie?api_key=4fca08f368f9ca63a21e4db9786b21a7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2016-11-15&primary_release_date.lte=2016-12-14')
      .then(res => res.json())
      .then(({results}) => (
        this.setState({inTheatre: results})
      )).catch(e => e.message)

    fetch('https://api.themoviedb.org/3/discover/movie?api_key=4fca08f368f9ca63a21e4db9786b21a7&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=3000')
      .then(res => res.json())
      .then(({results}) => (
        this.setState({topAllTime: results})
      )).catch(e => e.message)
  }

  render() {
    return (
      <div>
        <h1>Collections</h1>
        <CollectionList collections={[this.state.popular, this.state.inTheatre, this.state.topAllTime, this.state.topAllTime, this.state.popular, this.state.popular]} />
      </div>
    )
  }
}

export default Collections