// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNHIaDphSvWPtYSPdeP7IHgNoF5MmWNNM",
  authDomain: "amigo-secreto-355623.firebaseapp.com",
  projectId: "amigo-secreto-355623",
  storageBucket: "amigo-secreto-355623.appspot.com",
  messagingSenderId: "847120326940",
  appId: "1:847120326940:web:597552ea4a8a41c750dad9",
  measurementId: "G-8KKBVXZJKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
 