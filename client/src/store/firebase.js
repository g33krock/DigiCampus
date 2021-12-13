// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// OK to expose to public
const firebaseConfig = {
  apiKey: "AIzaSyBSH7KmSggGdQ420AJrTbF5wsPHfWSgvFM",
  authDomain: "final-grades-fall-2021.firebaseapp.com",
  projectId: "final-grades-fall-2021",
  storageBucket: "final-grades-fall-2021.appspot.com",
  messagingSenderId: "827298133814",
  appId: "1:827298133814:web:d4196ecb51aeb380f7e597",
  measurementId: "G-H9JZND4G82"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

/// Helper functions

// converts a fireestore document to JSON
// @param {DocumentSnapshot} doc
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // if having problems with timestamps, refer 
    // to nextfire and add toMillis() here
  };
}

