import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "./firebaseconfig";
import { toast } from "react-toastify";
import { saveUser } from "./firebasefirestore";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();







export function signupWithEmailPassword(
  email: string,
  password: string,
  userName: string
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { email, uid } = userCredential.user;
      console.log(email, uid, userName, "user created successfully.");
      updateProfile(userCredential.user, {
        displayName: userName,
      });
      console.log(userCredential);
      saveUser(email, userName, uid);
      toast.success(`Signed Up with email : ${email}`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage, errorCode);
      toast.error("Could'nt sign-up", error.message);
    });
}







export function loginWithEmailPassword(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { email, uid } = userCredential.user;
      console.log(email, uid, "user LOGGED IN successfully.", userCredential);
      toast.success(`Signed in with email : ${email}`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage, errorCode);
      toast.error("Could'nt sign-in", error.message);
    });
}








export function googleSign() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      saveUser(auth.currentUser?.email, user.displayName, user.uid);
      console.log(token, user);
      toast.success("Signed in with google !");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
      toast.error("Could'nt sign-in", error.message);
    });
}

export function signOutFunc() {
  signOut(auth)
    .then(() => {
      console.log();
      toast.success("Signed-out succesfully !");
    })
    .catch((error) => {
      console.log(error);
      toast.error(`error : ${error.message}`);
    });
}

export function passwordReset(email: string) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("sent");
      toast.success(`Check Email : ${email}`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      toast.error(`error : ${error.message}`);
    });
}
