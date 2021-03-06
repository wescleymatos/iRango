import React, { Component } from 'react';

import firebase from '../config/firebase';
import startup from '../config/startup';
import NavBar from './NavBar';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      msg: ''
    };

    this.authUser = this.authUser.bind(this);
    this.authGoogleAccount = this.authGoogleAccount.bind(this);
  }

  authUser(event) {
    event.preventDefault();

    const email = event.target['email'].value;
    const pass = event.target['pass'].value;

    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(userLogged => {
        this.setState({ user: userLogged, msg: ''});
        this.getToken(userLogged.uid);

        // Tirar dúvida
        window.location.href = '/add-restaurante';
      })
      .catch(() => this.setState({ msg: 'Não foi possível autenticar.' }));
  }

  authGoogleAccount() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(() => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //var token = result.credential.accessToken;
        //var user = result.user;

        window.location.href = '/add-restaurante';
      })
      .catch(() => this.setState({ msg: 'Não foi possível autenticar.' }));
  }

  getToken(uid) {
    const url = startup.getUrl(`auth/getToken/${uid}`);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        window.localStorage.setItem('token', data.token);
      });
  }

  render() {
    return (
      <div className="row justify-content-center">
        <NavBar menu="login" />
        <div className="col-lg-4">
          {this.state.msg && <div className="alert alert-danger" role="alert">{this.state.msg}</div>}
          <form onSubmit={this.authUser}>
            <div className="form-group">
              <input type="email" name="email" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="password" name="pass" className="form-control" placeholder="Senha" />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Logar</button>
          </form>
          <br />
          <button type="button" onClick={this.authGoogleAccount} className="btn btn-danger btn-block">Conta do Google</button>
          <br />
          <a href="/add-usuario" className="btn btn-success btn-block">Criar conta</a>
        </div>
      </div>
    );
  }
}

export default Login;
