"use client";

import { useState } from "react";

interface SwitchBarProps {
  onSetMovie: () => void;
  onSetMusic: () => void;
}

const SwitchBar: React.FC<SwitchBarProps> = ({ onSetMovie, onSetMusic }) => {
  const [isMovie, setIsMovie] = useState<boolean>(true);
  const handleMovie = () => {
    onSetMovie();
    setIsMovie(true);
  };
  const handeMusic = () => {
    onSetMusic();
    setIsMovie(false);
  };
  return (
    <div className="flex justify-center items-center w-full text-lg text-elife-600 ">
      <div
        className={`w-1/2 p-2 cursor-pointer flex justify-center ${
          isMovie ? "border-b-2 border-elife-600" : ""
        } `}
        onClick={handleMovie}
      >
        Watching
      </div>
      <div
        className={`w-1/2 p-2 cursor-pointer flex justify-center ${
          !isMovie ? "border-b-2 border-elife-600" : ""
        } `}
        onClick={handeMusic}
      >
        Listening
      </div>
    </div>
  );
};

export default SwitchBar;
