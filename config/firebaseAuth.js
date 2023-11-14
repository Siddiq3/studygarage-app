// andtiof 385154235075-j5kmrqfij7i9t8fngrccema9eb2iee1p.apps.googleusercontent.com


import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBBmxwdDiUVOoN1atyqqoPX-211zuOUVQI",
  authDomain: "studygarage-ba333.firebaseapp.com",
  projectId: "studygarage-ba333",
  storageBucket: "studygarage-ba333.appspot.com",
  messagingSenderId: "642376879468",
  appId: "1:642376879468:web:61ed7650d00b90e2e3f749",
  measurementId: "G-R4XLFT7S6R"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, 'trips')
export const expensesRef = collection(db, 'expenses')

export default app;