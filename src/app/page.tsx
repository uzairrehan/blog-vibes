"use client";
import AllCards from "@/components/allCards";
// import AlllUserStore from "@/components/alllUserStore";
import { db } from "@/firebase/firebaseconfig";
// import useUserStore from "@/store/userStore";
import { CardData } from "@/types/types";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
  const [allCards, setAllCards] = useState<CardData[]>([]);
  // const saveUser = useUserStore((state) => state.saveUser);

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const dataArray: CardData[] = [];
    querySnapshot.forEach((doc) => {
      dataArray.push(doc.data() as CardData);
    });
    setAllCards(dataArray);
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      {/* <button
        onClick={() => {
          saveUser(userr);
          // console.log("saved");
        }}
      >
        save
      </button> */}
      {/* <AlllUserStore /> */}
      <AllCards allCards={allCards} />
    </>
  );
}
