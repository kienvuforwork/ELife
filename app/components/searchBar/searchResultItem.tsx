"use client";

import React from "react";
import { TvShowModel } from "@/app/Model/Movie";
import { Track } from "@/app/Model/Music";
import { User } from "@/app/Model/User";
import { AiOutlineUser } from "react-icons/ai";
interface SearchResultItemProps {
  dataType: "tvShow" | "track" | "user";
  data: TvShowModel | Track | User;
  img: string;
  name: string;
  artists?: string[];
  onClick: () => void;
  onChoose: (data: TvShowModel | Track | User) => void;
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
    if (dataType === "user") {
      onChoose({ ...data } as User);
    }
  };
  return (
    <div
      className="flex py-2 px-4 text-sm gap-4 hover:opacity-80 cursor-pointer border-b-[1px] border-elife-700"
      onClick={handleChoose}
    >
      {img ? (
        <img
          src={img}
          className={`w-12 ${dataType === "track" ? "h-12" : "h-auto"} ${
            dataType === "user" && "rounded-full w-8 h-8"
          }`}
        ></img>
      ) : (
        <AiOutlineUser className=" w-8 h-8 object-cover rounded-full fill-elife-700 border-2 border-elife-700"></AiOutlineUser>
      )}

      <div
        className={`flex flex-col ${dataType === "user" && "justify-center"}`}
      >
        <div className=""> {name}</div>
        {artists && (
          <div className="flex flex-wrap gap-1 mt-1">
            {artists?.map((artist: any, index: number) => (
              <span className=" text-elife-600" key={index}>
                {index === artists.length - 1 ? artist.name : artist.name + ","}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultItem;
