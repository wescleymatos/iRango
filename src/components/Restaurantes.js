import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import firebase from '../config/firebase';
import startup from '../config/startup';

const Mapa = withScriptjs(withGoogleMap(props => {
  return (
    <GoogleMap defaultZoom={16} defaultCenter={{lat: 0, lng: 0}} center={props.center}>
      { props.restaurantes.map((r, i) => <Marker key={i} position={{lat: parseFloat(r.lat), lng: parseFloat(r.lng)}} />) }
    </GoogleMap>
  );
}));

class Restaurantes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGettingPosition: false,
      position: {},
      restaurantes: []
    };
  }

  addNovoRestaurante() {
    let user = firebase.auth().currentUser;

    if (user && user.emailVerified) {
      //Atenção
      window.location.href = '/add-restaurante';
      return;
    }

    //Atenção
    window.location.href = '/login';
  }

  componentDidMount() {
    const url = startup.getUrl('restaurants');
    this.setState({ isGettingPosition: true });

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        isGettingPosition: false,
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ restaurantes: data.result }));
  }

  renderRestaurantes(restaurantes) {
    return restaurantes.map((restaurante, index) => {
      return (
        <tr key={index}>
          <td>{restaurante.name}</td>
          <td>{restaurante.lat}</td>
          <td>{restaurante.lng}</td>
          <td></td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div>
            <Mapa
              googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyDKo-5UfSujcP0Io4nIf7wBPIXl1r5yx5Q'
              loadingElement={<div style={{height: '400px', width: '100%'}} />}
              containerElement={<div style={{height: '400px', width: '100%'}} />}
              mapElement={<div style={{height: '400px', width: '100%'}} />}
              center={ this.state.position }
              restaurantes={ this.state.restaurantes } />
          </div>
          <br />
          <button type="button" className="btn btn-success" onClick={this.addNovoRestaurante}>Adicionar novo restaurante</button>
          <br/>
          <br/>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { this.renderRestaurantes(this.state.restaurantes) }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Restaurantes;
