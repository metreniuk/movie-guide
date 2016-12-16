import React from 'react';
import { Link } from 'react-router';
import './collections.css';

const CollectionList = ({collections}) => {
  return (
    <div className="box-list collection-list">
      {collections.map(collection => (
        <div key={collection.title} className="box-item collection-item">
          <div className="wrapper">
            <h3 className="collection-heading">{collection.title}</h3>
            <ul className="collection-movie-list">
              {collection.data.map(movie => (
                <li key={movie.id} className="collection-movie-item">
                  <Link to={`/movie/${movie.id}`} className="collection-movie-link">{movie.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
};

export default CollectionList;