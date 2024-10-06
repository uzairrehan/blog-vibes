/* eslint-disable @next/next/no-img-element */
"use client";

import { cardType } from "@/types/types";
import { useRouter } from "next/navigation";
// import Image from "next/image";

function Cards({ imageURL, heading, text }: cardType) {
  const route = useRouter();
  return (
    <>
      <div className="card glass lg:w-96">
        <figure>
          <img src={imageURL} alt="blog image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{heading}</h2>
          <p className="line-clamp-4 pb-1">{text}</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => {
                route.push(`/read/${heading}`);
              }}
              className="btn btn-primary"
            >
              Read blog
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
