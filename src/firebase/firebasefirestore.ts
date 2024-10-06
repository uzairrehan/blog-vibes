import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "./firebaseconfig";
import { auth } from "./firebaseauthentication";
import { blogType } from "@/types/types";
import { toast } from "react-toastify";

const db = getFirestore(app);




export async function saveUser(
  email: string | null | undefined,
  userName: string | null,
  uid: string
) {
  const reference = doc(db, "users", uid);
  const data = {
    email: email,
    userName: userName,
    uid: uid,
  };
  await setDoc(reference, data);
}




export async function deleteBlog(id: string) {
  await deleteDoc(doc(db, "cities", id));
}



export async function saveBlog({
  title,
  imageURL,
  tag,
  mark,
  slug,
  createdDate,
}: blogType) {
  const uid = auth.currentUser?.uid;
  const collectionRef = collection(db, "blogs");
  try {
    const newBlog = { title, imageURL, tag, mark, slug, createdDate, uid };
    const docRef = await addDoc(collectionRef, newBlog);
    const docRefToUpdate = doc(db, "blogs", docRef.id);
    await updateDoc(docRefToUpdate, {
      firebaseID: docRef.id,
    });
    toast.success("Blog Added Sucessfully !")
  } catch (error) {
    console.log(error);
    toast.error("could'nt add !")
  }
}
