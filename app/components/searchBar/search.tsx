"use client";

import { BiSearch } from "react-icons/bi";
import SearchResultList from "./searchResultList";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";

interface SearchProps {
  icon?: boolean;
  placeholder: string;
  sm?: boolean;
  rounded?: boolean;
}

const Search: React.FC<SearchProps> = ({ icon, placeholder, sm, rounded }) => {
  const [text, setText] = useState<string>("");

  const style = {
    sm: "h-[30px] pl-2 rounded-sm ",
    rounded: "rounded-full",
  };
  const debouncedOnChange = useCallback(
    debounce((searchText: string) => {
      console.log(searchText);
    }, 300),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setText(searchText);
    console.log(searchText);
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
        className={`focus:bg-white focus:outline-none   ${
          rounded ? style.rounded : ""
        }   focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-elife-700 bg-elife-500 w-full h-[40px] p-2 pl-8 ${
          sm ? style.sm : ""
        }`}
      />
      <SearchResultList text={text}></SearchResultList>
    </div>
  );
};

export default Search;
