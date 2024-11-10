"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseconfig";
import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Loading from "./loading";
import { collection, getDocs, query, where } from "firebase/firestore";
import useUserStore from "@/store/userStore";
import { UserState } from "@/types/types";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setUserFromStore = useUserStore((state) => state.saveUser);

  const route = useRouter();


  const fetchUserDetails = () => {
    const uid = auth.currentUser?.uid;
    const q = query(collection(db, "users"), where("uid", "==", uid));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as UserState | undefined;

        if (data) {
          setUserFromStore(data);
        } else {
          // console.warn("User data not found or invalid.");
        }
      });
    });
  };

  







  function loginWithEmailPassword() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { email, uid, emailVerified } = userCredential.user;
        // console.log(email, uid, "user LOGGED IN successfully.", userCredential);
        toast.success(`Signed in with email : ${email}`);
        fetchUserDetails()
        if (emailVerified) {
          route.push("/");
        } else {
          route.push("/authenticate/verify");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.error(errorMessage, errorCode);
        toast.error("Could'nt sign-in", error.message);
      });
  }

  function passwordReset(email: string) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // console.log("sent");
        toast.success(`Check Email : ${email}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
        toast.error(`error : ${error.message}`);
      });
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setLoading(true);
    loginWithEmailPassword();
    setEmail("");
    setPassword("");
    setLoading(false);
  }

  function handlePasswordReset() {
    if (email) {
      passwordReset(email);
      toast.success("Email sent !");
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
                <MdEmail className="h-4 w-4 opacity-70" />
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
                <FaKey className="h-4 w-4 opacity-70" />
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
                disabled={loading ? true : false}
              >
                {loading ? <Loading /> : <> Signin </>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
