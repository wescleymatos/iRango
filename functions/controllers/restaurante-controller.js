const db = require('../config/db');
const repository = require('../repositories/restaurantes-repository');

const firebase = require('../repositories/restaurantes-realtime');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase, 'DB');
const ref = admin.database().ref();

exports.get = ('/restaurants', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

  //Com firebase
  firebase.getAll(ref)
    .then(result => res.send({ result }));

  // Com MongoDB
  // repository.getAll(db.connect)
  //   .then(result => res.send(result))
  //   .catch(err => res.status(400).send(err));
});

exports.post = ('/restaurants', (req, res) => {
  const data = {
    name: req.body.name,
    lat: parseFloat(req.body.lat),
    lng: parseFloat(req.body.lng)
  };

  //Com firebase
  firebase.create(ref, data)
    .then(() => res.send({msg: 'Restaurante inserido com sucesso.'}));

  // Com MongoDB
  // repository.create(db.connect, data)
  //   .then(() => res.status(200).send({msg: 'Restaurante inserido com sucesso.'}))
  //   .catch(err => res.status(400).send(err));
});

exports.delete = ('/restaurants/:id', (req, res) => {
  const documentId = new db.ObjectID( req.params.id );

  repository.remove(db.connect, documentId)
    .then(() => res.send({msg: 'Restaurante removido com sucesso.'}))
    .catch(err => res.status(400).send(err));
});
