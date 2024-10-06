"use client";
import {  useRouter } from "next/navigation";
import { useEffect } from "react";

function Blog() {
    const route= useRouter()
    useEffect(()=>{
        route.push("/")
    },[route])
    return ( <> YOU ARE IN WRONG PLACE !</> );
}

export default Blog;