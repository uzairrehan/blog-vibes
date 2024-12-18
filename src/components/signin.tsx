"use client";

// imports
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, User } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseconfig";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserState } from "@/types/types";
import Loading from "./loading";
import useUserStore from "@/store/userStore";

function SignIn() {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(true);
  // function from store to set user in store
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
        }
      });
    });
  };

  async function loginWithEmailPassword() {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { email, emailVerified } = userCredential.user;
        toast.success(`Signed in with email : ${email}`);
        await fetchUserDetails();
        if (emailVerified) {
          route.push("/");
        } else {
          await sendEmailVerification(auth.currentUser as User);

          toast.success("Email verifiction sent");

          route.push("/authenticate/verify");
        }
      })
      .catch((error) => {
        toast.error("Could not sign-in", error.message);
      });
  }

  function passwordReset(email: string) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(`Check Email : ${email}`);
      })
      .catch((error) => {
        toast.error(`error : ${error.message}`);
      });
  }

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setLoading(true);
    await loginWithEmailPassword();
    setEmail("");
    setPassword("");
    setLoading(false);
  }

  async function handlePasswordReset() {
    if (email) {
      await passwordReset(email);
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
                  type={toggle ? "password" : "text"}
                  required
                  className="grow"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  {toggle ? <FaEyeSlash /> : <FaEye />}
                </button>
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
