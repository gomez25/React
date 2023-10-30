import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDNd2_ly8rKC-cWQYNBHl0KOk2IOZ462F0",
  authDomain: "ecommerce-22ad1.firebaseapp.com",
  projectId: "ecommerce-22ad1",
  storageBucket: "ecommerce-22ad1.appspot.com",
  messagingSenderId: "760399555029",
  appId: "1:760399555029:web:936d6ac930e1de4f8c755c",
  measurementId: "G-HNF83XQD0B"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
