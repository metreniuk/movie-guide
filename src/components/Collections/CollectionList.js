import React from 'react';
import { Link } from 'react-router';
import './collections.css';

let collectionId = 0;
const CollectionList = (props) => {
  let collections = props.collections;
  return (
    <div className="box-list collection-list">
      {collections.map(collection => (
        <div key={collectionId++} className="box-item collection-item">
          <h4 className="collection-heading">{collectionId}</h4>
          <ol className="">
            {collection.map(movie => (
              <li key={movie.id} className="collection-movie">
                <Link to={`/movie/${movie.id}`} className="collection-movie-link">{movie.title}</Link>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  )
};

export default CollectionList;