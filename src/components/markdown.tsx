"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import Loading from "./loading";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/firebase/firebaseconfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Markdown() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [category, setcategory] = useState("coding");
  const [mark, setMark] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  // This is from chatGPT
  function makeSlug(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  //
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await saveBlog();
      setLoading(false);
      route.push("/dashboard");
    } catch (error) {
      toast.error(`Couldn't add blog! ${error}`);
    }
  };

  async function saveBlog() {
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
        const imageRef = ref(
          storage,
          `uploads/images/${crypto.randomUUID()}-${file.name}`
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
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      };

      const imageURL = await uploadImage();

      const newBlog = {
        title,
        category,
        mark,
        slug: makeSlug(title),
        createdDate: new Date(),
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
      toast.error(`Couldn't add blog! ${error}`);
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch p-6">
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between w-full md:w-2/5 border border-gray-200">
          <div>
            <label
              htmlFor="title"
              className="block text-neutral text-sm font-bold mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full input input-bordered input-primary rounded-lg bg-white mb-4 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-bold mb-2">
              <span className="text-neutral">Upload Image:</span>
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => {
                setFile(e.target.files?.[0] ?? null);
              }}
              className="w-full p-0 file-input bg-white file-input-bordered rounded-lg input input-primary text-black"
            />
          </div>

          <label htmlFor="category" className="block text-sm font-bold mb-2">
            <span className="text-neutral">category:</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="w-full input input-bordered input-primary rounded-lg bg-white mb-4 text-black"
          >
            <option value="Entertainment">Entertainment</option>
            <option value="Education">Education</option>
            <option value="Coding">Coding</option>
            <option value="Blogging">Blogging</option>
          </select>

          <label className="block text-sm font-bold mb-2">
            <span className="text-neutral">Text:</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full input input-neutral rounded-lg mb-4 text-black"
            placeholder="Type Blog text here in markdown format..."
            value={mark}
            onChange={(e) => setMark(e.target.value)}
          ></textarea>

          <div>
            <button
              onClick={handleSubmit}
              className="btn btn-active btn-neutral w-full"
              disabled={loading ? true : false}
            >
              {loading ? <Loading /> : <> Add Blog </>}
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between w-full md:w-2/5 border border-gray-200 text-black max-h-96 overflow-y-scroll">
          <label htmlFor="category" className="block text-sm font-bold mb-2">
            <span className="text-neutral">Text Output:</span>
          </label>
          <div className="p-2 h-full">
            <ReactMarkdown className="w-full rounded-lg prose">
              {mark}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default Markdown;
