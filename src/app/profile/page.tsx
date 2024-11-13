"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "@/firebase/firebaseconfig";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Loading from "@/components/loading";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";



function Profile() {
  const [picture, setPicture] = useState<File | null>(null);
  const [name, setName] = useState(" ");
  const [fathername, setFathername] = useState(" ");
  const [phonenumber, setPhonenumber] = useState(" ");
  const [DOB, setDOB] = useState(" ");
  const [bio, setBio] = useState(" ");
  const [PFP, setPFP] = useState(" ");
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  // fetching all users details and setting into state
  async function fetchUserDetails() {
    if (!auth.currentUser) return; 
    const uid = auth.currentUser?.uid;
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
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
    onAuthStateChanged(auth, async (loggedInUser) => {
      if (!loggedInUser) {
        toast.error("authenticate to view your profile !");
        route.push("/authenticate");
        return;
      }
      await fetchUserDetails();
    });
  }, []);



  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateMyProfile();
      await fetchUserDetails();
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

    const collectionRef = doc(db, "users", uid);

    if (!picture) {
      const user = {
        userName: name,
        fathername,
        phonenumber,
        DOB,
        bio,
      };
      await updateDoc(collectionRef, user);
      toast.success("Updated Successfully!");
      return;
    }

    try {
      const uploadImage = async () => {
        if (!picture) {
          return;
        }
        const imageRef = ref(
          storage, `uploads/images/${crypto.randomUUID()}-${picture.name}`
        );
        const uploadTask = uploadBytesResumable(imageRef, picture);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              // console.error("Upload error: ", error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              // console.log("File available at", downloadURL);
              resolve(downloadURL);
            }
          );
        });
      };

      const imageURL = await uploadImage();

      if (!imageURL) return toast.error("error uploading image");

      const user = {
        imageURL,
        userName: name,
        fathername,
        phonenumber,
        DOB,
        bio,
      };
      await updateDoc(collectionRef, user);

      toast.success("Updated Successfully!");
    } catch (error) {
      // console.error("Error Updating : ", error);
      toast.error(`Error Updating! ${error}`);
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
    </>
  );
}

export default Profile;
