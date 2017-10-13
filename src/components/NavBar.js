import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../config/firebase';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };

    this.logoutUser = this.logoutUser.bind(this);
  }

  getUserLogged() {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        }
      });
    });
  }

  logoutUser() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({ user: {} });

        //Atenção
        window.location.href = '/';
      });
  }

  getClassCss(menu) {
    return this.props.menu === menu ? 'active nav-item' : 'nav-item';
  }

  componentDidMount() {
    this.getUserLogged()
      .then(user => this.setState({ user }));
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
              <li className={this.getClassCss('home')}>
                <Link className="nav-link" to="/">Início</Link>
              </li>
              <li className={this.getClassCss('restaurantes')}>
                <Link className="nav-link" to="/restaurantes">Restaurantes</Link>
              </li>
              <li className={this.getClassCss('sobre')}>
                <Link className="nav-link" to="/sobre">Sobre</Link>
              </li>
            </ul>
          </div>
          <div id="logout" className="float-right">
            {this.state.user && <button onClick={this.logoutUser} className="btn btn-link">{this.state.user.email}</button>}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
