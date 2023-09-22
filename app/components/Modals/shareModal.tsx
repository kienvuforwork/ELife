"use client";
import Modal from "./modal";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { onClose, setIsChosen } from "@/app/store/shareModalSlice";
import { useEffect, useState } from "react";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { CiMusicNote1 } from "react-icons/ci";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import Search from "../searchBar/search";
import { TvShowModel } from "@/app/Model/Movie";
import { Track } from "@/app/Model/Music";
import MovieCard from "../card/movieCard";
import Chip from "../chip";
import Button from "../button";
import TrackCard from "../card/trackCard";
import toast from "react-hot-toast";

interface shareModalProps {
  genres?: Genre[];
  spotifyToken: string;
}
interface Genre {
  id: number;
  name: string;
}

const feelingsWhileWatchingTVShow = [
  "Dramatic",
  "Engaging",
  "Intense",
  "Emotional",
  "Suspenseful",
  "Mysterious",
  "Comedic",
  "Heartwarming",
  "Dark",
  "Inspirational",
  "Mind-bending",
  "Quirky",
  "Action-packed",
  "Fantasy",
  "Gripping",
  "Epic",
  "Romantic",
  "Charming",
  "Thrilling",
  "Educational",
  "Family-friendly",
  "Adventurous",
  "Unsettling",
  "Political",
  "Cult",
  "Addictive",
  "Feel-good",
  "Controversial",
  "Offbeat",
  "Empowering",
  "Supernatural",
  "Hilarious",
  "Historical",
  "Diverse",
  "Visually-stunning",
];
const popularSongDescriptionWords = [
  "Catchy",
  "Upbeat",
  "Melodic",
  "Energetic",
  "Soothing",
  "Inspirational",
  "Sensual",
  "Emotional",
  "Groovy",
  "Uplifting",
  "Passionate",
  "Lively",
  "Sultry",
  "Joyful",
  "Dreamy",
  "Sassy",
  "Nostalgic",
  "Dynamic",
  "Funky",
  "Relaxing",
  "Sincere",
  "Spirited",
  "Introspective",
  "Mystical",
  "Satisfying",
];
const downLoadImage = async (url: string | undefined) => {
  let imageResponse;
  if (url) {
    imageResponse = await fetch(url);
  }

  const imageBlob = await imageResponse?.blob();
  return imageBlob;
};
const ShareModal: React.FC<shareModalProps> = ({ genres, spotifyToken }) => {
  type Media = TvShowModel | Track;
  const [isTvShow, setIsTvShow] = useState(false);
  const [isMusic, setIsMusic] = useState(false);
  const [selectedData, setSelectedData] = useState<Media>();
  const [isDisable, setIsDisable] = useState(false);
  const [selectedChip, setSelectedChip] = useState<string[]>([]);
  const [disableChip, setDisableChip] = useState(false);
  const [like, setLike] = useState(false);
  const [chipList, setChipList] = useState<string[]>(
    feelingsWhileWatchingTVShow
  );
  const settedData = useSelector(
    (state: RootState) => state.shareModalSlice.data
  );
  const isOpen = useSelector(
    (state: RootState) => state.shareModalSlice.isOpen
  );
  useEffect(() => {
    console.log(selectedData);
    if (settedData) {
      setIsChosen(true);
      setSelectedData(settedData);
    }
  }, [settedData]);

  const toggleLike = () => {
    setLike((prev) => !prev);
  };
  const chosen = isTvShow || isMusic;
  const addChip = (item: string) => {
    if (selectedChip.length === 5) {
      return;
    }
    setSelectedChip((prevState) => [...prevState, item]);
  };
  const removeChip = (itemToRemove: string | string[]) => {
    const newItems = selectedChip.filter((item) => item !== itemToRemove);
    setSelectedChip(newItems);
  };
  const onChoose = (data: Media) => {
    setSelectedChip([]);
    if (data.type === "tvShow") {
      setChipList(feelingsWhileWatchingTVShow);
      setSelectedData(data as TvShowModel);
    }
    if (data.type === "track") {
      setSelectedData(data as Track);
      setChipList(popularSongDescriptionWords);
    }
  };
  const toggleMovie = () => {
    setIsTvShow((prevState) => !prevState);
    setIsMusic(false);
  };
  const toggleMusic = () => {
    setIsTvShow(false);
    setIsMusic((prevState) => !prevState);
  };

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = async () => {
    setIsDisable(true);
    let res;
    const formData: any = new FormData();
    try {
      for (const key in selectedData) {
        const typedKey = key as keyof typeof selectedData;
        if (selectedData.hasOwnProperty(key)) {
          formData.append(
            key,
            Array.isArray(selectedData[typedKey])
              ? JSON.stringify(selectedData[typedKey])
              : selectedData[typedKey]
          );
        }
      }
      if (selectedData?.type === "track") {
        // Fetch the image from the 3rd-party API
        const imageBlob = await downLoadImage(
          selectedData?.album.images[0].url
        );
        console.log(selectedData.album.images[0].url);
        formData.append("vibes", JSON.stringify(selectedChip));
        formData.append("like", like);
        formData.append("image", imageBlob);
        formData.append("type", "listeningTrack");
        res = await fetch("http://localhost:8080/user/track", {
          method: "POST",
          body: formData,
          credentials: "include",
        }).then((res) => res.status);
      } else if (selectedData?.type === "tvShow") {
        const imageBlob = await downLoadImage(
          `https://image.tmdb.org/t/p/w200${
            selectedData.backdrop_path && selectedData.poster_path
          }`
        );
        formData.append("vibes", JSON.stringify(selectedChip));
        formData.append("like", like);
        formData.append("image", imageBlob);
        formData.append("type", "watching");
        formData.append(
          "genre",
          JSON.stringify(
            selectedData.genre_ids?.map((id: number) => {
              const matchedGenre = genres?.find((genre) => genre.id === id);
              return matchedGenre ? matchedGenre.name : null;
            })
          )
        );
        res = await fetch("http://localhost:8080/user/tvShow", {
          method: "POST",
          body: formData,
          credentials: "include",
        }).then((res) => res.status);
      }
    } catch (error) {
      console.log(error);
    }
    if (res === 201) {
      toast.success(
        `You just share a ${
          isMusic ? "song that you listening" : " a TV Show that you watching"
        }`
      );
    } else {
      toast.error("Erorr");
    }
    setIsDisable(false);
    dispatch(onClose());
    setSelectedData(undefined);
    setIsMusic(false);
    setIsTvShow(false);
  };

  let title = (
    <div className="text-lg font-medium uppercase">Tune In & Share</div>
  );

  let body = (
    <div
      className={`${
        selectedData ? "flex flex-col xl:flex-row gap-2" : null
      } pb-6 mt-2  w-full`}
    >
      <div className="mt-6 flex flex-1 flex-col items-center">
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
              isTvShow ? "border-red-400 " : "opacity-70"
            } group cursor-pointer transition-all duration-300`}
          >
            <PiTelevisionSimpleLight
              className={`w-10 h-10  group-hover:fill-red-400 ${
                isTvShow && "fill-red-400"
              }  transition-all duration-300`}
            ></PiTelevisionSimpleLight>
            <div
              className={` group-hover:text-red-400 ${
                isTvShow && "text-red-400"
              } transition-all duration-300`}
            >
              Tv show
            </div>
          </div>
        </div>

        {chosen ? (
          <div className="flex flex-col transition-all duration-300 transform items-center gap-2 mt-4">
            {isMusic && "What song are you listening to?"}
            {isTvShow && "What Tv show are you watching?"}
            <Search
              placeholder="Search"
              sm={true}
              // @ts-ignore
              onChoose={onChoose}
              searchTvShow={isTvShow}
              searchMusic={isMusic}
              spotifyToken={spotifyToken}
            ></Search>
          </div>
        ) : null}
      </div>
      <div className="flex-1">
        {" "}
        {selectedData?.type === "tvShow" && (
          <MovieCard
            image_src={`https://image.tmdb.org/t/p/w200/${selectedData.poster_path}`}
            name={selectedData.name}
            isDisable
            origin_country={selectedData.origin_country}
            genres={selectedData.genre_ids
              ?.map((id) => {
                const matchedGenre = genres?.find((genre) => genre.id === id);
                return matchedGenre ? matchedGenre.name : null;
              })
              .filter(Boolean) // Filter out null values
              .map((name) => name as string)}
            overview={selectedData.overview}
            sm
          ></MovieCard>
        )}
        {selectedData?.type === "track" && (
          <TrackCard
            image_src={selectedData.album.images[0].url}
            name={selectedData.name}
            artists={selectedData.artists}
            releaseDate={selectedData.album.release_date}
            duration={selectedData.duration_ms}
          ></TrackCard>
        )}
      </div>
      {selectedData && chipList && (
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex gap-2 items-center">
            Recommend
            {like ? (
              <AiFillLike
                onClick={toggleLike}
                className="h-6 w-6 fill-blue-600 hover:fill-blue-500"
              ></AiFillLike>
            ) : (
              <AiOutlineLike
                onClick={toggleLike}
                className="h-6 w-6 hover:fill-blue-500"
              ></AiOutlineLike>
            )}
          </div>
          <div className="text-sm">Tv Show Vibes (max 5 key words)</div>
          <div className="flex flex-wrap gap-2">
            {chipList.map((title, index) => (
              <Chip
                title={title}
                key={index}
                addChip={(item) => addChip(item)}
                removeChip={(item) => removeChip(item)}
                disabled={disableChip}
                selected={selectedChip.includes(title)}
              ></Chip>
            ))}
          </div>
          <div className="mt-2">
            {" "}
            <Button label="Share!" full onClick={() => onSubmit()}></Button>
          </div>
        </div>
      )}
    </div>
  );
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(onClose())}
      body={body}
      title={title}
      big
      disabled={isDisable}
    ></Modal>
  );
};

export default ShareModal;
