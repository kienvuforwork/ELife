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
    <div className="mt-6 flex flex-col">
      <div className="text-xl font-md">What are you gonna share?</div>
      <div className="flex p-4 mt-6 gap-4 justify-center items-center">
        <div
          onClick={toggleMusic}
          className={`flex  items-center gap-2 border-[1px]  rounded-xl py-2 px-6 hover:border-blue-600 ${
            isMusic && "border-blue-600"
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
            isMovie && "border-red-400"
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
      <div>
        <Search placeholder="Search"></Search>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(onClose())}
      body={body}
      title={title}
    ></Modal>
  );
};

export default ShareModal;
