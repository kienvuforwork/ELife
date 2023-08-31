"use client";

import React from "react";
import { TvShowModel } from "@/app/Model/Movie";
import { MusicModel } from "@/app/Model/Music";

interface SearchResultItemProps {
  dataType: "tvShow" | "song";
  data: TvShowModel | MusicModel;
  img: string;
  name: string;
  artist?: string;
  onClick: () => void;
  onChoose: (data: TvShowModel | MusicModel) => void;
}
const SearchResultItem: React.FC<SearchResultItemProps> = ({
  img,
  name,
  artist,
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
  };
  return (
    <div
      className="flex py-2 px-4 text-sm gap-4 hover:opacity-80 cursor-pointer border-b-[1px] border-elife-700"
      onClick={handleChoose}
    >
      <img src={img} className="w-12 h-auto"></img>
      <div className="flex flex-col">
        <div> {name}</div>
        <div className="mt-[4px]"> {artist}</div>
      </div>
    </div>
  );
};

export default SearchResultItem;
