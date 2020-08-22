import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiUWakZK2iWgauTFnH5FU0Mdpjj70RS1Y",
  authDomain: "rnfirebase-35158.firebaseapp.com",
  databaseURL: "https://rnfirebase-35158.firebaseio.com",
  projectId: "rnfirebase-35158",
  storageBucket: "rnfirebase-35158.appspot.com",
  messagingSenderId: "222167441763",
  appId: "1:222167441763:web:b6990a15b2725afbb47356",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
