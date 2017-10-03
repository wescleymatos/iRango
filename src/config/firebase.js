import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDI5nqxc4lmoNHAi4n14nkHKxiOV8yC1nE',
  authDomain: 'irango-62221.firebaseapp.com',
  databaseURL: 'https://irango-62221.firebaseio.com',
  projectId: 'irango-62221',
  storageBucket: 'irango-62221.appspot.com',
  messagingSenderId: '136203485090'

};

firebase.initializeApp(config);

export default firebase;
