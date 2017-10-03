import React, { Component } from 'react';

import firebase from '../config/firebase';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      msg: ''
    };

    this.authUser = this.authUser.bind(this);
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
        //window.location.href = '/add-restaurante';
      })
      .catch(() => this.setState({ msg: 'Não foi possível autenticar.' }));
  }

  getToken(uid) {
    fetch(`http://localhost:5001/irango-62221/us-central1/api/auth/getToken/${uid}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        //window.localStorage.setItem('token', JSON.stringify(data.token));
      });
  }

  render() {
    let msg = null;
    if (this.state.msg) {
      msg = <div className="alert alert-danger" role="alert">{this.state.msg}</div>;
    }

    return (
      <div className="row justify-content-center">
        <div className="col-lg-4">
          {msg}
          <form onSubmit={this.authUser}>
            <div className="form-group">
              <input type="email" name="email" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="password" name="pass" className="form-control" placeholder="Senha" />
            </div>
            <button type="submit" className="btn btn-primary">Logar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
