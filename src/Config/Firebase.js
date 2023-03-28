import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBlb1Jy9Kjx4-rPjYSZJeNT53ye0SS0Zv4",
  authDomain: "image-host-ae111.firebaseapp.com",
  projectId: "image-host-ae111",
  storageBucket: "image-host-ae111.appspot.com",
  messagingSenderId: "181863138842",
  appId: "1:181863138842:web:280e92e059f6719e2eb3a3",
  measurementId: "G-5334LY5ZXW"
};

export default firebase.initializeApp(firebaseConfig);