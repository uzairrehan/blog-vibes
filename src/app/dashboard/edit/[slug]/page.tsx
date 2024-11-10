"use client";
import Loading from "@/components/loading";
import { CardData } from "@/types/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { doc, updateDoc } from "firebase/firestore";
import { blogType } from "@/types/types";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "@/firebase/firebaseconfig";


function Edit({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [category, setcategory] = useState("");
  const [mark, setMark] = useState("");
  const [picture, setPicture] = useState("");
  const [firebaseID, setFirebaseID] = useState("");
  const [data, setData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  useEffect(() => {
    if (params.slug) {
      const fetchBlog = async () => {
        try {
          const q = query(
            collection(db, "blogs"),
            where("slug", "==", params.slug)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setData(doc.data() as CardData);
          });
        } catch (error) {
          console.error(error);
        }
      };

      fetchBlog();
    }
  }, [params.slug]);

  useEffect(() => {
    if (data) {
      setTitle(data.title ?? "");
      setcategory(data.category ?? "");
      setMark(data.mark ?? "");
      setFirebaseID(data.firebaseID ?? "");
      setPicture(data.imageURL ?? "");
    }
  }, [data]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateBlog({
        title,
        category,
        mark,
        editedDate: new Date(),
        firebaseID,
        file,
      });
      setLoading(false);
      route.push("/dashboard");
    } catch (error) {
      toast.error(`Couldn't edit blog! ${error}`);
    }
  };






   async function updateBlog({
    title,
    category,
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
        // console.log(file);
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
  
      const collectionRef = doc(db, "blogs", firebaseID);
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newBlog: any = {
        title,
        category,
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
      toast.error(`Failed to edit the blog. ${error} `);
    }
  }
  






  return (
    <>
      <div className="flex justify-center items-center p-5">
        <Image src={picture} width={200} height={200} alt="picture" />
      </div>
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
              {loading ? <Loading /> : <> Update Blog </>}
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

export default Edit;
