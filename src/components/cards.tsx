"use client";

import { cardType } from "@/types/types";
import { useRouter } from "next/navigation";
import { FaLongArrowAltRight } from "react-icons/fa";

function Cards({ imageURL, heading, text, tags , slug}: cardType) {
  const route = useRouter();
  return (
    <>
      <div className="card lg:w-96 shadow-lg transition-transform transform hover:scale-101 hover:shadow-2xl duration-300 border-neutral border border-opacity-30 bg-white text-black ">
        <figure>
          <img src={imageURL} alt="blog image" />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">{heading}</h2>
          <div className="flex flex-row gap-2">
            {tags.map((tag, index) => (
              <div key={index} className="badge badge-neutral badge-outline">
                {tag}
              </div>
            ))}
          </div>
          <p className="line-clamp-4 pb-1">{text}</p>
          <div className="card-actions justify-end ">
            <button
              onClick={() => {
                route.push(`/blog/${slug}`);
              }}
              className="btn btn-primary"
            >
              Read blog <FaLongArrowAltRight />

            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
