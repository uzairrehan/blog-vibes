import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "./firebaseconfig";
import { blogType } from "@/types/types";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


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
