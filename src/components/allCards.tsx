"use client";

import Cards from "@/components/cards";
import Loading from "@/components/loading";
import { AllCardsProps } from "@/types/types";
import { useState } from "react";



export default function AllCards({ allCards }: AllCardsProps) {
  const [selectedcategory, setSelectedcategory] = useState<string>("All");

  const handlecategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedcategory(event.target.value);
  };

  const filteredCards =
    selectedcategory === "All"
      ? allCards
      : allCards.filter((card) => card.category === selectedcategory);

  return (
    <>
      {allCards.length > 0 ? (

        <div>

          <label className="form-control w-full max-w-xs flex justify-start items-start ml-5">
            <div className="label">
              <span className="label-text text-neutral">Filter by category:</span>
            </div>
            <select
              className="select select-bordered select-sm select-secondary"
              value={selectedcategory}
              onChange={handlecategoryChange}
            >
              <option value="All">All</option>
              <option value="Coding">Coding</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Blogging">Blogging</option>
            </select>
          </label>



          <div className="flex justify-center items-center min-h-screen">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 my-5">
              {filteredCards.map(({ firebaseID, imageURL, title, mark, category, slug }) => {
                return (
                  <Cards
                    key={firebaseID}
                    imageURL={imageURL}
                    heading={title}
                    text={mark}
                    category={category}
                    slug={slug}
                  />
                );
              })}
            </div>
          </div>
        </div>

      ) : (
        <div className="min-h-full flex items-center justify-center">
          <Loading />
        </div>
      )}

    </>
  );
}
