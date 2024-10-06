"use client";

import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";

 

export default function Page({params}:{params:{slug:string}}) {
  return( <>
  <Link href={"/"} className="btn m-2 btn-xs btn-neutral"><FaLongArrowAltLeft /> Go Back to Home </Link>
  <p>Post: {params.slug}</p>
  
  </>)
}