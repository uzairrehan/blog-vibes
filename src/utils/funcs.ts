import { db } from "@/firebase/firebaseconfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";

// from ChatGPT
export function formatDate(prop: { seconds: number; nanoseconds: number }) {
  const { seconds, nanoseconds } = prop;
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
  const date = new Date(milliseconds);
  const pad = (num: number) => num.toString().padStart(2, "0");
  const day = pad(date.getDate());
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  let hours = date.getHours();
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const minutes = pad(date.getMinutes());
  const secondsTime = pad(date.getSeconds());
  const formattedDate = `${day} ${month} ${year} ${pad(
    hours
  )}:${minutes}:${secondsTime} ${period}`;

  return formattedDate;
}
//

export async function updateUser(
  email: string | null | undefined,
  uid: string
) {
  const reference = doc(db, "users", uid);
  const data = {
    email: email,
    uid: uid,
  };
  await updateDoc(reference, data);
  console.log("user added");
}

export async function saveUser(
  email: string | null | undefined,
  userName: string | null,
  uid: string
) {
  const reference = doc(db, "users", uid);
  const data = {
    email: email,
    userName: userName,
    uid: uid,
  };
  await setDoc(reference, data);
}
