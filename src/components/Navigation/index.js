import React from 'react';
import { Link } from 'react-router';
import './navigation.css';

const Navigation = () => (
  <div className="nav-list">
    <div className="nav-item"><Link className="nav-link" to="/discover">Discover</Link></div>
    <div className="nav-item"><Link className="nav-link" to="/collections">Collections</Link></div>
    <div className="nav-item"><Link className="nav-link" to="/guides">Guides</Link></div>
  </div>
)

export default Navigation;