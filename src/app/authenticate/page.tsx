"use client";
import SignUp from "@/components/signup";
import SignIn from "@/components/signin";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebaseconfig";

function Authenticate() {
  const [page, setPage] = useState("SignUp");
  const route = useRouter();

  useEffect(()=>{
    checkUser()
    console.log("hello");
  },[])
  function checkUser() {
    if (auth.currentUser) {
      toast.error("You are already logged in !")
      console.log("hello");
      route.push("/")
    } 
}
  return (
    <>
      <div className="flex justify-center gap-4 py-5 items-center">
        <button
          className={
            page == "SignIn"
              ? "btn btn-secondary  text-neutral"
              : "btn btn-neutral text-primary "
          }
          onClick={() => setPage("SignIn")}
        >
          Sign In
        </button>
        <button
          className={
            page == "SignUp"
              ? "btn btn-secondary text-neutral"
              : "btn btn-neutral  text-primary "
          }
          onClick={() => setPage("SignUp")}
        >
          Sign Up
        </button>
      </div>
      {page == "SignUp" ? <SignUp /> : <SignIn />}
    </>
  );
}

export default Authenticate;
