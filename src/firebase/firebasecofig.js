// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaoQmgv5tm0eiDo9RDDIkEQTQVGWy4Lnw",
  authDomain: "zeus-e846d.firebaseapp.com",
  projectId: "zeus-e846d",
  storageBucket: "zeus-e846d.appspot.com",
  messagingSenderId: "571945246120",
  appId: "1:571945246120:web:82ed95c5a5d0fbcb20519d",
  measurementId: "G-GCEW651DEF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
