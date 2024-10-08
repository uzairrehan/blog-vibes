"use client";
import {
  loginWithEmailPassword,
  passwordReset,
} from "@/firebase/firebaseauthentication";
import { useState } from "react";
import { toast } from "react-toastify";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    loginWithEmailPassword(email, password);
    setEmail("");
    setPassword("");
  }

  function handlePasswordReset() {
    if (email) {
      passwordReset(email);
    } else {
      toast.error("Please Add Email");
    }
  }

  return (
    <>
      <div className="flex  flex-col justify-center px-6  lg:px-8  ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-neutral">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="gap-4 flex flex-col justify-center text-neutral "
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 pb-2 text-neutral"
              >
                Email address
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="grow "
                  placeholder="uzair@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </label>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 pb-2 text-neutral"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    onClick={handlePasswordReset}
                    className="font-semibold text-neutral hover:text-secondary hover:cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="grow"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </label>
            </div>

            <div className="center flex justify-center items-center pt-4 ">
              <button
                type="submit"
                className="text-neutral btn-primary btn bg-secondary btn-wide sm:mx-auto sm:w-full sm:max-w-sm hover:bg-neutral hover:text-primary"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
