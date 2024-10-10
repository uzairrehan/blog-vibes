"use client";

import Footer from "@/components/footer";
import Loading from "@/components/loading";
import { db } from "@/firebase/firebasefirestore";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<DocumentData | null>(null);

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
            setData(doc.data());
          });
        } catch (error) {
          console.error(error);
        }
      };

      fetchBlog();
      // console.log(data);
    }
  }, [params.slug]);

  // from ChatGPT
  function formatDate() {
    const timestamp = data?.createdDate;
    const milliseconds =
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
    const date = new Date(milliseconds);
    const pad = (num: number) => num.toString().padStart(2, "0");
    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getUTCFullYear();
    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const secondsTime = pad(date.getUTCSeconds());
    const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}:${secondsTime}`;
    return formattedDate;
  }
//
  return (
    <>
      <Link href={"/"} className="btn m-2 btn-xs btn-neutral">
        <FaLongArrowAltLeft /> Go Back to Home
      </Link>

      {data ? (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <img
            className="w-full rounded-lg shadow-md h-auto"
            src={data.imageURL}
            alt="Blog Image"
          />

          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            {data.title}
          </h1>

          <div className="mt-4 text-gray-600">
            <div className="mb-2">
              <span className="font-semibold">Tag : </span>
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-neutral rounded">
                {data.tag}
              </span>
            </div>

            <div className="mb-4">
              <span className="font-semibold">Created Date:</span>{" "}
              <span>{formatDate()}</span> |
              <span className="font-semibold"> Edited Date:</span>{" "}
              <span>{formatDate()}</span>
            </div>
          </div>

          <div className="prose prose-lg text-gray-800">
            <ReactMarkdown className="prose">{data.mark}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      )}
      <Footer />
    </>
  );
}
