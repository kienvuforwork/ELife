"use client";

import MovieCard from "../card/movieCard";
import SongCard from "../card/songCard";
import { MovieModel } from "@/app/Model/Movie";
import { useState, useEffect, Fragment } from "react";
import SwitchBar from "./switchBar";
import { MusicModel } from "@/app/Model/Music";
import Search from "./search";

interface SideBarProps {
  moviesData: MovieModel[];
  musicData: MusicModel[];
}

const RightBar: React.FC<SideBarProps> = ({ moviesData, musicData }) => {
  const [isMovie, setIsMovie] = useState<boolean>(true);
  const [isMusic, setIsMusic] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (moviesData) {
      setIsLoading(false);
    }
  }, []);
  const hanldeMovie = () => {
    setIsMovie(true);
    setIsMusic(false);
  };
  const hanldeMusic = () => {
    setIsMusic(true);
    setIsMovie(false);
  };

  return (
    <Fragment>
      {" "}
      <div className="p-4 pt-2 pl-6">
        <div>
          <Search></Search>
        </div>

        <div className="xl:text-2xl text-md font-medium flex justify-center text-elife-400 text-center p-4  gap-4 flex-col">
          {" "}
          Trending Now: What Everyone's
          <SwitchBar
            onSetMovie={() => hanldeMovie()}
            onSetMusic={() => hanldeMusic()}
          ></SwitchBar>
        </div>
        {isMovie ? (
          <div className=" flex flex-col border-2 border-elife-700 border-t-0  h-[70vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-elife-700">
            {moviesData.map((movie, index) => (
              <MovieCard
                image_src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                name={movie.name}
                rating={movie.vote_average}
                key={index}
                isLoading={isLoading}
              ></MovieCard>
            ))}
          </div>
        ) : null}
        {isMusic ? (
          <div className=" flex flex-col border-2 border-elife-700  border-t-0  h-[70vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-elife-700">
            {musicData?.map((song, index) => (
              <SongCard
                name={song.item.title}
                artist={song.item.artist_names}
                date={song.item.release_date_for_display}
                key={index}
                image_src={song.item.song_art_image_thumbnail_url}
              ></SongCard>
            ))}
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default RightBar;
