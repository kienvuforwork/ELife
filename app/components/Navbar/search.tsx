"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="relative">
      <div>
        {" "}
        <input
          type="text"
          className="border-transparent text-elife-700 rounded-xl focus:bg-elife-400 bg-elife-500 w-[350px] h-[32px]"
        />
      </div>

      <BiSearch className="w-5 h-5 text-elife-600 absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2"></BiSearch>
    </div>
  );
};

export default Search;
