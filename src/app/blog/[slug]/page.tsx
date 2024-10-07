"use client";

import { db } from "@/firebase/firebasefirestore";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
// import ReactMarkdown from "react-markdown";



export default function Page({ params }: { params: { slug: string } }) {
  const [data,setData] = useState()
  useEffect(() => {
    if (params.slug) {
      const fetchBlog = async () => {
        try {
          const dataRef = doc(db, "blogs", params.slug);
          const dataSnap = await getDoc(dataRef);
          if (dataSnap.exists()) {
            const blogData = dataSnap.data()
            setData(blogData)
            console.log(data);
            
          }
        } catch (error) {
          console.error(error);
        } 
      };

      fetchBlog();
    }
  }, [params.slug]);
  console.log(data);
  return (
    <>
      <Link href={"/"} className="btn m-2 btn-xs btn-neutral">
        <FaLongArrowAltLeft /> Go Back to Home
      </Link>
      <p>Post: {params.slug}</p>

{/* 
      <ReactMarkdown>
        {data}
      </ReactMarkdown> */}
      {/* {data ? JSON.stringify(data): null} */}
      
    </>
  );
}
