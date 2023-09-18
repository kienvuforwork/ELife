"use client";

import Button from "../button";
import { User } from "@/app/Model/User";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { CiMusicNote1 } from "react-icons/ci";
import { AiFillCheckCircle } from "react-icons/ai";

interface UserCardProps {
  user: User;
  isCurrentUser?: boolean;
}
const UserCard: React.FC<UserCardProps> = ({ user, isCurrentUser }) => {
  return (
    <div className="flex flex-col items-center  bg-center bg-cover border-elife-700 border-b-2">
      <div className="max-w-3xl w-full mx-auto z-10">
        <div className="flex flex-col">
          <div className=" shadow-lg p-4 m-4">
            <div className="flex-none sm:flex">
              <div className="relative h-32 w-32  sm:mb-0 mb-3">
                <img
                  src={user?.avatar}
                  className=" w-32 h-32 object-cover rounded-full"
                />
                {user?.isCeleb && (
                  <AiFillCheckCircle className="w-4 h-4 right-0 absolute bottom-1 fill-blue-600"></AiFillCheckCircle>
                )}
              </div>
              <div className="flex gap-2 flex-col  sm:ml-5 justify-center">
                <div className="w-full flex-none text-lg text-gray-200 font-bold leading-none">
                  {user?.username}
                </div>
                <div className="text-sm text-elife-500">
                  {user?.followers.length} followers
                </div>
                <div className="flex justify-start gap-8">
                  <div className="inline-flex items-center gap-2">
                    <CiMusicNote1 className={`w-5 h-5`}></CiMusicNote1>
                    <span className="">
                      {user?.listeningTrack.length} Songs listening{" "}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <PiTelevisionSimpleLight
                      className={`w-5 h-5`}
                    ></PiTelevisionSimpleLight>
                    <p className="">
                      {user?.tvShowWatching.length} TvShows watching
                    </p>
                  </div>
                </div>
                <div>
                  {" "}
                  {!isCurrentUser && (
                    <Button
                      label="Follow"
                      onClick={() => {}}
                      sm={true}
                    ></Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
