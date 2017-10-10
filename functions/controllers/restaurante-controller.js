const db = require('../config/db');
const repository = require('../repositories/restaurantes-repository');

exports.get('/restaurants', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

  // ref.child('restaurants').once('value')
  //   .then((snapshot) => {
  //     let result = [];
  //     snapshot.forEach((snap) => {
  //       result.push(snap.val());
  //     });
  //
  //     res.send({ result });
  //   });
  repository.getAll(db.connect)
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err));
});

exports.post('/restaurants', (req, res) => {
  const data = {
    name: req.body.name,
    lat: parseFloat(req.body.lat),
    lng: parseFloat(req.body.lng)
  };

  // ref.child('restaurants').push().set(data)
  //   .then(() => res.send({msg: 'Restaurante inserido com sucesso.'}));
  repository.create(db.connect, data)
    .then(() => res.send({result: 'ok'}))
    .catch(err => res.status(400).send(err));
});

exports.delete('/restaurants/:id', (req, res) => {
  // ref.child('restaurants').push().set(data)
  //   .then(() => res.send({msg: 'Restaurante inserido com sucesso.'}));
  const documentId = new db.ObjectID( req.params.id );

  repository.remove(db.connect, documentId)
    .then(() => res.send({result: 'ok'}))
    .catch(err => res.status(400).send(err));
});
