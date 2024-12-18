// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGsQPfo0OuQlyfg_PREZso7I2IetwZpz8",
  authDomain: "testgrtdb.firebaseapp.com",
  databaseURL: "https://testgrtdb-default-rtdb.firebaseio.com",
  projectId: "testgrtdb",
  storageBucket: "testgrtdb.firebasestorage.app",
  messagingSenderId: "588575866270",
  appId: "1:588575866270:web:38b46648251721d9762a8f",
  measurementId: "G-HBBS4628EK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);