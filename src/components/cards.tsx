/* eslint-disable @next/next/no-img-element */
"use client";

import { cardType } from "@/types/types";
import { useRouter } from "next/navigation";
import { FaLongArrowAltRight } from "react-icons/fa";

function Cards({ imageURL, heading, text, tags , slug}: cardType) {
  const route = useRouter();
  return (
    <>
      <div className="card glass lg:w-96 shadow-sm transition-transform transform hover:scale-101 hover:shadow-lg duration-300">
        <figure>
          <img src={imageURL} alt="blog image" />
        </figure>
        <div className="card-body">
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
              className="btn btn-primary text-neutral"
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
