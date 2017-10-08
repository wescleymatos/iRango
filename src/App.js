import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Restaurantes from './components/Restaurantes';
import Sobre from './components/Sobre';
import Login from './components/Login';
import NovoRestaurante from './components/NovoRestaurante';
import CriarUsuario from './components/CriarUsuario';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ Home } />
          <Route exact path="/restaurantes" component={ Restaurantes } />
          <Route exact path="/sobre" component={ Sobre } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/add-restaurante" component={ NovoRestaurante } />
          <Route exact path="/add-usuario" component={ CriarUsuario } />
        </div>
      </Router>
    );
  }
}

export default App;
