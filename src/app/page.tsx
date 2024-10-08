"use client";

import Cards from "@/components/cards";
import Footer from "@/components/footer";

import { db } from "@/firebase/firebasefirestore";
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
  console.log(allCards);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mx-5 my-5">
          {allCards.map(({ firebaseID, imageURL, title, mark, tag, slug }) => {
            return (
              <Cards
                key={firebaseID}
                imageURL={imageURL}
                heading={title}
                text={mark}
                tag={tag}
                slug={slug}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
