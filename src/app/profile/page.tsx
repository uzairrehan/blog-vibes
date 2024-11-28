"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "@/firebase/firebaseconfig";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Loading from "@/components/loading";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import useUserStore from "@/store/userStore";
import { UserState } from "@/types/types";
import Footer from "@/components/footer";

function Profile() {
  const [picture, setPicture] = useState<File | null>(null);
  const [name, setName] = useState<string | undefined>("");
  const [fathername, setFathername] = useState<string | undefined>("");
  const [phonenumber, setPhonenumber] = useState<string | undefined>("");
  const [DOB, setDOB] = useState<string | undefined>("");
  const [bio, setBio] = useState<string | undefined>("");
  const [PFP, setPFP] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const saveUser = useUserStore((state) => state.saveUser);
  const userrr = useUserStore((state) => state.user);

  // fetching all users details and setting into state
  function setUserDetails() {
      console.log(userrr);
      setName(userrr.userName);
      setFathername(userrr.fathername);
      setBio(userrr.bio);
      setDOB(userrr.DOB);
      setPhonenumber(userrr.phonenumber);
      setPFP(userrr.imageURL);
  }


  useEffect(() => {
    onAuthStateChanged(auth, async (loggedInUser) => {
      if (!loggedInUser) {
        toast.error("authenticate to view your profile !");
        route.push("/authenticate");
        return;
      }
    });
    setUserDetails()
  }, [userrr]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateMyProfile();
    } catch (error) {
      console.log(error);
      toast.error(`Couldn't update! ${error}`);
    } finally {
      setLoading(false);
    }
  };


  async function updateMyProfile() {
    const uid = auth.currentUser?.uid;
  
    if (!uid) {
      toast.error("User is not authenticated!");
      return;
    }
  
    try {
      let imageURL = PFP; 
  
      if (picture) {
        console.log("Uploading image...");
        const imageRef = ref(storage, `uploads/images/${crypto.randomUUID()}-${picture.name}`);
        const uploadTask = uploadBytesResumable(imageRef, picture);
  
        imageURL = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null, 
            (error) => reject(error), 
            async () => resolve(await getDownloadURL(uploadTask.snapshot.ref))
          );
        });
  
        if (!imageURL) {
          toast.error("Image upload failed.");
          return;
        }
        console.log("Image uploaded successfully:", imageURL);
      }
  
      const { email, role } = userrr;

      const user = {
        userName: name?name:null,
        fathername: fathername?fathername:null,
        phonenumber:phonenumber?phonenumber:null,
        DOB :DOB?DOB:null,
        bio:bio?bio:null,
        email:email?email:null,
        uid:uid?uid:null,
        imageURL:imageURL?imageURL:null, 
        role : role? role:"user"
      };

      await setDoc(doc(db, "users", uid), user, { merge: true });
      saveUser(user as UserState);
  
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(`Error updating profile `);
    }
  }
  

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
              onClick={handleSubmit}
              className="btn btn-active btn-neutral w-full"
              disabled={loading}
            >
              {loading ? <Loading /> : <> Update Profile </>}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
