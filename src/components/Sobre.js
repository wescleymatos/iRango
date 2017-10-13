import React, { Component } from 'react';

import NavBar from './NavBar';

class Sobre extends Component {
  render() {
    return (
      <div className="row">
        <NavBar menu="sobre" />
        <div className="col-lg-12">
          <p>O projeto <strong>iRango</strong> faz parte da iniciativa Fullstack Academy - segunda edição do <a href="https://www.devpleno.com/" target="_blank" rel="noopener noreferrer">DevPleno</a>. A intenção do projeto é criar uma cardápio de restaurantes usando geolocalização e ferramentas de mercado como NodeJS e React.</p>
        </div>
      </div>
    );
  }
}

export default Sobre;
