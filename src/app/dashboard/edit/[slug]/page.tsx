"use client";
import { db, updateBlog } from "@/firebase/firebasefirestore";
import { CardData } from "@/types/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";

function Edit({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState("");
  const [ file,setFile] = useState<File | null>(null);
  const [tag, setTag] = useState("");
  const [mark, setMark] = useState("");
  const [picture, setPicture] = useState("");
  const [firebaseID, setFirebaseID] = useState("");
  const [data, setData] = useState<CardData | null>(null); 
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
      setTag(data.tag ?? "");
      setMark(data.mark ?? "" );
      setFirebaseID(data.firebaseID ?? "")
      setPicture(data.imageURL ?? "")
    }
  }, [data]);


  const handleSubmit = async () => {
    try {
      await updateBlog({
        title,
        tag,
        mark,
        editedDate: new Date(),
        firebaseID,
        file
      });
  
      route.push("/dashboard");
    } catch (error) {
      toast.error(`Couldn't edit blog! ${error}`);
    }
  };

  return (
    <>
    <div
    className="flex justify-center items-center p-5"
    >
    <Image
    src={picture}
    width={200}
    height={200}
    alt="picture"
    />
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

          <label htmlFor="tag" className="block text-sm font-bold mb-2">
            <span className="text-neutral">Tag:</span>
          </label>
          <select
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
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
            <button onClick={handleSubmit} className="btn btn-active btn-neutral w-full">
              Update Blog
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between w-full md:w-2/5 border border-gray-200 text-black max-h-96 overflow-y-scroll">
          <label htmlFor="tag" className="block text-sm font-bold mb-2">
            <span className="text-neutral">Text Output:</span>
          </label>
          <div className="p-2 h-full">
            <ReactMarkdown className="w-full rounded-lg prose">{mark}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
