"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, provider } from "@/firebase/firebaseconfig";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserState } from "@/types/types";
import { saveUser, updateUser } from "@/utils/funcs";
import Loading from "./loading";
import useUserStore from "@/store/userStore";

function SignUp() {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(true);
  const route = useRouter();
  // from zustand store
  const setUserFromStore = useUserStore((state) => state.saveUser);

  // fetching user details & setting it into zustand store
  const fetchUserDetails = async (uid: string) => {
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

  // signup function with saving user in firestore and after this fetching this data and setting it into store
  async function signupWithEmailPassword(
    email: string,
    password: string,
    userName: string
  ) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { email, uid } = userCredential.user;
        await saveUser(email, userName, uid).then(async () => {
          await fetchUserDetails(uid);
        });
        toast.success(`Signed Up with email : ${email}`);
      })
      .catch((error) => {
        toast.error(`Couldn't sign-up: ${error.message}`);
      });
  }

  // main func that is handling the subit
  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setLoading(true);
    await signupWithEmailPassword(email, password, name);
    await checkUserVerification();
    setEmail("");
    setName("");
    setPassword("");
    setLoading(false);
  }

  async function googleSign() {
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        await updateUser(auth.currentUser?.email, user.uid);
        await fetchUserDetails(user.uid);
        route.push("/");
        toast.success("Signed in with google !");
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Couldn't sign-in: ${error.message}`);
      });
  }

  async function checkUserVerification() {
    const currentUser = auth.currentUser;
    if (currentUser) {
      if (currentUser.emailVerified) {
        route.push("/");
      } else {
        await sendEmailVerification(currentUser);
        toast.success("Email verifiction sent");

        console.log("verificaion sent ");

        route.push("/authenticate/verify");
      }
    } else {
      setLoading(false);
      console.log("user not found");
    }
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
                <FaUserAlt className="h-4 w-4 opacity-70" />
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
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 pb-2 text-neutral"
              >
                Password
              </label>
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
              onClick={googleSign}
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
