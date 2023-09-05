"use client";

import React from "react";
import { TvShowModel } from "@/app/Model/Movie";
import { Track } from "@/app/Model/Music";

interface SearchResultItemProps {
  dataType: "tvShow" | "track";
  data: TvShowModel | Track;
  img: string;
  name: string;
  artists?: string[];
  onClick: () => void;
  onChoose: (data: TvShowModel | Track) => void;
}
const SearchResultItem: React.FC<SearchResultItemProps> = ({
  img,
  name,
  artists,
  onClick,
  dataType,
  onChoose,
  data,
}) => {
  const handleChoose = () => {
    onClick();
    if (dataType === "tvShow") {
      onChoose({ ...data, type: "tvShow" } as TvShowModel);
    }
    if (dataType === "track") {
      onChoose({ ...data, type: "track" } as Track);
    }
  };
  return (
    <div
      className="flex py-2 px-4 text-sm gap-4 hover:opacity-80 cursor-pointer border-b-[1px] border-elife-700"
      onClick={handleChoose}
    >
      <img
        src={img}
        className={`w-12 ${dataType === "track" ? "h-12" : "h-auto"}`}
      ></img>
      <div className="flex flex-col">
        <div> {name}</div>
        <div className="flex flex-wrap gap-1 mt-1">
          {artists?.map((artist: any, index: number) => (
            <span className=" text-elife-600" key={index}>
              {index === artists.length - 1 ? artist.name : artist.name + ","}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
