"use client";
import getMovies from "@/app/api/Movie/getMovie";
import MovieCard from "../card/movieCard";
import SongCard from "../card/songCard";

import { MovieModel } from "@/app/api/Model/Movie";
import { useState, useEffect, Fragment } from "react";
import SwitchBar from "./switchBar";
import { MusicModel } from "@/app/api/Model/Music";
import data from "@/app/api/Music/data";
const SideBar = () => {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [songs, setSongs] = useState<MusicModel[]>([]);
  const [isMovie, setIsMovie] = useState<boolean>(true);
  const [isMusic, setIsMusic] = useState<boolean>(false);
  console.log(data);
  const hanldeMovie = () => {
    setIsMovie(true);
    setIsMusic(false);
  };
  const hanldeMusic = () => {
    setIsMusic(true);
    setIsMovie(false);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getMovies();
        setMovies(movieData);
      } catch (e) {
        console.error("Error fetching movie:", e);
      }
    };
    const fetchSongs = async () => {
      try {
        const songs = data.chart_items;
        setSongs(songs);
        console.log(songs);
      } catch (e) {
        console.error("Error fetching song:", e);
      }
    };
    fetchMovies();
    fetchSongs();
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
          {songs?.map((song, index) => (
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
    </Fragment>
  );
};

export default SideBar;
