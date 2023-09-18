"use client";
import UserCard from "@/app/components/card/profileCard";
import { usePathname } from "next/navigation";
import { useEffect, useState, Fragment } from "react";
import { User } from "@/app/Model/User";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import SwitchBar from "@/app/components/rightBar/switchBar";
import MovieCard from "@/app/components/card/movieCard";
import { TvShowModel } from "@/app/Model/Movie";
const UserProfile = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<User>();
  const [isLoading, setIdLoading] = useState(true);
  const [tvShows, setTvShows] = useState<TvShowModel[]>();
  const pathNameList = pathname.split("/");
  const username = pathNameList[pathNameList.length - 1];
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8080/users/${username}`);
        const data = await res.json();
        setUser(data[0]);
        if (data[0]) {
          const user = data[0];
          const res = await fetch(
            `http://localhost:8080/user/${user?._id}/tvShow`
          );
          const a = await res.json();
          setTvShows(a.tvShow);
        }
      } catch (e) {
        console.log(e);
      }
      setIdLoading(false);
    };
    fetchUser();
  }, []);
  console.log(tvShows);
  const currentUser = useSelector((state: RootState) => state.userSlice);

  return (
    !isLoading && (
      <Fragment>
        <div className="h-1000 border-2 border-elife-700">
          {" "}
          <UserCard
            user={user as User}
            isCurrentUser={currentUser.username === user?.username}
          ></UserCard>
          <SwitchBar
            onSetFollower={() => {}}
            onSetFollowing={() => {}}
            onSetPost={() => {}}
          ></SwitchBar>
          <div className="w-full flex flex-wrap"></div>
        </div>
      </Fragment>
    )
  );
};

export default UserProfile;
