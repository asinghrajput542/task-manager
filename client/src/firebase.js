import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAxn9lP3tE3MFTUsLSaYypknAiIWjXeSw",
  authDomain: "task-manager-46e36.firebaseapp.com",
  projectId: "task-manager-46e36",
  storageBucket: "task-manager-46e36.appspot.com",
  messagingSenderId: "267042974050",
  appId: "1:267042974050:web:e9bcdfca282d6c0ca5643b",
  measurementId: "G-KNY00WRTG9",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
