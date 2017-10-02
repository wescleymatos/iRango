import React, { Component } from 'react';

class Restaurantes extends Component {
  componentDidMount() {
    alert('teste');
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div class="form-group">
            <input type="search" className="form-control" id="buscar-restaurantes" placeholder="Buscar Restaurantes" />
          </div>
          <div id="map"></div>
          <button type="button" className="btn btn-success">Adicionar novo restaurante</button>
        </div>
      </div>
    );
  }
}

export default Restaurantes;
