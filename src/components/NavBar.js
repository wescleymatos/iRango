import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light rounded">
        <div className="container">
          <a className="navbar-brand">
            <img src="images/irango.png" height="70" alt="iRango" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Início</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/restaurantes">Restaurantes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sobre">Sobre</Link>
              </li>
            </ul>
          </div>
          <div id="logout" className="float-right">
            <a className="btn btn-link">{JSON.stringify({})}</a>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
