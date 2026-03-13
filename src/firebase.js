// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCRbVgVyl39B1hCYO664ZR2VTS8fw4O3aw",
//   authDomain: "hackathon-food-coupon.firebaseapp.com",
//   projectId: "hackathon-food-coupon",
//   storageBucket: "hackathon-food-coupon.firebasestorage.app",
//   messagingSenderId: "52476041861",
//   appId: "1:52476041861:web:b0cd2330bd9be62a8327ec",
//   measurementId: "G-NWVQ7XM52B"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRbVgVyl39B1hCYO664ZR2VTS8fw4O3aw",
  authDomain: "hackathon-food-coupon.firebaseapp.com",
  projectId: "hackathon-food-coupon",
  storageBucket: "hackathon-food-coupon.appspot.com",
  messagingSenderId: "52476041861",
  appId: "1:52476041861:web:b0cd2330bd9be62a8327ec"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);