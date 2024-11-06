import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0FMDhWfY6N1cHVVQYzR75xdpHmOaHaGk",
  authDomain: "blog-vibes.firebaseapp.com",
  projectId: "blog-vibes",
  storageBucket: "blog-vibes.appspot.com",
  messagingSenderId: "192661121446",
  appId: "1:192661121446:web:c5eccd6245729316a6c767",
  measurementId: "G-LL4FFCE0FT"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();