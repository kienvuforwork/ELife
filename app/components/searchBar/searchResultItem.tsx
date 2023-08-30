"use client";

import React from "react";
import SearchResultSkeleton from "./searchResultSkeleton";

interface SearchResultItemProps {
  img?: string;
  name?: string;
  artist?: string;
  onClick: () => void;
}
const SearchResultItem: React.FC<SearchResultItemProps> = ({
  img,
  name,
  artist,
  onClick,
}) => {
  return (
    <div
      className="flex py-2 px-4 text-sm gap-4 hover:opacity-80 cursor-pointer border-b-[1px] border-elife-700"
      onClick={onClick}
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
