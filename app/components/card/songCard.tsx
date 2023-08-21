"use client";

import CardLoadingSkeleton from "./cardLoadingSkeleton";

interface SongCardProps {
  name: string;
  artist: string;
  date: string;
  image_src: string;
  isLoading?: boolean;
}

const SongCard: React.FC<SongCardProps> = ({
  name,
  artist,
  date,
  image_src,
  isLoading,
}) => {
  if (isLoading) {
    return <CardLoadingSkeleton></CardLoadingSkeleton>;
  }

  return (
    <div className="flex xl:gap-5 gap-2 w-full xl:p-5 md:p-3 p-1 border-t-2 border-elife-700 hover:bg-elife-700 ">
      <div className="w-1/3">
        <img src={image_src} alt="" />{" "}
      </div>
      <div className="flex flex-col w-2/3 gap-2">
        <div className="xl:text-sm font-medium text-sm  hover:cursor-pointer">
          <a className="text-elife-500"> {name}</a>
          <span className="block text-elife-600">{artist}</span>
        </div>
        <div className="text-xs xl:text-sm  text-elife-500 font-thin">
          Release Date: {date}
        </div>
      </div>
    </div>
  );
};

export default SongCard;
