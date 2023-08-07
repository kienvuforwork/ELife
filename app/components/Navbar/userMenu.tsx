"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { onOpen, onClose } from "@/app/store/dropdownSlice";

const UserMenu = () => {
  const dispatch: AppDispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.dropdownSlice.isOpen);
  const toggle = (isOpen: boolean) => {
    if (isOpen) {
      dispatch(onClose());
    } else dispatch(onOpen());
  };
  return (
    <div className="p-1" onClick={() => toggle(isOpen)}>
      {" "}
      <AiOutlineMenu className="w-6 h-6 cursor-pointer"></AiOutlineMenu>
    </div>
  );
};

export default UserMenu;
