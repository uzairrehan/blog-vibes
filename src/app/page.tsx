"use client";
import AllCards from "@/components/allCards";
import { db } from "@/firebase/firebaseconfig";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { setUser } from "@/store/lib/slices/userSlice";
import { CardData } from "@/types/types";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
  const [allCards, setAllCards] = useState<CardData[]>([]);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
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

  const userrr = {
    userName: "uzair",
    fathername: "rehan",
    uid: "65355524546536",
    email: "uzairshah200684@gmail.com",
  };

  function saveUser() {
    dispatch(setUser(userrr));
    console.log("user => ", user);
  }
  console.log(user);
  return (
    <>
      <button onClick={saveUser}>save</button>
      <AllCards allCards={allCards} />
    </>
  );
}
