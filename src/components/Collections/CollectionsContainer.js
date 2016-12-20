import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionList from './CollectionList'
import '../General/general.css';
import { fetchPopularCollection, fetchInTheatreCollection, fetchTopRatedCollection, clearState } from './CollectionActions';
import translations from '../../translations';

class Collections extends Component {

  fetchAll(lang) {
    this.props.fetchPopularCollection(lang);
    this.props.fetchInTheatreCollection(lang);
    this.props.fetchTopRatedCollection(lang);
  }

  componentWillMount() {
    this.props.clearState();
    this.fetchAll(this.props.lang);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lang !== this.props.lang) {
      console.log(nextProps.lang);
      this.fetchAll(nextProps.lang);
    }
  }

  render() {
    let lang = this.props.lang;
    if (lang) {
      let popular = {title: translations[lang].collections.headings.popular, data: this.props.popularCollectionList};
      let inTheatre = {title: translations[lang].collections.headings.inTheatre, data: this.props.inTheatreCollectionList};
      let topRated = {title: translations[lang].collections.headings.topRated, data: this.props.topRatedCollectionList};
      let collections = this.props.popularCollectionList ? [popular, inTheatre , topRated ] : [];
      return (
        <div>
          <CollectionList collections={collections} />
        </div>
      )
    }
  }
}

export default connect(
  state => ({
    popularCollectionList: state.collections.popularCollectionList,
    inTheatreCollectionList: state.collections.inTheatreCollectionList,
    topRatedCollectionList: state.collections.topRatedCollectionList,
    lang: state.language.lang
  }),
  dispatch => ({
    fetchPopularCollection: (lang) => {
      dispatch(fetchPopularCollection(lang))
    },
    fetchInTheatreCollection: (lang) => {
      dispatch(fetchInTheatreCollection(lang))
    },
    fetchTopRatedCollection: (lang) => {
      dispatch(fetchTopRatedCollection(lang))
    },
    clearState: () => {
      dispatch(clearState())
    }
  })
)(Collections)