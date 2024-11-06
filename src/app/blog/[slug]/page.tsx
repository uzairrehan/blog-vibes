"use client";

import Footer from "@/components/footer";
import Loading from "@/components/loading";
import {
  addDoc,
  arrayUnion,
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/firebaseconfig";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { LuSave } from "react-icons/lu";
import { doc, updateDoc } from "firebase/firestore";

export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [comment, setComment] = useState<string>("");
  const route = useRouter();
  const [commentsArray, setCommentsArray] = useState<DocumentData[]>([]);

  async function saveBlogToUser() {
    if (!auth.currentUser?.uid) {
      toast.error("Please Login First to save!");
      route.push("/authenticate");
      return;
    }
    const uid = auth.currentUser?.uid;
    const reference = doc(db, "users", uid);
    const d = {
      savedBlogs: arrayUnion(data?.firebaseID),
    };
    await updateDoc(reference, d);
    console.log("saved");
  }

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
    }
  }, [params.slug]);

  // from ChatGPT
  function formatDate(prop: { seconds: number; nanoseconds: number }) {
    const { seconds, nanoseconds } = prop;
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    const date = new Date(milliseconds);
    const pad = (num: number) => num.toString().padStart(2, "0");
    const day = pad(date.getDate());
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    let hours = date.getHours();
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutes = pad(date.getMinutes());
    const secondsTime = pad(date.getSeconds());
    const formattedDate = `${day} ${month} ${year} ${pad(
      hours
    )}:${minutes}:${secondsTime} ${period}`;

    return formattedDate;
  }
  //

  async function handleAddComment() {
    if (!auth.currentUser?.uid) {
      toast.error("Please Login First!");
      route.push("/authenticate");
      return;
    }
    if (comment == "") return;
    const parentRef = doc(db, "blogs", data?.firebaseID);
    const coll = collection(parentRef, "comments");
    const comm = {
      text: comment,
      time: new Date(),
      UID: auth.currentUser?.uid,
    };
    console.log(comm);
    await addDoc(coll, comm);
    setComment("");
  }

  useEffect(() => {
    if (!data) return;

    const ref = doc(db, "blogs", data.firebaseID);
    const commentsCollection = collection(ref, "comments");
    const unsubscribe = onSnapshot(commentsCollection, (snapshot) => {
      const updatedComments: DocumentData[] = [];
      snapshot.forEach((doc) => updatedComments.push(doc.data()));
      setCommentsArray(updatedComments);
    });

    return () => unsubscribe();
  }, [data]);

  return (
    <>
      <Link href={"/"} className="btn m-2 btn-xs btn-neutral">
        <FaLongArrowAltLeft /> Go Back to Home
      </Link>

      {data ? (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Image
            className="w-full rounded-lg shadow-md h-auto"
            src={data.imageURL}
            alt="Blog Image"
            width={700}
            height={700}
          />

          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            {data.title}
          </h1>

          <div className="mt-4">
            <div className="mb-2 ">
              <span className="font-semibold prose flex gap-3">
                <BiSolidLike className="size-8" />

                <BiLike className="size-8" />

                <BiSolidDislike className="size-8" />

                <BiDislike className="size-8" />

                <LuSave onClick={() => saveBlogToUser()} className="size-8" />
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold prose  ">Tag : </span>
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-neutral rounded">
                {data.tag}
              </span>
            </div>

            <div className="mb-4 prose">
              <span className="font-semibold ">Created Date:</span>{" "}
              <span>{formatDate(data.createdDate)}</span>
              {data.editedDate ? (
                <>
                  |<span className="font-semibold"> Edited Date:</span>{" "}
                  <span>{formatDate(data.editedDate)}</span>
                </>
              ) : null}
            </div>
          </div>

          <div className="prose prose-lg text-gray-800">
            <ReactMarkdown className="prose">{data.mark}</ReactMarkdown>
          </div>

          <label className="comment">
            <div className="label">
              <span className="label-text text-bold">Add comment</span>
            </div>
            <textarea
              className="textarea textarea-success textarea-lg textarea-bordered h-24"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="label">
              <button
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-secondary"
                onClick={handleAddComment}
              >
                Add Comment
              </button>
            </div>
          </label>

          {commentsArray &&
            commentsArray.map(({ text, time }, index) => {
              return (
                <div className="chat chat-start" key={index}>
                  <div className="chat-bubble">
                    {formatDate(time)}
                    <br />
                    {text}
                  </div>
                </div>
              );
            })}
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
