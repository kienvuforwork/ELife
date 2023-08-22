"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="flex relative justify-center items-center w-full px-4">
      <span className="absolute left-6">
        {" "}
        <BiSearch className="w-6 h-6 text-elife-600 cursor-pointer"></BiSearch>{" "}
      </span>

      <input
        type="text"
        placeholder="Search"
        className="focus:bg-white focus:outline-none rounded-full focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-elife-700 bg-elife-500 w-full h-[40px] p-2 pl-10"
      />
    </div>
  );
};

export default Search;
