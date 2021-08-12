import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApscnL2Q42241v2XzMx1VS1SHX0VmTkrs",
  authDomain: "react-app-cursos-10010.firebaseapp.com",
  projectId: "react-app-cursos-10010",
  storageBucket: "react-app-cursos-10010.appspot.com",
  messagingSenderId: "374042930413",
  appId: "1:374042930413:web:b7130643121ee1e668b0e4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase,
}