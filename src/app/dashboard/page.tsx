"use client";

import { CardData } from "@/types/types";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { db } from "@/firebase/firebaseconfig";

function Dashboard() {
  const [cards, setCards] = useState<CardData[]>([]);
  const route = useRouter();

  useEffect(() => {
    const q = query(collection(db, "blogs"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("snapshot", snapshot);
      const newCards: CardData[] = [];
      snapshot.forEach((doc) => newCards.push(doc.data() as CardData));
      console.log(newCards);
      setCards(newCards);
    });
    return unsubscribe;
  }, []);
  async function deleteBlog(id: string) {
    await deleteDoc(doc(db, "blogs", id));
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Link href={"/dashboard/add"}>
          <button className="btn btn-sm m-5 btn-outline hover:btn-secondary ">
            <IoMdAdd />
            Add Blog
          </button>
        </Link>

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>category</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {!cards ? (
              <Loading />
            ) : (
              cards.map(({ imageURL, title, category, slug, firebaseID }) => (
                <tr key={title}>
                  <th>
                    <div
                      className="flex items-center gap-3 hover:cursor-pointer"
                      onClick={() => route.push(`/blog/${slug}`)}
                    >
                      <div
                        className="avatar "
                        onClick={() => route.push(`/blog/${slug}`)}
                      >
                        <div className="mask mask-squircle h-12 w-12">
                          {imageURL ? (
                            <Image
                              src={imageURL}
                              alt="image"
                              width={50}
                              height={50}
                            />
                          ) : null}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{title}</div>
                      </div>
                    </div>
                  </th>
                  <td>
                    <span className="badge badge-ghost badge-sm">{category}</span>
                  </td>
                  <th>
                    <button
                      className="btn btn-error sm:btn-xs lg:btn-sm"
                      onClick={() => {
                        deleteBlog(firebaseID as string);
                        toast.success("Deleted !");
                      }}
                    >
                      Delete
                    </button>
                  </th>
                  <th>
                    <button
                      className="btn btn-warning  sm:btn-xs lg:btn-sm"
                      onClick={() => {
                        route.push(`/dashboard/edit/${slug}`);
                      }}
                    >
                      Edit
                    </button>
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
