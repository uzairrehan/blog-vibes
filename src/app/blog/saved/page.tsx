"use client";
import AllCards from "@/components/allCards";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import { auth, db } from "@/firebase/firebaseconfig";
import { CardData } from "@/types/types";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Saved() {
  const [allCards, setAllCards] = useState<CardData[]>([]);
  const [allUIDS, setAllUIDS] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // getting data
  useEffect(() => {
    getData();
  }, []);
  // allUIDS is depedency so it will run only when the "getData()" function will run and put alluids in state
  useEffect(() => {
    if (allUIDS.length > 0) {
      getSavedBlogs();
    } else {
      setLoading(false);
    }
  }, [allUIDS]);

  // for getting the currentuser saved blogs array
  async function getData() {
    const docRef = doc(db, "users", auth.currentUser?.uid as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const savedBlogs = docSnap.data().savedBlogs || [];
      setAllUIDS(savedBlogs);
    } else {
      console.log("No such document!");
      setAllUIDS([]);
    }
  }

  // for fetching blogs from firebaseID that is present in "allUIDS"
  async function getSavedBlogs() {
    const dataArray: CardData[] = [];
    for (const id of allUIDS) {
      const q = query(collection(db, "blogs"), where("firebaseID", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data() as CardData);
      });
    }
    setAllCards(dataArray);
    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <div className="min-h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : allUIDS.length > 0 ? (
        <div>
          <h1 className="p-5 text-neutral m-5 text-4xl text-center">Saved Blogs</h1>
          <AllCards allCards={allCards} />
        </div>
      ) : (
        <h1 className="min-h-full flex items-center justify-center text-2xl text-neutral" >No saved blogs</h1>
      )}
                <Footer />

    </>
  );
}
