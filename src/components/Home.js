import React, { Component } from 'react';

import NavBar from './NavBar';

class Home extends Component {
  render() {
    return (
      <div className="row">
        <NavBar />
        <div className="col-lg-12">
          <h3>Olá, esse é o iRango!</h3>
          <p>Aqui você encontra com muita facilidade os restaurantes da cidade.</p>
          <a href="/restaurantes" className="btn btn-primary">Clique aqui e comece a busca.</a>
        </div>
      </div>
    );
  }
}

export default Home;
