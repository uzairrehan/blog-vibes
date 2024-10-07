"use client";

import { saveBlog } from "@/firebase/firebasefirestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";

function Markdown() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [tag, setTag] = useState("coding");
  const [slug] = useState("ok");
  const [createdDate] = useState(new Date());
  const [mark, setMark] = useState("");

  const route = useRouter();

  const handleSubmit = async () => {
    try {
      await saveBlog({ title, file, tag, mark, slug, createdDate });
      toast.success("Blog Added Successfully!");
      route.push("/");
    } catch (error) {
      console.error("Error adding blog: ", error);
      toast.error("Couldn't add blog!");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center py-4">
        <button className="btn btn-neutral" onClick={handleSubmit}>
          Add New Blog
        </button>
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
            <span className="text-neutral">Tags:</span>
          </label>
          <select
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full input input-bordered input-primary rounded-lg bg-white mb-4 text-black"
          >
            <option value="Others">Others</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Education">Education</option>
            <option value="Coding">Coding</option>
            <option value="Programming">Programming</option>
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
            >
              Add Blog
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between w-full md:w-2/5 border border-gray-200 text-black max-h-96 overflow-y-scroll">
          <label htmlFor="tag" className="block text-sm font-bold mb-2">
            <span className="text-neutral">Text Output:</span>
          </label>
          <div className="border border-primary rounded p-2 h-full" >
            <ReactMarkdown className="w-full rounded-lg mb-4" >
              {mark}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default Markdown;
