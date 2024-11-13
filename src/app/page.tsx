"use client";
import AllCards from "@/components/allCards";
import Footer from "@/components/footer";
import { db } from "@/firebase/firebaseconfig";
import { CardData } from "@/types/types";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
  const [allCards, setAllCards] = useState<CardData[]>([]);

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
      <AllCards allCards={allCards} />
      <Footer />
    </>
  );
}
