import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const Config = {
  apiKey: 'AIzaSyC5vVAOo7ZyiZ3BLcUQsd0yq2oSXTI8dmw',
  authDomain: 'chatapp-luxx.firebaseapp.com',
  projectId: 'chatapp-luxx',
  storageBucket: 'chatapp-luxx.appspot.com',
  messagingSenderId: '896382598167',
  appId: '1:896382598167:web:b6907f0b04421a0224f052',
};

const app = firebase.initializeApp(Config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
