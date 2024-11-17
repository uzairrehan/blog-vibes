"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";
import { db } from "@/firebase/firebaseconfig";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Link from "next/link";
import Loading from "@/components/loading";
import Footer from "@/components/footer";
import { CardData } from "@/types/types";
import Image from "next/image";

function Dashboard() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const route = useRouter();

  useEffect(() => {
    const q = query(collection(db, "blogs"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newCards: CardData[] = [];
      snapshot.forEach((doc) => newCards.push(doc.data() as CardData));
      setCards(newCards);
    });
    return unsubscribe;
  }, []);

  async function deleteBlog(id: string) {
    await deleteDoc(doc(db, "blogs", id));
    toast.success("Blog deleted!");
    setModalOpen(false);
  }

  return (
    <>
      <Link href={"/dashboard/add"}>
        <button className="btn btn-sm m-5 btn-outline bg-secondary hover:btn-neutral">
          <IoMdAdd />
          Add Blog
        </button>
      </Link>

      {cards ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {cards.map(({ imageURL, title, category, slug, firebaseID }) => (
                <tr key={title}>
                  <th>
                    <div
                      className="flex items-center gap-3 hover:cursor-pointer"
                      onClick={() => route.push(`/blog/${slug}`)}
                    >
                      <div className="avatar">
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
                    <span className="badge badge-ghost badge-sm">
                      {category}
                    </span>
                  </td>
                  <th>
                    <button
                      onClick={() => {
                        setSelectedBlogId(firebaseID as string);
                        setModalOpen(true);
                      }}
                      className="block btn btn-error sm:btn-xs lg:btn-sm"
                    >
                      Delete
                    </button>
                  </th>
                  <th>
                    <button
                      className="btn btn-warning sm:btn-xs lg:btn-sm"
                      onClick={() => {
                        route.push(`/dashboard/edit/${slug}`);
                      }}
                    >
                      Edit
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="min-h-full flex items-center justify-center">
          <Loading />
        </div>
      )}

      {/* this is Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={() => setModalOpen(false)}
        >
          <div className="relative p-4 w-full max-w-md max-h-full bg-base-100 rounded-lg shadow">
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Are you sure you want to delete this blog?
              </h3>
              <button
                onClick={() => deleteBlog(selectedBlogId as string)}
                className="bg-error font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Yes, I&apos;m sure
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-primary ml-3 py-2.5 px-5 text-sm font-medium rounded-lg border"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Dashboard;
