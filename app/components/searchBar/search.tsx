"use client";
import { BiSearch } from "react-icons/bi";
import SearchResultList from "./searchResult";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { options } from "@/app/actions/Movie/getTvShow";
import { TvShowModel } from "@/app/Model/Movie";
import SearchResultSkeleton from "./searchResultSkeleton";
import { Track } from "@/app/Model/Music";

interface SearchProps {
  icon?: boolean;
  placeholder: string;
  sm?: boolean;
  rounded?: boolean;
  onChoose: (data: TvShowModel | Track) => void;
  searchTvShow?: boolean;
  searchMusic?: boolean;
  spotifyToken?: string;
}

const Search: React.FC<SearchProps> = ({
  icon,
  placeholder,
  sm,
  rounded,
  onChoose,
  searchTvShow,
  searchMusic,
  spotifyToken,
}) => {
  const getTvShowByName = async (name: string) => {
    const url = `https://api.themoviedb.org/3/search/tv?&query=${name}`;
    const data = await fetch(url, options)
      .then((res) => res.json())
      .catch((err) => console.error("error:" + err));
    const tvShow: TvShowModel[] = data.results;
    return tvShow;
  };

  const getTrackByName = async (name: string) => {
    const url = `https://api.spotify.com/v1/search?q=${name}&type=track`;
    const headers = {
      Authorization: `Bearer ${spotifyToken}`,
    };
    const data = await fetch(url, { method: "GET", headers })
      .then((data) => data.json())
      .catch((err) => console.error("error:" + err));
    const tracks: Track[] = data.tracks.items;
    return tracks;
  };

  const [text, setText] = useState<string>("");
  const [tvShow, setTvShow] = useState<TvShowModel[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log("Music", searchMusic, "Tvshow", searchTvShow);
  useEffect(() => {
    handleClose();
  }, [searchMusic, searchTvShow]);
  const handleClose = () => {
    setText("");
    setTvShow([]);
    setTracks([]);
  };
  const style = {
    sm: "h-[28px] rounded-sm ",
    rounded: "rounded-full",
  };
  const debouncedOnChangeTvShow = useCallback(
    debounce(async (searchText: string) => {
      console.log("searching show");
      const data = await getTvShowByName(searchText);
      setTvShow(data);
      setIsLoading(false);
    }, 300),
    []
  );
  const debouncedOnChangeTrack = useCallback(
    debounce(async (searchText: string) => {
      console.log("searching music");
      const data = await getTrackByName(searchText);
      setTracks(data);
      setIsLoading(false);
    }, 300),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setIsLoading(true);
    setText(searchText);
    if (searchMusic) {
      debouncedOnChangeTrack(searchText);
    }
    if (searchTvShow) {
      debouncedOnChangeTvShow(searchText);
    }
  };

  return (
    <div className="flex relative justify-center items-center w-full">
      <span className="absolute right-2">
        {" "}
        {icon && (
          <BiSearch className="w-6 h-6 text-elife-600 cursor-pointer"></BiSearch>
        )}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={text}
        className={`focus:bg-white focus:outline-none   ${
          rounded ? style.rounded : ""
        }   focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-elife-700 bg-elife-500 w-full h-[40px]   p-2 px-4 ${
          sm ? style.sm : ""
        }  h-[40px]`}
      />
      {isLoading && text ? (
        <SearchResultSkeleton></SearchResultSkeleton>
      ) : (
        <SearchResultList
          onChoose={onChoose}
          onClose={handleClose}
          text={text}
          tvShowList={tvShow}
          trackList={tracks}
          isLoading={isLoading}
        ></SearchResultList>
      )}
    </div>
  );
};

export default Search;
