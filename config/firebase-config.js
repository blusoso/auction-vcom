import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAh1NymHWlWKOYbzeE_mLEonxU3lqffGCI",
    authDomain: "auction-vcom.firebaseapp.com",
    databaseURL: "https://auction-vcom.firebaseio.com",
    projectId: "auction-vcom",
    storageBucket: "auction-vcom.appspot.com",
    messagingSenderId: "436917736105",
    appId: "1:436917736105:web:0979d10005ff34eadc0fb8",
    measurementId: "G-C0R76VC1KG",
  };

  try {
    firebase.initializeApp(firebaseConfig);
  } catch(err){
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)}
  }
  const fire = firebase;

  export default fire;