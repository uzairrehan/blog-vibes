"use client";
import AllCards from "@/components/allCards";
import { auth, db } from "@/firebase/firebaseconfig";
import { CardData } from "@/types/types";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Saved() {
  const [allCards, setAllCards] = useState<CardData[]>([]);
  const [allUIDS, setAllUIDS] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const docRef = doc(db, "users", auth.currentUser?.uid as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const savedBlogs = docSnap.data().savedBlogs;
      setAllUIDS(savedBlogs);
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    if (allUIDS.length > 0) {
      getSavedBlogs();
    }
  }, [allUIDS]);

  async function getSavedBlogs() {
    console.log("hello im running");

    const dataArray: CardData[] = [];
    for (let i = 0; i < allUIDS.length; i++) {
      const q = query(
        collection(db, "blogs"),
        where("firebaseID", "==", allUIDS[i])
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data() as CardData);
      });
    }
    setAllCards(dataArray);
  }

  return (
    <>
      <h1 className="p-5 size-8">Saved Jobs</h1>
      {/* {allCards.length >=0? */}
      <AllCards allCards={allCards}/>
    {/* : <h1> no saved blogs</h1>   */}
    {/* } */}
    </>
  );
}
