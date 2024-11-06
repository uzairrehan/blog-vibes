import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app, auth } from "./firebaseconfig";
import { blogType, updateProfileType } from "@/types/types";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export const db = getFirestore(app);
export const storage = getStorage(app);

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
  console.log("created");
}

export async function updateUser(
  email: string | null | undefined,
  userName: string | null,
  uid: string,
  photoURL?: string
) {
  const reference = doc(db, "users", uid);
  const data = {
    email: email,
    userName: userName,
    uid: uid,
    imageURL: photoURL,
  };
  await updateDoc(reference, data);
}

export async function deleteBlog(id: string) {
  await deleteDoc(doc(db, "blogs", id));
}

export async function saveBlog({
  title,
  file,
  tag,
  mark,
  slug,
  createdDate,
}: blogType) {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    toast.error("User is not authenticated!");
    return;
  }

  const collectionRef = collection(db, "blogs");

  try {
    const uploadImage = async () => {
      if (!file) {
        return;
      }
      console.log(file);
      const imageRef = ref(
        storage,
        `uploads/images/${Date.now()}-${file.name}`
      );
      const uploadTask = uploadBytesResumable(imageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Upload error: ", error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          }
        );
      });
    };

    const imageURL = await uploadImage();

    const newBlog = {
      title,
      tag,
      mark,
      slug,
      createdDate,
      uid,
      imageURL,
    };

    const docRef = await addDoc(collectionRef, newBlog);

    const docRefToUpdate = doc(db, "blogs", docRef.id);
    await updateDoc(docRefToUpdate, {
      firebaseID: docRef.id,
    });

    toast.success("Blog Added Successfully!");
  } catch (error) {
    console.error("Error adding blog: ", error);
    toast.error("Couldn't add blog!");
  }
}

export async function updateMyProfile({
  picture,
  name,
  fathername,
  phonenumber,
  DOB,
  bio,
}: updateProfileType) {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    toast.error("User is not authenticated!");
    return;
  }

  const collectionRef = doc(db, "users", uid);

  if (!picture) {
    const user = {
      userName: name,
      fathername,
      phonenumber,
      DOB,
      bio,
    };
    await updateDoc(collectionRef, user);
    toast.success("Updated Successfully!");
    return;
  }

  try {
    const uploadImage = async () => {
      if (!picture) {
        return;
      }
      console.log(picture);
      const imageRef = ref(
        storage,
        `uploads/images/${crypto.randomUUID()}-${picture.name}`
      );
      const uploadTask = uploadBytesResumable(imageRef, picture);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Upload error: ", error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          }
        );
      });
    };

    const imageURL = await uploadImage();

    if (!imageURL) return toast.error("error uploading image");

    const user = {
      imageURL,
      userName: name,
      fathername,
      phonenumber,
      DOB,
      bio,
    };
    await updateDoc(collectionRef, user);

    toast.success("Updated Successfully!");
  } catch (error) {
    console.error("Error Updating : ", error);
    toast.error(`Error Updating! ${error}`);
  }
}
export async function updateBlog({
  title,
  tag,
  mark,
  editedDate,
  firebaseID,
  file,
}: blogType) {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    toast.error("User is not authenticated!");
    return;
  }

  if (!firebaseID) {
    toast.error("Invalid blog ID!");
    return;
  }

  try {
    const uploadImage = async () => {
      if (!file) {
        return null;
      }
      console.log(file);
      const imageRef = ref(
        storage,
        `uploads/images/${Date.now()}-${file.name}`
      );
      const uploadTask = uploadBytesResumable(imageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Upload error: ", error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          }
        );
      });
    };

    const imageURL = await uploadImage();
    console.log(imageURL);

    const collectionRef = doc(db, "blogs", firebaseID);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newBlog: any = {
      title,
      tag,
      mark,
      uid,
      editedDate,
    };

    if (imageURL) {
      newBlog.imageURL = imageURL;
    }

    await updateDoc(collectionRef, newBlog);

    toast.success("Blog edited successfully!");
  } catch (error) {
    console.error("Error updating blog:", error);
    toast.error("Failed to edit the blog.");
  }
}
