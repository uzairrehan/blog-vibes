"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

function Markdown() {
  const [mark, setMark] = useState("");
  return (
    <>
      <div className="flex justify-center items-center py-4">
        <button className="btn btn-neutral">Add New Blog</button>
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
              className="w-full input input-bordered input-primary rounded-lg bg-white mb-4  text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-bold mb-2">
              <span className="text-neutral">Upload Image:</span>
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="w-full p-0 file-input bg-white file-input-bordered rounded-lg  input input-primary  text-black"
            />
          </div>

          <label htmlFor="tag" className="block text-sm font-bold mb-2">
            <span className="text-neutral">Tags:</span>
          </label>
          <select
            id="tag" // Fixed the id to "tag"
            className="w-full input input-bordered input-primary rounded-lg bg-white mb-4 text-black"
          >
            <option selected>Others</option>
            <option>Entertainment</option>
            <option>Education</option>
            <option>Coding</option>
            <option>Programming</option>
            <option>Blogging</option>
          </select>

          <label className="block text-sm font-bold mb-2">
            <span className="text-neutral">Text:</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full input input-neutral rounded-lg mb-4  text-black"
            placeholder="Type Blog text here in markdown format..."
            value={mark}
            onChange={(e) => setMark(e.target.value)}
          ></textarea>

          <div>
            <button className="btn btn-active btn-neutral w-full">
              Update
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between w-full md:w-2/5 border border-gray-200  text-black">
          <label htmlFor="tag" className="block text-sm font-bold mb-2">
            <span className="text-neutral">Text Output:</span>
          </label>{" "}
          <div className="border border-primary rounded p-2 h-full">
            <ReactMarkdown className="w-full rounded-lg mb-4">
              {mark}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default Markdown;
