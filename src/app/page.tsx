"use client";
import AllCards from "@/components/allCards";
import { db } from "@/firebase/firebaseconfig";
import { useAppSelector } from "@/store/lib/hooks";
import { CardData } from "@/types/types";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
// import { setUser } from "@/store/lib/slices/userSlice";

export default function Home() {
  const [allCards, setAllCards] = useState<CardData[]>([]);
  const user =  useAppSelector((state) => state.user.user)
  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const dataArray: CardData[] = [];
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data() as CardData);
      });
      setAllCards(dataArray);
    }
    getData();
  }, []);

  // const userrr = {
  //   name :"uzair",
  //   fathername:"rehan"
  // }

  function saveUser() {
    // set
    console.log("user => " , user );
  }
  return (
    <>
    <button onClick={saveUser} >save</button>
      <AllCards allCards={allCards} />
    </>
  );
}
