"use client";
import getMovies from "@/app/api/Movie/getMovie";
import MovieCard from "../card/movieCard";
import { Movies } from "@/app/api/Movie/getMovie";
import { useState, useEffect, Fragment } from "react";
import SwitchBar from "./switchBar";
const SideBar = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [isMovie, setIsMovie] = useState<boolean>(true);
  const [isMusic, setIsMusic] = useState<boolean>(false);
  const hanldeMovie = () => {
    setIsMovie(true);
    setIsMusic(false);
  };
  const hanldeMusic = () => {
    setIsMusic(true);
    setIsMovie(false);
  };
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovies();
        console.log(movieData);
        setMovies(movieData);
      } catch (e) {
        console.error("Error fetching movie:", e);
      }
    };
    fetchMovie();
  }, []);
  return (
    <Fragment>
      {" "}
      <div className="xl:text-2xl text-md font-medium flex justify-center text-elife-400 text-center p-4">
        {" "}
        Trending Now: What Everyone's
      </div>
      <SwitchBar
        onSetMovie={() => hanldeMovie()}
        onSetMusic={() => hanldeMusic()}
      ></SwitchBar>
      {isMovie ? (
        <div className="border-2 border-t-0 border-elife-700 flex flex-col  h-[70vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-elife-700">
          {movies.map((movie, index) => (
            <MovieCard
              image_src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              name={movie.name}
              rating={movie.vote_average}
              key={index}
            ></MovieCard>
          ))}
        </div>
      ) : null}
      {isMusic ? (
        <div className="border-2 border-t-0 border-elife-700 flex flex-col  h-[70vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-elife-700">
          <div>MUSIcccccccc</div>
        </div>
      ) : (
        "null"
      )}
    </Fragment>
  );
};

export default SideBar;
