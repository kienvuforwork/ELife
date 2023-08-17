"use client";

import { IoMdNotificationsOutline } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import Dropdown from "../dropdown";

const Notification = () => {
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
      <IoMdNotificationsOutline className="w-6 h-6 cursor-pointer"></IoMdNotificationsOutline>
      {isOpen && <Dropdown type="test"></Dropdown>}
    </div>
  );
};

export default Notification;
