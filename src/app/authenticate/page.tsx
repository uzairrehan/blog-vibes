"use client";
// imports
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebaseconfig";
import SignUp from "@/components/signup";
import SignIn from "@/components/signin";

function Authenticate() {
  const [page, setPage] = useState(true);
  const route = useRouter();



  function checkUser() {
    if (auth.currentUser?.uid) {
      toast.error("You are already logged in !");
      route.push("/");
    }
  }


  useEffect(() => {
    checkUser();
  }, []);


  
  return (
    <>
      <div className="flex justify-center gap-4 py-5 items-center">
        <button
          className={
            page
              ? "btn btn-neutral text-primary "
              : "btn btn-secondary  text-neutral"
          }
          onClick={() => setPage(false)}
        >
          Login
        </button>
        <button
          className={
            page
              ? "btn btn-secondary text-neutral"
              : "btn btn-neutral  text-primary "
          }
          onClick={() => setPage(true)}
        >
          Create
        </button>
      </div>
      {page ? <SignUp /> : <SignIn />}
    </>
  );
}

export default Authenticate;
