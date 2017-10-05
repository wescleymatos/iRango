import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

import firebase from '../config/firebase';


const Mapa = withScriptjs(withGoogleMap(props => {
  return (
    <GoogleMap defaultZoom={16} defaultCenter={{lat: 0, lng: 0}} center={props.center}>
    </GoogleMap>
  );
}));

class Restaurantes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGettingPosition: false,
      position: {}
    };
  }

  addNovoRestaurante(event) {
    let user = firebase.auth().currentUser;

    if (user && user.emailVerified) {
      window.location.href = '/add-restaurante';
      return;
    }

    window.location.href = '/login';
  }

  componentDidMount() {
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
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div>
            <Mapa
              googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCQR19677qUdeHnCS36MSzMDLKQzq-d_WA'
              loadingElement={<div style={{height: '400px', width: '100%'}} />}
              containerElement={<div style={{height: '400px', width: '100%'}} />}
              mapElement={<div style={{height: '400px', width: '100%'}} />}
              center={ this.state.position } />
          </div>
          <br />
          <button type="button" className="btn btn-success" onClick={this.addNovoRestaurante}>Adicionar novo restaurante</button>
        </div>
      </div>
    );
  }
}

export default Restaurantes;
