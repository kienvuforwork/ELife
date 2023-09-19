import tv from "../../public/images/icons8-tv-50.png";
import { AiOutlineUser } from "react-icons/ai";
import TrackCard from "./trackCard";
import { Track } from "@/app/Model/Music";
import Chip from "../chip";
import Button from "../button";
import MovieCard from "./movieCard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import {
  onOpen as onOpenShareModal,
  setData,
} from "@/app/store/shareModalSlice";
import { TvShowModel } from "@/app/Model/Movie";

interface PostProps {
  username: string;
  avatar?: string;
  data: any;
  date: string;
  recommend?: boolean;
  vibes?: string[];
  type: "track" | "tvShow";
}

const Post: React.FC<PostProps> = ({
  username,
  data,
  recommend,
  vibes,
  date,
  avatar,
  type,
}) => {
  const customDate = date && date.split(",")[0].replace(/\//g, "-");
  const dispatch: AppDispatch = useDispatch();
  const setShareModal = () => {
    dispatch(onOpenShareModal());
    if (type === "track") {
      dispatch(
        setData({
          artists: data.artists.map((name: any) => ({ name })),
          name: data.name,
          album: {
            images: [{ url: `http://localhost:8080/track/image/${data.id}` }],
          },
          type: "track",
        } as Track)
      );
    } else if (type === "tvShow") {
      dispatch(setData({ ...(data as TvShowModel), type: "tvShow" }));
    }
  };
  return (
    data && (
      <div className=" flex w-full justify-center items-center border-t-2 border-b-2 border-elife-700">
        <div className=" text-white rounded-lg  w-full space-y-6 p-10">
          <div className="flex space-x-4 items-center ">
            <div className="w-14">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className=" w-12 h-12 overflow-hidden rounded-full"
                />
              ) : (
                <AiOutlineUser className=" fill-elife-700 w-12 h-12 border-2 rounded-full border-elife-700"></AiOutlineUser>
              )}
            </div>
            <div className="w-full">
              <div className="flex space-x-2 items-center">
                <h2 className="text-base font-bold">{username}</h2>
                {/* <svg
                className="h-4 w-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg> */}
                <div className="w-full text-sm text-elife-500 flex items-center justify-between">
                  <div>
                    {" "}
                    {type === "track" ? "is listening to " : "is watching "}
                    <span className="text-blue-500">&nbsp; "{data.name}"</span>
                  </div>
                  <div>
                    {type !== "track" ? (
                      <img
                        width="50"
                        height="50"
                        src="https://img.icons8.com/bubbles/50/tv.png"
                        alt="tv"
                      />
                    ) : (
                      <img
                        width="50"
                        height="50"
                        src="https://img.icons8.com/bubbles/50/music.png"
                        alt="music"
                      />
                    )}
                  </div>
                </div>
              </div>
              <p className=" text-sm text-elife-500">Shared: {customDate}</p>
            </div>
          </div>
          <div className="flex">
            <div className="w-[50%]">
              {type === "track" && (
                <TrackCard
                  name={data.name}
                  artists={
                    data.artists && data.artists.map((name: any) => ({ name }))
                  }
                  image_src={`http://localhost:8080/track/image/${data.id}`}
                ></TrackCard>
              )}
              {type === "tvShow" && (
                <MovieCard
                  image_src={`http://localhost:8080/tvShow/image/${data.id}`}
                  name={data.name}
                  origin_country={[data.origin_country]}
                  genres={data.genre}
                  isDisable
                  sm
                ></MovieCard>
              )}
            </div>

            <div
              className={`flex flex-col  text-sm  pt-4  ${
                data.vibes && data.vibes.length > 0 ? "border-l-2 w-[50%]" : ""
              } border-elife-700`}
            >
              {data.vibes && data.vibes.length > 0 ? (
                <div className="ml-4">
                  Described this track as{" "}
                  {data.vibes.map((title: string) => (
                    <Chip title={title} key={title}></Chip>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            {" "}
            {data.like ? (
              <div>
                <span className="text-lg text-elife-500 font-extrabold">
                  {username}{" "}
                </span>{" "}
                recommend this track
              </div>
            ) : (
              <div></div>
            )}
            <Button label="Vibe now" sm onClick={setShareModal}></Button>
          </div>
        </div>
      </div>
    )
  );
};

export default Post;
