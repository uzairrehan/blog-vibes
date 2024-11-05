"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Loading from "./loading";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { saveUser, updateUser } from "@/firebase/firebasefirestore";
import { toast } from "react-toastify";
import { auth, provider } from "@/firebase/firebaseconfig";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const route = useRouter();

  function signupWithEmailPassword(
    email: string,
    password: string,
    userName: string
  ) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { email, uid } = userCredential.user;
        console.log(email, uid, userName, "user created successfully.");
        updateProfile(userCredential.user, {
          displayName: userName,
        });
        console.log(userCredential);
        saveUser(email, userName, uid);
        toast.success(`Signed Up with email : ${email}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage, errorCode);
        toast.error("Could'nt sign-up", error.message);
      });
  }



  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setLoading(true);
    signupWithEmailPassword(email, password, name);
    setEmail("");
    setName("");
    setPassword("");
    setLoading(false);
    route.push("/");
  }




  async function googleSign() {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        updateUser(auth.currentUser?.email, user.displayName, user.uid, user.photoURL as string);
        console.log(token, user);
        toast.success("Signed in with google !");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
        toast.error("Could'nt sign-in", error.message);
      });
  }
  









  async function googlee() {
    await googleSign();
    route.push("/");
  }
  return (
    <>
      <div className="flex  flex-col justify-center px-6  lg:px-8  ">
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
                className="text-neutral btn-primary btn bg-secondary btn-wide sm:mx-auto sm:w-full sm:max-w-sm hover:bg-neutral hover:text-primary"
                disabled={loading ? true : false}
              >
                {loading ? <Loading /> : <> Signup </>}
              </button>
            </div>
            <div className="divider">OR</div>
          </form>
          <div className="center flex justify-center items-center pt-2 mb-7">
            <button
              type="submit"
              className="btn-error btn btn-wide flex items-center justify-center space-x-2 sm:mx-auto sm:w-full sm:max-w-sm"
              onClick={googlee}
            >
              <FaGoogle />

              <span>Google Sign Up</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
