import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuXYSj59erRqGpNyewTmTJbjGUiAo4MsA",
  authDomain: "stuff-d093a.firebaseapp.com",
  projectId: "stuff-d093a",
  storageBucket: "stuff-d093a.appspot.com",
  messagingSenderId: "444050526416",
  appId: "1:444050526416:web:40e8b572967d6795e68ed5",
  measurementId: "G-HH8PFP4QLG",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
