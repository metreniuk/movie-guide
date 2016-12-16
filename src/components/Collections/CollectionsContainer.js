import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionList from './CollectionList'
import '../General/general.css';
import { fetchPopularCollection, fetchInTheatreCollection, fetchTopRatedCollection, clearState } from './CollectionActions';

class Collections extends Component {

  componentWillMount() {
    this.props.clearState();
    this.props.fetchPopularCollection();
    this.props.fetchInTheatreCollection();
    this.props.fetchTopRatedCollection();
  }

  render() {
    let popular = {title: 'Popular', data: this.props.popularCollectionList};
    let inTheatre = {title: 'In Theatre', data: this.props.inTheatreCollectionList};
    let topRated = {title: 'Top Rated', data: this.props.topRatedCollectionList};
    let collections = this.props.popularCollectionList ? [popular, inTheatre , topRated ] : [];
    return (
      <div>
        <CollectionList collections={collections} />
      </div>
    )
  }
}

export default connect(
  state => ({
    popularCollectionList: state.collections.popularCollectionList,
    inTheatreCollectionList: state.collections.inTheatreCollectionList,
    topRatedCollectionList: state.collections.topRatedCollectionList
  }),
  dispatch => ({
    fetchPopularCollection: () => {
      dispatch(fetchPopularCollection())
    },
    fetchInTheatreCollection: () => {
      dispatch(fetchInTheatreCollection())
    },
    fetchTopRatedCollection: () => {
      dispatch(fetchTopRatedCollection())
    },
    clearState: () => {
      dispatch(clearState())
    }
  })
)(Collections)