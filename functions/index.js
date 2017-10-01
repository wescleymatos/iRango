const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const ref = admin.database().ref();

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

exports.api = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase! Alterado!");
});
