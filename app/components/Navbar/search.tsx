"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="relative">
      <div>
        {" "}
        <input
          type="text"
          placeholder=""
          className="focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-elife-700 rounded-xl bg-elife-500 2xl:w-[350px] xl:w-[300px] lg:w-[250px] md:w-[200px] h-[32px] p-2 pl-4"
        />
      </div>

      <BiSearch className="w-5 h-5 text-elife-600 absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2"></BiSearch>
    </div>
  );
};

export default Search;
