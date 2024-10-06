import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "./firebaseconfig";

const db = getFirestore(app);

export async function saveUser(email: string| null|undefined, userName: string |null, uid: string) {
  const reference = doc(db, "users", uid );
  const data = {
    email: email,
    userName: userName,
    uid: uid,
  };
  await setDoc(reference, data);
}



export async function deleteBlog(id:string) {
    await deleteDoc(doc(db, "cities", id));
}

