import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyBXD8WfjpPTs3zl_fJ99UT6C4QoWaMZUdU",
  authDomain: "fullweb-reactcourse.firebaseapp.com",
  projectId: "fullweb-reactcourse",
  storageBucket: "fullweb-reactcourse.appspot.com",
  messagingSenderId: "537223328086",
  appId: "1:537223328086:web:12cc07d210cb50caa166f7",
  measurementId: "G-S5SVBRPEJH",
};

const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
export const storage = fb.storage();
export const auth = fb.auth();
export const Gooprovider = new firebase.auth.GoogleAuthProvider();
export const Faceprovider = new firebase.auth.FacebookAuthProvider();

