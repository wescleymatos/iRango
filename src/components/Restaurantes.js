import React, { Component } from 'react';

class Restaurantes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGettingPosition: false
    };
  }

  componentDidMount() {
    this.setState({ isGettingPosition: true });
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ isGettingPosition: false });
      console.log(position);
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
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
