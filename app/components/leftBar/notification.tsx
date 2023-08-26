"use client";

import { IoMdNotificationsOutline } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import DropdownItem from "../dropdownItem";

const Notification = () => {
  const dummy = () => {
    return;
  };
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div
      className="p-1 relative"
      onClick={toggleDropdown}
      ref={notificationRef}
    >
      {" "}
      <IoMdNotificationsOutline className="w-7 h-7 cursor-pointer"></IoMdNotificationsOutline>
      {isOpen && (
        <div className="absolute left-0 bg-elife-400 w-52 top-8 transform -translate-x-1/2 z-10 rounded-md focus:outline-none hover:outline-none">
          <DropdownItem name="Account setting" onClick={dummy}></DropdownItem>
        </div>
      )}
    </div>
  );
};

export default Notification;
