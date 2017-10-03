const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');

admin.initializeApp(functions.config().firebase);

const ref = admin.database().ref();
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

exports.createUserAccount = functions.auth.user().onCreate(event => {
  let uid = event.data.uid;
  let email = event.data.email;
  let photoUrl = event.data.photoUrl || 'https://lh5.googleusercontent.com/-28uFtmZZ0bM/AAAAAAAAAAI/AAAAAAAAAAA/fXkKfFZd11E/s128-c-k/photo.jpg';

  const newUserRef = ref.child(`/users/${uid}`);
  return newUserRef.set({
    email: email,
    photoUrl: photoUrl
  });
});

app.get('/restaurants/:name', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

  let name = req.params.name;

  ref.child('restaurants').orderByChild('name').equalTo(name).once('value')
    .then((snapshot) => {
      let result = [];
      snapshot.forEach((snap) => {
        result.push(snap.val());
      });

      res.send({ result });
    });
});

app.post('/restaurants', (req, res) => {
  const data = {
    name: req.body.name,
    lat: req.body.lat,
    lng: req.body.lng
  };

  ref.child('restaurants').push().set(data)
    .then(() => ref.child('restaurants').once('value'))
    .then((snapshot) => {
      res.send({ result: snapshot.val() });
    });
});

exports.api = functions.https.onRequest(app);
