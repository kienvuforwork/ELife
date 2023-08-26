"use client";
import Modal from "./modal";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { onClose } from "@/app/store/shareModalSlice";
import { useState } from "react";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { CiMusicNote1 } from "react-icons/ci";
import Search from "../searchBar/search";

const ShareModal = () => {
  const [isMovie, setIsMovie] = useState(false);
  const [isMusic, setIsMusic] = useState(false);
  const chosen = isMovie || isMusic;
  const toggleMovie = () => {
    setIsMovie((prevState) => !prevState);
    setIsMusic(false);
  };
  const toggleMusic = () => {
    setIsMovie(false);
    setIsMusic((prevState) => !prevState);
  };

  const isOpen = useSelector(
    (state: RootState) => state.shareModalSlice.isOpen
  );
  const dispatch: AppDispatch = useDispatch();
  let title = (
    <div className="text-lg font-medium uppercase">Tune In & Share</div>
  );

  let body = (
    <div className={`${chosen ? "flex" : null} pb-6 border-2 w-full`}>
      <div className="mt-6 flex flex-col items-center">
        {!chosen && (
          <div className="text-xl font-md">What are you gonna share?</div>
        )}
        <div className="flex p-4 mt-6 gap-4 justify-center items-center">
          <div
            onClick={toggleMusic}
            className={`flex   items-center gap-2 border-[1px]  rounded-xl py-2 px-6 hover:border-blue-600 ${
              isMusic ? "border-blue-600 " : "opacity-70"
            } group cursor-pointer transition-all duration-300`}
          >
            <CiMusicNote1
              className={`w-10 h-10  group-hover:fill-blue-600 ${
                isMusic && "fill-blue-600"
              } transition-all duration-300`}
            ></CiMusicNote1>
            <div
              className={` group-hover:text-blue-600 ${
                isMusic && "text-blue-600"
              } transition-all duration-300`}
            >
              Song
            </div>
          </div>
          <div
            onClick={toggleMovie}
            className={`flex  items-center gap-2 border-[1px]  rounded-xl py-2 px-4 hover:border-red-400 ${
              isMovie ? "border-red-400 " : "opacity-70"
            } group cursor-pointer transition-all duration-300`}
          >
            <PiTelevisionSimpleLight
              className={`w-10 h-10  group-hover:fill-red-400 ${
                isMovie && "fill-red-400"
              }  transition-all duration-300`}
            ></PiTelevisionSimpleLight>
            <div
              className={` group-hover:text-red-400 ${
                isMovie && "text-red-400"
              } transition-all duration-300`}
            >
              Tv show
            </div>
          </div>
        </div>

        {chosen ? (
          <div className="flex flex-col transition-all duration-300 transform items-center gap-2 mt-4">
            {isMusic && "What song are you listening to?"}
            {isMovie && "What Tv show are you watching?"}
            <Search placeholder="Search" sm></Search>
          </div>
        ) : null}
      </div>
      <div></div>
    </div>
  );
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(onClose())}
      body={body}
      title={title}
      big
    ></Modal>
  );
};

export default ShareModal;
