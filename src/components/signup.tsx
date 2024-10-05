"use client";
import {
  googleSign,
  signupWithEmailPassword,
} from "@/firebase/firebaseauthentication";
import { useState } from "react";
import { toast } from "react-toastify";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    signupWithEmailPassword(email, password, name);
    toast.success("User Created")
    setEmail("");
    setName("");
    setPassword("");
  }

  return (
    <>
      <div className="flex  flex-col justify-center px-6  lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-neutral">
            Create an Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="gap-3 flex flex-col justify-center text-neutral"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 pb-2 text-neutral"
              >
                Name
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="grow "
                  placeholder="Syed Uzair"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </label>
            </div>

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
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 pb-2 text-neutral"
              >
                Password
              </label>

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

            <div className="center flex justify-center items-center pt-4">
              <button
                type="submit"
                className="text-neutral btn-primary btn bg-secondary btn-wide sm:mx-auto sm:w-full sm:max-w-sm"
              >
                Sign Up
              </button>
            </div>
            <div className="divider">OR</div>
          </form>
          <div className="center flex justify-center items-center pt-2">
            <button
              type="submit"
              className="btn-error btn btn-wide flex items-center justify-center space-x-2 sm:mx-auto sm:w-full sm:max-w-sm"
              onClick={googleSign}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.607,1.972-2.101,3.467-4.26,3.866 c-3.431,0.635-6.862-1.865-7.19-5.339c-0.34-3.595,2.479-6.62,6.005-6.62c1.002,0,1.946,0.246,2.777,0.679 c0.757,0.395,1.683,0.236,2.286-0.368l0,0c0.954-0.954,0.701-2.563-0.498-3.179c-1.678-0.862-3.631-1.264-5.692-1.038 c-4.583,0.502-8.31,4.226-8.812,8.809C1.945,16.9,6.649,22,12.545,22c6.368,0,8.972-4.515,9.499-8.398 c0.242-1.78-1.182-3.352-2.978-3.354l-4.61-0.006C13.401,10.24,12.545,11.095,12.545,12.151z"
                />
              </svg>
              <span>Google Sign Up</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
