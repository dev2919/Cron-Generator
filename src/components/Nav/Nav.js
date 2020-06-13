import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
  render() {
    
    const navStyle = {
      color:'white'
    }

    return (
      <nav>
        <h3>CRONTAB GEN</h3>
        <ul className="nav-link">
            <Link to="/"  style={navStyle}>
           <li>Home</li>
            </Link>
            <Link to="/expressions" style={navStyle}>
           <li>Examples</li>
            </Link>
        </ul>
      </nav>
    );
  }
}

export default Nav;