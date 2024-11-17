"use client";

import Loading from "@/components/loading";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  DocumentData,
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
import { doc, updateDoc } from "firebase/firestore";
import { RiSaveFill, RiSaveLine } from "react-icons/ri";
import Footer from "@/components/footer";
import { formatDate } from "@/utils/funcs";

export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [comment, setComment] = useState<string>("");
  const route = useRouter();
  const [commentsArray, setCommentsArray] = useState<DocumentData[]>([]);
  
  async function saveLikeToBlog() {

    const uid = auth.currentUser?.uid;
    const reference = doc(db, "blogs", data?.firebaseID);
    const d = {
      likes: arrayUnion(uid),
    };
    await updateDoc(reference, d);
    toast.success("liked!");
  }

  async function removeLikeToBlog() {

    const uid = auth.currentUser?.uid;
    const reference = doc(db, "blogs", data?.firebaseID);
    const d = {
      likes: arrayRemove(uid),
    };
    await updateDoc(reference, d);
    toast.success("like removed!");
  }

  async function saveDisLikeToBlog() {

    const uid = auth.currentUser?.uid;
    const reference = doc(db, "blogs", data?.firebaseID);
    const d = {
      disLikes: arrayUnion(uid),
    };
    await updateDoc(reference, d);
    toast.success("disliked!");
  }

  async function removeDisikeToBlog() {

    const uid = auth.currentUser?.uid;
    const reference = doc(db, "blogs", data?.firebaseID);
    const d = {
      disLikes: arrayRemove(uid),
    };
    await updateDoc(reference, d);
    toast.success("dislike removed!");
  }


  function handleLikesAndDislikes() {
    if (!auth.currentUser?.uid) {
      toast.error("Please Login First to like or dislike!");
      route.push("/authenticate");
      return;
    }
    const isliked = data?.likes.includes(auth.currentUser?.uid)
    const isDisliked = data?.disLikes.includes(auth.currentUser?.uid)

    if (isliked){
      saveLikeToBlog()
      return
    }
    
    if (!isliked){
      removeLikeToBlog()
      return
    }
  
    if (isDisliked){
      saveDisLikeToBlog()
      return
    }
    
    if (!isDisliked){
      removeDisikeToBlog()
      return
    }
   
  }




  async function updateBlogSaved() {
    const collectionRef = doc(db, "blogs", data?.firebaseID);
    const newBlog = {
      savedByWhom: arrayUnion(auth.currentUser?.uid),
    };
    await updateDoc(collectionRef, newBlog);
    console.log("updated blog ");
  }

  async function updateBlogUnSaved() {
    const collectionRef = doc(db, "blogs", data?.firebaseID);
    const newBlog = {
      savedByWhom: arrayRemove(auth.currentUser?.uid),
    };
    await updateDoc(collectionRef, newBlog);
    console.log("updated blog ");
  }

  async function removeSaveBlogToUser() {
    if (!auth.currentUser?.uid) {
      toast.error("Please Login First to unsave!");
      route.push("/authenticate");
      return;
    }
    const uid = auth.currentUser?.uid;
    const reference = doc(db, "users", uid);
    const d = {
      savedBlogs: arrayRemove(data?.firebaseID),
    };
    await updateDoc(reference, d);
    updateBlogUnSaved();
    toast.success("blog unsaved !");
  }

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
    updateBlogSaved();
    toast.success("blog saved !");
  }
  useEffect(() => {
    if (params.slug) {
      const q = query(
        collection(db, "blogs"),
        where("slug", "==", params.slug)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const blogData = querySnapshot.docs.map((doc) => doc.data());
        if (blogData.length > 0) {
          setData(blogData[0]);
          console.log(data?.savedByWhom);
        } else {
          setData(null);
        }
      });

      return () => unsubscribe();
    }
  }, [params.slug]);



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
                {data?.likes && data.likes.includes(auth.currentUser?.uid) ? (
                  <button
                    title="remove like"
                    onClick={() => removeLikeToBlog()}
                  >
                    <BiSolidLike className="size-8" />
                  </button>
                ) : (
                  <button title="like" onClick={() => saveLikeToBlog()}>
                    <BiLike className="size-8" />
                  </button>
                )}
                {data.likes ? data.likes.length : null}

                {data?.disLikes &&
                data.disLikes.includes(auth.currentUser?.uid) ? (
                  <button
                    title="remove dislike"
                    onClick={() => removeDisikeToBlog()}
                  >
                    <BiSolidDislike className="size-8" />
                  </button>
                ) : (
                  <button title="dislike" onClick={() => saveDisLikeToBlog()}>
                    <BiDislike className="size-8" />
                  </button>
                )}
                {data.disLikes ? data.disLikes.length : null}
                {data?.savedByWhom &&
                data.savedByWhom.includes(auth.currentUser?.uid) ? (
                  <button title="unsave" onClick={() => removeSaveBlogToUser()}>
                    <RiSaveFill className="size-8 " />
                  </button>
                ) : (
                  <button title="save" onClick={() => saveBlogToUser()}>
                    <RiSaveLine className="size-8 " />
                  </button>
                )}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold prose  ">category : </span>
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-neutral rounded">
                {data.category}
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
            <ReactMarkdown>{data.mark}</ReactMarkdown>
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

            {comment.length > 0 && (
              <div className="label">
                <button
                  className="btn btn-xs sm:btn-sm md:btn-md  btn-secondary"
                  onClick={handleAddComment}
                >
                  Add Comment
                </button>
              </div>
            )}
          </label>

          {commentsArray.length === 0 ? (
            <p className="text-black">No comments yet !!</p>
          ) : (
            commentsArray.map(({ text, time }, index) => (
              <div className="chat chat-start" key={index}>
                <div className="chat-bubble">
                  {formatDate(time)}
                  <br />
                  {text}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="min-h-full flex items-center justify-center">
          <Loading />
        </div>
      )}
      <Footer />
    </>
  );
}
