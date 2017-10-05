import React, { Component } from 'react';

class NovoRestaurante extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <h1>Novo Restaurante</h1>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Nome do restaurante" />
          </div>
        </div>
      </div>
    );
  }
}

export default NovoRestaurante;
