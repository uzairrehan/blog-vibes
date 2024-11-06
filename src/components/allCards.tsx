"use client";

import Cards from "@/components/cards";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AllCards({ allCards }: any) {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
  };

  const filteredCards =
    selectedTag === "All"
      ? allCards
      : allCards.filter((card: { tag: string }) => card.tag === selectedTag);

  return (
    <>
      <label className="form-control w-full max-w-xs flex justify-start items-start ml-5">
        <div className="label">
          <span className="label-text text-neutral">Filter by tag:</span>
        </div>
        <select
          className="select select-bordered select-sm select-secondary"
          value={selectedTag}
          onChange={handleTagChange}
        >
          <option value="All">All</option>
          <option value="Coding">Coding</option>
          <option value="Education">Education</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Blogging">Blogging</option>
        </select>
      </label>
      {allCards.length > 0 ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 my-5">
            {filteredCards.map(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ({ firebaseID, imageURL, title, mark, tag, slug }: any) => {
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
              }
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      )}

      <Footer />
    </>
  );
}
