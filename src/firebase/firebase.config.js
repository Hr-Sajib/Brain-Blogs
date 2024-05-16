// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId






  // apiKey: "AIzaSyA58Z8YjGu80mhoJlerEoXtRwPI41uh8qs",
  // authDomain: "brain-blogs.firebaseapp.com",
  // projectId: "brain-blogs",
  // storageBucket: "brain-blogs.appspot.com",
  // messagingSenderId: "20945634210",
  // appId: "1:20945634210:web:e955025f1ea1b00e9168fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
