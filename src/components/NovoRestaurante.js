import React, { Component } from 'react';
import axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import startup from '../config/startup';
import NavBar from './NavBar';

const Mapa = withScriptjs(withGoogleMap(props => {
  return (
    <GoogleMap defaultZoom={16} defaultCenter={{lat: 0, lng: 0}} center={props.center}>
      <Marker position={props.center} draggable={true} onDragEnd={props.getPosition} />
    </GoogleMap>
  );
}));

class NovoRestaurante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      isGettingPosition: false,
      position: {},
      latLngRestaurante: {lat: '', lng: ''}
    };

    this.submitRestaurante = this.submitRestaurante.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      let lat = parseFloat(position.coords.latitude);
      let lng = parseFloat(position.coords.longitude);

      this.setState({ position: {lat, lng} });
    });
  }

  submitRestaurante(event) {
    event.preventDefault();

    const restaurante = {
      name: event.target['name'].value,
      lat: event.target['lat'].value,
      lng: event.target['lng'].value
    };

    axios
      .post(startup.getUrl('restaurants'), restaurante)
      .then(response => this.setState({ msg: response.data.msg }));
  }

  getPosition(position) {
    let lat = position.latLng.lat();
    let lng = position.latLng.lng();

    this.setState({ latLngRestaurante: {lat, lng} });
  }

  render() {
    return (
      <div className="row">
        <NavBar menu="restaurantes" />
        <div className="col-lg-12">
          <form onSubmit={this.submitRestaurante}>
            <div className="form-group">
              <input required type="text" name="name" className="form-control" placeholder="Nome do restaurante" />
            </div>
            {this.state.msg && <div className="alert alert-success" role="alert">{this.state.msg}</div>}
            <Mapa
              googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyDKo-5UfSujcP0Io4nIf7wBPIXl1r5yx5Q'
              loadingElement={<div style={{height: '400px', width: '100%'}} />}
              containerElement={<div style={{height: '400px', width: '100%'}} />}
              mapElement={<div style={{height: '400px', width: '100%'}} />}
              center={ this.state.position }
              getPosition={ this.getPosition }/>
            <input type="hidden" name="lat" value={this.state.latLngRestaurante.lat} />
            <input type="hidden" name="lng" value={this.state.latLngRestaurante.lng} />
            <br />
            <button type="submit" className="btn btn-primary">Salvar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NovoRestaurante;
