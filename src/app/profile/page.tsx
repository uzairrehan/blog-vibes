"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { app } from "@/firebase/firebaseconfig";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";
import Footer from "@/components/footer";

function Profile() {
  const route = useRouter();
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (loggedInUser) => {
      if (!loggedInUser) {
        route.push("/authenticate");
      }
    });
  }, [route]);

  return (
    <>
      <Link href={"/"} className="btn m-2 btn-xs btn-neutral">
        <FaLongArrowAltLeft /> Go Back to Home{" "}
      </Link>

      <div className="max-w-screen-lg mx-auto p-4 text-black">
        This Page is Under Construction !!
        <div className="flex justify-center mb-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        <form className=" px-8 pt-6 pb-8 mb-4">
          <div className="mb-4 ">
            <label
              htmlFor="image"
              className="block pl-0 text-sm font-bold mb-2 form-control w-full  label"
            >
              <span className="text-neutral">Upload Image : </span>
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="w-full p-0 file-input bg-white file-input-bordered rounded-lg input input-primary"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="Name"
                className="block text-neutral text-sm font-bold mb-2"
              >
                Name :
              </label>
              <input
                type="text"
                id="Name"
                className="w-full py-2 px-3 input input-bordered input-primary  input-neutral rounded-lg bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="fathername"
                className="block text-neutral text-sm font-bold mb-2"
              >
                Fathername :
              </label>
              <input
                type="text"
                id="fathername"
                className="w-full py-2 px-3 input input-bordered input-primary  input-neutral rounded-lg bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="phonenumber"
                className="block text-neutral text-sm font-bold mb-2"
              >
                Phonenumber :
              </label>
              <input
                type="number"
                id="phonenumber"
                className="w-full py-2 px-3 input input-bordered input-primary  input-neutral rounded-lg bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="DOB :"
                className="block text-neutral text-sm font-bold mb-2"
              >
                DOB :
              </label>
              <input
                type="date"
                id="DOB :"
                className="w-full py-2 px-3 input input-bordered input-primary  input-neutral rounded-lg bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-neutral text-sm font-bold mb-2"
              >
                Bio :
              </label>
              <textarea
                className="textarea textarea-primary w-full py-2 px-3 input input-bordered input-neutral  rounded-lg bg-white"
                placeholder="Bio"
                id="bio"
              ></textarea>
            </div>
          </div>
          <div className="mt-6">
            <button className="btn btn-active btn-neutral w-full">
              Update
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
