const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const serviceAccount = require('./config/irango.json');
admin.initializeApp(functions.config().firebase);
const authApp = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) }, 'authApp');
const ref = admin.database().ref();

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('/restaurants', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

  ref.child('restaurants').once('value')
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
    .then(() => res.send({msg: 'Restaurante inserido com sucesso.'}));
});

app.get('/auth/getToken/:uid', (req, res) => {
  const uid = req.params.uid;

  authApp.auth().createCustomToken(uid).then(result => res.send({token: result}));
});

exports.api = functions.https.onRequest(app);

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
