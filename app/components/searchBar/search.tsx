"use client";
import { BiSearch } from "react-icons/bi";
import SearchResultList from "./searchResult";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import { getData } from "@/app/actions/fetchData";
import { options } from "@/app/actions/Movie/getTvShow";
import { TvShowModel } from "@/app/Model/Movie";
import SearchResultSkeleton from "./searchResultSkeleton";

interface SearchProps {
  icon?: boolean;
  placeholder: string;
  sm?: boolean;
  rounded?: boolean;
  onChoose: () => {};
  searchTvShow?: boolean;
  searchMusic?: boolean;
}

const getTvShowByName = async (name: string) => {
  const url = `https://api.themoviedb.org/3/search/tv?&query=${name}`;
  const data = await fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error("error:" + err));
  const tvShow: TvShowModel[] = data.results;
  return tvShow;
};

const Search: React.FC<SearchProps> = ({
  icon,
  placeholder,
  sm,
  rounded,
  onChoose,
  searchTvShow,
  searchMusic,
}) => {
  const [text, setText] = useState<string>("");
  const [tvShow, setTvShow] = useState<TvShowModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const handleClick = () => {
    setText("");
    setTvShow([]);
    onChoose();
  };
  const style = {
    sm: "h-[28px] rounded-sm ",
    rounded: "rounded-full",
  };
  const debouncedOnChange = useCallback(
    debounce(async (searchText: string) => {
      if (searchText) {
        setIsLoading(true);
      }
      if (searchTvShow) {
        const data = await getTvShowByName(searchText);
        setTvShow(data);
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setText(searchText);
    debouncedOnChange(searchText);
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
      {isLoading ? (
        <SearchResultSkeleton></SearchResultSkeleton>
      ) : (
        <SearchResultList
          onChoose={handleClick}
          text={text}
          tvShowList={tvShow}
          isLoading={isLoading}
        ></SearchResultList>
      )}
    </div>
  );
};

export default Search;
