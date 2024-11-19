"use client";
import { db } from "@/firebase/firebaseconfig";
import { CardData } from "@/types/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import AllCards from "@/components/allCards";
import Footer from "@/components/footer";

export default function Home() {
  const [allCards, setAllCards] = useState<CardData[]>([]);

  async function getData() {
    const q = query(collection(db, "blogs"),  where("deleted", "!=", true))
    const querySnapshot = await getDocs(q);
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
      <AllCards allCards={allCards} />
      <Footer />
    </>
  );
}
