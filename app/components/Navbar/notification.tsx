"use client";

import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { onOpen, onClose } from "@/app/store/dropdownSlice";
import { AppDispatch, RootState } from "@/app/store";

const Notification = () => {
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
      <IoMdNotificationsOutline className="w-6 h-6 cursor-pointer"></IoMdNotificationsOutline>
    </div>
  );
};

export default Notification;
