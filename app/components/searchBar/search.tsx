"use client";

import { BiSearch } from "react-icons/bi";
import SearchResult from "./searchResult";
import { useState } from "react";

interface SearchProps {
  icon?: boolean;
  placeholder: string;
}

const Search: React.FC<SearchProps> = ({ icon, placeholder }) => {
  const [text, setText] = useState<String>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="flex relative justify-center items-center w-full px-4">
      <span className="absolute left-6">
        {" "}
        {icon && (
          <BiSearch className="w-6 h-6 text-elife-600 cursor-pointer"></BiSearch>
        )}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="focus:bg-white focus:outline-none rounded-full focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-elife-700 bg-elife-500 w-full h-[40px] p-2 pl-10"
      />
      <SearchResult></SearchResult>
    </div>
  );
};

export default Search;
