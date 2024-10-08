"use client";
import SignUp from "@/components/signup";
import SignIn from "@/components/signin";
import { useState } from "react";

function Authenticate() {
  const [page, setPage] = useState("SignUp");

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
