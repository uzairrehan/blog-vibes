"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "@/firebase/firebaseconfig";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";
import Footer from "@/components/footer";
import { toast } from "react-toastify";
import { db, updateMyProfile } from "@/firebase/firebasefirestore";
import { auth } from "@/firebase/firebaseauthentication";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";

function Profile() {
  const [picture, setPicture] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [fathername, setFathername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [DOB, setDOB] = useState("");
  const [bio, setBio] = useState("");
  const [PFP, setPFP] = useState("");
  const route = useRouter();

  async function fetchUserDetails() {
    const uid = auth.currentUser?.uid;
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ");
      const data = doc.data();
      setName(data.userName);
      setFathername(data.fathername);
      setBio(data.bio);
      setDOB(data.DOB);
      setPhonenumber(data.phonenumber);
      setPFP(data.imageURL);
    });
  }

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (loggedInUser) => {
      if (!loggedInUser) {
        toast.error("authenticate to view your profile !");
        route.push("/authenticate");
        return;
      }
      fetchUserDetails();
    });
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await updateMyProfile({
        picture,
        name,
        fathername,
        phonenumber,
        DOB,
        bio,
      });
      route.push("/");
    } catch (error) {
      toast.error(`Couldn't update ! ${error}`);
    }
  };

  return (
    <>
      <Link href={"/"} className="btn m-2 btn-xs btn-neutral">
        <FaLongArrowAltLeft /> Go Back to Home{" "}
      </Link>


      
      <div className="max-w-screen-lg mx-auto p-4 text-black">
        <div className="flex justify-center mb-6">
          {PFP ? (
            <Image
              src={PFP}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover"
              width={160}
              height={160}
            />
          ) : null}
        </div>

        <form className="px-8 pt-6 pb-8 mb-4">
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
              onChange={(e) => {
                setPicture(e.target.files?.[0] ?? null);
              }}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={fathername}
                onChange={(e) => setFathername(e.target.value)}
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
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
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
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
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
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="mt-6">
            <button
              className="btn btn-active btn-neutral w-full"
              onClick={handleSubmit}
            >
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
