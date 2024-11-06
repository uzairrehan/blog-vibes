"use client";
import AllCards from "@/components/allCards";
import { db } from "@/firebase/firebaseconfig";
import { CardData } from "@/types/types";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
  const [allCards, setAllCards] = useState<CardData[]>([]);
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
  return (
    <>
      <AllCards allCards={allCards} />
    </>
  );
}
