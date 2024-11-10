"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, provider } from "@/firebase/firebaseconfig";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import Loading from "./loading";
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import useUserStore from "@/store/userStore";
import { UserState } from "@/types/types";

function SignUp() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const setUserFromStore = useUserStore((state) => state.saveUser);

  const fetchUserDetails = () => {
    const uid = auth.currentUser?.uid;
    const q = query(collection(db, "users"), where("uid", "==", uid));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as UserState | undefined;

        if (data) {
          setUserFromStore(data);
        } else {
          console.warn("User data not found or invalid.");
        }
      });
    });
  };

  async function saveUser(
    email: string | null | undefined,
    userName: string | null,
    uid: string
  ) {
    const reference = doc(db, "users", uid);
    const data = {
      email: email,
      userName: userName,
      uid: uid,
    };
    await setDoc(reference, data);
    console.log("created");
  }

  async function updateUser(
    email: string | null | undefined,
    userName: string | null,
    uid: string,
    photoURL?: string
  ) {
    const reference = doc(db, "users", uid);
    const data = {
      email: email,
      userName: userName,
      uid: uid,
      imageURL: photoURL,
    };
    await updateDoc(reference, data);
  }

  async function signupWithEmailPassword(
    email: string,
    password: string,
    userName: string
  ) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { email, uid } = userCredential.user;
        console.log(email, uid, userName, "user created successfully.");
        updateProfile(userCredential.user, {
          displayName: userName,
        });
        console.log(userCredential);
        saveUser(email, userName, uid).then(() => {
          fetchUserDetails();
        });
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
    route.push("/authenticate/verify");
  }

  async function googleSign() {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        updateUser(
          auth.currentUser?.email,
          user.displayName,
          user.uid,
          user.photoURL as string
        );
        console.log(token, user);
        fetchUserDetails();
        route.push("/");
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
