"use client";

import DropdownItem from "./dropdownItem";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
const Dropdown = () => {
  const isOpen = useSelector((state: RootState) => state.dropdownSlice.isOpen);

  return (
    isOpen && (
      <div className="absolute bg-elife-500 top-9 w-52 right-0 z-10 rounded-md focus:outline-none hover:outline-none">
        <DropdownItem></DropdownItem>
      </div>
    )
  );
};

export default Dropdown;
