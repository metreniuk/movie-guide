import React from 'react';
import { Link } from 'react-router';
import '../Navigation/navigation.css';
import './layout.css';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <nav>
          <div className="nav-list">
            <div className="nav-item"><Link className="nav-link" activeClassName="is-active" to="/discover">Discover</Link></div>
            <div className="nav-item"><Link className="nav-link" activeClassName="is-active" to="/collections">Collections</Link></div>
            <div className="lang-bar">
              <button className="lang-btn">en</button>
              <button className="lang-btn">ro</button>
              <button className="lang-btn">ru</button>
            </div>
          </div>
        </nav>
        <main>{this.props.children}</main>
      </div>
    )
  }
}

export default Layout;
