import React, { Component } from 'react';
import axios from 'axios';

import startup from '../config/startup';

class NovoRestaurante extends Component {
  submitRestaurante(event) {
    event.preventDefault();

    const name = event.target['name'].value;
    axios.post(startup.getUrl('restaurants'), {
      name: name,
      lat: 23,
      lng: -30
    }).then(function (response) {
      console.log(response);
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <form onSubmit={this.submitRestaurante}>
            <div className="form-group">
              <input type="text" name="name" className="form-control" placeholder="Nome do restaurante" />
            </div>
            <button type="submit" className="btn btn-primary">Salvar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NovoRestaurante;
