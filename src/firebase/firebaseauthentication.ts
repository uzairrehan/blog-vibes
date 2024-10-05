import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, updateProfile,sendPasswordResetEmail} from "firebase/auth";
import { app } from "./firebaseconfig";
// import { saveUser } from "./firebasefirestore";
// import { app } from "./firebaseconfig";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();




export function signupWithEmailPassword(email: string, password: string, userName: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { email, uid} = userCredential.user;
      console.log(email, uid,userName,"user created successfully.");
      updateProfile( userCredential.user, {
        displayName: userName,
      })
    //   saveUser({ email: email as string, uid , userName });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage, errorCode);
    });
}




export function loginWithEmailPassword(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { email, uid } = userCredential.user;
      console.log(email, uid, "user LOGGED IN successfully.", userCredential);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage, errorCode);
    });
}




export function googleSign() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log(token, user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);

    });
}




export function signOutFunc() {
  signOut(auth).then(() => {
    console.log();
  }).catch((error) => {
    console.log(error);
  });
}




export function passwordReset(email:string) {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log("sent");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}
 