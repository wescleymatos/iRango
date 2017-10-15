import React, { Component } from 'react';

import firebase from '../config/firebase';
import NavBar from './NavBar';

class CriarUsuario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      msg: ''
    };

    this.createUser = this.createUser.bind(this);
  }

  createUser(event) {
    event.preventDefault();

    const email = event.target['email'].value;
    const pass = event.target['pass'].value;

    firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(userLogged => {
        userLogged.sendEmailVerification()
          .then(() => {
            //Atenção
            window.location.href = '/login';
          }, () => {
            this.setState({ msg: 'Não foi possível criar a conta de usuário.' });
          });
      });
  }

  render() {
    return (
      <div className="row justify-content-center">
        <NavBar menu="usuario" />
        <div className="col-lg-4">
          {this.state.msg && <div className="alert alert-info" role="alert">{this.state.msg}</div>}
          <form onSubmit={this.createUser} method="post">
            <div className="form-group">
              <input type="email" name="email" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="password" name="pass" className="form-control" placeholder="Senha" />
            </div>
            <button type="submit" className="btn btn-success btn-block">Criar conta</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CriarUsuario;
